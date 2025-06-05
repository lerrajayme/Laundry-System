import React, { useState, useEffect } from 'react';
import { FaBell, FaUserCircle, FaHeadset, FaAddressCard, FaUser, FaEnvelope, FaPhone, FaHome} from 'react-icons/fa';
import { FiLogOut, FiEdit } from 'react-icons/fi';
import { GiBeachBag } from "react-icons/gi";
import { VscCalendar } from "react-icons/vsc";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom'; 
import userProfile from '../assets/ULOL.png'; 
import './styles/Profile.css';
import axios from 'axios';

const Profile = () => {
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState('+63');
  const [homeAddress, setHomeAddress] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setPhone(parsedUser.phone_number || '+63');
      setHomeAddress(parsedUser.home_address || '');
    }
  }, []);

  if (!user) {
    return <p>Please log in to see your profile.</p>;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  // Only allow +63 followed by up to 10 digits
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const regex = /^\+63\d{0,10}$/;

    if (regex.test(value) || value === '+63') {
      setPhone(value);
    }
  };

  const handleSaveChanges = async () => {
  // Validate phone number length exactly 13 chars: +63 + 10 digits
  if (!/^\+63\d{10}$/.test(phone)) {
    alert("Phone must be in the format: +639XXXXXXXXX (11 digits total including +63)");
    return;
  }

  if (!homeAddress.trim()) {
    alert("Please enter your home address");
    return;
  }

  setSaving(true);

  try {
    const token = localStorage.getItem('token'); // Make sure this line exists
    const response = await axios.put('http://localhost:8000/api/profile', {
      name: user.name,
      email: user.email,
      phone_number: phone,
      home_address: homeAddress
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = response.data;
    setUser(data.user);
    localStorage.setItem('user', JSON.stringify(data.user));
    alert('Profile updated successfully');
  } catch (error) {
    alert('Error updating profile: ' + (error.response?.data?.message || error.message));
  } finally {
    setSaving(false);
  }
}; // <- ensure this closing brace is here


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
      <div className="main-profile">
        <div className="profile-section">
          <div className="profile-header">
            <Link to="/customer">
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
                  value={user.name || ''} 
                  onChange={(e) => setUser({...user, name: e.target.value})} 
                />
                <FaUser className="input-icon" />
              </div>
            </div>

            <div className="input-group">
              <label>Email Account</label>
              <div className="input-wrapper">
                <input 
                  type="email" 
                  value={user.email || ''} 
                  onChange={(e) => setUser({...user, email: e.target.value})} 
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
              <label>Home Address</label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  value={homeAddress}
                  onChange={(e) => setHomeAddress(e.target.value)}
                  placeholder="Your address"
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

export default Profile;