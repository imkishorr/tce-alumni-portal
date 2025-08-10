import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';

const Sidebar = () => {
  return (
    <Box sx={{ 
      width: '250px', 
      backgroundColor: '#003366', 
      color: 'white',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: '64px'
    }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ '&:hover': { backgroundColor: '#00336690' } }}>
            <ListItemIcon sx={{ color: 'white' }}>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Departments" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ '&:hover': { backgroundColor: '#00336690' } }}>
            <ListItemIcon sx={{ color: 'white' }}>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Placement Stats" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ '&:hover': { backgroundColor: '#00336690' } }}>
            <ListItemIcon sx={{ color: 'white' }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Alumni Experiences" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;