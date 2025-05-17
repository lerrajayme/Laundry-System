import React, { useState } from 'react';
import { FaBell, FaUserCircle, FaHeadset, FaAddressCard } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from 'react-icons/gi';
import { VscFeedback, VscCalendar } from 'react-icons/vsc';
import { IoArrowBackCircle } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import './styles/CustomerPayment.css';

const CustomerPayment = ({ bookingDetails }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pickupDate: "",
    pickupTime: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const pricing = {
    subtotal: bookingDetails?.subtotal || 500.00,
    bookingFee: 10.00,
    total: (bookingDetails?.subtotal || 500.00) + 10.00
  };

  return (
    <div className="dashboard-container">
      {/* Navbar remains the same */}
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

      {/* Sidebar remains the same */}
      <div className="sidebar">
        <Link to="/book-service"><button><VscCalendar className="side-icon" /> Book a Service</button></Link>
        <Link to="/addresscustomer"><button><FaAddressCard className="side-icon" /> Address Management</button></Link>
        <Link to="/order-history"><button><GiBeachBag className="side-icon" /> Order History</button></Link>
        <Link to="/feedback"><button><VscFeedback className="side-icon" /> Feedback & Ratings</button></Link>
        <div className="logout">
          <Link to="/customer-logout"><button className="logout-btn"><FiLogOut className="side-icon" /> Logout</button></Link>
        </div>
      </div>

      {/* Main content area - simplified structure */}
      <div className="main-book">
        <div className="book-header">
          <Link to="/booking-form"><IoArrowBackCircle className="back-button" /></Link>
          <h1 className="book-title">CUSTOMER PAYMENT</h1>
        </div>

        {/* Booking summary placed directly in main content */}
        <div className="payment-summary">
          {/* Information Section */}
          <div className="section">
            <h2>Information</h2>
            <div className="info-row">
              <span className="info-label">Complete Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="info-input"
              />
            </div>
            <div className="info-row">
              <span className="info-label">Email Address</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                className="info-input"
              />
            </div>
            <div className="info-row">
              <span className="info-label">Contact Number</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="0912 345 6789"
                className="info-input"
              />
            </div>
            <div className="info-row">
              <span className="info-label">Address</span>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Street, City, Province"
                className="info-input"
              />
            </div>
          </div>

          {/* Booking Section */}
          <div className="section">
            <h2>Booking</h2>
            <div className="info-row">
              <span className="info-label">Date of pick up</span>
              <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleInputChange}
                className="info-input"
              />
            </div>
            <div className="info-row">
              <span className="info-label">Select time for pick up</span>
              <select
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleInputChange}
                className="info-input"
              >
                <option value="">Select time</option>
                <option value="08:00 AM">08:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
              </select>
            </div>
          </div>

          {/* Rest of your sections remain the same */}
          <div className="section">
            <h2>Booking Total</h2>
            <div className="price-row">
              <span className="price-label">Subtotal</span>
              <span className="price-value">₱ {pricing.subtotal.toFixed(2)}</span>
            </div>
            <div className="price-row">
              <span className="price-label">Order and Booking Fee</span>
              <span className="price-value">₱ {pricing.bookingFee.toFixed(2)}</span>
            </div>
          </div>

          <div className="section">
            <h2>Order and Booking Payment</h2>
            <div className="payment-options">
              <button className="payment-btn">Cash</button>
              <button className="payment-btn">Gcash</button>
            </div>
            <div className="total-section">
              <span className="total-label">Total</span>
              <span className="total-value">₱ {pricing.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPayment;