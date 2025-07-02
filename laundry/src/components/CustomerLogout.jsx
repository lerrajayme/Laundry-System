import React from 'react';
import { FaBell, FaUserCircle, FaHeadset, FaAddressCard } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from "react-icons/gi";
import { VscCalendar } from "react-icons/vsc";
import { Link, useNavigate } from 'react-router-dom';
import './styles/CustomerLogout.css';

const CustomerLogout = () => {
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    // Redirect to login page
    navigate('/login');
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  };

  const handleCancel = () => {
    navigate('/customer'); // Return to dashboard if cancel
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
        
        <div className="logout">
          <Link to="/customer-logout">
            <button className="logout-btn">
              <FiLogOut className='side-icon' /> Logout
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="logout-modal-wrapper">
        <div className="logout-modal">
          <h2>LOGOUT CONFIRMATION</h2>
          <p>Are you sure you want to log out?</p>
          <div className="logout-buttons">
            <button className="confirm-btn" onClick={handleConfirmLogout}>Confirm</button>
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogout;