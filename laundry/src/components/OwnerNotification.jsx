import React, { useState } from 'react';
import { FaBell, FaUserCircle, FaHeadset} from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from "react-icons/gi";
import { FaRegCircleUser } from 'react-icons/fa6';
import { TbReport } from "react-icons/tb";
import { GrBusinessService } from "react-icons/gr";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import './styles/Notifications.css';

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState('today');

  const todayNotifications = [
    {
      icon: <FaBell className="notif-bell" />,
      title: 'Booking Confirmed',
      message: 'Your laundry booking for May 11, 2025 has been confirmed! We’ll pick up your clothes between 9:00 AM - 11:00 AM.',
    },
    {
      icon: <FaBell className="notif-bell" />,
      title: 'Reminder Before Pickup',
      message: 'Your laundry pickup is scheduled for May 11, 2025 between 9:00 AM - 11:00 AM. Please keep your clothes ready!',
    },
  ];

  const previousNotifications = [
    {
      icon: <FaBell className="notif-bell" />,
    title: 'Laundry Pickup',
    message: 'Great news! Your laundry has been picked up and is on its way to our facility. Expected delivery: May 12, 2025.',
  },
  {
    icon: <FaBell className="notif-bell" />,
    title: 'Out for Delivery',
    message: 'Your freshly cleaned laundry is on its way! Expected delivery time: 3:00 PM - 5:00 PM.',
  },
  {
    icon: <FaBell className="notif-bell" />,
    title: 'Delivery Completed',
    message: 'Your laundry has been delivered! Hope everything looks perfect.',
    },
  ];

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
     <div className="sidebar">
       <Link to="/book-service">
         <button><FaRegCircleUser className='side-icon' /> Manage Users</button>
       </Link>
       
       <Link to="/addresscustomer">
         <button><GiBeachBag className='side-icon' /> Manage Orders</button>
       </Link>
       
       <Link to="/order-history">
         <button><TbReport className='side-icon' /> Reports</button>
       </Link>
       
       <Link to="/feedback">
         <button><GrBusinessService className='side-icon' /> Service List</button>
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
      <div className="main-notification">
        <div className="notification-section">
          <div className="notification-header">
            <Link to="/owner">
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
