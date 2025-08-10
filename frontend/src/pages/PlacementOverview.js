import React, { useEffect, useState } from 'react';
import { fetchPlacementOverview } from '../api/placementApi';
import {
  Typography,
  Box,
  CircularProgress,
  Divider,
  Grid,
  Container,
  Button,
  Fade,
  Grow
} from '@mui/material';
import { motion } from 'framer-motion';
import placementOfficerPhoto from '../assets/placement-officer.jpg';
import placementBanner from '../assets/placement-banner.jpg';
import tceLogo from '../assets/tce-logo.png';

const PlacementOverview = () => {
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);

  // TCE Brand Colors
  const tceBlue = '#003366';
  const tceLightBlue = '#4a6baf';
  const tceAccent = '#ff6b6b';

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetchPlacementOverview()
      .then(d => {
        if (mounted) {
          setData(d);
          setErr('');
        }
      })
      .catch(e => {
        if (mounted) {
          setErr('⚠ Unable to load placement overview. Please try again later.');
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

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
        <Typography sx={{ ml: 2, fontWeight: 'medium' }}>
          Loading placement overview...
        </Typography>
      </Box>
    );
  }

  if (err) {
    return (
      <Container maxWidth="lg" sx={{ 
        py: 6,
        textAlign: 'center',
        backgroundImage: 'url(/tce-logo.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '30%',
        opacity: 0.05
      }}>
        <Typography 
          variant="h5" 
          color="error" 
          sx={{ 
            fontWeight: 'bold',
            mb: 2
          }}
        >
          {err}
        </Typography>
        <Button 
          variant="contained"
          onClick={() => window.location.reload()}
          sx={{
            background: `linear-gradient(45deg, ${tceBlue} 30%, ${tceLightBlue} 90%)`,
            color: 'white',
            borderRadius: '20px',
            textTransform: 'none',
            '&:hover': {
              boxShadow: '0 3px 5px rgba(0, 51, 102, 0.3)'
            }
          }}
        >
          Try Again
        </Button>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container maxWidth="lg" sx={{ 
        py: 6,
        textAlign: 'center',
        backgroundImage: 'url(/tce-logo.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '30%',
        opacity: 0.05
      }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontStyle: 'italic',
            color: 'text.secondary',
            mb: 2
          }}
        >
          No placement data available.
        </Typography>
      </Container>
    );
  }

  const sections =
    data.sections ||
    data.data?.sections ||
    (Array.isArray(data) && data[0]?.sections) ||
    [];

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${placementBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1,
          zIndex: -2
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/tce-logo.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: '40%',
          opacity: 0.05,
          zIndex: -1
        }
      }}
    >
      {/* Animated floating elements */}
      <Box
        component={motion.div}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
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

      {/* TCE Logo */}
      <Fade in timeout={800}>
        <Box
          component={motion.div}
          whileHover={{ scale: 1.05 }}
          sx={{
            position: 'absolute',
            top: 20,
            left: 20,
            width: 80,
            height: 'auto',
            zIndex: 10,
          }}
        >
          <img src={tceLogo} alt="TCE Logo" style={{ width: '100%', height: 'auto' }} />
        </Box>
      </Fade>

      {/* Placement Officer Section */}
      <Fade in timeout={1000}>
        <Box
          sx={{
            width: '100%',
            bgcolor: 'rgba(255,255,255,0.95)',
            borderRadius: 0,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            overflow: 'hidden',
            mt: 8
          }}
          component={motion.div}
          whileHover={{ boxShadow: '0 6px 24px rgba(0,0,0,0.2)' }}
        >
          <Grid container>
            <Grid item xs={12} md={4}>
              <Box
                component={motion.img}
                src={placementOfficerPhoto}
                alt="Placement Officer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  minHeight: 300,
                }}
              />
            </Grid>
            <Grid item xs={12} md={8} sx={{ p: { xs: 3, md: 5 } }}>
              <Typography 
                variant="h3" 
                sx={{ 
                  color: tceBlue, 
                  fontWeight: 'bold', 
                  mb: 3,
                  background: `linear-gradient(45deg, ${tceBlue} 30%, ${tceLightBlue} 90%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Placement Officer
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: tceBlue, 
                  fontWeight: 'medium', 
                  mb: 2,
                  borderBottom: `2px solid ${tceAccent}`,
                  pb: 1,
                  display: 'inline-block'
                }}
              >
                Dr. G. K. Raajesh
              </Typography>
              <Typography sx={{ mb: 2, fontSize: '1.1rem' }}>
                Thiagarajar College of Engineering, Madurai 625015
              </Typography>
              <Typography sx={{ mb: 1, fontSize: '1.1rem' }}>
                <strong>Telephone:</strong> +91 452 2482240, 2482241, 2482242
              </Typography>
              <Typography sx={{ mb: 1, fontSize: '1.1rem' }}>
                <strong>Cell:</strong> 9443388243
              </Typography>
              <Typography sx={{ mb: 1, fontSize: '1.1rem' }}>
                <strong>Fax:</strong> +91 452 2483427
              </Typography>
              <Typography sx={{ fontSize: '1.1rem' }}>
                <strong>Email:</strong> placement@tce.edu
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Fade>

      {/* Placement Overview Content */}
      {sections.length > 0 && (
        <Container maxWidth="lg" sx={{ mt: 6 }}>
          {sections.map((section, i) => (
            <Grow in timeout={800 + (i * 200)} key={i}>
              <Box
                sx={{
                  mb: 4,
                  p: 4,
                  backgroundColor: '#ffffff',
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  '& h1, & h2, & h3, & h4, & h5, & h6': {
                    color: tceBlue,
                    fontWeight: '700',
                    mb: 2,
                  },
                  '& p': {
                    fontSize: '1.1rem',
                    color: '#444',
                    lineHeight: 1.6,
                    mb: 2,
                  },
                }}
                component={motion.div}
                whileHover={{ 
                  boxShadow: '0 6px 24px rgba(0,0,0,0.15)',
                  transform: 'translateY(-2px)'
                }}
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </Grow>
          ))}
        </Container>
      )}

      {/* Footer */}
      <Fade in timeout={1500}>
        <Box 
          sx={{ 
            py: 3, 
            textAlign: 'center', 
            backgroundColor: 'rgba(255,255,255,0.9)',
            mt: 4
          }}
        >
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Created by KISHORE@tce.
          </Typography>
        </Box>
      </Fade>
    </Box>
  );
};

export default PlacementOverview;