import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StarRateIcon from '@mui/icons-material/StarRate';

const notifications = [
  {
    id: 1,
    icon: <ShoppingCartIcon sx={{ color: '#fff' }} />,
    title: 'Order Placed Successfully',
    message: 'Your order #RED123456 has been placed and is being processed.',
    time: '2 mins ago',
    bgColor: '#4caf50'
  },
  {
    id: 2,
    icon: <LocalShippingIcon sx={{ color: '#fff' }} />,
    title: 'Order Shipped',
    message: 'Your order #RED123456 has been shipped and will arrive soon.',
    time: '1 hour ago',
    bgColor: '#2196f3'
  },
  {
    id: 3,
    icon: <FavoriteIcon sx={{ color: '#fff' }} />,
    title: 'Added to Favorites',
    message: 'Nike Air Zoom was added to your favorites.',
    time: 'Yesterday',
    bgColor: '#e91e63'
  },
  {
    id: 4,
    icon: <StarRateIcon sx={{ color: '#fff' }} />,
    title: 'Rate Your Purchase',
    message: 'Rate your recent purchase: MRF Batting Gloves.',
    time: '2 days ago',
    bgColor: '#ff9800'
  }
];

const Notifications = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fff', flexDirection: 'column', px: 3, pt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' , textAlign:'center'}}>
        Your Notifications
      </Typography>
      <Paper elevation={3} sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
        <List>
          {notifications.map((item, index) => (
            <React.Fragment key={item.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: item.bgColor }}>
                    {item.icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography sx={{ fontWeight: 600 }}>{item.title}</Typography>}
                  secondary={
                    <>
                      <Typography sx={{ display: 'block', fontSize: '0.9rem' }}>
                        {item.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.time}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < notifications.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Notifications;
