import React, { useEffect, useState } from 'react';
import { Box, Container, LinearProgress , Stack, Alert} from '@mui/material';
import { BlurListingToolbar } from '../../components/collection-toolbars/blurlisting';
import CollectionsList from '../../components/collections-list';
import blurService from '../../services/blur';
import { useAuth } from '../../hooks/useAuth';

const fields = [
    'collection name',
    'max price',
    'webhook',
    'rarity',
    'min rarity',
    ''
];

const BlurListing = () => {
    const [collections, setCollections] = useState([]);
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(false)
    const auth = useAuth();

    const handleCallback = (state) => {
        if (state) setUpdate(true);
    };
    const handleRemoveCollection = async (collectionId) => {
        const response = await blurService.deleteOldListingTask(collectionId, auth.token);
        if (response === 204) {
            window.location.reload()
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 1500);
        }
    };
    useEffect(() => {
        blurService.getAllListingTasks(auth.token).then((response) => {
            setCollections(response);
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
          Successfully removed collection!
        </Alert>
      </Stack>
    </Box>
  )}
  <Container maxWidth='lg'>
    <BlurListingToolbar token={auth.token} callback={handleCallback} />
    <Box sx={{ mt: 3 }}>
      {/* Wrap the CollectionsList component in a relative-positioned box */}
      <Box sx={{ position: 'relative' }}>
        <CollectionsList
          collections={collections}
          headFields={fields}
          handleRemoveCollection={handleRemoveCollection}
        />
      </Box>
    </Box>
  </Container>
</Box>
    )}
  </>
);
          };
export default BlurListing;
