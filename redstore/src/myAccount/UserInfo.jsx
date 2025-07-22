import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
  Paper
} from '@mui/material';

import Cookies from 'js-cookie';
const user = Cookies.get('user');
const parsed = user ? JSON.parse(user) : null;

const UserInfo = () => {
  const [profile, setProfile] = useState({
    name: 'Raj',
    fullName: 'Rameshbhai Goti',
    email: 'raj@example.com',
    phone: '+91 9876543210',
    location: 'Surat, Gujarat',
    postal: '395007',
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log('Saved:', profile);
    // Optionally show a toast or snackbar
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
      <Box textAlign="center" mb={4}>
        <Avatar
          src="https://i.pravatar.cc/150?img=12"
          alt="Profile"
          sx={{ width: 100, height: 100, margin: '0 auto', mb: 1 }}
        />
        <Typography variant="h6" fontWeight="bold">
          {profile.name} {profile.fullName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {profile.location}
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={2} sx={{justifyContent:'center'}}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={profile.location}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Postal Code"
            name="postal"
            value={profile.postal}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Box mt={4} textAlign="center">
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            px: 2,
            py: 1,
            fontSize: '16px',
            backgroundColor: '#ff5e3a',
            '&:hover': { backgroundColor: '#e24727' },
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Paper>
  );
};

export default UserInfo;
