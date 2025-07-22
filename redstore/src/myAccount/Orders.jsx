
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Button,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // Load orders on mount
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('pastOrders')) || [];
    setOrders(storedOrders);
  }, []);

  // Save to localStorage and state after deletion
  const updateOrders = (updated) => {
    localStorage.setItem('pastOrders', JSON.stringify(updated));
    setOrders(updated);
  };

  // Delete a single order
  const handleDeleteOrder = (orderId) => {
    const filtered = orders.filter((order) => order.id !== orderId);
    updateOrders(filtered);
  };

  // Delete all orders
  const handleDeleteAll = () => {
    localStorage.removeItem('pastOrders');
    setOrders([]);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          Your Past Orders
        </Typography>
        {orders.length > 0 && (
          <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteAll}
            sx={{ textTransform: 'none' }}
          >
            Delete All Orders
          </Button>
        )}
      </Box>

      {orders.length === 0 ? (
        <Typography>No past orders found.</Typography>
      ) : (
        orders.map((order) => (
          <Paper key={order.id} sx={{ mb: 3, p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Order ID: {order.id}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Placed on: {order.date}
                </Typography>
              </Box>
              <IconButton onClick={() => handleDeleteOrder(order.id)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>

            <Divider sx={{ my: 1 }} />
            <List>
              {order.items?.map((item) => (
                <ListItem key={item.id}>
                  <Avatar
                    src={item.image}
                    variant="square"
                    sx={{ width: 48, height: 48, mr: 2 }}
                  />
                  <ListItemText
                    primary={item.title}
                    secondary={`Qty: ${item.quantity} • ₹${(item.price * item.quantity).toFixed(2)}`}
                  />
                </ListItem>
              ))}
            </List>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Total:</strong> ₹{order.total != null ? order.total.toFixed(2) : '0.00'}
            </Typography>
            <Button variant="contained" sx={{ backgroundColor: '#ff523b', px: 4, mt:2 }}
              onClick={() => navigate('/track-order')}>
              Track Your Product
            </Button>
          </Paper>

        ))
      )}
    </Box>
  );
};

export default Orders;
