import React from 'react';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Fade,
  Grow,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ITDepartmentPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const years = [2025, 2024, 2023, 2022, 2021, 2020];

  const handleCardClick = (year) => {
    navigate(`/departments/it/alumni/${year}`);
  };

  // Color palette inspired by TCE branding
  const colors = {
    primary: '#003366', // TCE blue
    secondary: '#FF6B6B', // Coral accent
    accent: '#4ECDC4', // Teal accent
    background: 'rgba(255, 255, 255, 0.9)'
  };

  return (
    <Box 
      sx={{
        position: 'relative',
        minHeight: '100vh',
        p: 4,
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
          backgroundSize: '70%',
          opacity: 0.07, // 7% opacity for subtle watermark
          zIndex: -1
        }
      }}
    >
      <Fade in timeout={800}>
        <Box>
          <Typography 
            variant="h2" 
            gutterBottom 
            sx={{
              fontWeight: 'bold',
              background: `linear-gradient(45deg, ${colors.primary} 30%, ${colors.accent} 90%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
              mb: 2,
              [theme.breakpoints.down('sm')]: {
                fontSize: '2.5rem'
              }
            }}
          >
            Information Technology Department
          </Typography>

          <Typography 
            variant="h6" 
            align="center" 
            sx={{
              color: colors.primary,
              maxWidth: '800px',
              mx: 'auto',
              mb: 6,
              px: 2,
              fontStyle: 'italic'
            }}
          >
            Pioneering excellence in computer systems, software engineering, and emerging technologies
          </Typography>
        </Box>
      </Fade>

      <Box mt={6}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{
            color: colors.primary,
            textAlign: 'center',
            position: 'relative',
            '&::after': {
              content: '""',
              display: 'block',
              width: '100px',
              height: '4px',
              background: colors.secondary,
              margin: '16px auto 0',
              borderRadius: '2px'
            }
          }}
        >
          Alumni Interview Experiences
        </Typography>

        <Grid 
          container 
          spacing={4} 
          sx={{ 
            mt: 2,
            px: { xs: 0, sm: 4 },
            justifyContent: 'center'
          }}
        >
          {years.map((year, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              lg={3} 
              key={year}
            >
              <Grow in timeout={800 + (index * 100)}>
                <Box>
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: `0 10px 20px rgba(0, 0, 0, 0.1)`
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      sx={{
                        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
                        color: 'white',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: 4,
                        height: '100%'
                      }}
                    >
                      <CardActionArea 
                        onClick={() => handleCardClick(year)}
                        sx={{ height: '100%' }}
                      >
                        <CardContent
                          sx={{
                            height: '200px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: 'rgba(0, 0, 0, 0.2)',
                              zIndex: 1
                            }
                          }}
                        >
                          <Typography 
                            variant="h1" 
                            component="div"
                            sx={{
                              fontSize: '5rem',
                              fontWeight: 'bold',
                              opacity: 0.2,
                              position: 'absolute',
                              zIndex: 2
                            }}
                          >
                            {year}
                          </Typography>
                          <Typography 
                            variant="h4" 
                            component="div"
                            sx={{
                              position: 'relative',
                              zIndex: 3,
                              fontWeight: 'bold',
                              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                            }}
                          >
                            Batch of {year}
                          </Typography>
                          <Typography 
                            variant="body2"
                            sx={{
                              position: 'relative',
                              zIndex: 3,
                              mt: 1,
                              textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                            }}
                          >
                            View experiences →
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </motion.div>
                </Box>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Animated floating elements */}
      <Box
        component={motion.div}
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        sx={{
          position: 'absolute',
          top: '20%',
          left: '5%',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: colors.secondary,
          opacity: 0.3,
          zIndex: -1
        }}
      />
      <Box
        component={motion.div}
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        sx={{
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: colors.accent,
          opacity: 0.2,
          zIndex: -1
        }}
      />
    </Box>
  );
};

export default ITDepartmentPage;