import React, { useState } from 'react';
import { FaBell, FaUserCircle, FaHeadset, FaUser, FaEnvelope, FaPhone, FaHome } from 'react-icons/fa';
import { FiLogOut, FiEdit } from 'react-icons/fi';
import { GrBusinessService } from "react-icons/gr";
import { GiBeachBag } from "react-icons/gi";
import { FaRegCircleUser } from "react-icons/fa6";
import { TbReport } from "react-icons/tb";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom'; 
import userProfile from '../assets/ULOL.png'; 
import './styles/OwnerProfile.css';

const OwnerProfile = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
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

          <Link to='/notification-owner'>
            <FaBell className="icon" title="Notifications" />
          </Link>

          <Link to='/profile-owner'>
            <FaUserCircle className="icon" title="Profile" />
          </Link>
        </div>
      </div>

        {/* Sidebar */}
    <div className="sidebar-owner">
      <Link to="/manage-users">
        <button><FaRegCircleUser className='side-icon' /> Manage Users</button>
      </Link>
      
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
      <div className="owner-profile">
         <div className="profile-section">
          <div className="profile-header">
            <Link to="/owner">
              <IoArrowBackCircle className="back-button" title="Back to Home" />
            </Link>
            <h1 className="profile-title">PROFILE</h1>
          </div>

          <div className="profile-avatar">
            <img 
              src={image || userProfile} 
              alt="Profile" 
            />
            <label className="edit-icon">
            <FiEdit />

              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                style={{ display: 'none' }} 
              />
            </label>
          </div>

    {/* Form */}
    <div className="profile-form">
      <div className="input-group">
        <label>Full Name</label>
        <div className="input-wrapper">
          <input type="text" placeholder="Your Name" />
          <FaUser className="input-icon" />
        </div>
      </div>

      <div className="input-group">
        <label>Email Account</label>
        <div className="input-wrapper">
          <input type="email" placeholder="Example@gmail.com" />
          <FaEnvelope className="input-icon" />
        </div>
      </div>

      <div className="input-group">
        <label>Phone Number</label>
        <div className="input-wrapper">
          <input type="text" placeholder="Add number" />
          <FaPhone className="input-icon" />
        </div>
      </div>

      <div className="input-group">
        <label>Laundry Shop Address</label>
        <div className="input-wrapper">
          <input type="text" placeholder="Your address"/>
          <FaHome className="input-icon" />
        </div>
      </div>

            <div className="button-container">
            <button className="save-button">SAVE CHANGES</button>
            </div>
          </div>
        </div>
      </div>
  </div>
  );
};

export default OwnerProfile;
