import React from 'react';
import { FaBell, FaUserCircle, FaHeadset} from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { TbReport } from "react-icons/tb";
import { GrBusinessService } from "react-icons/gr";
import { GiBeachBag } from "react-icons/gi";
import { Link } from 'react-router-dom'; 
import './styles/OwnerDashboard.css';


const OwnerDashboard = () => {
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
      <div className="main-content">
        <h1>Welcome!</h1>
      </div>
    </div>
  );
};

export default OwnerDashboard;
