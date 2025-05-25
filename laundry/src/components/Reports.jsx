import React, { useState } from 'react';
import { FaBell, FaUserCircle, FaHeadset } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from "react-icons/gi";
import { FaRegCircleUser } from 'react-icons/fa6';
import { TbReport } from "react-icons/tb";
import { GrBusinessService } from "react-icons/gr";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import './styles/Reports.css';

const Reports = () => {
  const [expandedSections, setExpandedSections] = useState({
    financial: {
    weeklyRevenue: false,
    monthlyRevenue: false,
  },
  orders: {
    totalOrders: false,
    completedOrders: false,
  },
  service: {
    ratingsFeedback: false,
  }
});

  const toggleSection = (category, section) => {
    setExpandedSections(prev => ({
      ...prev,
      [category]: {
      ...prev[category],
      [section]: !prev[category][section]
      }
    }));
  };

  const financialDetails = {
    weeklyRevenue: [
      { week: 'May 18-24', amount: 5000 },
      { week: 'May 11-17', amount: 4800 }
    ],
    monthlyRevenue: 20000
  };

  const orderDetails = {
    totalOrders: 120,
    completedOrders: 110
  };

  const serviceDetails = {
    ratings: 4.5,
    feedback: [
      "Great service!",
      "Quick turnaround!",
      "Very satisfied."
    ]
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
            <h1 className="notification-title">REPORTS</h1>
          </div>
        <div className="reports-scroll-container">
            {/* Financial Reports */}
            <div className="report-wrapper">
              <div className="report-header">
                <h2>FINANCIAL REPORT</h2>
              </div>
              <div className="report-content">

                <div className="report-item">
                  <span>WEEKLY REVENUE</span>
                  <button
                    className="show-more-btn"
                    onClick={() => toggleSection('financial', 'weeklyRevenue')}
                  >
                    {expandedSections.financial.weeklyRevenue ? 'Show Less' : 'Show More'}
                  </button>
                </div>
                {expandedSections.financial.weeklyRevenue && (
                  <div className="details-section" style={{ paddingLeft: '20px', marginBottom: '10px' }}>
                    {financialDetails.weeklyRevenue.map((item, i) => (
                      <div key={i}>{item.week}: ₱{item.amount.toLocaleString()}</div>
                    ))}
                  </div>
                )}

                <div className="report-item">
                  <span>MONTHLY REVENUE</span>
                  <button
                    className="show-more-btn"
                    onClick={() => toggleSection('financial', 'monthlyRevenue')}
                  >
                    {expandedSections.financial.monthlyRevenue ? 'Show Less' : 'Show More'}
                  </button>
                </div>
                {expandedSections.financial.monthlyRevenue && (
                  <div className="details-section" style={{ paddingLeft: '20px', marginBottom: '10px' }}>
                    <div>₱{financialDetails.monthlyRevenue.toLocaleString()}</div>
                  </div>
                )}

              </div>
            </div>

            {/* Order Summaries */}
            <div className="report-wrapper">
              <div className="report-header">
                <h2>ORDER SUMMARIES</h2>
              </div>
              <div className="report-content">

                <div className="report-item">
                  <span>TOTAL ORDERS</span>
                  <button
                    className="show-more-btn"
                    onClick={() => toggleSection('orders', 'totalOrders')}
                  >
                    {expandedSections.orders.totalOrders ? 'Show Less' : 'Show More'}
                  </button>
                </div>
                {expandedSections.orders.totalOrders && (
                  <div className="details-section" style={{ paddingLeft: '20px', marginBottom: '10px' }}>
                    <div>{orderDetails.totalOrders} orders</div>
                  </div>
                )}

                <div className="report-item">
                  <span>COMPLETED ORDERS</span>
                  <button
                    className="show-more-btn"
                    onClick={() => toggleSection('orders', 'completedOrders')}
                  >
                    {expandedSections.orders.completedOrders ? 'Show Less' : 'Show More'}
                  </button>
                </div>
                {expandedSections.orders.completedOrders && (
                  <div className="details-section" style={{ paddingLeft: '20px', marginBottom: '10px' }}>
                    <div>{orderDetails.completedOrders} orders</div>
                  </div>
                )}

              </div>
            </div>

            {/* Service Performance */}
            <div className="report-wrapper">
              <div className="report-header">
                <h2>SERVICE PERFORMANCE</h2>
              </div>
              <div className="report-content">

                <div className="report-item">
                  <span>SERVICE RATINGS & FEEDBACK</span>
                  <button
                    className="show-more-btn"
                    onClick={() => toggleSection('service', 'ratingsFeedback')}
                  >
                    {expandedSections.service.ratingsFeedback ? 'Show Less' : 'Show More'}
                  </button>
                </div>
                {expandedSections.service.ratingsFeedback && (
                  <div className="details-section" style={{ paddingLeft: '20px', marginBottom: '10px' }}>
                    <div>Average Rating: {serviceDetails.ratings} / 5</div>
                    <div>
                      Feedback:
                      <ul>
                        {serviceDetails.feedback.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;