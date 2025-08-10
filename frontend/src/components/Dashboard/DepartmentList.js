import React from 'react';
import { Link } from 'react-router-dom';
import { 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Paper, 
  Typography 
} from '@mui/material';

const DepartmentList = ({ departments }) => {
  return (
    <Paper elevation={3} sx={{ 
      padding: 3, 
      marginBottom: 4,
      backgroundColor: '#f8f9fa'
    }}>
      <Typography variant="h5" sx={{ 
        color: '#003366',
        marginBottom: 2,
        fontWeight: 'medium'
      }}>
        Departments
      </Typography>
      <List>
        {departments.map((dept) => (
          <ListItem key={dept.id} disablePadding>
            <ListItemButton
              component={Link}
              to={`/dashboard/${encodeURIComponent(dept.name)}`}
              sx={{
                '&:hover': {
                  backgroundColor: '#00336610',
                }
              }}
            >
              <ListItemText 
                primary={dept.name} 
                primaryTypographyProps={{ 
                  sx: { 
                    color: '#003366',
                    fontWeight: 'medium'
                  } 
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default DepartmentList;
