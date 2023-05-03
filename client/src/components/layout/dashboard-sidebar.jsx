import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, useMediaQuery } from '@mui/material';
import { NavItem } from './nav-item';
import { Logo } from './logo';
import { useLocation, Link } from 'react-router-dom';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import GroupsIcon from '@mui/icons-material/Groups';
import { Blur } from '../../icons/blur';
import { Blank } from '../../icons/blank';
import React from 'react';

const general = [
    {  
        href: '/',
        icon: <BarChartIcon />,
        title: 'Dashboard',
    },
    {
        href: '/settings',
        icon: <SettingsIcon />,
        title: 'Settings',
    },
    {
        href: '/payment',
        icon: <AccountBalanceWalletIcon />,
        title: 'Payments',
    },
    {
        href: '/team',
        icon: <GroupsIcon />,
        title: 'Team',
    },
];

const blur = [
    {
        href: '/blur',
        icon: <Blur />,
        title: 'Blur',
    },
    {
        href: '/blur/listing',
        icon: <Blank />,
        title: 'Listing',
    }
];


export const DashboardSidebar = (props) => {
    const { open, onClose } = props;
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
        defaultMatches: true,
        noSsr: false,
    });
    const location = useLocation();

    useEffect(() => {
        if (open) {
            onClose?.();
        }
    }, [location.pathname]);

    const content = (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}
            >
                <div>
                    <Box sx={{ p: 3 }}>
                        <Link to='/'>
                            <Logo
                                sx={{
                                    height: 42,
                                    width: 42,
                                }}
                            />
                        </Link>
                    </Box>
                </div>
                <Divider
                    sx={{
                        borderColor: '#2D3748',
                        my: 3,
                    }}
                />
                <Box sx={{ flexGrow: 0 }}>
                    {general.map((item) => (
                        <NavItem
                            key={item.title}
                            icon={item.icon}
                            href={item.href}
                            title={item.title}
                        />
                    ))}
                </Box>
                <Divider
                    sx={{
                        borderColor: '#2D3748',
                        my: 3,
                    }}
                />
                <Box sx={{ flexGrow: 0 }}>
                    {blur.map((item) => (
                        <NavItem
                            key={item.title}
                            icon={item.icon}
                            href={item.href}
                            title={item.title}
                        />
                    ))}
                </Box>
                <Divider
                    sx={{
                        borderColor: '#2D3748',
                        my: 3,
                    }}
                />

            </Box>
        </>
    );

    if (lgUp) {
        return (
            <Drawer
                anchor='left'
                open
                PaperProps={{
                    sx: {
                        backgroundColor: 'neutral.900',
                        color: '#FFFFFF',
                        width: 280,
                    },
                }}
                variant='permanent'
            >
                {content}
            </Drawer>
        );
    }

    return (
        <Drawer
            anchor='left'
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: 'neutral.900',
                    color: '#FFFFFF',
                    width: 280,
                },
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant='temporary'
        >
            {content}
        </Drawer>
    );
};

DashboardSidebar.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
};
