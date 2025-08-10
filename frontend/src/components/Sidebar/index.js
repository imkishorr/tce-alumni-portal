import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { School, BarChart, InsertChart, People, ExpandLess, ExpandMore } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [openPlacement, setOpenPlacement] = React.useState(false);

  const handlePlacementClick = () => {
    setOpenPlacement(!openPlacement);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          marginTop: '64px',
          backgroundColor: '#941296ff',
          color: 'white',
        },
      }}
    >
      <List>
        {/* Departments */}
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon sx={{ color: 'white' }}>
            <School />
          </ListItemIcon>
          <ListItemText primary="Departments" />
        </ListItem>

        {/* Placement Menu */}
        <ListItem button onClick={handlePlacementClick}>
          <ListItemIcon sx={{ color: 'white' }}>
            <BarChart />
          </ListItemIcon>
          <ListItemText primary="Placement" />
          {openPlacement ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openPlacement} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              component={Link}
              to="/dashboard/placement"
              sx={{ pl: 4 }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                <InsertChart />
              </ListItemIcon>
              <ListItemText primary="Overview" />
            </ListItem>

            <ListItem
              button
              component={Link}
              to="/dashboard/placement/statistics" // Updated route
              sx={{ pl: 4 }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                <InsertChart />
              </ListItemIcon>
              <ListItemText primary="Placement Stats" />
            </ListItem>
          </List>
        </Collapse>

        {/* Alumni Experiences */}
        <ListItem button>
          <ListItemIcon sx={{ color: 'white' }}>
            <People />
          </ListItemIcon>
          <ListItemText primary="Alumni Experiences" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
