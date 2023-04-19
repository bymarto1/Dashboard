import React from 'react';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Link,
    Alert,
    Stack,
} from '@mui/material';
import { useState, useEffect} from 'react';
import { useAuth } from '../hooks/useAuth';
import dashboardService from '../services/dashboard';

const Dashboard = () => {
    const [username, setUsername] = useState('');
    const [memberSince, setMemberSince] = useState('');
    const [blurTasks, setBlurTasks] = useState(0)
    const [loading, setLoading] = useState(true);

    const auth = useAuth();

    useEffect(() => {
        dashboardService
            .getDashboardInfo(auth.token)
            .then((info) => {
                if (info ) {
                    const { username, memberSince, expiryDate, blurTaskCount } = info;
                    setUsername(username ? username : '');
                    setBlurTasks(blurTaskCount ? blurTaskCount : 0);
                    // Check if memberSince is a valid date
                    if (memberSince && !isNaN(new Date(memberSince))) {
                        setMemberSince(new Date(memberSince).toLocaleDateString());
                    } else {
                        setMemberSince('');
                    }
            


                }
            });
        setLoading(false);
    }, [auth.token]);

    return (
<Box
  component='main'
  sx={{
    flexGrow: 1,
    py: 8,
    position: 'relative',
  }}
>
  <Container maxWidth='lg'>
    <Typography sx={{ mb: 3 }} variant='h4'>
      Dashboard
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant='h5'>Username:</Typography>
        <Typography variant='h6'>{username}</Typography>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant='h5'>Monitor Tasks Running:</Typography>
        <Typography variant='h6'>{blurTasks}</Typography>
      </Box>
    </Box>
    <Box sx={{ mb: 4 }}>
      <Typography variant='h5'>Member Since:</Typography>
      <Typography variant='h6'>{memberSince}</Typography>
    </Box>
  </Container>
</Box>
      );
    }
    
  

export default Dashboard;
