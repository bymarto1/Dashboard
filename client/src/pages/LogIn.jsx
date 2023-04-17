import React, { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
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

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();
    let from = location.state?.from?.pathname || '/';

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await auth.signin(username, password, () => {
                navigate(from, { replace: true });
            });
        } catch (error) {
            setErrorMessage('Wrong credentials');
            setUsername('');
            setPassword('');
            setTimeout(() => {
                setErrorMessage(null);
            }, 2500);
        }
    };

    return (
        <Container maxWidth='sm'>
            {errorMessage && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity='error'>
                        Invalid credentials, please try again
                    </Alert>
                </Stack>
            )}
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                minHeight='100vh'
            >
                <Container maxWidth='sm'>
                    <form onSubmit={handleLogin}>
                        <Box sx={{ my: 3 }}>
                            <Typography color='textPrimary' variant='h4'>
                                Log in
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                pb: 1,
                                pt: 3,
                            }}
                        ></Box>
                        <TextField
                            fullWidth
                            label='username'
                            margin='normal'
                            name='username'
                            type='username'
                            variant='outlined'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label='password'
                            margin='normal'
                            name='password'
                            type='password'
                            variant='outlined'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Box sx={{ py: 2 }}>
                            <Button
                                color='primary'
                                fullWidth
                                size='large'
                                type='submit'
                                variant='contained'
                            >
                                <span>Log In</span> <LoginIcon></LoginIcon>
                            </Button>
                        </Box>
                    </form>
                    <Typography
                        variant='body2'
                        color='text.secondary'
                        align='center'
                        sx={{ mt: 8, mb: 4 }}
                    >
                        {'Copyright © '}
                        <Link color='inherit' href='#'>
                            NFT Dashboard
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Container>
            </Box>
        </Container>
    );
};

export default Login;
