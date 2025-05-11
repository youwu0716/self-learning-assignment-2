import { useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

// Mock announcement data
const mockAnnouncements = [
  {
    id: 1,
    title: 'Notice of Elevator Maintenance',
    date: '2024-02-20',
    content: 'To ensure the safe operation of the community elevators, we will conduct routine maintenance this Saturday. Maintenance time: 9:00 AM - 12:00 PM. During this period, the elevators will be out of service. Please plan your travel accordingly.'
  },
  {
    id: 2,
    title: 'Property Fee Payment Reminder',
    date: '2024-02-18',
    content: 'Dear residents, the property management fee for Q1 2024 will be collected starting March 1st. Please make the payment on time. If you have any questions, please contact the property management office.'
  },
  {
    id: 3,
    title: 'Notice of Landscape Renovation Project',
    date: '2024-02-15',
    content: 'To improve our community environment, we will begin upgrading the landscaping areas next week. The project is expected to last for two weeks. There may be some noise during this period. We appreciate your understanding.'
  },
];

export default function Announcements() {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const handleOpenDialog = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  const handleCloseDialog = () => {
    setSelectedAnnouncement(null);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Property Announcements
      </Typography>
      <Grid container spacing={3}>
        {mockAnnouncements.map((announcement) => (
          <Grid item xs={12} md={6} key={announcement.id}>
            <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => handleOpenDialog(announcement)}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {announcement.title}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  Published Date: {announcement.date}
                </Typography>
                <Typography noWrap>
                  {announcement.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={Boolean(selectedAnnouncement)} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {selectedAnnouncement && (
          <>
            <DialogTitle>{selectedAnnouncement.title}</DialogTitle>
            <DialogContent>
              <Typography color="text.secondary" gutterBottom>
                Published Date: {selectedAnnouncement.date}
              </Typography>
              <Typography style={{ whiteSpace: 'pre-wrap' }}>
                {selectedAnnouncement.content}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}