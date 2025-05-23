import React from 'react';
import { FaBell, FaUserCircle, FaHeadset, FaAddressCard } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from 'react-icons/gi';
import { VscFeedback, VscCalendar } from 'react-icons/vsc';
import { IoArrowBackCircle } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import './styles/CustomerPayment.css';

const CustomerPayment = () => {
  // Mock data with placeholders
  const customerInfo = {
    name: "Maria Santos",
    email: "maria.santos@example.com",
    phone: "09123456789",
    address: "123 Main Street, Quezon City"
  };

  const bookingInfo = {
    pickupDate: "12/15/2023",
    pickupTime: "10:00 AM",
    services: [
      { name: "Wash & Fold: ", price: 150 },
      { name: "Subscription: ", price: 299 }
    ]
  };

  const pricing = {
    subtotal: bookingInfo.services.reduce((sum, service) => sum + service.price, 0),
    bookingFee: 10.00,
    total: 0
  };
  pricing.total = pricing.subtotal + pricing.bookingFee;

  return (
    <div className="dashboard-container">
      {/* Navbar - unchanged */}
      <div className="navbar-customer">
        <Link to="/customer" className="logo-container">
          <img src="https://cdn-icons-png.flaticon.com/512/4666/4666163.png" alt="Logo" className="logoImg" />
          <div className="logo">Laundry Wise Co.</div>
        </Link>
        <div className="nav-right">
          <Link to="/customer-support"><FaHeadset className="icon" /></Link>
          <Link to="/notifications"><FaBell className="icon" /></Link>
          <Link to="/profile"><FaUserCircle className="icon" /></Link>
        </div>
      </div>

      {/* Sidebar - unchanged */}
      <div className="sidebar">
        <Link to="/book-service"><button><VscCalendar className="side-icon" /> Book a Service</button></Link>
        <Link to="/addresscustomer"><button><FaAddressCard className="side-icon" /> Address Management</button></Link>
        <Link to="/order-history"><button><GiBeachBag className="side-icon" /> Order History</button></Link>
        <Link to="/feedback"><button><VscFeedback className="side-icon" /> Feedback & Ratings</button></Link>
        <div className="logout">
          <Link to="/customer-logout"><button className="logout-btn"><FiLogOut className="side-icon" /> Logout</button></Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-book">
        <div className="book-header">
          <Link to="/booking-form"><IoArrowBackCircle className="back-button" /></Link>
          <h1 className="book-title">CUSTOMER PAYMENT</h1>
        </div>

        <div className="payment-summary">
          {/* Customer Information with Placeholders */}
          <div className="section">
            <h2>Customer Details</h2>
            <div className="info-input-container">
              <input 
                type="text" 
                value={customerInfo.name} 
                readOnly
                className="info-input"
                placeholder="Complete Name"
              />
            </div>
            <div className="info-input-container">
              <input 
                type="email" 
                value={customerInfo.email} 
                readOnly
                className="info-input"
                placeholder="Email Address"
              />
            </div>
            <div className="info-input-container">
              <input 
                type="tel" 
                value={customerInfo.phone} 
                readOnly
                className="info-input"
                placeholder="Contact Number"
              />
            </div>
            <div className="info-input-container">
              <input 
                type="text" 
                value={customerInfo.address} 
                readOnly
                className="info-input"
                placeholder="Delivery Address"
              />
            </div>
          </div>

          {/* Booking Information with Placeholders */}
          <div className="section">
            <h2>Booking Details</h2>
            <div className="info-input-container">
              <input
                type="text"
                value={bookingInfo.pickupDate}
                readOnly
                className="info-input"
                placeholder="Pickup Date (MM/DD/YYYY)"
              />
            </div>
            <div className="info-input-container">
              <input
                type="text"
                value={bookingInfo.pickupTime}
                readOnly
                className="info-input"
                placeholder="Pickup Time"
              />
            </div>
            <div className="services-list">
              {bookingInfo.services.map((service, index) => (
                <div key={index} className="service-item">
                  <span>{service.name}</span>
                  <span>₱{service.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary - unchanged */}
          <div className="section">
            <h2>Payment Summary</h2>
            <div className="price-row">
              <span>Subtotal:</span>
              <span>₱{pricing.subtotal.toFixed(2)}</span>
            </div>
            <div className="price-row">
              <span>Booking Fee:</span>
              <span>₱{pricing.bookingFee.toFixed(2)}</span>
            </div>
            <div className="price-row">
              <span>Total: </span>
              <span>₱{pricing.total.toFixed(2)}</span>
            </div>
          </div>

         <div className="payment-options">
          <h2>Choose a payment method</h2>
          <div className="payment-buttons-container">
            <Link to='/pay-with-cash'>
            <button className="payment-cash">Pay with Cash</button>
            </Link>
            <Link to='/pay-with-gcash'>
            <button className="payment-gcash">Pay with GCash</button>
            </Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPayment;