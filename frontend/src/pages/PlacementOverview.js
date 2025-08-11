import React from 'react';
import {
  Typography,
  Box,
  Grid,
  Container,
  Fade,
  Grow,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const PlacementOverview = () => {
  const tceBlue = '#003366';
  const tceLightBlue = '#4a6baf';
  const tceAccent = '#ff6b6b';
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const sections = [
    {
      content: `
        <h3>Our Mission</h3>
        <p>The Placement Cell at TCE is dedicated to connecting students with industry opportunities, fostering career growth, and building strong employer relationships.</p>
      `
    },
    {
      content: `
        <h3>Achievements</h3>
        <p>TCE consistently secures stellar campus placements with top-tier recruiters, achieving record-breaking offer counts year after year.</p>
        <p> Two IT department students received offers from Amazon with a ₹45 LPA package, marking a record-high salary in the college’s placement history.</p>
      `
    }
  ];

  const Bubble = ({ size, left, top, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: [0, 0.3, 0],
        y: [0, -100],
        x: [0, Math.random() * 50 - 25]
      }}
      transition={{
        duration: 15 + Math.random() * 10,
        delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear"
      }}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${tceLightBlue} 0%, rgba(74,107,175,0) 70%)`,
        left: `${left}%`,
        top: `${top}%`,
        zIndex: -1
      }}
    />
  );

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/assets/placement-building.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1,
          zIndex: -3
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/assets/tce-logo.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: '40%',
          opacity: 0.05,
          zIndex: -2
        }
      }}
    >
      {[...Array(15)].map((_, i) => (
        <Bubble
          key={i}
          size={`${20 + Math.random() * 60}px`}
          left={Math.random() * 100}
          top={Math.random() * 100}
          delay={Math.random() * 5}
        />
      ))}

      <Fade in timeout={1000}>
        <Box
          sx={{
            width: '100%',
            bgcolor: 'rgba(255,255,255,0.97)',
            boxShadow: '0 4px 30px rgba(0,0,0,0.15)',
            overflow: 'hidden',
            mt: 8,
            borderRadius: { xs: 0, md: 4 },
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.3)'
          }}
          component={motion.div}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ 
            boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
            transform: 'translateY(-5px)'
          }}
        >
          <Grid container>
            <Grid item xs={12} md={4}>
              <Box
                component={motion.img}
                src="/assets/placement-officer.jpg"
                alt="Placement Officer"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  minHeight: 300,
                }}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5 }}
              />
            </Grid>
            <Grid item xs={12} md={8} sx={{ p: { xs: 3, md: 5 } }}>
              <Typography 
                variant={isMobile ? "h4" : "h3"}
                sx={{ 
                  mb: 3,
                  background: `linear-gradient(45deg, ${tceBlue} 30%, ${tceLightBlue} 90%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: 0,
                    width: '100%',
                    height: 4,
                    background: `linear-gradient(90deg, ${tceAccent} 0%, rgba(255,107,107,0) 80%)`,
                    borderRadius: 2,
                    transformOrigin: 'left',
                  }
                }}
                component={motion.div}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Placement Officer
              </Typography>
              
              <Typography 
                variant={isMobile ? "h5" : "h4"}
                sx={{ 
                  color: tceBlue, 
                  fontWeight: 'medium', 
                  mb: 2,
                  pb: 1,
                  display: 'inline-block'
                }}
                component={motion.div}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Box 
                  component="span"
                  sx={{
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: 2,
                      backgroundColor: tceAccent,
                      transform: 'scaleX(0)',
                      transformOrigin: 'right',
                      transition: 'transform 0.3s ease-out'
                    }
                  }}
                >
                  Dr. G. K. Raajesh
                </Box>
              </Typography>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, staggerChildren: 0.1 }}
              >
                <Typography sx={{ mb: 2, fontSize: '1.1rem', color: tceBlue }}>
                  Thiagarajar College of Engineering, Madurai 625015
                </Typography>
                <Typography sx={{ mb: 1, fontSize: '1.1rem', color: tceBlue }}>
                  <strong>Telephone:</strong> +91 452 2482240, 2482241, 2482242
                </Typography>
                <Typography sx={{ mb: 1, fontSize: '1.1rem', color: tceBlue }}>
                  <strong>Cell:</strong> 9443388243
                </Typography>
                <Typography sx={{ mb: 1, fontSize: '1.1rem', color: tceBlue }}>
                  <strong>Fax:</strong> +91 452 2483427
                </Typography>
                <Typography sx={{ fontSize: '1.1rem', color: tceBlue }}>
                  <strong>Email:</strong> placement@tce.edu
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </Fade>

      <Container maxWidth="lg" sx={{ mt: 6, position: 'relative' }}>
        {sections.map((section, i) => (
          <Grow in timeout={800 + (i * 200)} key={i}>
            <Box
              sx={{
                mb: 4,
                p: 4,
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0,51,102,0.1)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 40px rgba(0,51,102,0.15)'
                },
                '& h3': {
                  color: tceBlue,
                  marginBottom: '1rem',
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: 0,
                    width: '50%',
                    height: 3,
                    backgroundColor: tceAccent,
                    borderRadius: 3
                  }
                },
                '& p': {
                  color: '#333',
                  lineHeight: 1.8,
                  fontSize: '1.1rem'
                }
              }}
              component={motion.div}
              whileHover={{ scale: 1.01 }}
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </Grow>
        ))}
      </Container>

      <Fade in timeout={1500}>
        <Box 
          sx={{ 
            py: 3, 
            textAlign: 'center', 
            backgroundColor: 'rgba(255,255,255,0.95)',
            mt: 4
          }}
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Typography 
            variant="body2" 
            color="text.secondary"
          >
            © {new Date().getFullYear()} Created by KISHORE@tce.
          </Typography>
        </Box>
      </Fade>
    </Box>
  );
};

export default PlacementOverview;
