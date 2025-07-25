import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
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
import BookService from './components/BookService';
import LaundryShopDetails from './components/LaundryShopDetails';
import CustomerLogout from './components/CustomerLogout';
import BookingForm from './components/BookingForm';
import CustomerPayment from './components/CustomerPayment';
import PayCash from './components/PayCash';
import OwnerDashboard from './components/OwnerHomePage';
import OwnerProfile from './components/OwnerProfile';
import OwnerNotification from './components/OwnerNotification';
import OwnerLogout from './components/OwnerLogout';
import ManageUsers from './components/ManageUsers';
import ManageOrders from  './components/ManageOrders';
import Reports from './components/Reports';
import ServiceList from './components/ServiceList';
import AdminPage from './components/Admin';
import './App.css';



function AppWrapper() {
  const location = useLocation();
  
  // Add paths where you want the Content to show
  const showContentOn = ['/', '/login', '/register', '/forgot-password', '/verify-code', '/reset',
    '/password-reset-success'];
  const showContent = showContentOn.includes(location.pathname);

    // Hide Navbar for dashboard routes
    const hideNavbarOn = ['/customer', '/profile', '/notifications', '/addresscustomer', '/order-history', '/book-service',
      '/laundry-details', '/customer-logout', '/booking-form', '/customer-payment', '/pay-with-cash', '/owner', '/profile-owner', 
      '/notification-owner', '/owner-logout', '/manage-users', '/manage-orders', '/reports', '/admin',
      '/service-list',
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

          {/*Admin*/}
          <Route path="/admin" element={<AdminPage />} />

          {/* Customer Sidebar & Navbar*/}
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/customer-support" element={<CustomerSupport />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addresscustomer" element={<AddressCustomer />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/customer-logout" element={<CustomerLogout />} />
          <Route path="/customer" element={<CustomerDashboard />} />

          {/* Authentication & Landing Page */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} /> 
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/password-reset-success" element={<PasswordResetSuccess />} />
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<FAQs />} />
          
         
         {/*Owner*/}
         <Route path="/owner" element={<OwnerDashboard />} />
         <Route path="/profile-owner" element={<OwnerProfile />} />
         <Route path="/notification-owner" element={<OwnerNotification />} />
         <Route path="/owner-logout" element={<OwnerLogout />} />
         <Route path="/manage-users" element={<ManageUsers />} />
         <Route path="/manage-orders" element={<ManageOrders />} />
         <Route path="/reports" element={<Reports />} />
         <Route path='/service-list' element={<ServiceList />} />
  
          
  

          {/* Book Service Process */}
          <Route path="/book-service" element={<BookService />} />
          <Route path="/laundry-details" element={<LaundryShopDetails />} />
          <Route path="/booking-form" element={<BookingForm />} />
          <Route path="/customer-payment" element={<CustomerPayment />} />
          <Route path="/pay-with-cash" element={<PayCash />} />
          

        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <AppWrapper />
      </Router>
    </LocalizationProvider>
  );
}

export default App;
