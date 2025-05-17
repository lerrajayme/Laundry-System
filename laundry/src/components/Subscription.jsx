import React from 'react';
import { FaBell, FaUserCircle, FaHeadset, FaAddressCard, FaCheck } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from 'react-icons/gi';
import { VscFeedback, VscCalendar } from 'react-icons/vsc';
import { IoArrowBackCircle } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Subscription.css';

const Subscription = () => {
    const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/customer-payment'); // Adjust this path to match your payment route
  };
  
  return (
    <div className="dashboard-container">
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

      <div className="sidebar">
        <Link to="/book-service"><button><VscCalendar className="side-icon" /> Book a Service</button></Link>
        <Link to="/addresscustomer"><button><FaAddressCard className="side-icon" /> Address Management</button></Link>
        <Link to="/order-history"><button><GiBeachBag className="side-icon" /> Order History</button></Link>
        <Link to="/feedback"><button><VscFeedback className="side-icon" /> Feedback & Ratings</button></Link>
        <div className="logout">
          <Link to="/customer-logout"><button className="logout-btn"><FiLogOut className="side-icon" /> Logout</button></Link>
        </div>
      </div>

      <div className="main-book">
        <div className="book-section">
          <div className="book-header">
            <Link to="/booking-form"><IoArrowBackCircle className="back-button" /></Link>
            <h1 className="book-title">SUBSCRIPTION PLANS</h1>
          </div>
        
          <div className='sub-header'>
            <div className='sub-titles'>
              <h2>Choose a Subscription Plan</h2>
            </div>
          </div>

          <div className="plans-wrapper">
            {/* BASIC PLAN */}
            <div className="plan-card basic-plan">
              <div className="plan-header basic-header">
                <h3 className="plan-name">BASIC PLAN</h3>
              </div>
              <div className="plan-content">
                <div className="plan-feature">
                  <FaCheck className="check-icon" />
                  <p>Twice a week automatic booking for pickup & delivery</p>
                </div>
                <div className="feature-divider"></div>
              </div>
              <div className="plan-footer">
                <p className="plan-price">₱199 / month</p>
                <button className="subscribe-btn basic-btn">SUBSCRIBE</button>
              </div>
            </div>

            {/* STANDARD PLAN */}
            <div className="plan-card standard-plan">
              <div className="plan-header standard-header">
                <h3 className="plan-name">STANDARD PLAN</h3>
              </div>
              <div className="plan-content">
                <div className="plan-feature">
                  <FaCheck className="check-icon" />
                  <p>Three times a week automatic booking for pickup & delivery.</p>
                </div>
                <div className="feature-divider"></div>
                <div className="plan-feature">
                  <FaCheck className="check-icon" />
                  <p>10% discount on booking fee</p>
                </div>
                <div className="feature-divider"></div>
              </div>
              <div className="plan-footer">
                <p className="plan-price">₱299 / month</p>
                <button className="subscribe-btn standard-btn">SUBSCRIBE</button>
              </div>
            </div>

            {/* PREMIUM PLAN */}
            <div className="plan-card premium-plan">
              <div className="plan-header premium-header">
                <h3 className="plan-name">PREMIUM PLAN</h3>
              </div>
              <div className="plan-content">
                <div className="plan-feature">
                  <FaCheck className="check-icon" />
                  <p>Daily automatic booking for pickup and delivery</p>
                </div>
                <div className="feature-divider"></div>
                <div className="plan-feature">
                  <FaCheck className="check-icon" />
                  <p>15% discount on total service fees</p>
                </div>
                <div className="feature-divider"></div>
                <div className="plan-feature">
                  <FaCheck className="check-icon" />
                  <p>Priority scheduling or free express service</p>
                </div>
              </div>
              <div className="plan-footer">
                <p className="plan-price">₱399 / month</p>
                <button className="subscribe-btn premium-btn">SUBSCRIBE</button>
              </div>
            </div>
          </div>

          <div className="continue-container">
            <p className="continue-text">Continue without a subscription?</p>
            <button className="continue-btn" onClick={handleContinue}>CONTINUE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;