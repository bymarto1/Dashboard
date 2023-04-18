import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Dashboard = () => {
    const username = 'John Doe';
    const memberSince = 'January 1, 2020';
    const ExpiryDate = 'December 31, 2023';
    return (
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth='lg'>
            <Typography sx={{ mb: 3 }} variant='h4'>
              Dashboard
            </Typography>
            <Box sx={{ mb: 4 }}>
              <Typography variant='h5'>Username:</Typography>
              <Typography variant='h6'>{username}</Typography>
            </Box>
            <Box sx={{ mb: 4 }}>
              <Typography variant='h5'>Member Since:</Typography>
              <Typography variant='h6'>{memberSince}</Typography>
            </Box>
            <Box sx={{ mb: 4 }}>
              <Typography variant='h5'>Expiry Date:</Typography>
              <Typography variant='h6'>{ExpiryDate}</Typography>
            </Box>
          </Container>
        </Box>
      );
    }
    
  

export default Dashboard;
