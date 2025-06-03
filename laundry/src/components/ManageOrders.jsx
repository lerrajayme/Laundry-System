import React, { useState } from 'react';
import { FaBell, FaUserCircle, FaHeadset } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from "react-icons/gi";
import { TbReport } from "react-icons/tb";
import { GrBusinessService } from "react-icons/gr";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import './styles/ManageOrders.css';

const ManageOrders = () => {
  
    // Order data
  const [orders, setOrders] = useState([
    { id: 'O-001', customerName: 'Lerra Jayme', service: 'Wash only', status: 'Pending' },
    { id: 'O-002', customerName: 'Jane Baletta', service: 'Wash & Fold', status: 'In Progress' },
    { id: 'O-003', customerName: 'Melchor Dacup', service: 'Wash, Fold & Dry', status: 'Pending' },
    { id: 'O-004', customerName: 'Katherine Emoredna', service: 'Wash', status: 'Complete' },
    { id: 'O-005', customerName: 'Hexel Rana', service: 'Wash, Fold & Dry', status: 'Complete' },
  ]);

  // Modal state
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatedOrder, setUpdatedOrder] = useState({
    customerName: '',
    service: '',
    status: 'Pending'
  });

  // Open order details modal
  const handleOrderClick = (orderId) => {
    const order = orders.find(order => order.id === orderId);
    setSelectedOrder(order);
    setUpdatedOrder({
      customerName: order.customerName,
      service: order.service,
      status: order.status
    });
    setIsOrderModalOpen(true);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedOrder(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Update order status
  const handleUpdateOrder = () => {
    const updatedOrders = orders.map(order => 
      order.id === selectedOrder.id ? { ...order, ...updatedOrder } : order
    );
    setOrders(updatedOrders);
    setIsOrderModalOpen(false);
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
            <h1 className="notification-title">MANAGE ORDERS</h1>
          </div>

          <div className="user-management-wrapper">
            <div className="user-management-container">
              <div className="table-responsive">
                <table className="order-management-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer Name</th>
                      <th>Service</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr 
                        key={order.id} 
                        onClick={() => handleOrderClick(order.id)} 
                        className="clickable-row"
                      >
                        <td>{order.id}</td>
                        <td>{order.customerName}</td>
                        <td>{order.service}</td>
                        <td>
                          <span className={`status-badge status-${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                            {order.status}
                          </span>
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

      {/* Order Details Modal */}
      {isOrderModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header-orders">
              <h2>Update Order Status</h2>
              <button className="close-btn-orders" onClick={() => setIsOrderModalOpen(false)}>
                &times;
              </button>
            </div>
            
            <div className="form-group">
              <label>Customer Name:</label>
              <input
                type="text"
                name="customerName"
                value={updatedOrder.customerName}
                onChange={handleInputChange}
                readOnly className="read-only-input"
              />
            </div>
            
            <div className="form-group">
              <label>Service:</label>
              <input
                type="text"
                name="service"
                value={updatedOrder.service}
                onChange={handleInputChange}
                readOnly className="read-only-input"
              />
            </div>
            
            <div className="form-group">
              <label>Status:</label>
              <select
                name="status"
                value={updatedOrder.status}
                onChange={handleInputChange}
                className="status-select"
              >
                <option value="Pending">Pending for pickup</option>
                <option value="In Queue">In queue</option>
                <option value="In Progress">On going</option>
                <option value="Out for Delivery">Out for delivery</option>
                <option value="Complete">Completed</option>
              </select>
            </div>
            
            <div className="modal-actions">
              <button 
                type="button" 
                className="cancel-btn-orders" 
                onClick={() => setIsOrderModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="save-btn-orders"
                onClick={handleUpdateOrder}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
  );
};
export default ManageOrders;