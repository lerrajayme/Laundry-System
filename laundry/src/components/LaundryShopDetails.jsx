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
import './styles/LaundryShopDetails.css';

const LaundryShopDetails = () => {
  const location = useLocation();
  const { shop } = location.state || {};

  // If no shop data was passed, show error and return early
  if (!shop) {
    return (
      <div className="dashboard-container">
        <div className="error-message">
          <h2>No shop data available</h2>
          <Link to="/book-service">
            <button className="back-button">Go Back to Shops</button>
          </Link>
        </div>
      </div>
    );
  }

  // Process services data safely
  const safeServices = shop.services?.map(service => ({
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
                src={shop.image} // Use the image from props
                alt={shop.name}
                className="laundry-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/400x250?text=Laundry+Shop";
                }}
              />

              <div className="laundry-info">
                <h2>{shop.name}</h2>
                <p><FaMapMarkerAlt className="icon-inline" /> {shop.address}</p>
                <p><FaPhoneAlt className="icon-inline" /> {shop.contact}</p>
                <p><FaClock className="icon-inline" /> Operating Hours: {shop.hours}</p>

                <h3>Services and Price</h3>
                <div className="services-list">
                  {safeServices.map((service, index) => (
                    <div className="service-card" key={index}>
                      <div className="service-name">{service.name}</div>
                      <div className="service-price">{service.price}</div>
                      <div className="service-description">
                        {service.description.split('\n').map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="book-btn-container">
                  <Link 
                    to="/booking-form" 
                    state={{ shop: shop }}  // Ensure this is correct
                  >
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