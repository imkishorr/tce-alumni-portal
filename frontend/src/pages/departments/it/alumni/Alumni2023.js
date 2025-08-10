import React, { useEffect, useState } from 'react';
import { 
  Typography, 
  Box, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  CircularProgress,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Fade,
  Grow
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/Download';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import { motion } from 'framer-motion';

const Alumni2023 = () => {
  const [companyMap, setCompanyMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/alumni_2023_data.json`);
        
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

        const data = await response.json();
        if (!data || typeof data !== 'object') throw new Error('Invalid data format');

        const newCompanyMap = {};
        Object.entries(data).forEach(([companies, students]) => {
          companies.split(',')
            .map(c => c.trim())
            .filter(c => c.length > 0)
            .forEach(company => {
              if (!newCompanyMap[company]) newCompanyMap[company] = [];
              students.forEach(student => {
                if (!newCompanyMap[company].some(s => s.DownloadLink === student.DownloadLink)) {
                  newCompanyMap[company].push({
                    ...student,
                    originalCompanies: companies
                  });
                }
              });
            });
        });

        setCompanyMap(newCompanyMap);
      } catch (err) {
        console.error('Error loading alumni data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAccordionChange = (company) => (event, isExpanded) => {
    setExpanded(isExpanded ? company : null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress size={60} thickness={4} sx={{ color: '#003366' }} />
        <Typography variant="body1" sx={{ ml: 2 }}>Loading alumni data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3} textAlign="center">
        <Typography variant="h4" color="error" gutterBottom sx={{ fontWeight: 'bold' }}>
          Error Loading Data
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>{error}</Typography>
        <Typography variant="body2">
          Please ensure alumni_2023_data.json exists in the public folder
        </Typography>
      </Box>
    );
  }

  if (Object.keys(companyMap).length === 0) {
    return (
      <Box p={3} textAlign="center">
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          No Alumni Data Found
        </Typography>
        <Typography variant="body1">
          The alumni data file exists but contains no valid entries
        </Typography>
      </Box>
    );
  }

  const sortedCompanies = Object.keys(companyMap).sort((a, b) => a.localeCompare(b));

  return (
    <Box sx={{
      position: 'relative',
      minHeight: '100vh',
      p: { xs: 2, md: 4 },
      maxWidth: 1200,
      margin: '0 auto',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(/tce-logo.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center 5%',
        backgroundSize: '40%',
        opacity: 0.50,
        zIndex: -1
      }
    }}>
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
          background: 'radial-gradient(circle, #3f51b5 0%, #303f9f 100%)',
          opacity: 0.15,
          zIndex: -1
        }}
      />
      
      <Fade in timeout={800}>
        <Box>
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #003366 30%, #4a6baf 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
              mb: 2,
              pt: 4
            }}
          >
            Alumni Interview Experiences
          </Typography>
          <Typography 
            variant="h5" 
            sx={{
              color: '#003366',
              textAlign: 'center',
              mb: 4,
              fontStyle: 'italic'
            }}
          >
            Class of 2023
          </Typography>
        </Box>
      </Fade>

      <Box sx={{ 
        mb: 4,
        p: 3,
        backgroundColor: 'rgba(0, 51, 102, 0.05)',
        borderRadius: 2,
        textAlign: 'center'
      }}>
        <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
          Total Companies: <Chip label={sortedCompanies.length} color="primary" sx={{ fontSize: '1.1rem', p: 1 }} />
        </Typography>
      </Box>

      {sortedCompanies.map((company, index) => (
        <Grow in timeout={500 + (index * 100)} key={company}>
          <Box sx={{ mb: 2 }}>
            <Accordion 
              expanded={expanded === company}
              onChange={handleAccordionChange(company)}
              sx={{ 
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: 3,
                '&:before': { display: 'none' },
                '&.Mui-expanded': { margin: '16px 0' }
              }}
              component={motion.div}
              whileHover={{ scale: 1.01 }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon sx={{ 
                    color: expanded === company ? '#003366' : '#757575',
                    fontSize: '2rem'
                  }} />
                }
                sx={{
                  backgroundColor: expanded === company ? '#f0f7ff' : '#ffffff',
                  minHeight: '72px',
                  '&:hover': { backgroundColor: '#f5f9ff' }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <BusinessIcon sx={{ 
                    color: expanded === company ? '#003366' : '#4a6baf',
                    mr: 2,
                    fontSize: '2rem'
                  }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 'bold',
                      color: expanded === company ? '#003366' : '#424242'
                    }}>
                      {company}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: expanded === company ? '#003366' : '#757575'
                    }}>
                      {companyMap[company].length} experience{companyMap[company].length !== 1 ? 's' : ''}
                    </Typography>
                  </Box>
                  <Chip 
                    label={companyMap[company].length}
                    color={expanded === company ? 'primary' : 'default'}
                    sx={{ 
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%'
                    }}
                  />
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0, backgroundColor: '#fafafa' }}>
                <List>
                  {companyMap[company].map((student, studentIndex) => (
                    <React.Fragment key={studentIndex}>
                      <ListItem 
                        sx={{ 
                          '&:hover': { backgroundColor: '#f5f5f5' },
                          py: 2
                        }}
                        component={motion.div}
                        whileHover={{ x: 5 }}
                      >
                        <ListItemIcon sx={{ minWidth: '48px' }}>
                          <PersonIcon sx={{ 
                            color: '#4a6baf',
                            fontSize: '2rem' 
                          }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                              {student.StudentName || "Anonymous Alumni"}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body2" color="text.secondary">
                              Originally listed under: {student.originalCompanies}
                            </Typography>
                          }
                          sx={{ mr: 2 }}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          size="medium"
                          startIcon={<DownloadIcon />}
                          href={student.DownloadLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            borderRadius: '20px',
                            textTransform: 'none',
                            px: 3,
                            py: 1,
                            fontWeight: 'bold',
                            background: 'linear-gradient(45deg, #003366 30%, #4a6baf 90%)',
                            boxShadow: '0 3px 5px rgba(0, 51, 102, 0.2)',
                            '&:hover': {
                              boxShadow: '0 5px 8px rgba(0, 51, 102, 0.3)'
                            }
                          }}
                        >
                          Get Experience
                        </Button>
                      </ListItem>
                      {studentIndex < companyMap[company].length - 1 && (
                        <Divider variant="inset" sx={{ mx: 4 }} />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grow>
      ))}
    </Box>
  );
};

export default Alumni2023;