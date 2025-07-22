import React from 'react';
import {
  Box, Typography, Paper, Grid, Divider, Avatar, Button, useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Confetti from 'react-confetti';

// Utility to format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export default function OrderSummary() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  const userAddress = JSON.parse(localStorage.getItem('orderAddress')) || {};
  const pastOrders = JSON.parse(localStorage.getItem('pastOrders')) || [];
  const appliedCoupon = JSON.parse(localStorage.getItem('appliedCoupon')) || null;

  const thisOrder = pastOrders.find(o => o.id === orderId);
  const couponDiscount = appliedCoupon?.discount || 0;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!thisOrder) {
    return <Typography textAlign="center" mt={10}>Order not found.</Typography>;
  }

  const { items, total, date, paymentMethod } = thisOrder;
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = 9.00;
  const discount = couponDiscount;
  const service = 1.50;

  const today = new Date();
  const deliveryStart = new Date(today);
  deliveryStart.setDate(today.getDate() + 3);
  const deliveryEnd = new Date(today);
  deliveryEnd.setDate(today.getDate() + 6);

  const paymentLabel = {
    card: 'Credit/Debit Card',
    upi: 'UPI',
    bank: 'Net Banking',
    cod: 'Cash on Delivery'
  };

  return (
    <Box sx={{  bgcolor: '#fefefe', py: 4, px: 2 }}>
      <Confetti numberOfPieces={300} recycle={false} />
      <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
        <Paper elevation={2} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight="bold" mb={2} color="success.main" textAlign="center">
            Thank You for Your Purchase!
          </Typography>
          <Typography variant="subtitle1" mb={1} color="text.secondary" textAlign="center">
            Your order has been placed successfully.
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" mb={3} textAlign="center">
            Order Date: {date}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Address Block */}
          <Box mb={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>Shipping Address</Typography>
            <Typography>{userAddress.name}</Typography>
            <Typography>{userAddress.street}</Typography>
            <Typography>{userAddress.city}, {userAddress.state} - {userAddress.zip}</Typography>
          </Box>

          <Box display="flex" flexDirection="column" gap={2}>
  {items.map((item) => (
    <Box
      key={item.id}
      sx={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ddd',
        borderRadius: 2,
        p: 2,
        width: 'auto',
        backgroundColor: '#fff',
        flexDirection: { xs: 'row', sm: 'row' }, // row for all screens
      }}
    >
      <Avatar
        src={item.image}
        variant="square"
        sx={{
          width: 64,
          height: 64,
          mr: 2,
          borderRadius: 1,
          flexShrink: 0,
        }}
      />
      <Box flex="1">
        <Typography fontWeight="bold" fontSize={14} noWrap>
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Qty: {item.quantity}
        </Typography>
      </Box>
      <Typography fontWeight="bold" fontSize={14} sx={{ ml: 1 }}>
        ₹{(item.price * item.quantity).toFixed(2)}
      </Typography>
    </Box>
  ))}
</Box>

          {/* Payment & Summary Block */}
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" fontWeight="bold" mb={2}>Payment & Delivery</Typography>

          <Box display="flex" justifyContent="space-between" flexDirection={{ xs: 'column', sm: 'row' }} mb={1}>
            <Typography>Payment Method</Typography>
            <Typography>{paymentLabel[paymentMethod] || 'N/A'}</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" flexDirection={{ xs: 'column', sm: 'row' }} mb={1}>
            <Typography>Expected Delivery</Typography>
            <Typography>{formatDate(deliveryStart)} - {formatDate(deliveryEnd)}</Typography>
          </Box>

          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" fontWeight="bold" mb={2}>Order Summary</Typography>

          <Box display="flex" justifyContent="space-between"><Typography>Subtotal</Typography><Typography>₹{subtotal.toFixed(2)}</Typography></Box>
          <Box display="flex" justifyContent="space-between"><Typography>Delivery</Typography><Typography>₹{delivery}</Typography></Box>
          <Box display="flex" justifyContent="space-between"><Typography>Discount</Typography><Typography color="error">-₹{discount.toFixed(2)}</Typography></Box>
          <Box display="flex" justifyContent="space-between"><Typography>Service Fee</Typography><Typography>₹{service}</Typography></Box>

          <Divider sx={{ my: 1.5 }} />
          <Box display="flex" justifyContent="space-between" fontWeight="bold">
            <Typography>{paymentMethod === 'cod' ? 'To be Paid on Delivery' : 'Total Paid'}</Typography>
            <Typography>₹{total.toFixed(2)}</Typography>
          </Box>

          <Box mt={4} display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} justifyContent="center">
            <Button
              variant="contained"
              sx={{ backgroundColor: '#ff523b', px: 4 }}
              onClick={() => navigate('/products')}
              fullWidth={isMobile}
            >
              Continue Shopping
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#ff523b', px: 4 }}
              onClick={() => navigate('/track-order')}
              fullWidth={isMobile}
            >
              Track Your Product
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
