import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Dashboard = () => {
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
            </Container>
        </Box>
    );
};

export default Dashboard;
