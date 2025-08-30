import React from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Toolbar, 
  AppBar, 
  Typography,
  Divider,
  Avatar
} from '@mui/material';
import { 
  School as SchoolIcon,
  BarChart as BarChartIcon,
  Apartment as ApartmentIcon,
  Logout as LogoutIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAuth, signOut } from 'firebase/auth';

// Color scheme
const colors = {
  primary: '#003366',
  primaryLight: '#4a6baf',
  accent: '#ff6b6b',
  white: '#ffffff',
  background: '#f5f7fa'
};

const drawerWidth = 240;

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("authToken");
      navigate("/"); // redirect to login page
    });
  };

  const navItems = [
    { name: 'Placement Officer', path: '/dashboard/placement-officer', icon: <SchoolIcon /> },
    { name: 'Placement Statistics', path: '/dashboard/placement/statistics', icon: <BarChartIcon /> },
    { name: 'Placement Policy', path: '/PlacementPolicy.pdf', icon: <DescriptionIcon />, external: true },
    { name: 'Departments', path: '/dashboard/departments', icon: <ApartmentIcon /> },
    { name: 'Logout', path: 'logout', icon: <LogoutIcon />, logout: true } // Special key for logout
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background' }}>
      {/* AppBar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: 1201,
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}
        component={motion.div}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap sx={{ 
            fontWeight: 600,
            letterSpacing: 1.1,
            color: colors.white
          }}>
            TCE Alumni Portal
          </Typography>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://www.tce.edu/', '_blank')}
            style={{ cursor: 'pointer' }}
          >
            <Avatar 
              src="/tce-logo.png" 
              alt="TCE Logo" 
              sx={{ 
                width: 40, 
                height: 40,
                border: `2px solid ${colors.white}`,
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }} 
            />
          </motion.div>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: colors.primary,
            color: colors.white,
            borderRight: 'none'
          },
        }}
      >
        <Toolbar />
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
        
        <List>
          {navItems.map((item, index) => (
            <ListItem 
              button 
              key={item.name}
              onClick={() => {
                if (item.logout) {
                  handleLogout();
                } else if (item.external) {
                  window.open(item.path, '_blank');
                } else {
                  navigate(item.path);
                }
              }}
              sx={{
                '&:hover': { background: 'rgba(255, 255, 255, 0.08)' },
                transition: 'all 0.2s ease',
                mb: 0.5
              }}
              component={motion.div}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ListItemIcon sx={{ color: colors.white, minWidth: '40px' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.name} 
                primaryTypographyProps={{ sx: { fontWeight: 500 } }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3,
          backgroundColor: colors.background,
          minHeight: '100vh'
        }}
      >
        <Toolbar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
