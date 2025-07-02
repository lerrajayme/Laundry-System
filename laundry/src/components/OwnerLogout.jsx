import React from 'react';
import { FaBell, FaUserCircle, FaHeadset } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from "react-icons/gi";
import { GrBusinessService } from "react-icons/gr";
import { TbReport } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import './styles/OwnerLogout.css';

const OwnerLogout = () => {
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    // Do logout logic here
      navigate('/login');
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  };

  const handleCancel = () => {
    navigate('/owner'); // balik to dashboard kung cancel
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <div className="navbar-owner">
        <Link to="/owner" className="logo-container">
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
          <Link to='/notifications-owner'>
            <FaBell className="icon" title="Notifications" />
          </Link>
          <Link to='/profile-owner'>
            <FaUserCircle className="icon" title="Profile" />
          </Link>
        </div>
      </div>

      {/* Sidebar */}
          <div className="sidebar-owner">
            
            <Link to="/manage-orders">
              <button><GiBeachBag className='side-icon' /> Manage Orders</button>
            </Link>
            
            <Link to="/reports">
              <button><TbReport className='side-icon' /> Reports</button>
            </Link>
            
            <Link to="/service-list">
              <button><GrBusinessService className='side-icon' /> Service List</button>
            </Link>
            
        <div className="logout">
          <Link to="/owner-logout">
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

export default OwnerLogout;