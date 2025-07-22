import React from 'react';
import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  Divider,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import playStore from '../assets/images/play-store.png';
import appStore from '../assets/images/app-store.png';
import logoWhite from '../assets/images/logo-white.png';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        backgroundColor: '#000',
        color: '#fff',
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 5, sm: 6 },
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {/* Column 1: Download App */}
        <Grid item xs={12} sm={6} md={3} textAlign={isMobile ? 'center' : 'left'}>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ textAlign: isMobile ? 'center' : 'left' }}
          >
            Download Our App
          </Typography>
          <Typography
            variant="body2"
            color="gray"
            gutterBottom
            sx={{ px: isMobile ? 2 : 0 }}
          >
            Download App for Android and iOS mobile phones.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              mt: 2,
              justifyContent: isMobile ? 'center' : 'flex-start',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'center' : 'flex-start',
            }}
          >
            <img src={playStore} alt="Google Play" style={{ width: 120 }} />
            <img src={appStore} alt="App Store" style={{ width: 120 }} />
          </Box>
        </Grid>

        {/* Column 2: Logo and Purpose */}
        <Grid item xs={12} sm={6} md={3} textAlign="center">
          <Box
            display="flex"
            justifyContent="center"
            mb={isMobile ? 1 : 2}
          >
            <img
              src={logoWhite}
              alt="RedStore Logo"
              style={{ height: 50 }}
            />
          </Box>
          <Typography
            variant="body2"
            color="gray"
            sx={{ px: isMobile ? 3 : 1 }}
          >
            Our Purpose is to sustainably make the pleasure and benefits of sports accessible to the many.
          </Typography>
        </Grid>

        {/* Column 3: Useful Links */}
        <Grid item xs={12} sm={6} md={3} textAlign={isMobile ? 'center' : 'left'}>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ textAlign: isMobile ? 'center' : 'left' }}
          >
            Useful Links
          </Typography>
          <List sx={{ color: 'gray', py: 0 }}>
            {['Coupons', 'Blog', 'Return Policy', 'Join Affiliate'].map((text, index) => (
              <ListItem
                key={index}
                sx={{
                  py: 0.5,
                  justifyContent: isMobile ? 'center' : 'flex-start',
                  textAlign: isMobile ? 'center' : 'left',
                }}
              >
                {text}
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* Column 4: Follow Us */}
        <Grid item xs={12} sm={6} md={3} textAlign={isMobile ? 'center' : 'left'}>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ textAlign: isMobile ? 'center' : 'left' }}
          >
            Follow Us
          </Typography>
          <List sx={{ color: 'gray', py: 0 }}>
            {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((text, index) => (
              <ListItem
                key={index}
                sx={{
                  py: 0.5,
                  justifyContent: isMobile ? 'center' : 'flex-start',
                  textAlign: isMobile ? 'center' : 'left',
                }}
              >
                {text}
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>

      <Divider sx={{ backgroundColor: 'gray', my: 4 }} />

      <Typography align="center" variant="body2" color="gray">
        © 2025 - Raj Goti. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
