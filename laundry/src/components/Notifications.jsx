import React, { useState } from 'react';
import { FaBell, FaUserCircle, FaHeadset, FaAddressCard } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from "react-icons/gi";
import { VscFeedback, VscCalendar } from "react-icons/vsc";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import './styles/Notifications.css';

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState('today');

  const todayNotifications = [];

  const previousNotifications = [];

  const renderNotifications = (list) =>
    list.map((item, index) => (
      <div key={index} className="notification-box">
        <div className="notif-icon">{item.icon}</div>
        <div className="notif-content">
          <h4>{item.title}</h4>
          <p>{item.message}</p>
        </div>
      </div>
    ));

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
         <Link to="/">
           <button className="logout-btn">
             <FiLogOut className='side-icon' /> Logout
           </button>
         </Link>
       </div>
     </div>
     

      {/* Main Content */}
      <div className="main-notification">
        <div className="notification-section">
          <div className="notification-header">
            <Link to="/customer">
               <IoArrowBackCircle className="back-button" title="Back to Home" />
            </Link>
            <h1 className="notification-title">NOTIFICATIONS</h1>
          </div>

          <div className="notification-container">
            <div className="notif-tabs">
              <button
                className={`notif-tab ${activeTab === 'today' ? 'active' : ''}`}
                onClick={() => setActiveTab('today')}
              >
                TODAY
              </button>
              <button
                className={`notif-tab ${activeTab === 'previous' ? 'active' : ''}`}
                onClick={() => setActiveTab('previous')}
              >
                PREVIOUS
              </button>
            </div>

            <div className="notif-line" />

            <div className="notif-list">
              {activeTab === 'today' && todayNotifications.length > 0 ? (
                renderNotifications(todayNotifications)
              ) : activeTab === 'today' ? (
               <p className="no-notifications">No notifications for today.</p>
              ) : previousNotifications.length > 0 ? (
                renderNotifications(previousNotifications)
              ) : (
               <p className="no-notifications">No previous notifications.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
