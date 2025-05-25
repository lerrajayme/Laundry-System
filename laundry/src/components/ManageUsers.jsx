import React, {useState } from 'react';
import { FaBell, FaUserCircle, FaHeadset } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from "react-icons/gi";
import { FaRegCircleUser } from 'react-icons/fa6';
import { TbReport } from "react-icons/tb";
import { GrBusinessService } from "react-icons/gr";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import './styles/ManageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([
    { id: 'C-001', name: 'Lerra Jayme', email: 'ler@gmail.com', role: 'Customer' },
    { id: 'C-002', name: 'Jane Balcita', email: 'jane@gmail.com', role: 'Customer' },
    { id: 'C-003', name: 'Yve Fernandez', email: 'yve@gmail.com', role: 'Customer' },
    { id: 'C-004', name: 'May Democrito', email: 'may@mail.com', role: 'Customer' },
    // Add more users as needed
  ]);

  // Modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    name: '',
    email: '',
    membership: 'None'
  });

  // Open edit modal
  const handleEdit = (userId) => {
    const userToEdit = users.find(user => user.id === userId);
    setCurrentUser(userToEdit);
    setEditedData({
      name: userToEdit.name,
      email: userToEdit.email,
      membership: userToEdit.membership || 'None'
    });
    setIsEditModalOpen(true);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save edited data
  const handleSave = () => {
    const updatedUsers = users.map(user => 
      user.id === currentUser.id ? { ...user, ...editedData } : user
    );
    setUsers(updatedUsers);
    setIsEditModalOpen(false);
  };

  // Open delete confirmation modal
  const handleDeleteClick = (userId) => {
    const user = users.find(user => user.id === userId);
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    setUsers(users.filter(user => user.id !== userToDelete.id));
    setIsDeleteModalOpen(false);
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
      <div className="owner-notification">
        <div className="notification-section">
          <div className="notification-header">
            <Link to="/owner">
              <IoArrowBackCircle className="back-button" title="Back to Home" />
            </Link>
            <h1 className="notification-title">MANAGE USERS</h1>
          </div>
          
          <div className="user-management-wrapper">
            <div className="user-management-container">
              <div className="table-responsive">
                <table className="user-management-table">
                  <thead>
                    <tr>
                      <th>User ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <button 
                            className="edit-btn"
                            onClick={() => handleEdit(user.id)}
                          >
                            Edit
                          </button>
                          <button 
                            className="delete-btn"
                            onClick={() => handleDeleteClick(user.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Edit User Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Edit User</h2>
              <button className="close-btn" onClick={() => setIsEditModalOpen(false)}>
                &times;
              </button>
            </div>
            
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={editedData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={editedData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Membership:</label>
              <select
                name="membership"
                value={editedData.membership}
                onChange={handleInputChange}
              >
                <option value="None">None</option>
                <option value="Basic">Basic</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
              </select>
            </div>
            
            <div className="modal-actions">
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="save-btn"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content delete-modal">
            <div className="modal-header">
              <h2>Confirm Delete</h2>
            </div>
            
            <div className="delete-message">
              <p>Are you sure you want to delete this user?</p>
              <p className="user-to-delete">{userToDelete?.name} ({userToDelete?.email})</p>
            </div>
            
            <div className="modal-actions">
              <button 
                type="button" 
                className="cancel-btn-delete"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="delete-confirm-btn"
                onClick={confirmDelete}
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

export default ManageUsers;