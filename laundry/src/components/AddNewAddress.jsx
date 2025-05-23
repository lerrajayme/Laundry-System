import React from 'react';
import { FaBell, FaUserCircle, FaHeadset, FaAddressCard } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from "react-icons/gi";
import { VscFeedback, VscCalendar } from "react-icons/vsc";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import './styles/AddNewAddress.css';

const AddNewAddress = () => {
  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <div className="navbar-customer">
        <Link to="/customer" className="logo-container">
          <img src="https://cdn-icons-png.flaticon.com/512/4666/4666163.png" alt="Logo" className="logoImg" />
          <div className="logo">Laundry Wise Co.</div>
        </Link>
        <div className="nav-right">
          <Link to='/customer-support'><FaHeadset className="icon" /></Link>
          <Link to='/notifications'><FaBell className="icon" /></Link>
          <Link to='/profile'><FaUserCircle className="icon" /></Link>
        </div>
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <Link to="/book-service"><button><VscCalendar className='side-icon' /> Book a Service</button></Link>
        <Link to="/addresscustomer"><button><FaAddressCard className='side-icon' /> Address Management</button></Link>
        <Link to="/order-history"><button><GiBeachBag className='side-icon' /> Order History</button></Link>
        <Link to="/feedback"><button><VscFeedback className='side-icon' /> Feedback & Ratings</button></Link>
        <div className="logout">
          <Link to="/customer-logout"><button className="logout-btn"><FiLogOut className='side-icon' /> Logout</button></Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-address">
        <div className='address-section'>
        <div className="address-header">
          <Link to="/addresscustomer">
            <IoArrowBackCircle className="back-button" />
          </Link>
          <h1 className="address-title">ADD NEW ADDRESS</h1>
        </div>
        
        <div className="address-container">
          <div className="address-form-wrapper">
            <div className="form-group">
              <label className="form-label">Address Label (e.g. Home)</label>
              <input 
                type="text" 
                placeholder="Enter address label" 
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Full Address</label>
              <textarea 
                placeholder="Street, Barangay, City, Province, ZIP Code" 
                className="form-input address-textarea"
                rows="4"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Contact Number</label>
              <input 
                type="tel" 
                placeholder="+63 9XX XXX XXXX" 
                className="form-input"
              />
            </div>
            
            <Link to='/addresscustomer'>
            <button className="save-address-btn">Save Address</button>
            </Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewAddress;