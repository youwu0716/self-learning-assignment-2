import { useState } from 'react';
import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert, Card, CardContent, Grid } from '@mui/material';

const repairTypes = [
  'Plumbing & Electrical',
  'Doors & Windows',
  'Elevator Issues',
  'Air Conditioning',
  'Public Facilities',
  'Others'
];

export default function Repairs() {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    location: '',
    contactName: '',
    contactPhone: '',
    preferredTime: ''
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Will call the actual API here
      const response = await fetch('/api/repairs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSnackbar({
          open: true,
          message: 'Maintenance request submitted successfully!',
          severity: 'success'
        });
        // Reset form
        setFormData({
          type: '',
          description: '',
          location: '',
          contactName: '',
          contactPhone: '',
          preferredTime: ''
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Submission failed, please try again later',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Maintenance Request
      </Typography>
      <Card>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Maintenance Type</InputLabel>
                  <Select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    label="Maintenance Type"
                  >
                    {repairTypes.map((type) => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Issue Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={6}
                  required
                  sx={{ '& .MuiOutlinedInput-root': { fontSize: '1rem' } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contact Name"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contact Phone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Preferred Time"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  placeholder="e.g., Weekdays 9 AM - 12 PM"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  Submit Request
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

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