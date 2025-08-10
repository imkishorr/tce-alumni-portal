import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '/api/placement',
  timeout: 15000,
});

// Fetches placement overview
export async function fetchPlacementOverview() {
  try {
    const res = await api.get('/overview');
    console.log("Fetched placement overview:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching placement overview:", err);
    throw err;
  }
}

// Fetches placement statistics
export async function fetchPlacementStatistics() {
  try {
    const res = await api.get('/statistics');
    console.log("Fetched placement statistics:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching placement statistics:", err);

    // 🔧 Uncomment below to return mock data for development
    /*
    return {
      images: [],
      headings: ['Mock Statistics (Offline Mode)'],
      tables: [
        {
          headers: ['Department', 'Placed', 'Total'],
          rows: [
            [{ text: 'CSE' }, { text: '85' }, { text: '100' }],
            [{ text: 'IT' }, { text: '78' }, { text: '90' }],
          ]
        }
      ]
    };
    */

    throw err;
  }
}

// Optional proxy for downloading files
export function downloadViaProxy(url) {
  return `/api/placement/download?url=${encodeURIComponent(url)}`;
}
