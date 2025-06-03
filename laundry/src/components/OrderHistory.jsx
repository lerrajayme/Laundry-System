import React, { useState, useEffect } from 'react';
import { FaBell, FaUserCircle, FaHeadset, FaAddressCard } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from "react-icons/gi";
import { VscCalendar } from "react-icons/vsc";
import { Link } from 'react-router-dom'; 
import './styles/OrderHistory.css';
import { IoArrowBackCircle } from 'react-icons/io5';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('customerOrders')) || [];
    // Ensure consistent customer name field
    const formattedOrders = savedOrders.map(order => ({
      ...order,
      customerName: order.customerName || order.name || 'Unknown Customer'
    }));
    console.log('Loaded orders:', formattedOrders);
    setOrders(formattedOrders);
  }, []);

  const formatCurrency = (value) => {
    return value !== undefined && !isNaN(value) ? value.toFixed(2) : '0.00';
  };

  const getServiceNames = (services) => {
    if (!services) return 'No services';
    if (Array.isArray(services)) {
      return services.map(s => s.name || s).join(', ');
    }
    return services;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US');
    } catch {
      return dateString;
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
        <div className="logout">
          <Link to="/customer-logout">
            <button className="logout-btn">
              <FiLogOut className='side-icon' /> Logout
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="order-history-container">
        <div className="order-section">
          <div className="order-history-header">
            <Link to="/customer">
              <IoArrowBackCircle className="back-icon" title="Back to Home" />
            </Link>
            <h1 className='order-title'>ORDER HISTORY</h1>
          </div>

          {orders.length > 0 ? (
            <table className="order-table">
              <thead>
                <tr>
                  <th>Order no.</th>
                  <th>Order date</th>
                  <th>Bill-to name</th>
                  <th>Service</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{formatDate(order.date)}</td>
                    <td>{order.customerName}</td>
                    <td>{getServiceNames(order.services)}</td>
                    <td><strong>₱ {formatCurrency(order.total)}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-orders-msg">You have no orders yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;