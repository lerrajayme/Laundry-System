import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import Signup from './components/Signup';
import About from './components/About';
import FAQs from './components/FAQs';
import Content from './components/Content';
import ForgotPassword from './components/ForgotPassword';
import VerifyCode from './components/VerifyCode';
import ResetPassword from './components/ResetPassword';
import PasswordResetSuccess from './components/PasswordResetSuccess';
import CustomerDashboard from './components/CustomerHomePage';
import Notifications from './components/Notifications';
import CustomerSupport from './components/CustomerSupport';
import Profile from './components/Profile';
import AddressCustomer from './components/AddressCustomer';
import OrderHistory from './components/OrderHistory';
import FeedbackRatings from './components/FeedbackRatings';
import BookService from './components/BookService';
import LaundryShopDetails from './components/LaundryShopDetails';
import './App.css';



function AppWrapper() {
  const location = useLocation();
  
  // Add paths where you want the Content to show
  const showContentOn = ['/', '/login', '/register', '/forgot-password', '/verify-code', '/resetpassword',
    '/password-reset-success'];
  const showContent = showContentOn.includes(location.pathname);

    // Hide Navbar for dashboard routes
    const hideNavbarOn = ['/customer', '/profile', '/notifications', '/addresscustomer', '/order-history', '/feedback', '/book-service',
      '/laundry-details'
    ];
    const showNavbar = !hideNavbarOn.includes(location.pathname);
    
  return (
    <>
      {showNavbar && <Navbar />}

      {showContent && (
        <div className="content-wrapper">
          <Content />
        </div>
      )}
      <div className="page-content">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} /> 
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/password-reset-success" element={<PasswordResetSuccess />} />
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/customer-support" element={<CustomerSupport />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications/>} />
          <Route path="/addresscustomer" element={<AddressCustomer />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/feedback" element={<FeedbackRatings />} />
          <Route path="/book-service" element={<BookService />} />
          <Route path="/laundry-details" element={<LaundryShopDetails />} />
          <Route path="/faqs" element={<FAQs />} />

        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
