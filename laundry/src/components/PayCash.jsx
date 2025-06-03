  import React, { useEffect, useMemo, useState } from 'react';
  import { FaBell, FaUserCircle, FaHeadset, FaAddressCard, FaCheckCircle } from 'react-icons/fa';
  import { FiLogOut } from 'react-icons/fi';
  import { GiBeachBag } from 'react-icons/gi';
  import {  VscCalendar } from 'react-icons/vsc';
  import { IoArrowBackCircle } from 'react-icons/io5';
  import { Link, useLocation, useNavigate } from 'react-router-dom';
  import './styles/PayCash.css';

  const PayCash = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const storedState = JSON.parse(localStorage.getItem('customerPaymentState')) || {};

  const initialState = useMemo(() => {
    const state = location.state || storedState || {};

    // Validate and clean up services data
    if (state.bookingData?.services) {
      state.bookingData.services = state.bookingData.services.map(service => ({
        ...service,
        price: Number(service.price) || 0,
        quantity: Number(service.quantity) || 1
      }));
    }

    return state;
  }, [location.state, storedState]);

  const {
    customerData = {},
    bookingData = {},
    pricing = {},
    shopDetails = {}
  } = initialState;

  const subtotal = pricing.subtotal || 0;
  const bookingFee = pricing.bookingFee || 0;
  const total = pricing.total || 0;

  useEffect(() => {
    console.log('Current booking data:', bookingData);
    console.log('Current customer data:', customerData);
    console.log('Current pricing data:', pricing);
  }, [bookingData, customerData, pricing]);

  const handleConfirmPayment = async () => {
    setIsLoading(true);
    
    try {
      const orderCount = parseInt(localStorage.getItem('orderCount')) || 0;
      const newOrderCount = orderCount + 1;
      const orderId = `ORD-${String(newOrderCount).padStart(3, '0')}`;
      localStorage.setItem('orderCount', newOrderCount.toString());

      const orderDate = new Date();
      
      // Ensure customer name is properly formatted
      const customerName = customerData.firstName || customerData.lastName 
        ? `${customerData.firstName || ''} ${customerData.lastName || ''}`.trim()
        : customerData.name || 'Unknown Customer';

      const orderData = {
        id: orderId,
        date: orderDate.toLocaleDateString(),
        // Customer Info - using consistent field names
        customerName: customerName,
        customerPhone: customerData.phone ? `+63${customerData.phone}` : 'Not provided',
        customerAddress: customerData.address || 'Not provided',
        // Shop Info
        shopName: shopDetails.name || 'Unknown Shop',
        shopAddress: shopDetails.address || 'Not provided',
        shopContact: shopDetails.contactNumber || 'Not provided',
        // Services
        services: bookingData.services?.map(service => ({
          name: service.name || 'Unknown Service',
          price: service.price || 0,
          quantity: service.quantity || 1
        })) || [],
        // Pricing
        subtotal: subtotal,
        bookingFee: bookingFee,
        total: total,
        // Pickup Info
        pickupDate: bookingData.pickupDate || 'Not specified',
        pickupTime: bookingData.pickupTime || 'Not specified',
        status: "Pending"
      };

      console.log('Order data being saved:', orderData);

      // Save to localStorage
      const existingOrders = JSON.parse(localStorage.getItem('customerOrders')) || [];
      existingOrders.unshift(orderData);
      localStorage.setItem('customerOrders', JSON.stringify(existingOrders));

      // Clear temporary booking data
      localStorage.removeItem('customerPaymentState');
      
      setShowSuccessPopup(true);

      setTimeout(() => {
        navigate('/order-history', { 
          state: { 
            showOrderSuccess: true,
            orderId: orderId
        } 
        });
      }, 3000);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

    const handleBack = () => {
      navigate('/customer-payment', { state: initialState });
    };

    return (
      <div className="dashboard-container">
        {/* Success Popup */}
        {showSuccessPopup && (
          <div className="payment-success-popup">
            <div className="popup-content">
              <FaCheckCircle className="success-icon" />
              <h2>Booked Successfully!</h2>
              <p>Your laundry order has been received.</p>
              <p>We'll notify you when it's confirmed.</p>
            </div>
          </div>
        )}

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
            <IoArrowBackCircle className="back-button" onClick={handleBack} />
            <h1 className="book-title">CASH PAYMENT</h1>
          </div>

          <div className="payment-content">
            <div className="booking-summary-container">
              <h1 className="payment-title">Pay Cash</h1>

              <div className="booking-totals">
                <h2>Booking Summary</h2>

                <div className="price-row">
                  <span>Subtotal: </span>
                  <span>₱{(bookingData.services?.reduce((sum, service) => {
                    const price = Number(service.price) || 0;
                    const quantity = Number(service.quantity) || 1;
                    return sum + (price * quantity);
                  }, 0) || 0).toFixed(2)}</span>
                </div>

                <div className="price-row">
                  <span>Booking Fee: </span>
                  <span>₱{bookingFee.toFixed(2)}</span>
                </div>

                <div className="total-row">
                  <span>Total Amount: </span>
                  <span>₱{total.toFixed(2)}</span>
                </div>

              <button 
                className="place-order-btn" 
                onClick={handleConfirmPayment}
                disabled={isLoading || !bookingData.services?.length}
              >
                {isLoading ? 'Processing Order...' : 'Confirm & Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  };

  export default PayCash;