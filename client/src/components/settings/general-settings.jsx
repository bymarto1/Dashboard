import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Typography,
    TextField,
    Alert,
    Stack,
    LinearProgress,
} from '@mui/material';

import { useState, useEffect } from 'react';

import dashboardService from '../../services/dashboard';
import { useAuth } from '../../hooks/useAuth';

export const GeneralSettings = () => {
    const [generalWebhook, setWebhook] = useState('');
    const [groupName, setGroupName] = useState('');
    const [groupImage, setGroupImage] = useState('');
    const [delay, setDelay] = useState('');
    const [alert, setAlert] = useState(false);
    const [loading, setLoading] = useState(true);

    const auth = useAuth();

    useEffect(() => {
        dashboardService
            .getCurrentConfig(auth.token)
            .then((config) => {
                if (config ) {
                    const { groupName, generalWebhook, generalDelay , groupImage } = config;
                    setWebhook(generalWebhook ? generalWebhook : '');
                    setGroupName(groupName ? groupName : '');
                    setDelay(generalDelay ? generalDelay : '');
                    setGroupImage(groupImage ? groupImage : '')
                }
            });
        setLoading(false);
    }, [auth.token]);
    const handleUpdateConfig = async () => {
        const body = { generalWebhook, groupName,groupImage,  delay };
        const response = await dashboardService.updateConfig(body, auth.token);
        if (response === 200) {
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 1500);
        }
    };

    return (
        <>
            {loading ? (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            ) : (
                <>
                    {alert && (
                        <Stack
                            justifyContent='center'
                            alignItems='center'
                            sx={{ width: '100%' }}
                            spacing={2}
                        >
                            <Alert severity='success'>
                                Successfully updated general config!
                            </Alert>
                        </Stack>
                    )}
                    <form>
                        <Card>
                            <CardHeader title='General settings' />
                            <Divider />
                            <CardContent>
                                <Typography
                                    color='textPrimary'
                                    gutterBottom
                                    variant='h6'
                                >
                                    Webhook
                                </Typography>
                                <TextField
                                    fullWidth
                                    value={generalWebhook}
                                    margin='normal'
                                    name='generalWebhook'
                                    variant='outlined'
                                    onChange={(e) => setWebhook(e.target.value)}
                                />
                                <Typography
                                    color='textPrimary'
                                    gutterBottom
                                    variant='h6'
                                >
                                    Group Name
                                </Typography>
                                <TextField
                                    fullWidth
                                    margin='normal'
                                    name='group-name'
                                    value={groupName}
                                    variant='outlined'
                                    onChange={(e) =>
                                        setGroupName(e.target.value)
                                    }
                                />
                                <Typography
                                    color='textPrimary'
                                    gutterBottom
                                    variant='h6'
                                >
                                    Group Image
                                </Typography>
                                <TextField
                                    fullWidth
                                    margin='normal'
                                    name='group-image'
                                    value={groupImage}
                                    variant='outlined'
                                    onChange={(e) =>
                                        setGroupImage(e.target.value)
                                    }
                                />
                                <Typography
                                    color='textPrimary'
                                    gutterBottom
                                    variant='h6'
                                >
                                    Delay
                                </Typography>
                                <TextField
                                    fullWidth
                                    margin='normal'
                                    name='delay'
                                    value={delay}
                                    variant='outlined'
                                    onChange={(e) => setDelay(e.target.value)}
                                />
                            </CardContent>
                            <Divider />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    p: 2,
                                }}
                            >
                                <Button
                                    color='primary'
                                    variant='contained'
                                    onClick={handleUpdateConfig}
                                >
                                    Save
                                </Button>
                            </Box>
                        </Card>
                    </form>
                </>
            )}
        </>
    );
};
