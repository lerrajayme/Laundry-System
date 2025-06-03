import React, { useState } from 'react';
import { FaBell, FaUserCircle, FaHeadset } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from "react-icons/gi";
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
    }
  });

  // Sample order data matching the structure from ManageOrders
  const [orders] = useState([
    { id: 'O-001', customerName: 'Lerra Jayme', service: 'Wash only', status: 'Pending' },
    { id: 'O-002', customerName: 'Jane Baletta', service: 'Wash & Fold', status: 'In Progress' },
    { id: 'O-003', customerName: 'Melchor Dacup', service: 'Wash, Fold & Dry', status: 'Pending' },
    { id: 'O-004', customerName: 'Katherine Emoredna', service: 'Wash', status: 'Complete' },
    { id: 'O-005', customerName: 'Hexel Rana', service: 'Wash, Fold & Dry', status: 'Complete' },
  ]);

  // Service prices for revenue calculation
  const [services] = useState([
    { name: 'Wash only', price: 50 },
    { name: 'Wash & Fold', price: 75 },
    { name: 'Wash, Fold & Dry', price: 100 },
    { name: 'Wash', price: 50 },
  ]);

  // Calculate financial data based on orders
  const calculateFinancialData = () => {
    const now = new Date();
    const currentWeekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    const lastWeekStart = new Date(currentWeekStart);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);
    
    // Get current month and year for filtering
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    // For demo purposes, we'll assume all completed orders are from this week/month
    const weeklyRevenue = orders
      .filter(order => order.status === 'Complete')
      .reduce((sum, order) => {
        const service = services.find(s => s.name === order.service);
        return sum + (service ? service.price : 0);
      }, 0);
    
    // For demo, last week revenue is half of current
    const lastWeekRevenue = weeklyRevenue / 2;
    
    const monthlyRevenue = orders
      .filter(order => {
        // Only include orders from current month and year
        const orderDate = new Date(order.date || currentDate); // Fallback to current date if no date
        return (
          order.status === 'Complete' &&
          orderDate.getMonth() === currentMonth &&
          orderDate.getFullYear() === currentYear
        );
      })
      .reduce((sum, order) => {
        const service = services.find(s => s.name === order.service);
        return sum + (service ? service.price : 0);
      }, 0);
    
    return {
      weeklyRevenue: [
        { week: 'Current Week', amount: weeklyRevenue },
        { week: 'Last Week', amount: lastWeekRevenue }
      ],
      monthlyRevenue
    };
  };

  const calculateOrderData = () => {
    return {
      totalOrders: orders.length,
      completedOrders: orders.filter(order => order.status === 'Complete').length
    };
  };

  const financialDetails = calculateFinancialData();
  const orderDetails = calculateOrderData();

  const toggleSection = (category, section) => {
    setExpandedSections(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [section]: !prev[category][section]
      }
    }));
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;