import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import image from '../assets/images/image1.png';
import FeaturedCategories from '../homecomponent/FeaturedCategories';
import FeaturedProducts from '../homecomponent/FeaturedProducts';
import LatestProducts from '../homecomponent/latestproduct';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {/* Hero Section */}
      <Box sx={{ background: 'radial-gradient(#fff, #ffd6d6)', py: 6 }}>
        <Container maxWidth="lg">
          <Grid
            container
            spacing={4}
            alignItems="center"
            direction={isMobile ? 'column-reverse' : 'row'}
          >
            {/* Text Section */}
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: isMobile ? 'center' : 'left', px: isMobile ? 1 : 2 }}>
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '26px', sm: '32px', md: '42px' },
                    lineHeight: 1.3,
                    mb: 2,
                  }}
                >
                  Give Your Workout <br /> A New Style!
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: '#555',
                    fontSize: { xs: '14px', sm: '16px' },
                    lineHeight: 1.7,
                    mb: 4,
                  }}
                >
                  Success isn't always about greatness. It's about consistency. <br />
                  Consistent hard work gains success. Greatness will come.
                </Typography>

                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate('/Products')}
                  sx={{
                    backgroundColor: '#ff523b',
                    color: '#fff',
                    borderRadius: '30px',

                    px: 3.5,
                    py: 1,
                    fontSize: '16px',
                    fontWeight: 450,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#563434',
                    },
                  }}
                >
                  Explore Now
                </Button>
              </Box>
            </Grid>

            {/* Image Section */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  px: isMobile ? 2 : 4,
                }}
              >
                <Box
                  component="img"
                  src={image}
                  alt="Workout"
                  sx={{
                    width: '100%',
                    maxWidth: '400px',
                    height: 'auto',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Product Sections */}
      <Box>
        <FeaturedCategories />
        <FeaturedProducts />
        <LatestProducts />
      </Box>
    </>
  );
};

export default Home;
