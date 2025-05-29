import React from 'react';
import {
  FaBell, FaUserCircle, FaHeadset, FaAddressCard,
  FaMapMarkerAlt, FaPhoneAlt, FaClock
} from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from "react-icons/gi";
import { VscFeedback, VscCalendar } from "react-icons/vsc";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link, useLocation } from 'react-router-dom';
import laundryImage from '../assets/laundryshop.jpg';
import './styles/LaundryShopDetails.css';

const LaundryShopDetails = () => {
  const location = useLocation();
  const { shop } = location.state || {};

  // Default shop data with proper service structure
  const defaultShop = {
    id: 1,
    name: "Denhart's Launderland",
    address: "Gaabucayan Street, Corrales ex, CDO",
    contact: "+63 935 902 8261",
    hours: "Mon - Sun, 8 AM - 7 PM",
    services: [
      {
        name: "Wash",
        price: "60",
        description: "Maximum of 7 kilos"
      },
      {
        name: "Wash",
        price: "60",
        description: "Comforter/Blanket\nMaximum of 4 kilos"
      },
      {
        name: "Wash, Dry & Fold",
        price: "190.00",
        description: "Maximum of 7 kilos\nFree Detergent, Fabcon and Fold"
      }
    ]
  };

  const currentShop = shop || defaultShop;

  // Ensure services exist and have proper structure
  const safeServices = currentShop.services?.map(service => ({
    name: service.name || "Service",
    price: service.price || "0",
    description: service.description || "No description available"
  })) || [];

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
              <div className="details-header">
                <Link to="/book-service">
                <IoArrowBackCircle className="back-button" title="Back to Home" />
                </Link>
              <h1 className="details-title">LAUNDRY DETAILS</h1>
              </div>
            

          {/* Laundry Card */}
          <div className='laundry-details'>
            <div className="laundry-card">
              <img
                src={laundryImage}
                alt={currentShop.name}
                className="laundry-img"
              />
              <div className="laundry-info">
                <h2>{currentShop.name}</h2>
                <p><FaMapMarkerAlt className="icon-inline" /> {currentShop.address}</p>
                <p><FaPhoneAlt className="icon-inline" /> {currentShop.contact}</p>
                <p><FaClock className="icon-inline" /> Operating Hours: {currentShop.hours}</p>

                <h3>Services and Price</h3>
                <div className="services-list">
                  {safeServices.map((service, index) => (
                    <div key={index}>
                      <p><strong>{service.name} - {service.price}</strong></p>
                      {service.description && service.description.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  ))}
                </div>

                <Link 
                  to='/booking-form' 
                  state={{ shop: currentShop }}
                  className="book-btn-link"
                >
                  <button className="book-btn">BOOK</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
};

export default LaundryShopDetails;