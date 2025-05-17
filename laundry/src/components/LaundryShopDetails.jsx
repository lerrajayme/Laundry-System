import React from 'react';
import {
  FaBell, FaUserCircle, FaHeadset, FaAddressCard,
  FaMapMarkerAlt, FaPhoneAlt, FaClock
} from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from "react-icons/gi";
import { VscFeedback, VscCalendar } from "react-icons/vsc";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import laundryImage from '../assets/laundryshop.jpg';
import './styles/LaundryShopDetails.css';

const LaundryShopDetails = () => {
  return (
    <div className="dashboard-container">
      
      {/* Navbar */}
      <div className="navbar-customer">
        <Link to="/customer" className="logo-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4666/4666163.png"
            alt="Logo"
            className="logoImg"
          />
          <div className="logo">Laundry Wise Co.</div>
        </Link>

        <div className="nav-right">
          <Link to='/customer-support'>
            <FaHeadset className="icon" title="Customer Support" />
          </Link>
          <Link to='/notifications'>
            <FaBell className="icon" title="Notifications" />
          </Link>
          <Link to='/profile'>
            <FaUserCircle className="icon" title="Profile" />
          </Link>
        </div>
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <Link to="/book-service">
          <button><VscCalendar className='side-icon' /> Book a Service</button>
        </Link>
        <Link to="/addresscustomer">
          <button><FaAddressCard className='side-icon' /> Address Management</button>
        </Link>
        <Link to="/order-history">
          <button><GiBeachBag className='side-icon' /> Order History</button>
        </Link>
        <Link to="/feedback">
          <button><VscFeedback className='side-icon' /> Feedback & Ratings</button>
        </Link>

        <div className="logout">
          <Link to="/customer-logout">
            <button className="logout-btn">
              <FiLogOut className='side-icon' /> Logout
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-details">
        <div className="details-section">
          <div className="details-header">
            <Link to="/book-service">
              <IoArrowBackCircle className="back-button" title="Back to Home" />
            </Link>
            <h1 className="details-title">LAUNDRY SHOP DETAILS</h1>
          </div>

          {/* Laundry Card inside details-section */}
          <div className='laundry-details'>
            <div className="laundry-card">
              <img
                src={laundryImage}
                alt="Mr. Labandero Laundry"
                className="laundry-img"
              />
              <div className="laundry-info">
                <h2>Denhart's Launderland</h2>
                <p><FaMapMarkerAlt className="icon-inline" /> Gaabucayan Street, Corrales ex, CDO</p>
                <p><FaPhoneAlt className="icon-inline" /> +63 935 902 8261</p>
                <p><FaClock className="icon-inline" /> Operating Hours: Mon - Sun, 8 AM - 7 PM</p>

                <h3>Services and Price</h3>
                <div className="services-list">
                  <div>
                    <p><strong>Wash – 60</strong></p>
                    <p>Maximum of 7 kilos</p>
                  </div>
                  <div>
                    <p><strong>Wash – 60</strong></p>
                    <p>Comforter/Blanket<br />Maximum of 4 kilos</p>
                  </div>
                  <div>
                    <p><strong>Wash, Dry & Fold – 190.00</strong></p>
                    <p>Maximum of 7 kilos<br />Free Detergent, Fabcon and Fold</p>
                  </div>
                </div>

                <Link to='/booking-form'>
                <button className="book-btn">BOOK</button>
                </Link>
                
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LaundryShopDetails;
