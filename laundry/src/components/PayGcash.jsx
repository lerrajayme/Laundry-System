import React from 'react';
import { FaBell, FaUserCircle, FaHeadset, FaAddressCard } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from 'react-icons/gi';
import { VscFeedback, VscCalendar } from 'react-icons/vsc';
import { IoArrowBackCircle } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import qrcode from '../assets/qr.jpg';
import './styles/PayGcash.css';

const PayGcash = () => {
  return (
    <div className="dashboard-container">
      {/* Navbar */}
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

      {/* Sidebar */}
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
          <Link to="/customer-payment"><IoArrowBackCircle className="back-button" /></Link>
          <h1 className="book-title">GCASH PAYMENT</h1>
        </div>

        <div className="payment-content">
          <div className="payment-grid-container">
            {/* Booking Totals Section */}
            <div className="booking-summary-container">
              <h1 className="payment-title">Pay GCash</h1>
              
              <div className="booking-totals">
                <h2>Booking Total</h2>
                
                <div className="price-row">
                  <span>Subtotal: </span>
                  <span>₱449.00</span>
                </div>
                
                <div className="price-row">
                  <span>Booking Fee: </span>
                  <span>₱10.00</span>
                </div>
                
                <div className="total-row">
                  <span>Total: </span>
                  <span>₱459.00</span>
                </div>
              </div>
            </div>

            {/* GCash QR Code Section */}
            <div className="gcash-qr-container">
              <div className="qr-code-box">
                <img t
                  src= {qrcode}
                  alt="GCash QR Code" 
                  className="qr-code-image"
                />
                <p className="gcash-instructions">Scan this QR code to pay via GCash</p>
              </div>
              <button className="place-order">Pay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayGcash;