import { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper, Avatar, Snackbar, Alert } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';

// Mock owner data
const mockProfile = {
  name: 'John Smith',
  unit: 'Building A-1801',
  phone: '13812345678',
  email: 'zhangsan@example.com',
  residentCount: 3,
  parkingSpace: 'A-123',
  moveInDate: '2022-01-01',
};

export default function Profile() {
  const [profile, setProfile] = useState(mockProfile);
  const [editing, setEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      // Will call the actual API here
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        setSnackbar({
          open: true,
          message: 'Saved successfully!',
          severity: 'success'
        });
        setEditing(false);
      } else {
        throw new Error('Save failed');
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Save failed, please try again later',
        severity: 'error'
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Resident Information
      </Typography>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Avatar sx={{ width: 100, height: 100 }}>
              <PersonIcon sx={{ fontSize: 60 }} />
            </Avatar>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={!editing}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Unit Number"
              name="unit"
              value={profile.unit}
              onChange={handleChange}
              disabled={!editing}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={!editing}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!editing}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Number of Residents"
              name="residentCount"
              type="number"
              value={profile.residentCount}
              onChange={handleChange}
              disabled={!editing}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Parking Space"
              name="parkingSpace"
              value={profile.parkingSpace}
              onChange={handleChange}
              disabled={!editing}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Move-in Date"
              name="moveInDate"
              type="date"
              value={profile.moveInDate}
              onChange={handleChange}
              disabled={!editing}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
            {!editing ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleEdit}
              >
                Edit Information
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setEditing(false);
                    setProfile(mockProfile);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}