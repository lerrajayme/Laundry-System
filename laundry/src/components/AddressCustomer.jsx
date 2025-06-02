import React, { useState } from 'react';
import { FaBell, FaUserCircle, FaHeadset, FaAddressCard, FaPlus, FaMapMarkerAlt, FaPhone, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from "react-icons/gi";
import { VscFeedback, VscCalendar } from "react-icons/vsc";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import './styles/AddressCustomer.css';

const AddressCustomer = () => {
    // STATE MANAGEMENT
    const [addresses, setAddresses] = useState([
        { label: 'Home', address: '123 Sampaguita St, Cebu', phone: '+639123456789' },
        { label: 'Office', address: 'IT Park, Cebu City', phone: '+639876543210' },
    ]);
    
    // MODAL STATES
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    // FORM STATES
    const [newAddress, setNewAddress] = useState({ 
        label: '', 
        address: '', 
        phone: '+63' 
    });
    
    const [editData, setEditData] = useState({
        index: null,
        address: { label: '', address: '', phone: '+63' }
    });

    // PHONE NUMBER HANDLING
    const handlePhoneChange = (e, isEditMode) => {
        const value = e.target.value;
        if (value.startsWith('+63') || value === '+6' || value === '+') {
            if (isEditMode) {
                setEditData({
                    ...editData,
                    address: { ...editData.address, phone: value }
                });
            } else {
                setNewAddress({ ...newAddress, phone: value });
            }
        }
    };

    const handlePhoneKeyDown = (e, isEditMode) => {
        const phone = isEditMode ? editData.address.phone : newAddress.phone;
        if (e.key === 'Backspace' && phone.length <= 3 && e.target.selectionStart <= 3) {
            e.preventDefault();
        }
    };

    // ADDRESS OPERATIONS
    const handleAddAddress = (e) => {
        e.preventDefault();
        if (!validateAddress(newAddress)) return;
        
        setAddresses([...addresses, newAddress]);
        setNewAddress({ label: '', address: '', phone: '+63' });
        setShowAddModal(false);
    };

    const handleEditAddress = (e) => {
        e.preventDefault();
        if (!validateAddress(editData.address)) return;

        const updated = [...addresses];
        updated[editData.index] = editData.address;
        setAddresses(updated);
        setShowEditModal(false);
    };

    const handleDeleteAddress = () => {
        const updated = addresses.filter((_, i) => i !== editData.index);
        setAddresses(updated);
        setShowDeleteModal(false);
    };

    // VALIDATION
    const validateAddress = (addr) => {
        if (!addr.label.trim()) {
            alert("Please enter an address label");
            return false;
        }
        if (!addr.address.trim()) {
            alert("Please enter a full address");
            return false;
        }
        if (!addr.phone.startsWith('+63') || addr.phone.length < 12) {
            alert("Phone must start with +63 and have 9 digits (e.g., +639123456789)");
            return false;
        }
        return true;
    };

    // UI RENDERING
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
                            <button 
                                className="address-btn"
                                onClick={() => setShowAddModal(true)}
                            >
                                <FaPlus /> Add New Address
                            </button>
                        </div>

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
                                            <FaEdit 
                                                className="icon edit"
                                                onClick={() => {
                                                    setEditData({
                                                        index,
                                                        address: { ...item }
                                                    });
                                                    setShowEditModal(true);
                                                }}
                                            />
                                            <FaTrash 
                                                className="icon delete" 
                                                onClick={() => {
                                                    setEditData(prev => ({ ...prev, index }));
                                                    setShowDeleteModal(true);
                                                }} 
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Address Modal */}
            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Add New Address</h2>
                            <button onClick={() => setShowAddModal(false)} className='exit-new-address'>
                                <FaTimes />
                            </button>
                        </div>
                        
                        <form onSubmit={handleAddAddress}>
                            <div className="form-group">
                                <label>Address Label (e.g. Home)</label>
                                <input
                                    type="text"
                                    placeholder="Enter address label"
                                    value={newAddress.label}
                                    onChange={(e) => setNewAddress({...newAddress, label: e.target.value})}
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label>Full Address</label>
                                <textarea
                                    placeholder="Street, Barangay, City, Province, ZIP Code"
                                    value={newAddress.address}
                                    onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label>Contact Number</label>
                                <input
                                    type="tel"
                                    placeholder="+639123456789"
                                    value={newAddress.phone}
                                    onChange={(e) => handlePhoneChange(e, false)}
                                    onKeyDown={(e) => handlePhoneKeyDown(e, false)}
                                    maxLength={13}
                                    required
                                />
                            </div>
                            
                            <div className="modal-actions">
                                <button 
                                    type="button" 
                                    className="cancel-btn-new-address"
                                    onClick={() => setShowAddModal(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="save-new-address">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Address Modal */}
            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Edit Address</h2>
                            <button onClick={() => setShowEditModal(false)} className='exit-edit'>
                                <FaTimes />
                            </button>
                        </div>
                        
                        <form onSubmit={handleEditAddress}>
                            <div className="form-group">
                                <label>Address Label (e.g. Home)</label>
                                <input
                                    type="text"
                                    value={editData.address.label}
                                    onChange={(e) => setEditData({
                                        ...editData,
                                        address: {...editData.address, label: e.target.value}
                                    })}
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label>Full Address</label>
                                <textarea
                                    value={editData.address.address}
                                    onChange={(e) => setEditData({
                                        ...editData,
                                        address: {...editData.address, address: e.target.value}
                                    })}
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label>Contact Number</label>
                                <input
                                    type="tel"
                                    value={editData.address.phone}
                                    onChange={(e) => handlePhoneChange(e, true)}
                                    onKeyDown={(e) => handlePhoneKeyDown(e, true)}
                                    maxLength={13}
                                    required
                                />
                            </div>
                            
                            <div className="modal-actions">
                                <button 
                                    type="button" 
                                    className="cancel-edit"
                                    onClick={() => setShowEditModal(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="submit-update">
                                    Update 
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-content delete-confirm">
                        <h3>Delete Address?</h3>
                        <p>Are you sure you want to delete this address?</p>
                        <div className="delete-buttons">
                            <button 
                                onClick={() => setShowDeleteModal(false)} 
                                className="cancel-delete"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleDeleteAddress} 
                                className="confirm-delete"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddressCustomer;