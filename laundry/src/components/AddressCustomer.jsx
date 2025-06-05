import React, { useState, useEffect } from 'react';
import { FaBell, FaUserCircle, FaHeadset, FaAddressCard, FaPlus, FaMapMarkerAlt, FaPhone, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from "react-icons/gi";
import { VscCalendar } from "react-icons/vsc";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import './styles/AddressCustomer.css';
import axios from 'axios';

const AddressCustomer = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [newAddress, setNewAddress] = useState({ label: '', address: '', phone: '+63' });

    const [editData, setEditData] = useState({
        index: null,
        address: { label: '', address: '', phone: '+63' }
    });

    useEffect(() => {
        fetchAddresses();
    }, []);

   const fetchAddresses = () => {
    const token = localStorage.getItem("token");

    axios.get('http://localhost:8000/api/addresses', {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        }
    })
    .then(({ data }) => {
        setAddresses(data);
        setLoading(false);
    })
    .catch((error) => {
        console.error("Error fetching addresses:", error);
        setLoading(false);
    });
};

    const handlePhoneChange = (e, isEditMode) => {
    const value = e.target.value;

    // Allow only +63 followed by digits
    const regex = /^\+63\d{0,10}$/;

    if (regex.test(value) || value === '+63') {
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

        console.log(newAddress.phone.length); 

        if (!validateAddress(newAddress)) return;
        
   const token = localStorage.getItem("token");

axios.post('http://localhost:8000/api/addresses', newAddress, {
    headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
    }
})
.then(({ data }) => {
    setAddresses([...addresses, data]);
    setNewAddress({ label: '', address: '', phone: '+63' });
    setShowAddModal(false);
})
.catch((err) => {
    console.error("Add address failed", err);
});
        setNewAddress({ label: '', address: '', phone: '+63' });
        setShowAddModal(false);
    };

    const handleEditAddress = (e) => {
        e.preventDefault();
        if (!validateAddress(editData.address)) return;

       const token = localStorage.getItem("token");
const id = editData.address.id;

axios.put(`http://localhost:8000/api/addresses/${id}`, editData.address, {
    headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
    }
})
.then(({ data }) => {
    const updated = [...addresses];
    updated[editData.index] = data;
    setAddresses(updated);
    setShowEditModal(false);
})
.catch((err) => {
    console.error("Edit failed", err);
});
        setShowEditModal(false);
    };

    const handleDeleteAddress = () => {
    const token = localStorage.getItem("token");
    const id = addresses[editData.index].id;

    axios.delete(`http://localhost:8000/api/addresses/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    })
    .then(() => {
        const updated = addresses.filter((_, i) => i !== editData.index);
        setAddresses(updated);
        setShowDeleteModal(false);
    })
    .catch((err) => {
        console.error("Delete failed", err);
        setShowDeleteModal(false);
    });
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
        if (!/^\+63\d{10}$/.test(addr.phone)) {
            alert("Phone must be in the format: +639XXXXXXXXX (11 digits total including +63)");
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

                        {loading ? (
                            <p className='loading-message'>Loading addresses</p>
                        ) : addresses.length === 0 ? (
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
      setEditData({ index, address: { ...item } }); // Set the current item for editing
      setShowEditModal(true); // Show edit modal
    }}
  />
  <FaTrash 
    className="icon delete" 
    onClick={() => {
      setEditData({ index, address: { ...item } }); // Set the current item for deletion
      setShowDeleteModal(true); // Show delete modal
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
                                    placeholder="e.g. Home, Work"
                                    value={newAddress.label}
                                    onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
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
                                    maxLength={14}
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
                                placeholder="e.g. Home, Work"
                                value={editData.address.label}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        address: { ...editData.address, label: e.target.value },
                                    })
                                }
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
                                    maxLength={14}
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