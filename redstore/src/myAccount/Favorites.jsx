import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Grid, Box } from '@mui/material';
import ProductCard from '../ProductPage/ProductCard';

const Favorites = () => {
  const favorites = useSelector(state => state.products.favorites);

  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, py: { xs: 2, sm: 3 } }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          textAlign: { xs: 'center', sm: 'left' },
          fontWeight: 'bold',
          mb: { xs: 2, sm: 3 }
        }}
      >
        My Favorites
      </Typography>

      {favorites.length === 0 ? (
        <Typography
          variant="body1"
          sx={{
            mt: 2,
            textAlign: 'center',
            color: 'gray',
            fontSize: { xs: '14px', sm: '16px' },
          }}
        >
          No favorite products yet.
        </Typography>
      ) : (
        <Grid
          container
          spacing={{ xs: 2, sm: 3 }}
          justifyContent={{ xs: 'center', sm: 'flex-start' }}
        >
          {favorites.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard {...product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Favorites;
