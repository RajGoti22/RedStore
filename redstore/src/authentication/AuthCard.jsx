import React, { useState } from 'react';
import {
  Box, Button, Grid, TextField, Typography,
  Paper, Checkbox, FormControlLabel, Snackbar,
  Alert, IconButton
} from '@mui/material';
import Cookies from 'js-cookie';
import CloseIcon from '@mui/icons-material/Close';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import authImage from '../assets/images/image1.png'; // Replace with your actual image path

const AuthCard = () => {
  const [mode, setMode] = useState('register'); // "register" or "login"
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false
  });
  const [errors, setErrors] = useState({});
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validate = () => {
    const err = {};
    if (mode === 'register') {
      if (!formData.name.trim()) err.name = 'Name is required';
      if (!formData.agree) err.agree = 'You must accept terms';
    }
    if (!formData.email.includes('@')) err.email = 'Valid email required';
    if (formData.password.length < 6) err.password = 'Min 6 characters';
    if (mode === 'register' && formData.password !== formData.confirmPassword)
      err.confirmPassword = 'Passwords must match';
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const { name, email } = formData;
    Cookies.set('user', JSON.stringify({ name, email }), { expires: 7 });

    setSnack({
      open: true,
      message: mode === 'register' ? 'Registered Successfully' : 'Logged In Successfully',
      severity: 'success',
    });

    setFormData({ name: '', email: '', password: '', confirmPassword: '', agree: false });
  };

  return (
    <Grid container justifyContent="center" alignItems="center" minHeight="100vh" sx={{ background: '#f8f8f8', p: 2 }}>
      <Paper elevation={3} sx={{
        maxWidth: 960,
        width: '100%',
        height: { xs: 'auto', md: 650 },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        overflow: 'hidden',
        borderRadius: 4,
        boxShadow: 6,
        p: 0
      }}>

        <Box
            sx={{
                width: { xs: '100%', md: '50%' },
                height: { xs: 200, md: '100%' },
                backgroundColor: '#ffecec',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,
            }}
            >
            <Box
                component="img"
                src={authImage}
                alt="auth"
                sx={{
                maxWidth: '90%',
                height: { xs: 160, md: 300 }, // Adjust image height as needed
                objectFit: 'contain'
                }}
            />
        </Box>


        {/* Right Form */}
        <Box sx={{
          width: { xs: '100%', md: '50%' },
          p: { xs: 3, md: 5 },
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight="bold" mb={3}>
              {mode === 'register' ? 'Create an account' : 'Welcome Back'}
            </Typography>
            {/* <IconButton onClick={() => setMode(mode === 'register' ? 'login' : 'register')}>
              <CloseIcon />
            </IconButton> */}
          </Box>

          <form onSubmit={handleSubmit}>
            {mode === 'register' && (
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth margin="dense"
                error={!!errors.name}
                helperText={errors.name}
              />
            )}

            <TextField
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth margin="dense"
              error={!!errors.email}
              helperText={errors.email}
            />

            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth margin="dense"
              error={!!errors.password}
              helperText={errors.password}
            />

            {mode === 'register' && (
              <TextField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                fullWidth margin="dense"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
            )}

            {mode === 'register' && (
              <FormControlLabel
                control={
                  <Checkbox
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    size="small"
                    sx={{ p: 0.5 }}
                  />
                }
                label={
                  <Typography variant="caption">
                    By registering your details, you agree with our <u>Terms & Conditions</u>, and <u>Privacy and Cookie Policy</u>.
                  </Typography>
                }
                sx={{ mt: 1 }}
              />
            )}
            {errors.agree && (
              <Typography variant="caption" color="error">{errors.agree}</Typography>
            )}

            <Box display="flex" justifyContent="space-between" mt={3} gap={2}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  backgroundColor: '#ff523b',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  ':hover': { bgcolor: '#563434' }
                }}
              >
                {mode === 'register' ? 'Register' : 'Sign In'}
              </Button>

              <Button
                variant="outlined"
                fullWidth
                onClick={() => setMode(mode === 'register' ? 'login' : 'register')}
                sx={{ textTransform: 'none', color:'#ff523b', borderColor:'#ff523b'}}
              >
                {mode === 'register' ? 'Sign In' : 'Register'}
              </Button>
            </Box>
          </form>

          {/* Social Sign In */}
          <Box mt={4} textAlign="center">
            <Typography variant="caption" color="text.secondary">
              Or {mode === 'register' ? 'sign up' : 'sign in'} with
            </Typography>
            <Box display="flex" justifyContent="center" gap={3} mt={1}>
              <IconButton><FacebookIcon sx={{ color: '#3b5998' }} /></IconButton>
              <IconButton><LinkedInIcon sx={{ color: '#0077b5' }} /></IconButton>
              <IconButton><GoogleIcon sx={{ color: '#db4437' }} /></IconButton>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert severity={snack.severity}>{snack.message}</Alert>
      </Snackbar>
    </Grid>
  );
};

export default AuthCard;
