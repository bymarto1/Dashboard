import React, { useEffect, useState } from 'react';
import { Box, Container, LinearProgress , Stack, Alert} from '@mui/material';
import TeamsList from '../components/team-list';
import StaffToolbar from '../components/team-toolbars/staff';
import teamService from '../services/team';
import { useAuth } from '../hooks/useAuth';

const fields = [
    'Username',
    'Discord',
    'Since',

    ''
];

const TeamList = () => {
    const [staffs, setStaffs] = useState([]);
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(false)
    const auth = useAuth();

    const handleCallback = (state) => {
        if (state) setUpdate(true);
    };
    const handleRemoveStaff = async (staffId) => {
        const response = await teamService.deleteOldStaffTask(staffId, auth.token);
        if (response === 204) {
            window.location.reload()
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 1500);
        }
    };
    useEffect(() => {
        teamService.getAllStaffTask(auth.token).then((response) => {
            setStaffs(response);
            setUpdate(false);
            setLoading(false);
        });
    }, [update, auth.token]);

    return (
  <>
    {loading ? (
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      </Box>
    ) : (
<Box
  component='main'
  sx={{
    flexGrow: 1,
    py: 8,
    position: 'relative', // Set the parent container to relative position
  }}
>
  {alert && (
    <Box
      sx={{
        position: 'absolute', // Set the alert container to absolute position
        top: '64px', // Adjust the top spacing as needed
        left: '0',
        right: '0',
        margin: 'auto', // Center the alert horizontally
        zIndex: '1', // Set a higher z-index to show the alert on top
      }}
    >
      <Stack
        justifyContent='center'
        alignItems='center'
        sx={{ width: '100%' }}
        spacing={2}
      >
        <Alert severity='success'>
          Successfully removed staff!
        </Alert>
      </Stack>
    </Box>
  )}
  <Container maxWidth='lg'>
    <StaffToolbar token={auth.token} callback={handleCallback} />
    <Box sx={{ mt: 3 }}>
      {/* Wrap the CollectionsList component in a relative-positioned box */}
      <Box sx={{ position: 'relative' }}>
        <TeamsList
          staffs={staffs}
          headFields={fields}
          handleRemove
          handleRemoveStaff={handleRemoveStaff}
        />
      </Box>
    </Box>
  </Container>
</Box>
    )}
  </>
);
          };
export default TeamList;
