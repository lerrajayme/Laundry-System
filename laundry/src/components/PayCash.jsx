import React, { useEffect, useMemo, useState } from 'react';
import { FaBell, FaUserCircle, FaHeadset, FaAddressCard, FaCheckCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from 'react-icons/gi';
import { VscFeedback, VscCalendar } from 'react-icons/vsc';
import { IoArrowBackCircle } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './styles/PayCash.css';

const PayCash = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const storedState = JSON.parse(localStorage.getItem('customerPaymentState'));

  const initialState = useMemo(() => {
    return location.state || storedState || {};
  }, [location.state, storedState]);

  const {
    customerData = {},
    bookingData = {},
    pricing = {},
    shopDetails = {}
  } = initialState;

  const subtotal = pricing.subtotal || 0;
  const bookingFee = pricing.bookingFee || 0;
  const total = pricing.total || 0;

  useEffect(() => {
    localStorage.setItem('customerPaymentState', JSON.stringify(initialState));
  }, [initialState]);

  const handleConfirmPayment = () => {
    setShowSuccessPopup(true);
    
    // Automatically navigate after 3 seconds
    setTimeout(() => {
      localStorage.removeItem('customerPaymentState');
      navigate('/customer', { state: { customerData, bookingData, pricing, shopDetails } });
    }, 3000);
  };

  const handleBack = () => {
    navigate('/customer-payment', { state: initialState });
  };

  return (
    <div className="dashboard-container">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="payment-success-popup">
          <div className="popup-content">
            <FaCheckCircle className="success-icon" />
            <h2>Booked!</h2>
            <p>Your order has been placed successfully.</p>
          </div>
        </div>
      )}

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
          <IoArrowBackCircle className="back-button" onClick={handleBack} />
          <h1 className="book-title">CASH PAYMENT</h1>
        </div>

        <div className="payment-content">
          <div className="booking-summary-container">
            <h1 className="payment-title">Pay Cash</h1>

            <div className="booking-totals">
              <h2>Booking Total</h2>

              <div className="price-row">
                <span>Subtotal: </span>
                <span>₱{subtotal.toFixed(2)}</span>
              </div>

              <div className="price-row">
                <span>Booking Fee: </span>
                <span>₱{bookingFee.toFixed(2)}</span>
              </div>

              <div className="total-row">
                <span>Total: </span>
                <span>₱{total.toFixed(2)}</span>
              </div>
            </div>

            <button className="place-order-btn" onClick={handleConfirmPayment}>Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayCash;