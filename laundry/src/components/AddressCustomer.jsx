import React, {useState} from 'react';
import { FaBell, FaUserCircle, FaHeadset, FaAddressCard, FaPlus, FaMapMarkerAlt, FaPhone, FaEdit, FaTrash } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from "react-icons/gi";
import { VscFeedback, VscCalendar } from "react-icons/vsc";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import './styles/AddressCustomer.css';

const AddressCustomer = () => {
    const [addresses, setAddresses] = useState([
      {
        label: 'Home',
    address: '123 Sampaguita Street, Cebu City',
    phone: '09123456789'
    },
    {
    label: 'Office',
    address: '7th Floor, IT Park, Cebu City',
    phone: '09987654321'
    },
    {
      label: 'School',
      address: 'Ubec Univesity of Cebu',
      phone: '09124589571'
    },
    {
      label: 'Home 2',
      address: '123 Rose Street, Cebu City',
      phone: '09124589571'
    },
    ]);
    const [showForm, setShowForm] = useState(false);
    const [newAddress, setNewAddress] = useState({ label: '', address: '', phone: '' });
  
    const handleAddAddress = (e) => {
      e.preventDefault();
      if (newAddress.label && newAddress.address && newAddress.phone) {
        setAddresses([...addresses, newAddress]);
        setNewAddress({ label: '', address: '', phone: '' });
        setShowForm(false);
      }
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
          <Link to="/customerlogout">
            <button className="logout-btn">
              <FiLogOut className='side-icon' /> Logout
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-address">
        <div className="address-section">
          <div className="address-header">
          <Link to="/customer">
            <IoArrowBackCircle className="back-button" title="Back to Home" />
          </Link>
            <h1 className="address-title">MY ADDRESSES</h1>
          </div>
                  
        <div className="address-container">
          <div className="header-row">
            <h2>Saved Addresses</h2>
            <button className="add-btn"><FaPlus /> Add New Address</button>
          </div>

          {showForm && (
              <form className="address-form" onSubmit={handleAddAddress} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <input
                  type="text"
                  placeholder="Label (e.g. Home)"
                  value={newAddress.label}
                  onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={newAddress.address}
                  onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                  required
                />
                <button type="submit" className="next-btn">Save Address</button>
              </form>
            )}

            {addresses.length === 0 ? (
              <p className='noaddress'>No saved addresses yet.</p>
            ) : (
              <div className="address-list">
                {addresses.map((item, index) => (
                  <div key={index} className="address-card">
                    <div className="address-info">
                      <h3>{item.label}</h3>
                      <p><FaMapMarkerAlt /> {item.address}</p>
                      <p><FaPhone /> {item.phone}</p>
                    </div>
                    <div className="action-icons">
                      <FaEdit className="icon edit" />
                      <FaTrash className="icon delete" />
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default AddressCustomer;
