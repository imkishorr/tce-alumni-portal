import React from 'react';
import { 
  Button, 
  Grid, 
  Typography, 
  Box,
  Fade,
  Grow 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const departments = [
  { name: 'Information Technology', path: '/departments/it' },
  { name: 'Computer Science & Engineering', path: '/departments/cse' },
  { name: 'Electronics & Communication Engineering', path: '/departments/ece' },
  { name: 'Mechanical Engineering', path: '/departments/mech' },
  { name: 'Civil Engineering', path: '/departments/civil' },
  // Add more departments as needed
];

const DepartmentsPage = () => {
  const navigate = useNavigate();

  // TCE Brand Colors
  const tceBlue = '#003366';
  const tceLightBlue = '#4a6baf';
  const tceAccent = '#ff6b6b';

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        p: 4,
        display: 'flex',
        flexDirection: 'column',
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
          opacity: 0.58,
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
          top: '20%',
          left: '10%',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${tceLightBlue} 0%, ${tceBlue} 100%)`,
          opacity: 0.15,
          zIndex: -1
        }}
      />
      
      <Box
        component={motion.div}
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${tceAccent} 0%, #ff4757 100%)`,
          opacity: 0.1,
          zIndex: -1
        }}
      />

      <Fade in timeout={800}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            gutterBottom 
            sx={{
              fontWeight: 'bold',
              background: `linear-gradient(45deg, ${tceBlue} 30%, ${tceLightBlue} 90%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            TCE Departments
          </Typography>
          <Typography 
            variant="h6" 
            sx={{
              color: tceBlue,
              maxWidth: '800px',
              margin: '0 auto'
            }}
          >
            Explore the academic departments that shape future engineers and innovators
          </Typography>
        </Box>
      </Fade>

      <Grid container spacing={4} sx={{ flexGrow: 1, mb: 4 }}>
        {departments.map((dept, i) => (
          <Grid item xs={12} sm={6} md={4} key={i} sx={{ display: 'flex' }}>
            <Grow in timeout={500 + (i * 150)}>
              <Box sx={{ width: '100%' }}>
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ height: '100%' }}
                >
                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    onClick={() => navigate(dept.path)}
                    sx={{ 
                      fontSize: '1.2rem',
                      py: 3,
                      height: '100%',
                      minHeight: '120px',
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${tceBlue} 0%, ${tceLightBlue} 100%)`,
                      boxShadow: '0 4px 15px rgba(0, 51, 102, 0.3)',
                      '&:hover': {
                        background: `linear-gradient(135deg, #002244 0%, #3a5a8f 100%)`,
                        boxShadow: '0 6px 20px rgba(0, 51, 102, 0.4)'
                      },
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                  >
                    {dept.name}
                  </Button>
                </motion.div>
              </Box>
            </Grow>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 'auto', py: 2 }}>
        <Typography variant="body2" color="textSecondary">
          created by kishore@tce
        </Typography>
      </Box>
    </Box>
  );
};

export default DepartmentsPage;