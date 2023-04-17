import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { GeneralSettings } from '../components/settings/general-settings';

const Settings = () => (
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
                    Settings
                </Typography>
                <GeneralSettings></GeneralSettings>
            </Container>
        </Box>
    </>
);

export default Settings;
