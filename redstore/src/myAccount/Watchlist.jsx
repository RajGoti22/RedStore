import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Grid, Box } from '@mui/material';
import ProductCard from '../ProductPage/ProductCard';

const Watchlist = () => {
  const watchlist = useSelector(state => state.products.watchlist);

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
        My Watchlist
      </Typography>

      {watchlist.length === 0 ? (
        <Typography
          variant="body1"
          sx={{
            mt: 2,
            textAlign: 'center',
            color: 'gray',
            fontSize: { xs: '14px', sm: '16px' },
          }}
        >
          No products in watchlist.
        </Typography>
      ) : (
        <Grid
          container
          spacing={{ xs: 2, sm: 3 }}
          justifyContent={{ xs: 'center', sm: 'flex-start' }}
        >
          {/* {watchlist.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard {...product} />
            </Grid>
          ))} */}
          {watchlist.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard
                {...product}
                image={product.image || product.thumbnail || (product.images && product.images[0])}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Watchlist;
