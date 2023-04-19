import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { ConnectAndPay } from '../components/connectAndPay';

const Payments = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8, // reduced padding-y
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography sx={{ mb: 3 }} variant="h4">
          Payments
        </Typography>
        <ConnectAndPay />
      </Container>
    </Box>
  );
};

export default Payments;
