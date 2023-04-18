import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import { ConnectAndPay } from '../components/connectAndPay';
 
 
const Payments = () => {
    return (
        <Box
            component='main'
            sx={{
                flexGrow: 1,
                py: 8,
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Container maxWidth='lg'>
                <Typography sx={{ mb: 3 }} variant='h4'>
                    Payments
                </Typography>
                <ConnectAndPay />
            </Container>
        </Box>
    );
};

export default Payments;