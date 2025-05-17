import React, { useState, useEffect } from 'react';
import { FaBell, FaUserCircle, FaHeadset, FaAddressCard } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from "react-icons/gi";
import { VscFeedback, VscCalendar } from "react-icons/vsc";
import { Link } from 'react-router-dom'; 
import './styles/OrderHistory.css';
import { IoArrowBackCircle } from 'react-icons/io5';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from backend
  useEffect(() => {
    const sampleOrders = [
      {
        id: 'SO-00007007',
        date: '3/25/2025',
        name: 'Juan Dela Cruz',
        total: 350.00,
      },
      {
        id: 'SO-00007006',
        date: '3/20/2025',
        name: 'Juan Dela Cruz',
        total: 620.50,
      },
      {
        id: 'S0-00007005',
        date: '3/10/2025',
        name: 'Juan Dela Cruz',
        total: 410.25,
      }
    ];

    setOrders(sampleOrders);
  }, []);

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
                  <th>Bill–to name</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.date}</td>
                    <td>{order.name}</td>
                    <td><strong>₱ {order.total.toFixed(2)}</strong></td>
                    <td><span className="view-link">› View details</span></td>
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
