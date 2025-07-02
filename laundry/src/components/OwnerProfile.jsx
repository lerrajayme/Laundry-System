import React, { useState, useEffect } from 'react';
import { FaBell, FaUserCircle, FaHeadset, FaUser, FaEnvelope, FaPhone, FaHome } from 'react-icons/fa';
import { FiLogOut, FiEdit } from 'react-icons/fi';
import { GrBusinessService } from "react-icons/gr";
import { GiBeachBag } from "react-icons/gi";
import { TbReport } from "react-icons/tb";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom'; 
import userProfile from '../assets/ULOL.png'; 
import './styles/OwnerProfile.css';
import axios from 'axios';

const OwnerProfile = () => {
  const [image, setImage] = useState(null);
  const [owner, setOwner] = useState(null);
  const [phone, setPhone] = useState('+63');
  const [shopAddress, setShopAddress] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const storedOwner = localStorage.getItem('user');
    if (storedOwner) {
      const parsedOwner = JSON.parse(storedOwner);
      setOwner(parsedOwner);
      setPhone(parsedOwner.phone_number || '+63');
      setShopAddress(parsedOwner.shop_address || '');
    }
  }, []);

  if (!owner) {
    return <p>Please log in to see your profile.</p>;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const regex = /^\+63\d{0,10}$/;

    if (regex.test(value) || value === '+63') {
      setPhone(value);
    }
  };

  const handleSaveChanges = async () => {
    if (!/^\+63\d{10}$/.test(phone)) {
      alert("Phone must be in the format: +639XXXXXXXXX (11 digits total including +63)");
      return;
    }

    if (!shopAddress.trim()) {
      alert("Please enter your laundry shop address");
      return;
    }

    setSaving(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:8000/api/owner/profile', {
        name: owner.name,
        email: owner.email,
        phone_number: phone,
        shop_address: shopAddress
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = response.data;
      setOwner(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      alert('Profile updated successfully');
    } catch (error) {
      alert('Error updating profile: ' + (error.response?.data?.message || error.message));
    } finally {
      setSaving(false);
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
                <input 
                  type="text" 
                  value={owner.name || ''} 
                  onChange={(e) => setOwner({...owner, name: e.target.value})} 
                />
                <FaUser className="input-icon" />
              </div>
            </div>

            <div className="input-group">
              <label>Email Account</label>
              <div className="input-wrapper">
                <input 
                  type="email" 
                  value={owner.email || ''} 
                  onChange={(e) => setOwner({...owner, email: e.target.value})} 
                />
                <FaEnvelope className="input-icon" />
              </div>
            </div>

            <div className="input-group">
              <label>Phone Number</label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="+63xxxxxxxxxx"
                />
                <FaPhone className="input-icon" />
              </div>
            </div>

            <div className="input-group">
              <label>Laundry Shop Address</label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  value={shopAddress}
                  onChange={(e) => setShopAddress(e.target.value)}
                  placeholder="Your shop address"
                />
                <FaHome className="input-icon" />
              </div>
            </div>

            <div className="button-container">
              <button 
                className="save-button" 
                onClick={handleSaveChanges}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'SAVE CHANGES'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerProfile;