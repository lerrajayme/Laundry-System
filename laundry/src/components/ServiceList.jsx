import React, { useState } from 'react';
import { FaBell, FaUserCircle, FaHeadset } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from "react-icons/gi";
import { TbReport } from "react-icons/tb";
import { GrBusinessService } from "react-icons/gr";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import './styles/ServiceList.css';

const ServiceList = () => {
  // Start with empty services array
  const [services, setServices] = useState([]);

  // Modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [updatedService, setUpdatedService] = useState({
    serviceName: '',
    price: '',
    status: 'Active'
  });
  const [newService, setNewService] = useState({
    serviceName: '',
    price: '',
    status: 'Active'
  });

  // Format price with ₱ sign
  const formatPrice = (price) => {
    if (!price) return '';
    if (price.includes('₱')) return price;
    return `₱${parseFloat(price).toFixed(2)}`;
  };

  // Handle price input - remove non-numeric characters
  const handlePriceInput = (e, isNewService = false) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/[^0-9.]/g, '');
    
    if (isNewService) {
      setNewService(prev => ({
        ...prev,
        [name]: numericValue
      }));
    } else {
      setUpdatedService(prev => ({
        ...prev,
        [name]: numericValue
      }));
    }
  };

  // Open edit modal
  const handleEditClick = (serviceId) => {
    const service = services.find(service => service.id === serviceId);
    setSelectedService(service);
    setUpdatedService({
      serviceName: service.serviceName,
      price: service.price,
      status: service.status
    });
    setIsModalOpen(true);
  };

  // Handle input changes for edit
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedService(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle input changes for add
  const handleNewServiceChange = (e) => {
    const { name, value } = e.target;
    setNewService(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Update service
  const handleUpdateService = () => {
    const updatedServices = services.map(service => 
      service.id === selectedService.id ? { 
        ...service, 
        ...updatedService,
        price: updatedService.price
      } : service
    );
    setServices(updatedServices);
    setIsModalOpen(false);
  };

  // Add new service
const handleAddService = () => {
  // Generate new ID starting from S-001
  const newIdNumber = services.length > 0 
    ? Math.max(...services.map(s => parseInt(s.id.split('-')[1]))) + 1
    : 1;
  const newId = `S-${newIdNumber.toString().padStart(3, '0')}`;
  
  const serviceToAdd = {
    id: newId,
    ...newService,
    price: newService.price
  };
  setServices([...services, serviceToAdd]);
  setIsAddModalOpen(false);
  setNewService({
    serviceName: '',
    price: '',
    status: 'Active'
  });
};

  // Open delete confirmation modal
  const handleDeleteClick = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    setServiceToDelete(service);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (serviceToDelete) {
      setServices(services.filter(service => service.id !== serviceToDelete.id));
      setIsDeleteModalOpen(false);
      setServiceToDelete(null);
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
      <div className="owner-notification">
        <div className="notification-section">
          <div className="notification-header">
            <Link to="/owner">
              <IoArrowBackCircle className="back-button" title="Back to Home" />
            </Link>
            <h1 className="notification-title">SERVICE LIST</h1>
          </div>

          <div className="user-management-wrapper">
            <div className="user-management-container">
              <button className="add-service-btn" onClick={() => setIsAddModalOpen(true)}>
                  + Add Service
              </button>

              <div className="table-responsive">
                {services.length > 0 ? (
                  <table className="service-management-table">
                    <thead>
                      <tr>
                        <th>Service ID</th>
                        <th>Service Name</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((service) => (
                        <tr key={service.id}>
                          <td>{service.id}</td>
                          <td>{service.serviceName}</td>
                          <td>{formatPrice(service.price)}</td>
                          <td>
                            <span 
                              className={`status-badge`}
                              style={{
                                backgroundColor: service.status === 'Active' ? 'rgba(0, 128, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)',
                                color: service.status === 'Active' ? 'green' : 'red',
                                padding: '5px 10px',
                                borderRadius: '20px',
                                fontWeight: '500'
                              }}
                            >
                              {service.status}
                            </span>
                          </td>
                          <td className="actions">
                            <button 
                              className="edit-btn-service"
                              onClick={() => handleEditClick(service.id)}
                            >
                              Edit
                            </button>
                            <button 
                              className="delete-btn-service"
                              onClick={() => handleDeleteClick(service.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="no-services-message">
                    <GiBeachBag style={{ fontSize: '50px', color: '#006071', marginBottom: '16px' }} />
                    <p>No services available yet.</p>
                    <p>Click "Add Service" to create your first service.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Service Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header-service">
              <h2>Update Service</h2>
              <button className="close-btn-service" onClick={() => setIsModalOpen(false)}>
                &times;
              </button>
            </div>
            
            <div className="form-group">
              <label>Service Name:</label>
              <input
                type="text"
                name="serviceName"
                value={updatedService.serviceName}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Price:</label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 1
                }}>₱</span>
                <input
                  type="text"
                  name="price"
                  value={updatedService.price}
                  onChange={(e) => handlePriceInput(e)}
                  style={{ paddingLeft: '30px' }}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Status:</label>
              <select
                name="status"
                value={updatedService.status}
                onChange={handleInputChange}
                className="status-select"
              >
                <option value="Active">Active</option>
                <option value="Not Available">Not Available</option>
              </select>
            </div>
            
            <div className="modal-actions">
              <button 
                type="button" 
                className="cancel-btn-service" 
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="save-btn-service"
                onClick={handleUpdateService}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content delete-modal">
            <div className="modal-header-service">
              <h2>Confirm Delete</h2>
              <button 
                className="close-btn-service" 
                onClick={() => setIsDeleteModalOpen(false)}
              >
                &times;
              </button>
            </div>
            
            <div className="delete-message">
              <p>Are you sure you want to delete this service?</p>
              <p className="service-to-delete">
                {serviceToDelete?.serviceName} (ID: {serviceToDelete?.id})
              </p>
            </div>
            
            <div className="modal-actions">
              <button 
                type="button" 
                className="cancel-btn-service" 
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="delete-confirm-btn-service"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Service Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header-service">
              <h2>Add New Service</h2>
              <button className="close-btn-service" onClick={() => setIsAddModalOpen(false)}>
                &times;
              </button>
            </div>
            
            <div className="form-group">
              <label>Service Name:</label>
              <input
                type="text"
                name="serviceName"
                value={newService.serviceName}
                onChange={handleNewServiceChange}
                placeholder="Enter service name"
              />
            </div>
            
            <div className="form-group">
              <label>Price:</label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 1
                }}>₱</span>
                <input
                  type="text"
                  name="price"
                  value={newService.price}
                  onChange={(e) => handlePriceInput(e, true)}
                  placeholder="e.g., 150.00"
                  style={{ paddingLeft: '30px' }}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Status:</label>
              <select
                name="status"
                value={newService.status}
                onChange={handleNewServiceChange}
                className="status-select"
              >
                <option value="Active">Active</option>
                <option value="Not Available">Not Available</option>
              </select>
            </div>
            
            <div className="modal-actions">
              <button 
                type="button" 
                className="cancel-btn-service" 
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="save-btn-service"
                onClick={handleAddService}
              >
                Add Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceList;