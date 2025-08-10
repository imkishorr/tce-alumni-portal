import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#003366' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TCE Alumni Portal
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;