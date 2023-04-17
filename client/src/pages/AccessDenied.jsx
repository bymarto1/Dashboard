import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';

const AccessDenied = () => {
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
                    Access denied
                </Typography>
            </Container>
        </Box>
    );
};

export default AccessDenied;
