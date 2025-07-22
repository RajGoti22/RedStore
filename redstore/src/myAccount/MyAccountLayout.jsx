import React, { useState } from 'react';
import {
  Box, Typography, List, ListItem, ListItemIcon, ListItemText,
  Dialog, DialogActions, Button, IconButton, useMediaQuery
} from '@mui/material';
import {
  Person, Favorite, Visibility, Settings, Notifications, Logout, ArrowBack
} from '@mui/icons-material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { logoutUser } from '../utils/auth';
import { useTheme } from '@mui/material/styles';

const menuItems = [
  { text: 'User Info', icon: <Person />, path: 'user-info' },
  { text: 'Favorites', icon: <Favorite />, path: 'favorites' },
  { text: 'Watchlist', icon: <Visibility />, path: 'watchlist' },
  { text: 'Orders', icon: <Settings />, path: 'orders' },
  { text: 'Notifications', icon: <Notifications />, path: 'notifications' },
];

const MyAccountLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [mobileViewState, setMobileViewState] = useState('overview'); // overview | detail

  const handleLogoutClick = () => setLogoutDialogOpen(true);
  const handleLogoutConfirm = () => {
    logoutUser();
    setLogoutDialogOpen(false);
    navigate('/login');
    window.location.reload();
  };

  const handleNavigate = (path) => {
    navigate(`/myaccount/${path}`);
    if (isMobile) setMobileViewState('detail');
  };

  const showBack = isMobile && mobileViewState === 'detail';

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fff' }}>
      
      {/* Sidebar - Desktop Only */}
      {!isMobile && (
        <Box sx={{ width: 240, borderRight: '1px solid #eee', p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            My Account
          </Typography>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                selected={location.pathname.includes(item.path)}
                onClick={() => handleNavigate(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            <ListItem button sx={{ color: 'red', mt: 3 }} onClick={handleLogoutClick}>
              <ListItemIcon><Logout color="error" /></ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItem>
          </List>
        </Box>
      )}

      {/* Main Content Area */}
      <Box sx={{ flex: 1, p: { xs: 2, sm: 4 } }}>
        {/* Mobile: My Account Overview Menu */}
        {isMobile && mobileViewState === 'overview' && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
              My Account
            </Typography>
            <List>
              {menuItems.map((item) => (
                <ListItem
                  button
                  key={item.text}
                  onClick={() => handleNavigate(item.path)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
              <ListItem button sx={{ color: 'red', mt: 3 }} onClick={handleLogoutClick}>
                <ListItemIcon><Logout color="error" /></ListItemIcon>
                <ListItemText primary="Log out" />
              </ListItem>
            </List>
          </Box>
        )}

        {/* Mobile: Back Button */}
        {showBack && (
          <Box sx={{ mb: 2 }}>
            <IconButton onClick={() => setMobileViewState('overview')}>
              <ArrowBack />
            </IconButton>
          </Box>
        )}

        {/* Detail View */}
        {(!isMobile || mobileViewState === 'detail') && <Outlet />}
      </Box>

      {/* Logout Confirmation */}
      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <Box sx={{ bgcolor: '#fff3f0', px: 3, py: 2 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/463/463612.png"
              alt="Logout Icon"
              width={24}
              height={24}
            />
            <Typography variant="h6" fontWeight="bold" color="#ff523b">
              Confirm Logout
            </Typography>
          </Box>
        </Box>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setLogoutDialogOpen(false)}
            variant="outlined"
            sx={{ textTransform: 'none', borderColor: '#ccc', color: '#444' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogoutConfirm}
            variant="contained"
            sx={{
              backgroundColor: '#ff523b',
              textTransform: 'none',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#e53935'
              }
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyAccountLayout;
