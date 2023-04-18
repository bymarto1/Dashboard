import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import { ConnectAndPay } from '../components/connectAndPay';
 
 
const Payments = () => {
    return (
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Payments
          </Typography>
          <Box sx={{ mb: 3 }}>
            <ConnectAndPay />
          </Box>
          <Typography sx={{ mb: 3, fontSize: 18 }} id="transaction-status"></Typography>
          <Typography sx={{ mb: 3, fontSize: 18 }} id="payment-status"></Typography>
        </Container>
      </Box>
    );
  };
  
  export default Payments;