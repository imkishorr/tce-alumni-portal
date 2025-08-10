// src/pages/departments/it/alumni/AlumniYearPage.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Card, CardContent } from '@mui/material';

const alumniData = {
  2025: [
    { name: 'John Doe', company: 'Google', experience: 'Shared insights about system design and interview rounds.' },
    { name: 'Alice Smith', company: 'Amazon', experience: 'Focused on DSA and behavioral questions.' },
  ],
  2024: [
    { name: 'Jane Williams', company: 'Microsoft', experience: 'Described technical round challenges.' },
    { name: 'Mark Johnson', company: 'TCS', experience: 'Talked about aptitude and HR rounds.' },
  ],
  // 2023 will be loaded from JSON file
};

const AlumniYearPage = () => {
  const { year } = useParams();
  const [yearData, setYearData] = useState(null);

  useEffect(() => {
    if (year === '2023') {
      // Fetch from public folder
      fetch('/alumni_2023_data.json')
        .then((response) => response.json())
        .then((data) => setYearData(data))
        .catch((error) => {
          console.error('Error loading 2023 alumni data:', error);
          setYearData([]);
        });
    } else {
      setYearData(alumniData[year] || []);
    }
  }, [year]);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Alumni Interview Experiences - {year}
      </Typography>

      {yearData && yearData.length > 0 ? (
        yearData.map((alumni, index) => (
          <Card key={index} sx={{ marginTop: 2 }}>
            <CardContent>
              <Typography variant="h6">{alumni.name}</Typography>
              <Typography color="text.secondary">{alumni.company}</Typography>
              <Typography variant="body2" mt={1}>{alumni.experience}</Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1" color="text.secondary">
          No alumni data found for {year}.
        </Typography>
      )}
    </Box>
  );
};

export default AlumniYearPage;
