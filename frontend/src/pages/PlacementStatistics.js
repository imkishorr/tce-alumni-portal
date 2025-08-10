import React, { useEffect, useState } from 'react';
import { fetchPlacementStatistics, downloadViaProxy } from '../api/placementApi';
import { 
  Container, 
  Typography, 
  Box, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  Link, 
  Button,
  CircularProgress,
  Fade,
  Grow
} from '@mui/material';
import { motion } from 'framer-motion';

// TCE Brand Colors
const tceBlue = '#003366';
const tceLightBlue = '#4a6baf';
const tceAccent = '#ff6b6b';

const PlacementStatistics = () => {
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchPlacementStatistics()
      .then(d => {
        if (mounted) {
          setData(d);
          setLoading(false);
        }
      })
      .catch(e => { 
        console.error(e); 
        if (mounted) {
          setErr('Failed to load statistics');
          setLoading(false);
        }
      });
    return () => (mounted = false);
  }, []);

  const renderCell = (cell) => {
    if (!cell) return '-';  
    if (cell.href) {
      return (
        <Button
          variant="contained"
          size="small"
          onClick={() => window.open(cell.href, '_blank')}
          sx={{
            background: 'linear-gradient(45deg, #003366 30%, #4a6baf 90%)',
            color: 'white',
            borderRadius: '20px',
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 3px 5px rgba(0, 51, 102, 0.3)',
              background: 'linear-gradient(45deg, #002244 30%, #3a5a8f 90%)'
            }
          }}
        >
          Download
        </Button>
      );
    }
    return cell.text || '-';
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="300px"
        sx={{
          backgroundImage: 'url(/tce-logo.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: '50%',
          opacity: 0.15
        }}
      >
        <CircularProgress size={60} thickness={4} sx={{ color: tceBlue }} />
      </Box>
    );
  }

  if (err) {
    return (
      <Container maxWidth="lg" sx={{ 
        py: 4,
        textAlign: 'center',
        backgroundImage: 'url(/tce-logo.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '50%',
        opacity: 0.05
      }}>
        <Typography variant="h5" color="error" gutterBottom>
          Error Loading Data
        </Typography>
        <Typography variant="body1">{err}</Typography>
      </Container>
    );
  }

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: 4,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/tce-logo.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: '50%',
          opacity: 0.05,
          zIndex: -1
        }
      }}
    >
      {/* Animated floating elements */}
      <Box
        component={motion.div}
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        sx={{
          position: 'absolute',
          top: '15%',
          left: '5%',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${tceLightBlue} 0%, ${tceBlue} 100%)`,
          opacity: 0.15,
          zIndex: -1
        }}
      />

      <Fade in timeout={800}>
        <Box>
          <Typography 
            variant="h3" 
            sx={{ 
              mb: 4,
              fontWeight: 'bold',
              background: `linear-gradient(45deg, ${tceBlue} 30%, ${tceLightBlue} 90%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center'
            }}
          >
            Placement Statistics
          </Typography>
        </Box>
      </Fade>

      {/* Images with animation */}
      {data.images && data.images.length > 0 &&
        data.images.map((src, i) => (
          <Grow in timeout={500 + (i * 100)} key={i}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <motion.img 
                src={src} 
                alt={`stat-${i}`} 
                style={{ 
                  maxWidth: '100%', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                }}
                whileHover={{ scale: 1.02 }}
              />
            </Box>
          </Grow>
        ))
      }

      {/* Headings with animation */}
      {data.headings && data.headings.map((h, i) => (
        <Fade in timeout={600 + (i * 100)} key={i}>
          <Typography 
            variant="h5" 
            sx={{ 
              color: tceBlue, 
              mt: 4, 
              mb: 2,
              fontWeight: 'bold',
              borderBottom: `2px solid ${tceAccent}`,
              pb: 1,
              display: 'inline-block'
            }}
          >
            {h}
          </Typography>
        </Fade>
      ))}

      {/* Tables with animation */}
      {data.tables && data.tables.map((tbl, idx) => (
        <Grow in timeout={700 + (idx * 100)} key={idx}>
          <Box 
            sx={{ 
              mb: 4,
              overflow: 'hidden',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}
            component={motion.div}
            whileHover={{ scale: 1.005 }}
          >
            <Table size="small">
              <TableHead sx={{ background: `linear-gradient(45deg, ${tceBlue} 0%, ${tceLightBlue} 100%)` }}>
                <TableRow>
                  {tbl.headers ? tbl.headers.map((h, i) => (
                    <TableCell 
                      key={i} 
                      sx={{ 
                        color: 'white', 
                        fontWeight: 'bold',
                        fontSize: '1rem'
                      }}
                    >
                      {h}
                    </TableCell>
                  )) : (
                    (tbl.rows[0] || []).map((_, i) => (
                      <TableCell 
                        key={i} 
                        sx={{ 
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      >
                        Column {i+1}
                      </TableCell>
                    ))
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {tbl.rows.map((r, rIdx) => (
                  <TableRow 
                    key={rIdx} 
                    sx={{ 
                      '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                      '&:hover': { backgroundColor: '#f0f7ff' }
                    }}
                  >
                    {r.map((c, cIdx) => (
                      <TableCell key={cIdx}>
                        {renderCell(c)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Grow>
      ))}

      {/* Fallback for raw HTML */}
      {(!data.tables || data.tables.length === 0) && data.rawHtml && (
        <Box 
          sx={{ 
            p: 3,
            borderRadius: '8px',
            border: `1px solid #ddd`,
            backgroundColor: '#f9f9f9'
          }}
          dangerouslySetInnerHTML={{ __html: data.rawHtml }} 
        />
      )}
    </Container>
  );
};

export default PlacementStatistics;