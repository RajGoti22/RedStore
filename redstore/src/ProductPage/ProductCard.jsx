import React, { useState } from 'react';
import {
  Card, CardActionArea, CardMedia, CardContent,
  Typography, Box, Button, IconButton, Snackbar
} from '@mui/material';
import {
  Star, StarBorder,
  FavoriteBorder, Favorite
} from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../cart/cartSlice';
import { toggleFavorite } from '../features/products/productsSlice';

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const ProductCard = ({ id, image, title, price, rating }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.products.favorites);
  const isFav = favorites.some(p => p.id === id);

  const [openToast, setOpenToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const handleAdd = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const item = { id, image, title, price };
    dispatch(addToCart(item));
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const product = { id, image, title, price, rating };
    dispatch(toggleFavorite(product));
    setToastMsg(isFav ? 'Removed from Favorites' : 'Added to Favorites');
    setOpenToast(true);
  };

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setOpenToast(false);
  };

  return (
    <>
      <Card
        sx={{
          width: 250,
          height: 420,
          m: 1,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          textDecoration: 'none', 
          color: 'inherit', 
          '&:hover': {
          textDecoration: 'none', 
          }
        }}
        component={Link}
        to={`/product/${id}`}
      >
        {/* Favorite Button */}
        <IconButton
          onClick={handleFavoriteClick}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 2,
            backdropFilter: 'blur(6px)',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            borderRadius: '50%',
            p: '4px',
            transition: 'transform 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              transform: 'scale(1.15)',
            },
            boxShadow: 1,
          }}
          size="small"
        >
          {isFav
            ? <Favorite sx={{ color: 'red', fontSize: 18 }} />
            : <FavoriteBorder sx={{ fontSize: 18 }} />}
        </IconButton>

        <CardActionArea>
          <CardMedia
            component="img"
            image={image}
            alt={title}
            sx={{
              width: '100%',
              height: 260,
              objectFit: 'cover',
              backgroundColor: '#f9f9f9'
            }}
          />
          <CardContent
            sx={{
              height: 100,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              pt: 1,
              pb: 0,
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 500, lineHeight: 1.2, minHeight: 38, mt:1 , textDecoration:'none'}}>
              {title}
            </Typography>
            <Box sx={{ color: 'red', display: 'flex' }}>
              {[...Array(5)].map((_, i) =>
                i < Math.round(rating)
                  ? <Star key={i} fontSize="small" />
                  : <StarBorder key={i} fontSize="small" />
              )}
            </Box>
            <Typography sx={{ mt: 1, fontWeight: 'bold' }}>
              ₹{price.toFixed(2)}
            </Typography>
          </CardContent>
        </CardActionArea>

        <Box sx={{ px: 2, pb: 2 }}>
          <Button
            variant="contained"
            fullWidth
            size="small"
            onClick={handleAdd}
            sx={{
              backgroundColor: '#ff4c3b',
              fontWeight: 500,
              textTransform: 'none',
              '&:hover': { backgroundColor: '#e53935' }
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </Card>

      <Snackbar
        open={openToast}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="info">
          {toastMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductCard;
