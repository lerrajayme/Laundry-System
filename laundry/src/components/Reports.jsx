import React, { useState} from 'react';
import { FaBell, FaUserCircle, FaHeadset } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from "react-icons/gi";
import { TbReport } from "react-icons/tb";
import { GrBusinessService } from "react-icons/gr";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './styles/Reports.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Reports = () => {
  const [orders] = useState([
  { id: 'O-001', customerName: 'Lerra Jayme', service: 'Wash only', status: 'Pending', date: '2025-06-01' },
  { id: 'O-002', customerName: 'Jane Baletta', service: 'Wash & Fold', status: 'In Progress', date: '2025-06-02' },
  { id: 'O-003', customerName: 'Melchor Dacup', service: 'Wash, Fold & Dry', status: 'Pending', date: '2025-06-01' },
  { id: 'O-004', customerName: 'Katherine Emoredna', service: 'Wash', status: 'Complete', date: '2025-05-28' },
  { id: 'O-005', customerName: 'Hexel Rana', service: 'Wash, Fold & Dry', status: 'Complete', date: '2025-05-20' },
  { id: 'O-006', customerName: 'John Doe', service: 'Wash only', status: 'Complete', date: '2025-06-03' },
  { id: 'O-007', customerName: 'Jane Smith', service: 'Wash & Fold', status: 'Complete', date: '2025-06-04' },
]);


  const [services] = useState([
    { name: 'Wash only', price: 50 },
    { name: 'Wash & Fold', price: 75 },
    { name: 'Wash, Fold & Dry', price: 100 },
    { name: 'Wash', price: 50 },
  ]);

  const calculateFinancialData = () => {
    const now = new Date();

    const currentWeekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    const lastWeekStart = new Date(currentWeekStart);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const lastMonthDate = new Date(currentDate);
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
    const lastMonth = lastMonthDate.getMonth();
    const lastMonthYear = lastMonthDate.getFullYear();

    const results = orders
      .filter(order => order.status === 'Complete')
      .reduce((acc, order) => {
        const orderDate = new Date(order.date || currentDate);
        const service = services.find(s => s.name === order.service);
        const amount = service ? service.price : 0;

        acc.weeklyRevenue += amount;

        if (orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear) {
          acc.currentMonth += amount;
        } else if (orderDate.getMonth() === lastMonth && orderDate.getFullYear() === lastMonthYear) {
          acc.lastMonth += amount;
        }

        return acc;
      }, {
        weeklyRevenue: 0,
        currentMonth: 0,
        lastMonth: 0
      });

    return {
      weeklyRevenue: [
        { week: 'Current Week', amount: results.weeklyRevenue },
        { week: 'Last Week', amount: results.weeklyRevenue / 2 }
      ],
      monthlyRevenue: results.currentMonth,
      lastMonthRevenue: results.lastMonth
    };
  };

  const calculateServiceDistribution = () => {
    const serviceCounts = {};

    orders.forEach(order => {
      if (!serviceCounts[order.service]) {
        serviceCounts[order.service] = 0;
      }
      serviceCounts[order.service]++;
    });

    return serviceCounts;
  };

  const financialDetails = calculateFinancialData();
  const serviceDistribution = calculateServiceDistribution();

  const weeklyRevenueData = {
    labels: ['Weekly Revenue'],
    datasets: financialDetails.weeklyRevenue.map((item, index) => {
      const colors = [
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 99, 132, 0.5)',
      ];
      const borderColors = [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
      ];

      return {
        label: item.week,
        data: [item.amount],
        backgroundColor: colors[index % colors.length],
        borderColor: borderColors[index % borderColors.length],
        borderWidth: 1,
      };
    }),
  };

  const monthlyRevenueData = {
    labels: ['Monthly Comparison'],
    datasets: [
      {
        label: 'Current Month',
        data: [financialDetails.monthlyRevenue],
        backgroundColor: 'rgba(75, 192, 192, 0.5)'
      },
      {
        label: 'Last Month',
        data: [financialDetails.lastMonthRevenue],
        backgroundColor: 'rgba(153, 102, 255, 0.5)'
      }
    ]
  };

  const serviceDistributionData = {
    labels: ['Service Distribution'],
    datasets: Object.keys(serviceDistribution).map((service, index) => {
      const colors = [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
      ];
      const borderColors = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ];

      return {
        label: service,
        data: [serviceDistribution[service]],
        backgroundColor: colors[index % colors.length],
        borderColor: borderColors[index % borderColors.length],
        borderWidth: 1,
      };
    }),
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '',
      },
    },
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
                <div className="chart-container">
                  <h3>Weekly Revenue</h3>
                  <Bar data={weeklyRevenueData} options={chartOptions} />
                </div>
                
                <div className="chart-container">
                  <h3>Monthly Revenue</h3>
                  <Bar data={monthlyRevenueData} options={chartOptions} />
                </div>
              </div>
            </div>

            {/* Order Summaries */}
            <div className="report-wrapper">
              <div className="report-header">
                <h2>SERVICE DISTRIBUTION</h2>
              </div>
              <div className="report-content">
                <div className="chart-container">
                  <h3>Orders by Service Type</h3>
                  <Bar data={serviceDistributionData} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  );
};

export default Reports;