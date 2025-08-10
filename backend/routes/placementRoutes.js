const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const url = require('url');

const router = express.Router();

const TCE_BASE = 'https://www.tce.edu';
const OVERVIEW_URL = `${TCE_BASE}/placement`;
const STAT_URL = `${TCE_BASE}/placement/statistics`;

// Simple in-memory cache
const cache = {
  overview: { ts: 0, ttl: 1000 * 60 * 30, data: null }, // 30 min
  statistics: { ts: 0, ttl: 1000 * 60 * 30, data: null }
};

function toAbsolute(base, link) {
  if (!link) return null;
  try {
    return new url.URL(link, base).toString();
  } catch (e) {
    return link;
  }
}

async function fetchCheerio(src) {
  const { data } = await axios.get(src, {
    timeout: 15000,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9'
    }
  });
  return cheerio.load(data);
}

function getMainContent($) {
  let main = $('.region-content').first();
  if (!main || !main.html()) main = $('.main-content').first();
  if (!main || !main.html()) main = $('#content').first();
  return main;
}

// 🔹 Placement Overview Endpoint
router.get('/overview', async (req, res) => {
  try {
    const now = Date.now();
    if (cache.overview.data && now - cache.overview.ts < cache.overview.ttl) {
      return res.json(cache.overview.data);
    }

    const $ = await fetchCheerio(OVERVIEW_URL);
    const main = getMainContent($);

    if (!main || !main.html()) {
      return res.status(500).json({ message: 'Could not locate placement overview section' });
    }

    const images = [];
    main.find('img').each((i, img) => {
      const src = $(img).attr('src');
      if (src) images.push(toAbsolute(OVERVIEW_URL, src));
    });

    const rawHtml = main.html() || '';

    const sections = [];
    main.children().each((i, el) => {
      const tag = el.tagName ? el.tagName.toLowerCase() : '';
      if (['h1', 'h2', 'h3', 'p', 'ul', 'ol'].includes(tag)) {
        sections.push({ tag, html: $(el).html() });
      }
    });

    const result = { url: OVERVIEW_URL, images, sections, rawHtml };
    cache.overview = { ts: now, data: result, ttl: cache.overview.ttl };
    res.json(result);
  } catch (err) {
    console.error('overview error:', err.message || err);
    res.status(500).json({ message: 'Failed to fetch overview' });
  }
});

// 🔹 Placement Statistics Endpoint
router.get('/statistics', async (req, res) => {
  try {
    const now = Date.now();
    if (cache.statistics.data && now - cache.statistics.ts < cache.statistics.ttl) {
      return res.json(cache.statistics.data);
    }

    const $ = await fetchCheerio(STAT_URL);
    const main = getMainContent($);

    if (!main || !main.html()) {
      return res.status(500).json({ message: 'Could not locate placement statistics section' });
    }

    // Remove any icons or images (e.g., PDF icons)
    main.find('img').remove();

    const tables = [];

    main.find('table').each((i, table) => {
      const headers = [];
      const rows = [];

      // Override default headers manually
      if (i === 0) {
        headers.push('S.No', 'Year', 'Download');
      } else if (i === 1) {
        headers.push('S.No', 'Year', 'No. of Offers', 'No. of Students Placed', 'Download');
      } else if (i === 2) {
        headers.push('S.No', 'Year', 'Download');
      }

      $(table).find('tbody tr').each((_, tr) => {
        const cols = [];
        $(tr).find('td').each((__, td) => {
          const $td = $(td);
          const link = $td.find('a').first();
          if (link && link.length) {
            cols.push({ text: $td.text().trim(), href: toAbsolute(STAT_URL, link.attr('href')) });
          } else {
            cols.push({ text: $td.text().trim() });
          }
        });
        if (cols.length) rows.push(cols);
      });

      tables.push({ headers, rows });
    });

    const headings = ['TCE Placement Statistics'];
    const rawHtml = main.html() || '';

    const result = {
      url: STAT_URL,
      images: [], // cleared since we removed all icons
      headings,
      tables,
      rawHtml
    };

    cache.statistics = { ts: now, data: result, ttl: cache.statistics.ttl };
    res.json(result);
  } catch (err) {
    console.error('statistics error:', err.message || err);
    res.status(500).json({ message: 'Failed to fetch statistics' });
  }
});

module.exports = router;
