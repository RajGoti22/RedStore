import React, { useEffect, useState } from 'react';
import {
  Box, Container, Grid, Typography, Select, MenuItem,
  Button, TextField, CircularProgress, styled, Divider,
  IconButton, Tooltip, Accordion, AccordionSummary, AccordionDetails,
  useMediaQuery
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../cart/cartSlice';
import { toggleFavorite, toggleWatchlist } from '../features/products/productsSlice';
import { FavoriteBorder, Favorite, Visibility, VisibilityOff } from '@mui/icons-material';
import ProductCard from './ProductCard';

const ImgContainer = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#f9f9f9',
  padding: theme.spacing(2),
  textAlign: 'center',
  maxHeight: 400,
  overflow: 'hidden',
}));

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width:768px)');

  const [product, setProduct] = useState(null);
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [swipeIndex, setSwipeIndex] = useState(0);

  const favorites = useSelector(state => state.products.favorites);
  const watchlist = useSelector(state => state.products.watchlist);

  const isFavorite = favorites.some(p => p.id === Number(id));
  const isWatchlisted = watchlist.some(p => p.id === Number(id));

  const handleAdd = () => {
    const item = {
      id: `${product.id}-${size}`,
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.images?.[0] || product.thumbnail,
      quantity: parseInt(quantity),
    };
    dispatch(addToCart(item));
  };

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(product));
  };

  const handleWatchlistClick = () => {
    dispatch(toggleWatchlist(product));
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`https://redstore-vcct.onrender.com/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        return axios.get('https://redstore-vcct.onrender.com/api/products');
      })
      .then(res => setAllProducts(res.data.products))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (product && allProducts.length > 0) {
      const related = allProducts
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [product, allProducts]);

  if (loading) {
    return <Container sx={{ textAlign: 'center', py: 8 }}><CircularProgress /></Container>;
  }

  if (!product) {
    return <Container sx={{ textAlign: 'center', py: 8 }}><Typography variant="h6">Product not found.</Typography></Container>;
  }

  const handleSwipe = (direction) => {
    const images = product.images || [product.thumbnail];
    const len = images.length;
    if (direction === 'left') {
      setSwipeIndex((swipeIndex + 1) % len);
    } else {
      setSwipeIndex((swipeIndex - 1 + len) % len);
    }
  };

  return (
    <Container sx={{ py: 5, px: isMobile ? 1 : 2 }}>
      {/* Back Button */}
      <Button component={Link} to="/products" variant="outlined" sx={{ mb: 3, color: '#ff523b', borderColor: '#555' }}>
        ← Back to Products
      </Button>

      <Grid container spacing={6} alignItems="flex-start" justifyContent="center">
        {/* Image */}
        <Grid item xs={12} md={6}>
          <ImgContainer
            onTouchStart={(e) => (window.swipeStart = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              const swipeEnd = e.changedTouches[0].clientX;
              const diff = swipeEnd - window.swipeStart;
              if (Math.abs(diff) > 50) handleSwipe(diff < 0 ? 'left' : 'right');
            }}
          >
            <Box
              component="img"
              src={(product.images && product.images[swipeIndex]) || product.thumbnail}
              alt={product.title}
              sx={{
                width: '100%',
                height: 350,
                objectFit: 'contain',
                display: 'block',
                borderRadius: 1,
              }}
            />
          </ImgContainer>
        </Grid>

        {/* Info */}
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" gap={2}>
            {/* Icons */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Tooltip title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}>
                <IconButton onClick={handleFavoriteClick} sx={{ backgroundColor: '#f9f9f9' }} size="small">
                  {isFavorite ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder />}
                </IconButton>
              </Tooltip>
              <Tooltip title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}>
                <IconButton onClick={handleWatchlistClick} sx={{ backgroundColor: '#f9f9f9' }} size="small">
                  {isWatchlisted ? <VisibilityOff sx={{ color: '#555' }} /> : <Visibility />}
                </IconButton>
              </Tooltip>
            </Box>

            {/* Text */}
            <Box>
              <Typography variant={isMobile ? 'subtitle2' : 'h6'} color="text.secondary">
                {product.category.replace(/-/g, ' ')}
              </Typography>
              <Typography variant={isMobile ? 'h5' : 'h4'} fontWeight="bold">
                {product.title}
              </Typography>
              <Typography variant={isMobile ? 'h6' : 'h5'} color="#ff523b">
                ₹{product.price.toFixed(2)}
              </Typography>
            </Box>

            {/* Size & Qty */}
            <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
              <Typography>Size:</Typography>
              <Select
                value={size}
                onChange={e => setSize(e.target.value)}
                displayEmpty
                sx={{ minWidth: 120 }}
              >
                <MenuItem value="" disabled>Select Size</MenuItem>
                {['S', 'M', 'L', 'XL'].map(s => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </Select>
            </Box>

            <Box display="flex" alignItems="center" gap={2}>
              <TextField
                type="number"
                label="Qty"
                value={quantity}
                onChange={e => setQuantity(Math.max(1, e.target.value))}
                size="small"
                sx={{ width: 100 }}
                inputProps={{ min: 1 }}
              />
              <Button
                variant="contained"
                size="large"
                fullWidth={isMobile}
                onClick={handleAdd}
                sx={{ backgroundColor: '#ff523b', whiteSpace: 'nowrap' }}
              >
                Add to Cart
              </Button>
            </Box>

            {/* Description */}
            <Divider />
            {isMobile ? (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Description</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {product.description}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ) : (
              <Box>
                <Typography variant="h6" gutterBottom>Description</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {product.description}
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            Related Products
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {relatedProducts.map(item => (
              <Grid item xs={12} sm={6} md={3} key={item.id}>
                <ProductCard
                  id={item.id}
                  image={item.thumbnail}
                  title={item.title}
                  price={item.price}
                  rating={item.rating}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}
