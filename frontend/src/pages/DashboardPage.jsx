import React, { useEffect } from 'react';
import Chatbot from "../components/Chatbot";
import { useState } from "react";
import { 
  Typography, 
  Box, 
  Divider, 
  Grid, 
  Paper,
  useMediaQuery
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Option 1: If image is in public folder
const backgroundImageUrl = '/tce-logo.png';

const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
      letterSpacing: '0.5px'
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '0.3px'
    },
    h5: {
      fontWeight: 600
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.7
    }
  },
  palette: {
    primary: {
      main: '#003366',
      light: '#4a6baf',
      dark: '#002244'
    },
    secondary: {
      main: '#ff6b6b',
      light: '#ff8e8e',
      dark: '#cc5656'
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff'
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
        }
      }
    }
  }
});

const AnimatedPaper = ({ children, delay = 0, ...props }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          transition: { 
            duration: 0.6,
            ease: [0.6, -0.05, 0.01, 0.99],
            delay: delay
          }
        },
        hidden: { opacity: 0, y: 30 }
      }}
    >
      <Paper {...props}>
        {children}
      </Paper>
    </motion.div>
  );
};

const DashboardPage = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Floating particles effect
  const Particle = ({ size, color, delay }) => {
    return (
      <motion.div
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: color,
          zIndex: -1
        }}
        animate={{
          y: [0, -50, 0],
          x: [0, 20, 0],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          repeatType: 'reverse',
          delay: delay
        }}
      />
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          px: { xs: 2, md: 6 },
          py: 4,
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: isMobile ? '80%' : '40%',
            opacity: 0.07,
            zIndex: -1,
          },
        }}
      >
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <Particle
            key={i}
            size={Math.random() * 5 + 2}
            color={i % 2 === 0 ? theme.palette.primary.main : theme.palette.secondary.main}
            delay={i * 0.5}
          />
        ))}

        {/* Welcome Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                display: 'inline-block'
              }}
            >
              Welcome to TCE Alumni Portal
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: 'text.secondary',
                maxWidth: '800px',
                margin: '0 auto',
                fontSize: '1.2rem'
              }}
            >
              Excellence in Technical Education Since 1957
            </Typography>
          </motion.div>
        </Box>

        {/* About Section */}
        <AnimatedPaper
          elevation={3}
          sx={{
            p: 3,
            mb: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            borderRadius: 2,
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}
          delay={0.2}
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.6,
                color: 'text.primary',
              }}
            >
              Thiagarajar College of Engineering (TCE), Madurai, is a government-aided institution founded in 1957 by
              philanthropist Shri. Karumuttu Thiagarajan Chettiar. It is renowned for producing world-class engineers
              and leaders, with a strong legacy in academics, innovation, and industry collaboration.
            </Typography>
          </motion.div>
        </AnimatedPaper>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Divider sx={{ 
            my: 4, 
            borderColor: 'primary.main', 
            opacity: 0.3,
            borderBottomWidth: 2
          }} />
        </motion.div>

        {/* Vision & Mission */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <AnimatedPaper
              elevation={3}
              sx={{
                p: 3,
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                borderLeft: '4px solid',
                borderColor: 'primary.main',
                backdropFilter: 'blur(8px)',
                '&:hover': {
                  boxShadow: `0 8px 20px -5px ${theme.palette.primary.light}`
                }
              }}
              delay={0.3}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  color: 'primary.main',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <motion.span
                  style={{ display: 'inline-block' }}
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 5
                  }}
                >
                  🌟
                </motion.span>
                <Box component="span" ml={1}>Vision</Box>
              </Typography>
              <Typography sx={{ lineHeight: 1.6 }}>
                To achieve excellence in technical education and research through dedication to duty, innovation in
                teaching, and faith in human values.
              </Typography>
            </AnimatedPaper>
          </Grid>

          <Grid item xs={12} md={6}>
            <AnimatedPaper
              elevation={3}
              sx={{
                p: 3,
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                borderLeft: '4px solid',
                borderColor: 'secondary.main',
                backdropFilter: 'blur(8px)',
                '&:hover': {
                  boxShadow: `0 8px 20px -5px ${theme.palette.secondary.light}`
                }
              }}
              delay={0.4}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  color: 'secondary.main',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <motion.span
                  style={{ display: 'inline-block' }}
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 5,
                    delay: 1
                  }}
                >
                  🎯
                </motion.span>
                <Box component="span" ml={1}>Mission</Box>
              </Typography>
              <Typography sx={{ lineHeight: 1.6 }}>
                To create an environment conducive to learning and research, and to develop graduates with leadership
                skills, ethics, and global competence.
              </Typography>
            </AnimatedPaper>
          </Grid>
        </Grid>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Divider sx={{ 
            my: 4, 
            borderColor: 'primary.main', 
            opacity: 0.3,
            borderBottomWidth: 2
          }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 3,
              textAlign: 'center'
            }}
          >
            College Highlights
          </Typography>
        </motion.div>

        <AnimatedPaper
          elevation={3}
          sx={{
            p: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            borderRadius: 2,
            backdropFilter: 'blur(8px)',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: `0 15px 30px -10px rgba(0, 0, 0, 0.2)`
            }
          }}
          delay={0.8}
        >
          <Box
            component="ul"
            sx={{
              pl: 3,
              '& li': {
                mb: 1.5,
                lineHeight: 1.6,
                color: 'text.primary',
                fontSize: '1.1rem',
                position: 'relative'
              },
              '& li::before': {
                content: '""',
                position: 'absolute',
                left: -20,
                top: '0.6em',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: theme.palette.secondary.main
              }
            }}
          >
            {[
              "NAAC A++ accredited autonomous institution affiliated with Anna University",
              "Ranked among the top engineering colleges in India",
              "Strong placement records with top recruiters like TCS, Infosys, HCL, and more",
              "Offers UG, PG, and PhD programs in various engineering and science disciplines",
              "Excellent research infrastructure and industry collaboration"
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                {item}
              </motion.li>
            ))}
          </Box>
        </AnimatedPaper>

        {/* Footer attribution */}
        <Box sx={{ textAlign: 'center', mt: 6, mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            created by kishore@tce
          </Typography>
        </Box>

      {/* Floating TCE Chatbot button */}
<motion.div
  style={{
    position: 'fixed',
    bottom: 20,
    right: 20,
    zIndex: 1000
  }}
  animate={{
    y: [0, -10, 0],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  }}
>
  <Paper
    elevation={6}
    sx={{
      p: 1.5,
      borderRadius: '50%',
      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 60,
      height: 60,
      cursor: 'pointer',
      '&:hover': {
        transform: 'scale(1.1)'
      }
    }}
    // ✅ Toggle chatbot open/close
    onClick={() => setChatOpen((prev) => !prev)}
  >
    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>BOT</Typography>
  </Paper>
</motion.div>

{/* ✅ Pass open state into chatbot */}
<Chatbot open={chatOpen} onClose={() => setChatOpen(false)} />

      </Box>
    </ThemeProvider>
  );
};

export default DashboardPage;
