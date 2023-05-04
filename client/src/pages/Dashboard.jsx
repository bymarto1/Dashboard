import React from 'react';
import {
    Avatar,
    Box,
    Button,
    Container,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography,
    Link,
    Alert,
    Stack,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import dashboardService from '../services/dashboard';
import TeamIcon from '@mui/icons-material/People';
import CrownIcon from '@mui/icons-material/EmojiEvents';
import PerformanceChart from '../components/performance-chart';

const Dashboard = () => {
    const [username, setUsername] = useState('');
    const [memberSince, setMemberSince] = useState('');
    const [blurTasks, setBlurTasks] = useState(0)
    const [teamCount, setTeamCount] = useState(0)
    const [owner, setOwner] = useState('');
    const [staffs, setStaffs] = useState([]);


    const [loading, setLoading] = useState(true);

    const auth = useAuth();

    useEffect(() => {
        dashboardService
            .getDashboardInfo(auth.token)
            .then((info) => {
                if (info ) {
                    const { username, memberSince, blurTaskCount , teamCount, staffs, owner} = info;
                    setUsername(username ? username : '');
                    setBlurTasks(blurTaskCount ? blurTaskCount : 0);
                    setTeamCount(teamCount ? teamCount : 0);
                    setStaffs(staffs ? staffs : []);
                    setOwner(owner ? owner : '');
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
  <Container maxWidth='lg'>
                <Box sx={{ mb: 4 }}>
                    <Typography variant='h5'>
                        Team ({teamCount} members):
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <CrownIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={owner} />
                        </ListItem>
                        {staffs.map((staff, index) => (
                            <ListItem key={index}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <TeamIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={staff} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Container> 
            <div className="App">
      <header className="App-header">
        <PerformanceChart />
      </header>
    </div> 
</Box>
      );
    }
    
  

export default Dashboard;
