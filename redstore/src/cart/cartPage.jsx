import React, { useEffect, useState } from 'react';
import {
  Box, Typography, IconButton, Button, Grid, Divider,
  Stack, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Snackbar, Select, MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  increment, decrement, removeFromCart, clearCart, setCartFromStorage
} from './cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem('cartItems');
    if (saved) {
      dispatch(setCartFromStorage(JSON.parse(saved)));
    }
    setInitialized(true);
  }, [dispatch]);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const [selectedCoupon, setSelectedCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const availableCoupons = [
    { code: 'SAVE10', type: 'flat', value: 10, label: 'SAVE10 - ₹10 off' },
    { code: 'OFF20', type: 'percent', value: 20, label: 'OFF20 - 20% off total' },
    { code: 'APPLE50', type: 'percent', value: 50, productId: 'apple123', label: 'APPLE50 - 50% off on Apple only' }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = Math.max(subtotal - discount, 0).toFixed(2);

  const handleApplyCoupon = () => {
    const selected = availableCoupons.find(c => c.code === selectedCoupon);
    if (!selected) {
      setDiscount(0);
      localStorage.removeItem('appliedCoupon');
      setMessage('No coupon selected');
      setOpenSnackbar(true);
      return;
    }

    let calculatedDiscount = 0;
    if (selected.productId) {
      const product = cartItems.find(item => item.id === selected.productId);
      if (!product) {
        setMessage(`Coupon only valid for a specific product`);
        setOpenSnackbar(true);
        return;
      }
      const productTotal = product.price * product.quantity;
      calculatedDiscount = selected.type === 'percent'
        ? (productTotal * selected.value) / 100
        : selected.value;
    } else {
      calculatedDiscount = selected.type === 'percent'
        ? (subtotal * selected.value) / 100
        : selected.value;
    }

    setDiscount(calculatedDiscount);
    setMessage(`Coupon ${selected.code} applied!`);
    setOpenSnackbar(true);

    localStorage.setItem('appliedCoupon', JSON.stringify({
      code: selected.code,
      discount: calculatedDiscount
    }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    setSelectedCoupon('');
    setDiscount(0);
    setMessage('Cart cleared');
    localStorage.removeItem('appliedCoupon');
    setOpenSnackbar(true);
  };

  if (!initialized) return null;

  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: 6, backgroundColor: '#fafafa', minHeight: '100vh' }}>
      {/* <Typography variant="h5" align="center" fontWeight="bold" mb={4}>
        Your Cart
      </Typography> */}

      {cartItems.length === 0 ? (
        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
          <Typography align="center" variant="h6" color="text.secondary" mb={6}>
            Your cart is empty.
          </Typography>
          <Button align="center" variant="contained" onClick={() => navigate('/Products')}
              sx={{
                width:'250px',
                color: '#fff',
                backgroundColor: '#ff523b',
                padding: '8px 30px',
                margin: '30px 0',
                borderRadius: '30px',
                transition: 'background 0.5s',
                '&:hover': { backgroundColor: '#563434' },
                gap: 1
              }}>
            Explore Products
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          <Grid item xs={12} md={8}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Product</strong></TableCell>
                    <TableCell><strong>Price</strong></TableCell>
                    <TableCell><strong>Quantity</strong></TableCell>
                    <TableCell><strong>Total</strong></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <img src={item.image} alt={item.title} width={60} height={60} style={{ marginRight: 16 }} />
                          <Box><Typography fontWeight="bold">{item.title}</Typography></Box>
                        </Box>
                      </TableCell>
                      <TableCell>₹{item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <IconButton onClick={() => dispatch(decrement(item.id))}><RemoveIcon /></IconButton>
                          <Typography>{item.quantity}</Typography>
                          <IconButton onClick={() => dispatch(increment(item.id))}><AddIcon /></IconButton>
                        </Box>
                      </TableCell>
                      <TableCell>₹{(item.price * item.quantity).toFixed(2)}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => dispatch(removeFromCart(item.id))} sx={{ color: 'red' }}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button fullWidth sx={{ mt: 1, color: 'red' }} onClick={handleClearCart}>CLEAR CART</Button>
          </Grid>

          <Grid item xs={8} md={3}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>Order Summary</Typography>
              <Stack spacing={1}>
                <Box display="flex" justifyContent="space-between">
                  <Typography>Subtotal</Typography>
                  <Typography>₹{subtotal.toFixed(2)}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography>Shipping</Typography>
                  <Typography color="red">Free</Typography>
                </Box>
                {discount > 0 && (
                  <Box display="flex" justifyContent="space-between">
                    <Typography color="error">Discount</Typography>
                    <Typography color="error">-₹{discount.toFixed(2)}</Typography>
                  </Box>
                )}
                <Divider />
                <Box display="flex" justifyContent="space-between" fontWeight="bold">
                  <Typography>Total</Typography>
                  <Typography>₹{total}</Typography>
                </Box>
              </Stack>

              <Select
                fullWidth
                size="small"
                value={selectedCoupon}
                displayEmpty
                onChange={(e) => setSelectedCoupon(e.target.value)}
                sx={{ mt: 2 }}
              >
                <MenuItem value="">Select a coupon</MenuItem>
                {availableCoupons.map(c => (
                  <MenuItem key={c.code} value={c.code}>{c.label}</MenuItem>
                ))}
              </Select>
              <Button onClick={handleApplyCoupon} sx={{ mt: 1, color: 'red' }}>Apply Coupon</Button>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: '#ff523b',
                  color: 'white',
                  py: 1,
                  '&:hover': { backgroundColor: '#563434' }
                }}
                onClick={() => navigate('/paymentCheckout')}
              >
                CHECKOUT
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={message}
      />
    </Box>
  );
};

export default CartPage;
