import React from 'react';
import { FaBell, FaUserCircle, FaHeadset, FaAddressCard } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from 'react-icons/gi';
import { VscCalendar } from 'react-icons/vsc';
import { IoArrowBackCircle } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './styles/CustomerPayment.css';

// Date formatting utility function
const formatDateToMMDDYYYY = (isoDateString) => {
  if (!isoDateString || isoDateString === "Not specified") return "Not specified";
  
  try {
    const date = new Date(isoDateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  } catch (e) {
    console.error('Error formatting date:', e);
    return isoDateString;
  }
};

const CustomerPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if we have data in location.state first
  const stateData = location.state || {};

  // Fallback to localStorage if no state
  let storedState;
  try {
    storedState = JSON.parse(localStorage.getItem('customerPaymentState')) || {};
  } catch (e) {
    storedState = {};
  }

  // Merge data sources with priority to location.state
  const {
    customerData = storedState.customerData || {},
    bookingData = storedState.bookingData || {},
    subscriptionData = storedState.subscriptionData || null,
    pricing = storedState.pricing || {},
    shopDetails = storedState.shopDetails || {}
  } = stateData;

  console.log('Received data:', {
    customerData,
    bookingData,
    subscriptionData,
    pricing,
    shopDetails
  });

  const handleBackClick = () => {
    navigate(-1);
  };

  // Merge customer details
  const customerInfo = {
    name: customerData.name || "Not provided",
    email: customerData.email || "Not provided",
    phone: customerData.phone ? `+63${customerData.phone}` : "Not provided",
    address: customerData.address || "Not provided"
  };

  // Booking information including subscription
  const bookingInfo = {
    shopName: shopDetails.name || "Laundry Shop",
    pickupDate: formatDateToMMDDYYYY(bookingData.pickupDate),
    pickupTime: bookingData.pickupTime || "Not specified",
    services: [
      ...(bookingData.services || []),
      ...(subscriptionData ? [{
        name: `Subscription: ${subscriptionData.planName}`,
        price: subscriptionData.price
      }] : [])
    ]
  };

  // Calculate pricing
  const calculateSubtotal = () => {
    let subtotal = 0;

    if (bookingData.services) {
      subtotal += bookingData.services.reduce((sum, service) => sum + (service.price || 0), 0);
    }
    if (subscriptionData && subscriptionData.price) {
      subtotal += subscriptionData.price;
    }
    return subtotal;
  };

  const updatedSubtotal = calculateSubtotal();

  const updatedPricing = {
    ...pricing,
    subtotal: updatedSubtotal,
    bookingFee: pricing.bookingFee ?? 10.00,
    total: updatedSubtotal + (pricing.bookingFee ?? 10.00)
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <div className="navbar-customer">
        <Link to="/customer" className="logo-container">
          <img src="https://cdn-icons-png.flaticon.com/512/4666/4666163.png" alt="Logo" className="logoImg" />
          <div className="logo">Laundry Wise Co.</div>
        </Link>
        <div className="nav-right">
          <Link to="/customer-support"><FaHeadset className="icon" /></Link>
          <Link to="/notifications"><FaBell className="icon" /></Link>
          <Link to="/profile"><FaUserCircle className="icon" /></Link>
        </div>
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <Link to="/book-service"><button><VscCalendar className="side-icon" /> Book a Service</button></Link>
        <Link to="/addresscustomer"><button><FaAddressCard className="side-icon" /> Address Management</button></Link>
        <Link to="/order-history"><button><GiBeachBag className="side-icon" /> Order History</button></Link>
        <div className="logout">
          <Link to="/customer-logout"><button className="logout-btn"><FiLogOut className="side-icon" /> Logout</button></Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-book">
        <div className="book-header">
          <IoArrowBackCircle className="back-button" onClick={handleBackClick}/>
          <h1 className="book-title">CUSTOMER PAYMENT</h1>
        </div>

        <div className="payment-summary">
          {/* Customer Information */}
          <div className="section">
            <h2>Customer Details</h2>
            <div className="info-input-container">
              <input 
                type="text" 
                value={customerInfo.name} 
                readOnly
                className="info-input"
                placeholder="Complete Name"
              />
            </div>
          
            <div className="info-input-container">
              <input 
                type="tel" 
                value={customerInfo.phone} 
                readOnly
                className="info-input"
                placeholder="Contact Number"
              />
            </div>
            <div className="info-input-container">
              <input 
                type="text" 
                value={customerInfo.address} 
                readOnly
                className="info-input"
                placeholder="Delivery Address"
              />
            </div>
          </div>

          {/* Booking Information */}
          <div className="section">
            <h2>Booking Details</h2>
            <div className="info-input-container">
              <input
                type="text"
                value={bookingInfo.pickupDate}
                readOnly
                className="info-input"
                placeholder="Pickup Date (MM/DD/YYYY)"
              />
            </div>
            <div className="info-input-container">
              <input
                type="text"
                value={bookingInfo.pickupTime}
                readOnly
                className="info-input"
                placeholder="Pickup Time"
              />
            </div>
            <div className="services-list">
              {bookingInfo.services && bookingInfo.services.length > 0 ? (
                bookingInfo.services.map((service, index) => (
                  <div key={index} className="service-item">
                    <span>{service.name} </span>
                    <span>₱{service.price.toFixed(2)}</span>
                  </div>
                ))
              ) : (
                <div className="no-services">No services selected</div>
              )}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="section">
            <h2>Payment Summary</h2>
            <div className="price-row">
              <span>Subtotal:</span>
              <span>₱{updatedPricing.subtotal.toFixed(2)}</span>
            </div>
            
            <div className="price-row">
              <span>Booking Fee:</span>
              <span>₱{updatedPricing.bookingFee.toFixed(2)}</span>
            </div>
            <div className="price-row total-row">
              <span>Total: </span>
              <span>₱{updatedPricing.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="payment-options">
            <h2>Choose a payment method</h2>
            <div className="payment-buttons-container">
              <Link 
                to="/pay-with-cash" 
                state={{ 
                  customerData,
                  bookingData,
                  subscriptionData,
                  pricing: updatedPricing,
                  shopDetails
                }}
              >
                <button className="payment-cash">Pay with Cash</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPayment;