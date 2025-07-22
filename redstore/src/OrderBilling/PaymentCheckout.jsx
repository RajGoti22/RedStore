import React, { useState } from 'react';
import {
  Box, Typography, Grid, TextField, Paper, Button, Divider, Avatar,
  Radio, RadioGroup, FormControlLabel, Dialog, DialogActions
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { clearCart } from '../cart/cartSlice';
import 'react-toastify/dist/ReactToastify.css';
import { getUser } from '../utils/auth';

export default function PaymentCheckout() {
  /* --------------------- state & hooks --------------------- */
  const cartItems = useSelector((s) => s.cart.cartItems || []);
  const userAddress = useSelector((s) => s.user?.address || null);

  const user = getUser();
  const isLoggedIn = !!(user && user.email);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({ name: '', number: '', expiryMM: '', expiryYY: '', cvv: '' });
  const [upiId, setUpiId] = useState('');
  const [bankDetails, setBankDetails] = useState({ accNo: '', ifsc: '', name: '' });

  const [address, setAddress] = useState(userAddress || {});
  const [showAddressForm, setShowAddressForm] = useState(!userAddress);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);

  /* --------------------- totals ---------------------------- */
  const appliedCoupon = JSON.parse(localStorage.getItem('appliedCoupon')) || null;
  const couponDiscount = appliedCoupon?.discount || 0;

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const delivery = 9.0;
  const discount = couponDiscount;
  const service = 1.5;
  const total = subtotal + delivery - discount + service;

  /* --------------------- handlers -------------------------- */
  const handleCardChange = (e) => setCardData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleAddressChange = (e) => setAddress(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleBankChange = (e) => setBankDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));

  /* --------------------- validation ------------------------ */
  const validatePayment = () => {
    if (paymentMethod === 'card') {
      const { name, number, expiryMM, expiryYY, cvv } = cardData;

      if (!name || name.trim().length < 3) { toast.error('Cardholder name is required (≥3 chars)'); return false; }
      if (!/^\d{16}$/.test(number)) { toast.error('Card number must be 16 digits'); return false; }
      if (!/^(0[1-9]|1[0-2])$/.test(expiryMM)) { toast.error('Expiry month must be 01-12'); return false; }
      if (!/^\d{2}$/.test(expiryYY)) { toast.error('Expiry year must be 2 digits'); return false; }
      if (!/^\d{3,4}$/.test(cvv)) { toast.error('CVV must be 3-4 digits'); return false; }

    } else if (paymentMethod === 'upi') {
      if (!upiId.trim()) { toast.error('UPI ID is required'); return false; }
      if (!/^[\w.\-]+@[\w.\-]+$/.test(upiId)) { toast.error('Enter a valid UPI ID'); return false; }

    } else if (paymentMethod === 'bank') {
      const { accNo, ifsc, name } = bankDetails;

      if (!/^\d{9,18}$/.test(accNo)) { toast.error('Account number 9-18 digits'); return false; }
      if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) { toast.error('Invalid IFSC code'); return false; }
      if (!name || name.trim().length < 3) { toast.error('Account holder name ≥3 chars'); return false; }
    }

    return true;  // ✅ all good
  };

  const validateAddress = () => {
    const { name, street, city, state, zip } = address;

    if (!name?.trim()) { toast.error('Name is required'); return false; }
    if (!street?.trim()) { toast.error('Street is required'); return false; }
    if (!city?.trim()) { toast.error('City is required'); return false; }
    if (!state?.trim()) { toast.error('State is required'); return false; }
    if (!zip || !/^\d{5,6}$/.test(zip)) {
      toast.error('ZIP must be 5‑6 digits'); return false;
    }
    return true; // ✅
  };

  /* --------------------- confirm flow ---------------------- */
  const confirmOrder = () => {
    if (!isLoggedIn) {
      toast.error('Please login to place your order.');
      setLoginPromptOpen(true);
      return;
    }

    // run validations
    if (!validatePayment()) return;
    if (!validateAddress()) return;

    // ✅ open dialog
    setConfirmOpen(true);
  };

  const placeOrder = () => {
    setConfirmOpen(false);
    localStorage.setItem('orderAddress', JSON.stringify(address));

    const newOrder = {
      id: Date.now().toString(),
      items: cartItems,
      total,
      date: new Date().toLocaleString(),
      paymentMethod,
    };
    const past = JSON.parse(localStorage.getItem('pastOrders')) || [];
    localStorage.setItem('pastOrders', JSON.stringify([...past, newOrder]));

    dispatch(clearCart());
    toast.success('Order placed successfully!');
    setTimeout(() => navigate(`/order-summary?orderId=${newOrder.id}`), 1000);
  };

  /* ===================== JSX =============================== */
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f8f8', px: 2, py: 4 }}>
      <ToastContainer />

      {/* ---------- Confirm Dialog ---------- */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} maxWidth="xs" fullWidth>
        <Box sx={{ bgcolor: '#ff523b', color: '#fff', p: 2, borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="Confirm" width={28} height={28} />
            <Typography variant="h6" fontWeight="bold">Confirm Your Order</Typography>
          </Box>
        </Box>
        <Box px={3} py={2}>
          <Typography fontWeight={500}>Are you sure you want to place this order?</Typography>
          <Typography variant="body2" color="text.secondary">This will finalize your purchase with the selected payment method.</Typography>
        </Box>
        <Divider />
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setConfirmOpen(false)} variant="outlined">Cancel</Button>
          <Button onClick={placeOrder} variant="contained" sx={{ backgroundColor: '#ff523b' }}>Confirm Order</Button>
        </DialogActions>
      </Dialog>

      {/* ---------- Login Prompt Dialog ---------- */}
      <Dialog open={loginPromptOpen} onClose={() => setLoginPromptOpen(false)} maxWidth="xs" fullWidth>
        <Box sx={{ bgcolor: '#ff523b', color: '#fff', p: 2, borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <img src="https://cdn-icons-png.flaticon.com/512/633/633611.png" alt="Login Required" width={28} height={28} />
            <Typography variant="h6" fontWeight="bold">Login Required</Typography>
          </Box>
        </Box>
        <Box px={3} py={2}>
          <Typography fontWeight={500}>You must be logged in to place an order.</Typography>
        </Box>
        <Divider />
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setLoginPromptOpen(false)} variant="outlined">Cancel</Button>
          <Button onClick={() => { setLoginPromptOpen(false); navigate('/login'); }} variant="contained" sx={{ backgroundColor: '#ff523b' }}>Login</Button>
        </DialogActions>
      </Dialog>

      {/* ---------- Main Responsive Grid ---------- */}
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Grid container spacing={3} sx={{ flexDirection: { xs: 'column', md: 'row' }, display: 'flex' }}>

          {/* -------- Left: Payment -------- */}
          <Grid item xs={12} md={7} sx={{ flex: 1 }}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2, bgcolor: '#fff' }}>
              <Typography variant="h5" fontWeight="bold" mb={2}>Checkout</Typography>

              <Box sx={{ bgcolor: '#e6f4ea', p: 2, borderRadius: 1, mb: 2 }}>
                <Typography fontSize={14} color="green" fontWeight={600}>Your payment is secure</Typography>
                <Typography variant="caption" color="text.secondary">We use encrypted payment methods.</Typography>
              </Box>

              <Typography variant="subtitle1" fontWeight="bold" mb={1}>Payment Method</Typography>
              <RadioGroup row value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <FormControlLabel value="card" control={<Radio />} label="Card" />
                <FormControlLabel value="upi" control={<Radio />} label="UPI" />
                <FormControlLabel value="bank" control={<Radio />} label="Bank" />
                <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
              </RadioGroup>

              {paymentMethod === 'card' && (
                <>
                  <TextField fullWidth label="Cardholder Name" name="name" sx={{ my: 1 }} value={cardData.name} onChange={handleCardChange} />
                  <TextField fullWidth label="Card Number" name="number" sx={{ my: 1 }} value={cardData.number} onChange={handleCardChange} />
                  <Grid container spacing={2}>
                    <Grid item xs={4}><TextField label="MM" name="expiryMM" fullWidth value={cardData.expiryMM} onChange={handleCardChange} /></Grid>
                    <Grid item xs={4}><TextField label="YY" name="expiryYY" fullWidth value={cardData.expiryYY} onChange={handleCardChange} /></Grid>
                    <Grid item xs={4}><TextField label="CVV" name="cvv" fullWidth value={cardData.cvv} onChange={handleCardChange} /></Grid>
                  </Grid>
                </>
              )}

              {paymentMethod === 'upi' && (
                <TextField fullWidth label="Enter UPI ID" sx={{ my: 2 }} value={upiId} onChange={(e) => setUpiId(e.target.value)} />
              )}

              {paymentMethod === 'bank' && (
                <>
                  <TextField fullWidth name="accNo" label="Account Number" sx={{ mb: 1 }} value={bankDetails.accNo} onChange={handleBankChange} />
                  <TextField fullWidth name="ifsc" label="IFSC Code" sx={{ mb: 1 }} value={bankDetails.ifsc} onChange={handleBankChange} />
                  <TextField fullWidth name="name" label="Account Holder Name" sx={{ mb: 1 }} value={bankDetails.name} onChange={handleBankChange} />
                </>
              )}

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle1" fontWeight="bold" mb={1}>Billing Address</Typography>
              {!showAddressForm ? (
                <Box>
                  <Typography>{address.name}</Typography>
                  <Typography>{address.street}</Typography>
                  <Typography>{address.city}, {address.state} {address.zip}</Typography>
                  <Button size="small" onClick={() => setShowAddressForm(true)}>Change</Button>
                </Box>
              ) : (
                <>
                  <TextField fullWidth name="name" label="Full Name" sx={{ mb: 1 }} value={address.name || ''} onChange={handleAddressChange} />
                  <TextField fullWidth name="street" label="Street" sx={{ mb: 1 }} value={address.street || ''} onChange={handleAddressChange} />
                  <TextField fullWidth name="city" label="City" sx={{ mb: 1 }} value={address.city || ''} onChange={handleAddressChange} />
                  <TextField fullWidth name="state" label="State" sx={{ mb: 1 }} value={address.state || ''} onChange={handleAddressChange} />
                  <TextField fullWidth name="zip" label="ZIP Code" sx={{ mb: 1 }} value={address.zip || ''} onChange={handleAddressChange} />
                </>
              )}
            </Paper>
          </Grid>

          {/* -------- Right: Summary -------- */}
          <Grid item xs={12} md={5} sx={{ flex: 1 }}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2, bgcolor: '#fff' }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>Order Details</Typography>

              {cartItems.map(item => (
                <Box key={item.id} display="flex" alignItems="center" mb={2}>
                  <Avatar src={item.image} variant="square" sx={{ width: 56, height: 56, mr: 2 }} />
                  <Box>
                    <Typography>{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">Qty: {item.quantity}</Typography>
                  </Box>
                  <Box ml="auto"><Typography>₹{(item.price * item.quantity).toFixed(2)}</Typography></Box>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between"><Typography>Subtotal</Typography>   <Typography>₹{subtotal.toFixed(2)}</Typography></Box>
              <Box display="flex" justifyContent="space-between"><Typography>Delivery</Typography>   <Typography>₹{delivery}</Typography></Box>
              <Box display="flex" justifyContent="space-between"><Typography>Discount</Typography>   <Typography>-₹{discount}</Typography></Box>
              <Box display="flex" justifyContent="space-between"><Typography>Service Fee</Typography><Typography>₹{service}</Typography></Box>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between" fontWeight="bold">
                <Typography>Total</Typography><Typography>₹{total.toFixed(2)}</Typography>
              </Box>

              <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} mt={3} width="100%">
                <Button fullWidth variant="contained" onClick={confirmOrder} sx={{ backgroundColor: '#ff523b', '&:hover': { backgroundColor: '#e53935' } }}>Checkout</Button>
                <Button fullWidth variant="outlined" onClick={() => navigate('/')} sx={{ color: '#ff523b', borderColor: '#ff523b' }}>Cancel</Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
