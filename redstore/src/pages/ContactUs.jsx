import React, { useState } from 'react';
import {
  TextField, Button, Box, Typography, Container, Card, CardMedia,
  Grid, Paper
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    description: '',
    image: null,
    contactNumber: '',
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'username':
        return value.trim() === '' ? 'Username is required' : '';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email';
      case 'contactNumber':
        return /^[0-9]{10}$/.test(value) ? '' : 'Contact must be 10 digits';
      case 'description':
        return value.trim() === '' ? 'Description is required' : '';
      case 'image':
        return value ? '' : 'Please upload an image';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));

    const error = validateField(name, newValue);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      newErrors[key] = validateField(key, value);
    });
    setErrors(newErrors);
    const hasError = Object.values(newErrors).some((error) => error !== '');
    if (hasError) {
      toast.error('Please Fill All The Fields Before Submitting.');
      return;
    }

    const existing = JSON.parse(localStorage.getItem('contactData')) || [];
    const newEntry = {
      ...formData,
      image: formData.image.name,
    };
    localStorage.setItem('contactData', JSON.stringify([...existing, newEntry]));

    toast.success('Form submitted successfully!');
    setFormData({
      username: '',
      email: '',
      description: '',
      image: null,
      contactNumber: '',
    });
    setErrors({});
    document.getElementById('imageInput').value = '';
  };

  return (
    <Box sx={{ background: '#f9f9f9', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          Connect with Our Team
        </Typography>
        <Typography align="center" mb={4}>
          Got a question? We'd love to hear from you.
        </Typography>

        {/* Main Layout - Two Side-by-Side Columns on Desktop */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            justifyContent: 'center',
          }}
        >
          {/* Left - Contact Form */}
          <Box sx={{ flex: 1 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Get in Touch with Us
              </Typography>
              <form onSubmit={handleSubmit} noValidate>
                <Box display="flex" flexDirection="column" gap={2}>
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.username)}
                    helperText={errors.username}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                  />
                  <TextField
                    fullWidth
                    label="Contact Number"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.contactNumber)}
                    helperText={errors.contactNumber}
                  />
                  <TextField
                    fullWidth
                    label="Subject / Description"
                    name="description"
                    multiline
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.description)}
                    helperText={errors.description}
                  />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Upload Image
                    </Typography>
                    <Box
                      sx={{
                        border: '2px dashed #ccc',
                        padding: 2,
                        borderRadius: 2,
                        textAlign: 'center',
                      }}
                    >
                      <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        name="image"
                        onChange={handleChange}
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="imageInput">
                        <Button
                          variant="outlined"
                          component="span"
                          startIcon={<CloudUploadIcon />}
                        >
                          Upload Image
                        </Button>
                      </label>
                      {formData.image && (
                        <Card sx={{ mt: 2 }}>
                          <CardMedia
                            component="img"
                            height="160"
                            image={URL.createObjectURL(formData.image)}
                            alt="Preview"
                            sx={{ objectFit: 'contain' }}
                          />
                        </Card>
                      )}
                      {errors.image && (
                        <Typography color="error" mt={1}>
                          {errors.image}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ backgroundColor: '#ff523b', color: '#fff', mt: 2 }}
                  >
                    Send Message
                  </Button>
                </Box>
              </form>
            </Paper>
          </Box>

          {/* Right - Contact Info */}
          <Box sx={{ flex: 1 , alignContent:'center', ml:2}}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact Details
            </Typography>
            <Typography mb={2}>
              Reach out to us using the information below or connect on social platforms.
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" gap={1}>
                  <LocationOnIcon color="error" />
                  <Box>
                    <Typography fontWeight="bold">Address</Typography>
                    <Typography>123 RedStore Lane, NY</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" gap={1}>
                  <PhoneAndroidIcon color="error" />
                  <Box>
                    <Typography fontWeight="bold">Mobile</Typography>
                    <Typography>(+91) 9876543210</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" gap={1}>
                  <AccessTimeIcon color="error" />
                  <Box>
                    <Typography fontWeight="bold">Availability</Typography>
                    <Typography>Mon - Sat | 9AM - 6PM</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" gap={1} ml={1}>
                  <EmailIcon color="error" />
                  <Box>
                    <Typography fontWeight="bold">Email</Typography>
                    <Typography>redstore@gmail.com</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Box mt={4}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Social Media:
              </Typography>
              <Box display="flex" gap={2} flexWrap="wrap">
                <FacebookIcon sx={{ color: '#3b5998', cursor: 'pointer' }} />
                <InstagramIcon sx={{ color: '#e1306c', cursor: 'pointer' }} />
                <TwitterIcon sx={{ color: '#1da1f2', cursor: 'pointer' }} />
                <LinkedInIcon sx={{ color: '#0a66c2', cursor: 'pointer' }} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
      <ToastContainer position="top-center" />
    </Box>
  );
};

export default ContactUs;
