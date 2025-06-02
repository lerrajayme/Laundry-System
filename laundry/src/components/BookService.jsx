import React from 'react';
import { FaBell, FaUserCircle, FaHeadset, FaAddressCard, FaMapMarkerAlt } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from "react-icons/gi";
import { VscFeedback, VscCalendar } from "react-icons/vsc";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom'; 
import DENHARTS from '../assets/DENHARTS LAUNDERLAND.jpg';
import WashTub from '../assets/WashTub Laundry Hub.jpg';
import Igot from '../assets/I-GOT LAUNDRY HUB.jpg';
import MsLabandera from '../assets/MS LABANDERA LAUNDRY HUB.jpg';
import SpinKlean from '../assets/SPIN KLEAN LAUNDRY EXPRESS.jpg';

import './styles/BookService.css';
 

const laundryShops = [
  {
    id: 1,
    name: "Denhart's Launderland",
    address: "Gaabacuyan St., Corrales Ex, CDO",
    image: DENHARTS,
    description: "Laundry service that makes life easier",
    services: [{
        name: "Wash (Regular)",
        price: "₱60.00",
        description: "Regular clothes\nMaximum 7kg per load"
             },
             {
        name: "Wash (Comforter)",
        price: "₱60.00",
        description: "Comforter/Blanket\nMaximum 4kg per load"
             },
             {
        name: "Wash, Dry & Fold",
        price: "₱190.00",
        description: "Regular clothes\nMaximum 7kg per load\nFree Detergent & Fabcon"
             }],
    hours: "7:00 AM - 7:00 PM",
    contact: "0935-902-8261"
  },
  {
    id: 2,
    name: "Ms. Labandera Laundry Hub",
    address: "Market City, Valenzuela RD, Lapasan",
    image: MsLabandera,
    description: "Laundry Hub - We Wash, Dry, & Fold your clothes with plaesure.",
    services: [{
        name: "Wash (Regular)",
        price: "₱60.00",
        description: " Maximum 7kg per load"
             },
             {
        name: "Wash (Linens)",
        price: "₱60.00",
        description: " Maximum 5kg per load"
             },
            {
        name: "Wash, Dry & Fold",
        price: "₱200.00",
        description: "Regular clothes\nMaximum 7kg per load\nFree Detergent & Fabcon"
             }],
    hours: "7:30 AM - 7:30 PM",
    contact: "0927-999-3139"
  },
  {
    id: 3,
    name: "WashTub Laundry Hub",
    address: "Osmena Ext, Cagayan de Oro City",
    image: WashTub,
    description: "We do your laundry quick and clean!",
    services: [{
        name: "Wash & Dry (Self Service)",
        price: "₱150.00",
        description: "Regular clothes\nMaximum 8kg per load\nFree Detergent & Fabcon"
             },
            {
        name: "Wash & Dry (Drop Off)",
        price: "₱200.00",
        description: "Regular clothes\nMaximum 8kg per load\nFree Detergent & Fabcon"
             }],
    hours: "6:30 AM - 8:30 PM",
    contact: "0934-567-8901"
  },
  {
    id: 4,
    name: "Spin Klean Laundry Express",
    address: "Osmena Ext, Cagayan de Oro City",
    image: SpinKlean,
    description: "Fresh, clean clothes delivered to your doorstep daily!",
    services: [{
        name: "Wash, Dry & Fold",
        price: "₱185.00",
        description: "Regular clothes\nMaximum 7kg per load\nFree Detergent & Fabcon"
             }],
    hours: "7:00 AM - 7:00 PM",
    contact: "0905-781-3796"
  },
  {
    id: 5,
    name: "I-got Laundry Hub",
    address: "Valenzuela Rd, Agora Rd Lapasan , CDO",
    image: Igot,
    description: "Take a rest I-got the job",
    services: [{
        name: "Wash, Dry & Fold",
        price: "₱190.00",
        description: "Regular clothes\nMaximum 7kg per load\nFree Detergent & Fabcon"
             }],
    hours: "7:00 AM - 7:00 PM",
    contact: "0917-633-1165"
  },
];


const BookService = () => {
  const navigate = useNavigate();

  const handleViewDetails = (shop) => {
    navigate('/laundry-details', { 
      state: { 
      shop: {
      ...shop,
      services: shop.services || [], // Ensure services array exists
      contact: shop.contact || "Not provided",
      hours: shop.hours || "Not specified",
      image: shop.image } }});
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
      <div className="main-book">
        <div className="book-section">
          <div className="book-header">
            <Link to="/customer">
            <IoArrowBackCircle className="back-button" title="Back to Home" />
            </Link>
          <h1 className="book-title">LAUNDRY SHOPS</h1>
          </div>
        </div>

      <div className='sub-header'>
        <div className='sub-title'>
            <h2>Choose a Laundry Shop to book a service</h2>
        </div>
      </div>

      <div className="shop-list">
      {laundryShops.map((shop) => (
        <div className="shop-card-landscape" key={shop.id}>
          <div className="image-placeholder">
            <img 
            src={shop.image || "https://via.placeholder.com/260x110?text=No+Image"} 
            alt={shop.name}
            className="shop-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/260x110?text=No+Image";
            }}
          />
         </div>

          <div className="shop-content">
            <h3 className="shop-name">{shop.name || "Unnamed Laundry Shop"}</h3>
            {shop.address && (
              <p className="shop-address">
                <FaMapMarkerAlt className="icon" />
                {shop.address}
              </p>
            )}
            <button 
              className="view-button"
              onClick={() => handleViewDetails(shop)}
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
    </div>
    </div>
  );
};

export default BookService;
