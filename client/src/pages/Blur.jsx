import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Blur = () => (
    <>
        <Box
            component='main'
            sx={{
                flexGrow: 1,
                py: 8,
            }}
        >
            <Container maxWidth='lg'>
                <Typography sx={{ mb: 3 }} variant='h4'>
                    Blur
                </Typography>
            </Container>
        </Box>
    </>
);

export default Blur;
