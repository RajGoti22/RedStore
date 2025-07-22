import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Component/Header';
import Home from './pages/Homepage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Products from './ProductPage/Productpage';
import ProductDetails from './ProductPage/productdetail';
import Footer from './Component/footer';
import CartPage from './cart/cartPage';
import OrderSummary from './OrderBilling/OrderSummary';
import OrderTracking from './OrderBilling/OrderTracking';
import Watchlist from './myAccount/Watchlist';
import Favorites from './myAccount/Favorites';
import UserInfo from './myAccount/UserInfo';
import MyAccountLayout from './myAccount/MyAccountLayout';
import Notifications from './myAccount/Notifications';
import Orders from './myAccount/Orders';
import Register from './authentication/Register';
import Login from './authentication/Login';
import AuthCard from './authentication/AuthCard';
import ProtectedRoute from './components/ProtectedRoute';
import PaymentCheckout from './OrderBilling/PaymentCheckout';

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/products" element={<Products/>}/>
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/paymentCheckout" element={<PaymentCheckout />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/track-order" element={<OrderTracking />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/authcard" element={<AuthCard />} />
          <Route path="/myaccount/*" element={
          <ProtectedRoute>
            <MyAccountLayout />
          </ProtectedRoute>
        } />

          <Route path="/myaccount" element={<MyAccountLayout />}>
            <Route index element={<Navigate to="user-info" replace />} />
            <Route path="user-info" element={<UserInfo />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="watchlist" element={<Watchlist />} />
            <Route path="orders" element={<Orders />} />
            <Route path="notifications" element={<Notifications />} />
        </Route>

      </Routes>
      <Footer/>
    </Router>
  );
}
export default App;
