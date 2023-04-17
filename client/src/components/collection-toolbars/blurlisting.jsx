import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Modal,
    Card,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    FormControlLabel,
    Checkbox,
    Grid,
} from '@mui/material';
import blurService from '../../services/blur';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    // flexGrow: 1,
    // py: 8,
};

export const BlurListingToolbar = (props) => {
    const { token, callback } = props;
    const [open, setOpen] = useState(false);
    const [collectionSlug, setCollectionName] = useState('');
    const [maxPrice, setMaxPrice] = useState(null);
    const [minRarity, setMinRarity] = useState(null);
    const [rarity, setRarity] = useState(false);
    const [webhook, setWebhook] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleAddCollection = async () => {
        const response = await blurService.addNewListingTask(
            {
                collectionSlug,
                maxPrice,
                minRarity,
                rarity,
                webhook,
            },
            token
        );
        setRarity(false);

        if (response === 201) {
            callback(true);
        }
        handleClose();
    };

    return (
        <Box>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    m: -1,
                }}
            >
                <Typography sx={{ m: 1 }} variant='h4'>
                    Listing
                </Typography>
                <Box sx={{ m: 1 }}>
                    <Button
                        color='primary'
                        variant='contained'
                        onClick={handleOpen}
                    >
                        Add New Collection
                    </Button>
                </Box>
                <Modal open={open} onClose={handleClose}>
                    <form>
                        <Card sx={style}>
                            <CardHeader
                                sx={{ textAlign: 'center' }}
                                title='New Collection'
                            />
                            <CardContent>
                                <TextField
                                    fullWidth
                                    margin='normal'
                                    variant='outlined'
                                    name='collectionSlug'
                                    label='Collection Slug'
                                    onChange={(e) =>
                                        setCollectionName(e.target.value)
                                    }
                                />
                                <TextField
                                    fullWidth
                                    margin='normal'
                                    variant='outlined'
                                    name='maxPrice'
                                    label='Max Price (ETH)'
                                    onChange={(e) =>
                                        setMaxPrice(e.target.value)
                                    }
                                />
                                <TextField
                                    fullWidth
                                    margin='normal'
                                    variant='outlined'
                                    name='minRarity'
                                    label='Min Rarity (0-100)'
                                    onChange={(e) =>
                                        setMinRarity(e.target.value)
                                    }
                                />
                                <TextField
                                    fullWidth
                                    margin='normal'
                                    variant='outlined'
                                    name='webhook'
                                    label='Webhook'
                                    onChange={(e) => setWebhook(e.target.value)}
                                />
                                <Grid container spacing={6} wrap='wrap'>
                                    <Grid item xs={12}>
                                        <Typography
                                            color='textPrimary'
                                            gutterBottom
                                            variant='h6'
                                        >
                                            Miscellaneous
                                        </Typography>
                                        <FormControlLabel
                                            control={
                                                <Checkbox color='primary' />
                                            }
                                            label='Rarity'
                                            onChange={(e) => setRarity(!rarity)}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Divider />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    p: 3,
                                }}
                            >
                                <Button
                                    color='primary'
                                    variant='contained'
                                    onClick={handleAddCollection}
                                >
                                    Save
                                </Button>
                            </Box>
                        </Card>
                    </form>
                </Modal>
            </Box>
        </Box>
    );
};
