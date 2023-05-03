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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import teamService from '../../services/team';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

const StaffToolbar = (props) => {
  const { token, callback } = props;
  const [open, setOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [username, setUsername] = useState('');
  const [discord, setDiscord] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddStaff = async () => {
    const response  = await teamService.addNewStaffTask(
      {
        username,
        discord,
      },
      token
    );
    console.log(response.toString());
    if (response.status === 201) {
      setGeneratedPassword(response.data.password);
      setShowDialog(true);
    }
    handleClose();

  };
  const StaffInfoDialog = () => (
    <Dialog
      open={showDialog}
      onClose={() => setShowDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Staff Information</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <span style={{ display: 'block' }}>
            <strong>Username:</strong> {username}
          </span>
          <span style={{ display: 'block' }}>
            <strong>Discord:</strong> {discord}
          </span>
          <span style={{ display: 'block' }}>
            <strong>Password:</strong> {generatedPassword}
          </span>
          <span style={{ display: 'block' }}>Please save this password, as it won't be shown again.</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowDialog(false)} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
  
  
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
                Staffs
            </Typography>
            <StaffInfoDialog onDialogClose={callback}/>

            <Box sx={{ m: 1 }}>
                <Button
                    color='primary'
                    variant='contained'
                    onClick={handleOpen}
                >
                    Add New Staff
                </Button>
            </Box>
            <Modal open={open} onClose={handleClose}>
                <form>
                    <Card sx={style}>
                        <CardHeader
                            sx={{ textAlign: 'center' }}
                            title='New Staff'
                        />
                        <CardContent>
                            <TextField
                                fullWidth
                                margin='normal'
                                variant='outlined'
                                name='Staff Username'
                                label='Username'
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                            />
                            <TextField
                                fullWidth
                                margin='normal'
                                variant='outlined'
                                name='Discord tag'
                                label='Discord tag'
                                onChange={(e) =>
                                    setDiscord(e.target.value)
                                }
                            />

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
                                onClick={handleAddStaff}
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
export default StaffToolbar;
