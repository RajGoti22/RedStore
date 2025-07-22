import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ProductCard from '../ProductPage/ProductCard';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // below 600px

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/products?limit=4')
      .then(res => {
        setProducts(res.data.products || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load featured products');
        setLoading(false);
      });
  }, []);

  const sliderSettings = {
    dots: false,            // ✅ Hide bottom dots
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    centerMode: true,       // ✅ Center the current slide
    centerPadding: '0px'    // ✅ Remove left/right padding
  };

  return (
    <Box
      sx={{
        py: { xs: 4, sm: 6 },
        px: { xs: 2, sm: 4 },
        backgroundColor: '#fff',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: { xs: '20px', sm: '24px' },
          mb: 1,
        }}
      >
        Featured Products
      </Typography>

      <Box
        sx={{
          width: 100,
          height: 4,
          backgroundColor: 'red',
          margin: '0 auto 40px auto',
          borderRadius: 2,
        }}
      />

      {loading ? (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      ) : isMobile ? (
        // ✅ FULLY CENTERED MOBILE SLIDER
        <Box sx={{ width: '100%' }}>
          <Slider {...sliderSettings}>
            {products.map((p) => (
              <Box
                key={p.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  py: 2,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    maxWidth: 340,
                    width: '90%',
                    mx: 'auto',
                  }}
                >
                  <ProductCard
                    id={p.id}
                    image={p.thumbnail}
                    title={p.title}
                    price={p.price}
                    rating={p.rating}
                  />
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {products.map(product => (
            <Grid
              item
              key={product.id}
              xs={12}
              sm={6}
              md={3} // 4 columns on desktop
              display="flex"
              justifyContent="center"
            >
              <ProductCard
                id={product.id}
                image={product.thumbnail}
                title={product.title}
                price={product.price}
                rating={product.rating}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FeaturedProducts;
