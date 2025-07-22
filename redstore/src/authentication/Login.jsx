import React, { useState, useEffect } from 'react';
import {
  Box, Button, Grid, TextField, Typography,
  Paper, Snackbar, Alert, IconButton, useMediaQuery
} from '@mui/material';
import Cookies from 'js-cookie';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useNavigate } from 'react-router-dom';
import authImage from '../assets/images/image1.png';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const existingUser = Cookies.get('user');
    if (existingUser) navigate('/');
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const err = {};
    if (!formData.email.includes('@')) err.email = 'Valid email required';
    if (formData.password.length < 6) err.password = 'Min 6 characters';
    return err;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    const storedUser = JSON.parse(localStorage.getItem('registeredUser'));
    if (!storedUser || storedUser.email !== formData.email || storedUser.password !== formData.password) {
      setSnack({ open: true, message: 'Invalid email or password', severity: 'error' });
      return;
    }

    Cookies.set('user', JSON.stringify({ email: formData.email }), { expires: 7 });
    setSnack({ open: true, message: 'Logged In Successfully', severity: 'success' });
    setTimeout(() => navigate('/'), 1000);
  };

  return (
    <Grid container justifyContent="center" alignItems={"center"} minHeight="90vh" sx={{ background: '#f8f8f8', p: 2  }}>
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 960,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          borderRadius: 4,
          overflow: 'hidden'
        }}
      >
        {/* Show image always - top on mobile, left on desktop */}
        <Box
          sx={{
            width: { xs: 'auto', md: '50%' },
            height: { xs: 200, sm: 250, md: 'auto' },
            backgroundColor: '#ffecec',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
          }}
        >
          <Box
            component="img"
            src={authImage}
            alt="Login visual"
            sx={{
              width: '100%',
              maxWidth: 380,
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </Box>


        {/* Login Form */}
        <Box
          sx={{
            width: { xs: 'auto', md: '50%' },
            px: { xs: 3, md: 6 },
            py: { xs: 4, md: 6 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
            Welcome Back
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ width: '100%', maxWidth: { xs: '100%', sm: 420 } }}
          >
            <TextField
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="dense"
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="dense"
              error={!!errors.password}
              helperText={errors.password}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                bgcolor: '#ff523b',
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': { bgcolor: '#e14a2a' }
              }}
            >
              Sign In
            </Button>
          </Box>

          {/* Sign-up Link */}
          <Typography
            onClick={() => navigate('/register')}
            sx={{
              mt: 2,
              fontSize: 13,
              color: '#ff523b',
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline', color: '#d93b2d' }
            }}
          >
            New User?
          </Typography>

          {/* Social login */}
          <Box textAlign="center" mt={4}>
            <Typography variant="caption" color="text.secondary">
              Or sign in with
            </Typography>
            <Box display="flex" justifyContent="center" gap={3} mt={1}>
              <IconButton><FacebookIcon sx={{ color: '#3b5998' }} /></IconButton>
              <IconButton><LinkedInIcon sx={{ color: '#0077b5' }} /></IconButton>
              <IconButton><GoogleIcon sx={{ color: '#db4437' }} /></IconButton>
            </Box>
          </Box>
        </Box>
      </Paper>

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

export default Login;
