import React from 'react';
import { FaBell, FaUserCircle, FaHeadset, FaAddressCard, FaMapMarkerAlt } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from "react-icons/gi";
import { VscFeedback, VscCalendar } from "react-icons/vsc";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom'; 
import './styles/BookService.css';

const laundryShops = [
  {
    id: 1,
    name: "Denhart's Launderland",
    address: "Gaabacuyan St., Corrales Ex, CDO",
    // Add more details you want to show on the details page
    description: "Premium laundry services with eco-friendly detergents",
    services: ["Wash & Fold", "Dry Cleaning", "Ironing"],
    hours: "8:00 AM - 8:00 PM",
    contact: "09123456789"
  },
  {
    id: 2,
    name: "Ms. Labandera Laundry Hub",
    address: "Market City, Valenzuela RD, Lapasan",
    description: "Fast and affordable laundry services",
    services: ["Wash & Fold", "Ironing"],
    hours: "7:00 AM - 7:00 PM",
    contact: "09234567890"
  },
  {
    id: 3,
    name: "Wash Tub Laundry Hub",
    address: "Osmena Ext, 9000",
    description: "Self-service and full-service options available",
    services: ["Self-Service", "Wash & Fold", "Dry Cleaning"],
    hours: "24/7",
    contact: "09345678901"
  },
];


const BookService = () => {
  const navigate = useNavigate();

  const handleViewDetails = (shop) => {
    navigate('/laundry-details', { state: { shop } });
  };
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
      <div className="main-book">
        <div className="book-section">
          <div className="book-header">
            <Link to="/customer">
            <IoArrowBackCircle className="back-button" title="Back to Home" />
            </Link>
          <h1 className="book-title">LAUNDRY SHOPS</h1>
          </div>
        </div>

      <div className='sub-header'>
        <div className='sub-title'>
            <h2>Choose a Laundry Shop to book a service</h2>
        </div>
      </div>

      <div className="shop-list">
      {laundryShops.map((shop) => (
        <div className="shop-card-landscape" key={shop.id}>
          <div className="image-placeholder" />
          <div className="shop-content">
            <h3 className="shop-name">{shop.name || "Unnamed Laundry Shop"}</h3>
            {shop.address && (
              <p className="shop-address">
                <FaMapMarkerAlt className="icon" />
                {shop.address}
              </p>
            )}
            <button 
              className="view-button"
              onClick={() => handleViewDetails(shop)}
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
    </div>
    </div>
  );
};

export default BookService;
