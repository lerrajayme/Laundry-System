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
import CustomerLogout from './components/CustomerLogout';
import BookingForm from './components/BookingForm';
import CustomerPayment from './components/CustomerPayment';
import Subscription from './components/Subscription';
import PayCash from './components/PayCash';
import PayGcash from './components/PayGcash';
import AddNewAddress from './components/AddNewAddress';
import OwnerDashboard from './components/OwnerHomePage';
import OwnerProfile from './components/OwnerProfile';
import OwnerNotification from './components/OwnerNotification';
import './App.css';



function AppWrapper() {
  const location = useLocation();
  
  // Add paths where you want the Content to show
  const showContentOn = ['/', '/login', '/register', '/forgot-password', '/verify-code', '/resetpassword',
    '/password-reset-success'];
  const showContent = showContentOn.includes(location.pathname);

    // Hide Navbar for dashboard routes
    const hideNavbarOn = ['/customer', '/profile', '/notifications', '/addresscustomer', '/order-history', '/feedback', '/book-service',
      '/laundry-details', '/customerlogout', '/booking-form', '/subscription', '/customer-payment', '/pay-with-cash', '/pay-with-gcash', 
      '/new-address', '/owner', '/profile-owner', '/notification-owner',
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

          {/* Customer Sidebar & Navbar*/}
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/customer-support" element={<CustomerSupport />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addresscustomer" element={<AddressCustomer />} />
          <Route path="/new-address" element={<AddNewAddress />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/feedback" element={<FeedbackRatings />} />
          <Route path="/customer-logout" element={<CustomerLogout />} />
          <Route path="/customer" element={<CustomerDashboard />} />

          {/* Authentication & Landing Page */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} /> 
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/password-reset-success" element={<PasswordResetSuccess />} />
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<FAQs />} />
         
         {/*Owner*/}
         <Route path="/owner" element={<OwnerDashboard />} />
         <Route path="/profile-owner" element={<OwnerProfile />} />
         <Route path="/notification-owner" element={<OwnerNotification />} />
          
  
          
  

          {/* Book Service Process */}
          <Route path="/book-service" element={<BookService />} />
          <Route path="/laundry-details" element={<LaundryShopDetails />} />
          <Route path="/booking-form" element={<BookingForm />} />
          <Route path="/customer-payment" element={<CustomerPayment />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/pay-with-cash" element={<PayCash />} />
          <Route path="/pay-with-gcash" element={<PayGcash />} />

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
