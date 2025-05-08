import React from 'react';
import { FaBell, FaUserCircle, FaHeadset, FaAddressCard, FaMapMarkerAlt } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from "react-icons/gi";
import { VscFeedback, VscCalendar } from "react-icons/vsc";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom'; 
import './styles/BookService.css';

const laundryShops = [
  {
    name: "Denhart’s Launderland",
    address: "Gaabacuyan St., Corrales Ex, CDO",
  },
  {
    name: "Ms. Labandera Laundry Hub",
    address: "Market City, Valenzuela RD, Lapasan",
  },
  {
    name: "Wash Tub Laundry Hub",
    address: "Osmena Ext, 9000",
  },
  { name: "", address: "" },
  { name: "", address: "" },
  { name: "", address: "" },
];

const BookService = () => {
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
    <Link to="/">
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
        {laundryShops.map((shop, index) => (
          <div className="shop-card-landscape" key={index}>
            <div className="image-placeholder" />
            <div className="shop-content">
              <h3 className="shop-name">{shop.name || "Unnamed Laundry Shop"}</h3>
              {shop.address && (
                <p className="shop-address">
                  <FaMapMarkerAlt className="icon" />
                  {shop.address}
                </p>
              )}
              <Link to='/laundry-details'>
              <button className="view-button">View Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default BookService;
