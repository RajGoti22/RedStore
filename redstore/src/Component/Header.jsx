import React, { useState } from 'react';
import {
  AppBar, Toolbar, Box, Button, InputBase, IconButton, Badge, Drawer, List,
  ListItem, ListItemButton, ListItemText, Menu, MenuItem, Dialog, DialogContent,
  DialogActions, Typography, useMediaQuery
} from '@mui/material';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Link, useNavigate, createSearchParams } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Logo from '../assets/images/logo.png';
import { useSelector } from 'react-redux';
import { getUser, logoutUser } from '../utils/auth';

// ----------------------- Styled Search -------------------------
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  width: '100%',
  maxWidth: 300,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#555',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    '::placeholder': { color: '#555', opacity: 1 },
  },
}));

// ----------------------- Main Component -------------------------
export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const isProfileMenuOpen = Boolean(profileAnchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.cartItems);
  const user = getUser();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      navigate({
        pathname: '/products',
        search: `?${createSearchParams({ search: searchTerm.trim() })}`,
      });
      setSearchTerm('');
    }
  };

  const handleProfileMenuOpen = (event) => setProfileAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setProfileAnchorEl(null);
  const handleMyAccount = () => {
    handleProfileMenuClose();
    navigate('/myaccount');
  };
  const handleLogout = () => {
    handleProfileMenuClose();
    setLogoutDialogOpen(true);
  };
  const confirmLogout = () => {
    logoutUser();
    setLogoutDialogOpen(false);
    navigate('/login');
    window.location.reload();
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={(theme) => ({
          background: '#ffd6dd',
          boxShadow: 'none',
          px: { xs: 2, md: 10 },
          py: 1,
          [theme.breakpoints.up('md')]: {
            background: 'radial-gradient(#ffd6d0,#ffd6d6)',
          },
        })}
      >
        <Toolbar
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          {/* Left: Logo */}
          <Link to="/">
            <img src={Logo} alt="Logo" style={{ height: '40px', objectFit: 'contain' }} />
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {[
                { label: 'Home', path: '/' },
                { label: 'Products', path: '/products' },
                { label: 'About Us', path: '/aboutus' },
                { label: 'Contact Us', path: '/contactus' },
              ].map(item => (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: '#555',
                    fontWeight: 'bold',
                    fontSize: '13px',
                    textTransform: 'none',
                    '&:hover': { color: 'black' }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Right: Search, Cart, Login/Profile */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Search - Desktop */}
            {!isMobile && (
              <Search>
                <SearchIconWrapper><SearchIcon sx={{ color: '#555' }} /></SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearch}
                />
              </Search>
            )}

            {/* Cart */}
            <IconButton onClick={() => navigate('/cart')}>
              <Badge badgeContent={cartItems.length} color="error">
                <ShoppingCartIcon sx={{ color: '#555' }} />
              </Badge>
            </IconButton>

            {/* Profile Icon if logged in */}
            {user ? (
              <IconButton onClick={handleProfileMenuOpen}>
                <AccountCircleOutlinedIcon sx={{ color: '#555' }} />
              </IconButton>
            ) : (
              <>
                {/* Mobile: Show Login Button only */}
                {isMobile && (
                  <Button
                    onClick={() => navigate('/login')}
                    size="small"
                    sx={{
                      fontSize: '13px',
                      textTransform: 'none',
                      color: '#555',
                      fontWeight: 500,
                      ml: 1,
                      border: '1px solid #ccc',
                      borderRadius: '20px',
                      px: 2,
                      height: '30px',
                      '&:hover': {
                        backgroundColor: '#fff2f0',
                        borderColor: '#ff9999'
                      }
                    }}
                  >
                    Login
                  </Button>
                )}

                {/* Desktop: Show both Login and Register */}
                {!isMobile && (
                  <>
                    <Button
                      onClick={() => navigate('/login')}
                      sx={{ fontSize: '13px', textTransform: 'none', color: '#555' }}
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => navigate('/register')}
                      sx={{ fontSize: '13px', textTransform: 'none', color: '#555' }}
                    >
                      Register
                    </Button>
                  </>
                )}
              </>
            )}

            {/* Drawer Toggle (Mobile only) */}
            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon sx={{ color: '#555' }} />
              </IconButton>
            )}
          </Box>
        </Toolbar>

        {/* Mobile Search Bar */}
        {isMobile && (
          <Box sx={{ justifyContent: 'center', display: 'flex', py: 1 }}>
            <Search
              sx={{
                background: 'linear-gradient(to right, #ffe3e6, #ffe3e3)',
                boxShadow: '0 0 8px rgba(255, 168, 168, 0.2)',
                borderRadius: '30px',
                maxWidth: 500,
                width: '100%',
              }}
            >
              <SearchIconWrapper><SearchIcon sx={{ color: '#555' }} /></SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
              />
            </Search>
          </Box>
        )}
      </AppBar>

      {/* Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { background: 'radial-gradient(#fff,#ffd6d6)', width: 250 } }}
      >
        <Box sx={{ pt: 2 }}>
          <Box sx={{ height: '70px', display: 'flex', alignItems: 'center', pl: 6, mb: 2 }}>
            <img src={Logo} alt="Logo" height="40px" />
          </Box>
          <List>
            {[
              { label: 'Home', path: '/' },
              { label: 'Products', path: '/products' },
              { label: 'About Us', path: '/aboutus' },
              { label: 'Contact Us', path: '/contactus' },
            ].map(item => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton component={Link} to={item.path} onClick={() => setDrawerOpen(false)}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Profile Menu */}
      <Menu
        anchorEl={profileAnchorEl}
        open={isProfileMenuOpen}
        onClose={handleProfileMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        keepMounted
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 100,
            bgcolor: '#fff4f0',
            borderRadius: 2,
            boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
            '& .MuiMenuItem-root': {
              fontSize: '14px',
              fontWeight: 500,
              justifyContent: 'center',
              color: '#333',
              '&:hover': {
                bgcolor: '#ffe2db',
              },
            },
          },
        }}
        disableScrollLock={true}
      >
        <MenuItem onClick={handleMyAccount}>My Account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      {/* Logout Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <Box sx={{ bgcolor: '#ffeaea', px: 2, py: 1.5 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828665.png" alt="Warning" width={24} height={24} />
            <Typography variant="h6" fontWeight="bold" color="#b71c1c">
              Confirm Logout
            </Typography>
          </Box>
        </Box>
        <DialogContent>
          <Typography fontSize={15} fontWeight={500}>
            Are you sure you want to logout?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setLogoutDialogOpen(false)}
            variant="outlined"
            sx={{ textTransform: 'none', color: '#555', borderColor: '#ccc' }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmLogout}
            variant="contained"
            sx={{ textTransform: 'none', backgroundColor: '#ff523b', '&:hover': { backgroundColor: '#e53935' } }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
