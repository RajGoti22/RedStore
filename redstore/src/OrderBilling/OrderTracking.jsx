import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Divider,
  Button,
  Chip,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const steps = ['Ordered', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];

export default function OrderTracking() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [orderStatus, setOrderStatus] = useState(1); // 0‑4
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const savedAddress = localStorage.getItem('orderAddress');
    if (savedAddress) setAddress(JSON.parse(savedAddress));
  }, []);

  /* ---------- simulated delivery ETA ---------- */
  const etaDays = [7, 5, 3, 1, 0]; // rough days left per status
  const etaText =
    orderStatus < steps.length - 1
      ? `${etaDays[orderStatus]} day(s) to delivery`
      : 'Package delivered 🎉';

  /* ---------- handler to advance status -------- */
  const simulateNextStep = () => {
    if (orderStatus < steps.length - 1) setOrderStatus((prev) => prev + 1);
  };

  /* ---------- ui ---------- */
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f8f8', py: 4, px: 2 }}>
      <Box sx={{ maxWidth: 950, mx: 'auto' }}>
        <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
          Track Your Order
        </Typography>

        <Paper
          elevation={2}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            bgcolor: '#fff',
          }}
        >
          {/* ---- Status header ---- */}
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            mb={2}
            gap={1}
          >
            <Typography variant="h6" fontWeight="bold">
              Order Status
            </Typography>
            <Chip
              label={steps[orderStatus]}
              color={orderStatus === steps.length - 1 ? 'success' : 'primary'}
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
          </Box>

          {/* ---- Stepper ---- */}
          <Stepper
            activeStep={orderStatus}
            alternativeLabel={!isMobile}
            orientation={isMobile ? 'vertical' : 'horizontal'}
            sx={{
              '& .MuiStepConnector-line': {
                display: { xs: 'none', sm: 'block' },
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    '.MuiStepLabel-label': {
                      color: orderStatus >= steps.indexOf(label) ? 'text.primary' : 'text.secondary',
                      fontSize: { xs: 13, sm: 14 },
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          <Divider sx={{ my: 3 }} />

          {/* ---- Info blocks ---- */}
          <Grid container spacing={3}>
            {/* Left column */}
            <Grid item xs={12} md={6} mr={5}>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                Order Details
              </Typography>
              <Typography>Order ID: <b>ORD12345</b></Typography>
              <Typography>Courier: <b>Delhivery Express</b></Typography>
              <Typography>Tracking #: <b>DLV‑987654321</b></Typography>
              <Typography>Payment: <b>Paid via Card</b></Typography>
              <Typography>Status: <b>{steps[orderStatus]}</b></Typography>
              <Typography mt={1} color="text.secondary">
                {etaText}
              </Typography>
            </Grid>

            {/* Right column */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                Delivery Address
              </Typography>
              {address ? (
                <>
                  <Typography>{address.name}</Typography>
                  <Typography>{address.street}</Typography>
                  <Typography>
                    {address.city}, {address.state} ‑ {address.zip}
                  </Typography>
                </>
              ) : (
                <Typography>No address found.</Typography>
              )}
            </Grid>
          </Grid>

          {/* ---- Buttons ---- */}
          <Box
            mt={3}
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap={2}
            justifyContent="flex-start"
          >
            {orderStatus < steps.length - 1 && (
              <Button
                variant="contained"
                onClick={simulateNextStep}
                sx={{
                  backgroundColor: '#ff523b',
                  '&:hover': { backgroundColor: '#e53935' },
                }}
                fullWidth={isMobile}
              >
                Simulate Next Status
              </Button>
            )}

            <Button
              variant="outlined"
              onClick={() => navigate('/')}
              sx={{
                borderColor: '#ccc',
                color: '#555',
              }}
              fullWidth={isMobile}
            >
              Back to Home
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
