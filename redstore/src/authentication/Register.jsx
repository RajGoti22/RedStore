import React, { useState, useEffect } from 'react';
import {
  Box, Button, Grid, TextField, Typography,
  Paper, Snackbar, Alert, IconButton, FormControlLabel, Checkbox, useMediaQuery
} from '@mui/material';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import authImage from '../assets/images/image1.png';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '', agree: false
  });
  const [errors, setErrors] = useState({});
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const loggedIn = Cookies.get('user');
    if (loggedIn) {
      navigate('/');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const validate = () => {
    const err = {};
    if (!formData.name.trim()) err.name = 'Name is required';
    if (!formData.email.includes('@')) err.email = 'Valid email required';
    if (formData.password.length < 6) err.password = 'Min 6 characters';
    if (formData.password !== formData.confirmPassword) err.confirmPassword = 'Passwords must match';
    if (!formData.agree) err.agree = 'You must accept terms';
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const userToSave = { name: formData.name, email: formData.email, password: formData.password };
    localStorage.setItem('registeredUser', JSON.stringify(userToSave));

    setSnack({ open: true, message: 'Registered Successfully', severity: 'success' });
    setTimeout(() => navigate('/login'), 1000);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" minHeight="90vh" sx={{ background: '#f8f8f8', p: 2 }}>

      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 960,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          borderRadius: 4,
          overflow: 'hidden',
          mt: 4
        }}
      >

        {/* Image Section - Visible on both mobile and desktop */}
        <Box
          sx={{
            width: { xs: 'auto', md: '50%' },
            height: { xs: 200, sm: 250, md: 'auto' },
            backgroundColor: '#ffecec',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
          }}>
          <Box
            component="img"
            src={authImage}
            alt="auth"
            sx={{
              width: '100%',
              maxHeight: 380,
              objectFit: 'contain'
            }}
          />
        </Box>

        {/* Form Section */}
        <Box sx={{
          width: { xs: 'auto', md: '50%' },
          p: { xs: 3, md: 5 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#fff'
        }}>
          <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
            Create an Account
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField label="Name" name="name" value={formData.name}
              onChange={handleChange} fullWidth margin="dense"
              error={!!errors.name} helperText={errors.name} />

            <TextField label="Email Address" name="email" value={formData.email}
              onChange={handleChange} fullWidth margin="dense"
              error={!!errors.email} helperText={errors.email} />

            <TextField label="Password" type="password" name="password"
              value={formData.password} onChange={handleChange}
              fullWidth margin="dense" error={!!errors.password}
              helperText={errors.password} />

            <TextField label="Confirm Password" type="password" name="confirmPassword"
              value={formData.confirmPassword} onChange={handleChange}
              fullWidth margin="dense" error={!!errors.confirmPassword}
              helperText={errors.confirmPassword} />

            <FormControlLabel
              control={<Checkbox name="agree" checked={formData.agree} onChange={handleChange} size="small" />}
              label={<Typography variant="caption">I agree to <u>Terms</u> and <u>Privacy Policy</u></Typography>}
            />
            {errors.agree && <Typography variant="caption" color="error">{errors.agree}</Typography>}

            <Button type="submit" fullWidth variant="contained"
              sx={{
                mt: 3,
                bgcolor: '#ff523b',
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#e14a2a'
                }
              }}>
              Register
            </Button>
          </form>

          <Box mt={4} textAlign="center">
            <Typography variant="caption" color="text.secondary">Or sign up with</Typography>
            <Box display="flex" justifyContent="center" gap={3} mt={1}>
              <IconButton><FacebookIcon sx={{ color: '#3b5998' }} /></IconButton>
              <IconButton><LinkedInIcon sx={{ color: '#0077b5' }} /></IconButton>
              <IconButton><GoogleIcon sx={{ color: '#db4437' }} /></IconButton>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert severity={snack.severity}>{snack.message}</Alert>
      </Snackbar>
    </Grid>
  );
};

export default Register;
