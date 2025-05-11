import { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper, Snackbar, Alert, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Phone, Email, LocationOn, AccessTime } from '@mui/icons-material';

const contactInfo = [
  { icon: <Phone />, text: '24-Hour Service Hotline: 400-123-4567' },
  { icon: <Email />, text: 'Email: service@strata.com' },
  { icon: <LocationOn />, text: 'Property Management Office: Building A, 1st Floor Lobby' },
  { icon: <AccessTime />, text: 'Working Hours: Monday-Sunday 09:00-18:00' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    subject: '',
    message: ''
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSnackbar({
          open: true,
          message: 'Message submitted successfully! We will reply to you as soon as possible.',
          severity: 'success'
        });
        setFormData({
          name: '',
          contact: '',
          subject: '',
          message: ''
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
    <Box>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Property Management Information
            </Typography>
            <List>
              {contactInfo.map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Online Message
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <TextField
                fullWidth
                margin="normal"
                label="Contact Information"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                helperText="Please leave your phone number or email for us to contact you"
              />

              <TextField
                fullWidth
                margin="normal"
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />

              <TextField
                fullWidth
                margin="normal"
                label="Message Content"
                name="message"
                value={formData.message}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 2 }}
                fullWidth
              >
                Submit Message
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

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