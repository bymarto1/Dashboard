import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    Button,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
    const { onSidebarOpen } = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        auth.signout(() => navigate('/'));
    };

    const auth = useAuth();

    return (
        <>
            <DashboardNavbarRoot
                sx={{
                    left: {
                        lg: 280,
                    },
                    width: {
                        lg: 'calc(100% - 280px)',
                    },
                }}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: 64,
                        left: 0,
                        px: 2,
                    }}
                >
                    <IconButton
                        onClick={onSidebarOpen}
                        sx={{
                            display: {
                                xs: 'inline-flex',
                                lg: 'none',
                            },
                        }}
                    >
                        <MenuIcon fontSize='small' />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            p: 3,
                        }}
                    >
                        <Button
                            color='primary'
                            variant='outlined'
                            id='basic-button'
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup='true'
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            {auth.user}
                        </Button>
                    </Box>
                    <Menu
                        id='basic-menu'
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                p: 2,
                            }}
                        >
                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <LogoutIcon fontSize='small' />
                                </ListItemIcon>
                                <ListItemText>Log out</ListItemText>
                            </MenuItem>
                        </Box>
                    </Menu>
                </Toolbar>
            </DashboardNavbarRoot>
        </>
    );
};

DashboardNavbar.propTypes = {
    onSidebarOpen: PropTypes.func,
};
