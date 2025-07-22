import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Container,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ProductCard from '../ProductPage/ProductCard';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    axios
      .get('https://redstore-vcct.onrender.com/api/products?limit=8')
      .then(res => {
        setProducts(res.data.products || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
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
    <Box sx={{ py: 6, bgcolor: '#fff' }}>
      <Container>
        <Typography variant="h5" align="center" fontWeight="bold" mb={1}>
          Latest Products
        </Typography>
        <Box
          sx={{
            width: 100,
            height: 4,
            bgcolor: 'red',
            mx: 'auto',
            mb: 4,
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
              justifyContent:'center',
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
          // ✅ DESKTOP/TABLET GRID
          <Grid container spacing={3} justifyContent="center">
            {products.map((p) => (
              <Grid item key={p.id} xs={12} sm={6} md={3}>
                <ProductCard
                  id={p.id}
                  image={p.thumbnail}
                  title={p.title}
                  price={p.price}
                  rating={p.rating}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default LatestProducts;
