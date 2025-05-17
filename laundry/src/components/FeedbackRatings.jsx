import React from 'react';
import { FaBell, FaUserCircle, FaHeadset, FaAddressCard } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from "react-icons/gi";
import { VscFeedback, VscCalendar } from "react-icons/vsc";
import { Link } from 'react-router-dom'; 
import './styles/FeedbackRatings.css';


const FeedbackRatings = () => {
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
      <div className="main-content">
        
      </div>
    </div>
  );
};

export default FeedbackRatings;
