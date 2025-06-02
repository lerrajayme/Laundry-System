import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaBell, FaUserCircle, FaHeadset, FaAddressCard, FaChevronDown, FaRegCalendarAlt, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from 'react-icons/gi';
import { VscFeedback, VscCalendar } from 'react-icons/vsc';
import { IoArrowBackCircle } from 'react-icons/io5';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './styles/BookingForm.css';

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { shop } = location.state || {}; // Get the shop data from navigation state

  // Move handleBackClick up here
  const handleBackClick = () => {
    navigate(-1); // This goes back to the previous page in history
    // OR navigate('/laundry-details', { state: { shop } }); if you want explicit navigation
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    pickupDate: '',
    pickupTime: '',
    services: {}, // This will now be dynamic based on shop services
    selectedServices: [], // Track selected services
    savedAddresses: [],
    shopDetails: shop || null
  });

  useEffect(() => {
  if (location.state?.formData) {
    setFormData(location.state.formData);
  }
  if (location.state?.shop) {
    setFormData(prev => ({...prev, shopDetails: location.state.shop}));
  }
}, [location.state]);

  // Initialize services based on shop data
  useEffect(() => {
    if (shop && shop.services) {
      const initialServices = {};
      shop.services.forEach(service => {
        initialServices[service.name] = false;
      });
      
      setFormData(prev => ({
        ...prev,
        services: initialServices,
        shopDetails: shop
      }));
    }
  }, [shop]);

  useEffect(() => {
    const fetchSavedAddresses = async () => {
      try {
        const response = await axios.get('/api/customer/addresses');
        setFormData(prev => ({
          ...prev,
          savedAddresses: response.data.addresses || [],
        }));
      } catch (error) {
        console.error('Failed to fetch addresses:', error);
      }
    };

    fetchSavedAddresses();
  }, []);

  const [addressDropdownOpen, setAddressDropdownOpen] = useState(false);
  const [pickupTimeDropdownOpen, setPickupTimeDropdownOpen] = useState(false);

  useEffect(() => {
    console.log('Address changed:', formData.address);
  }, [formData.address]);

  // Redirect if no shop data
  useEffect(() => {
    if (!shop) {
      navigate('/laundry-details', { replace: true });
    }
  }, [shop, navigate]);

  if (!shop) {
    return <div>Redirecting...</div>;
  }

  

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        services: {
          ...prev.services,
          [name]: checked
        },
        selectedServices: checked
          ? [...prev.selectedServices, name]
          : prev.selectedServices.filter(service => service !== name)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleClear = () => {
    setFormData(prev => ({
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      pickupDate: '',
      pickupTime: '',
      services: Object.keys(prev.services).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {}),
      selectedServices: [],
      savedAddresses: prev.savedAddresses,
      shopDetails: prev.shopDetails
    }));
    setAddressDropdownOpen(false);
    setPickupTimeDropdownOpen(false);
  };

  const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
    <div className="datepicker-wrapper" onClick={onClick} ref={ref}>
      <input
        className="custom-datepicker"
        value={value}
        readOnly
        placeholder="MM/DD/YYYY"
      />
      <FaRegCalendarAlt className="calendar-icon-inside" />
    </div>
  ));

  const handleSelectAddress = (address) => {
    setFormData(prev => ({ ...prev, address: address }));
    setAddressDropdownOpen(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    
    // Calculate total price
    const subtotal = formData.selectedServices.reduce((total, serviceName) => {
      const service = shop.services.find(s => s.name === serviceName);
      return total + (service ? parseFloat(service.price.replace(/[^0-9.]/g, '')) : 0);
    }, 0);

    const bookingFee = 10.00; // Fixed booking fee
    const total = subtotal + bookingFee;

    // Prepare services data
    const services = formData.selectedServices.map(serviceName => {
      const service = shop.services.find(s => s.name === serviceName);
      return {
        name: service.name,
        price: parseFloat(service.price.replace(/[^0-9.]/g, ''))
      };
    });

    // Prepare customer data
    const customerData = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: "", // You might want to get this from user profile
      phone: formData.phone,
      address: formData.address
    };

    // Prepare booking data
    const bookingData = {
      pickupDate: formData.pickupDate ? formData.pickupDate.toISOString() : "", // Convert to ISO string
      pickupTime: formData.pickupTime,
      services: services
    };

    console.log('Navigating with:', {
      customerData,
      bookingData,
      pricing: { subtotal, bookingFee, total },
      shopDetails: shop
    });

    // Navigate to payment page with all data
    navigate('/customer-payment', {
      state: {
        customerData,
        bookingData,
        pricing: { subtotal, bookingFee, total },
        shopDetails: shop
      }
    });
  };

  return (
    <div className="dashboard-container">
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

      <div className="sidebar">
        <Link to="/book-service"><button><VscCalendar className="side-icon" /> Book a Service</button></Link>
        <Link to="/addresscustomer"><button><FaAddressCard className="side-icon" /> Address Management</button></Link>
        <Link to="/order-history"><button><GiBeachBag className="side-icon" /> Order History</button></Link>
        <Link to="/feedback"><button><VscFeedback className="side-icon" /> Feedback & Ratings</button></Link>
        <div className="logout">
          <Link to="/customer-logout"><button className="logout-btn"><FiLogOut className="side-icon" /> Logout</button></Link>
        </div>
      </div>

      <div className="main-book">
        <div className="book-header">
          <IoArrowBackCircle className="back-button" onClick={handleBackClick} />
          <h1 className="book-title">BOOKING FORM</h1>
        </div>

        <div className='book-content'>
          <div className="booking-wrapper">
            <h2 className='booking-title'> BOOKING FORM </h2>
            <p className="booking-desc">
              Our customer service representative will contact you within one (1) hour from the time of your submission for order confirmation.
            </p>

            <form className="booking-form" onSubmit={handleSubmit}>
              {shop && (
                <div className="shop-info-summary">
                  <h3>Booking for: {shop.name}</h3>
                  <p><FaMapMarkerAlt /> {shop.address}</p>
                  <p><FaPhoneAlt /> {shop.contact}</p>
                </div>
              )}
              <div className="form-row name-row">
                <label> Full Name <span className="required">*</span></label>
                <input id="firstName" type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                <input id="lastName" type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
              </div>

              <div className="form-row">
                <label> Phone No. <span className="required">*</span></label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="+639123456789"
                  value={'+63' + formData.phone}
                  onChange={(e) => {
                    let input = e.target.value;
                    if (!input.startsWith('+63')) return;
                    const digitsOnly = input.replace(/\D/g, '');
                    const cleaned = digitsOnly.startsWith('63') ? digitsOnly.slice(2) : digitsOnly;
                    const limited = cleaned.slice(0, 10);
                    setFormData(prev => ({ ...prev, phone: limited }));
                  }}
                  onKeyDown={(e) => {
                    const input = e.target;
                    if (
                      (e.key === 'Backspace' || e.key === 'Delete') &&
                      input.selectionStart <= 3
                    ) {
                      e.preventDefault();
                    }
                  }}
                  required
                />
              </div>

              <div className="form-row">
                <label> Address <span className="required">*</span></label>
                <div className="address-dropdown">
                  <div
                    className="address-headers"
                    onClick={() => {
                      setAddressDropdownOpen(!addressDropdownOpen);
                      setPickupTimeDropdownOpen(false);
                    }}
                  >
                    <span>{formData.address || '--Select Address--'}</span>
                    <FaChevronDown className="chevron-icon" />
                  </div>
                  {addressDropdownOpen && (
                    <ul className="dropdown-list">
                      {formData.savedAddresses.map((savedAddress, index) => (
                        <li
                          key={index}
                          onClick={() => handleSelectAddress(savedAddress)}
                        >
                          {savedAddress}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="form-row">
                <label> Pickup Date <span className="required">*</span></label>
                <DatePicker
                  selected={formData.pickupDate ? new Date(formData.pickupDate) : null}
                  onChange={(date) =>
                    setFormData(prev => ({
                      ...prev,
                      pickupDate: date
                    }))
                  }
                  dateFormat="MM/dd/yyyy"
                  customInput={<CustomDateInput />}
                />
              </div>

              <div className="form-row">
                <label> Pickup Time <span className="required">*</span></label>
                <div className="custom-dropdown">
                  <div className="dropdown-header" onClick={() => {
                    setPickupTimeDropdownOpen(!pickupTimeDropdownOpen);
                    setAddressDropdownOpen(false);
                  }}>
                    <span>{formData.pickupTime || '--Select time--'}</span>
                    <FaChevronDown className="chevron-icon" />
                  </div>
                  {pickupTimeDropdownOpen && (
                    <ul className="dropdown-list">
                      {['8:00 AM', '9:00 AM', '10:00 AM'].map((time, index) => (
                        <li key={index} onClick={() => {
                          setFormData(prev => ({ ...prev, pickupTime: time }));
                          setPickupTimeDropdownOpen(false);
                        }}>
                          {time}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="form-row services-row">
              <label>Services <span className="required">*</span></label>
              <div className="services-options">
                {shop.services?.map((service) => (
                  <div key={service.name} className="service-option">
                    <label>
                      <input
                        type="checkbox"
                        name={service.name}
                        checked={formData.services[service.name] || false}
                        onChange={handleChange}
                      />
                      {service.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>


              <div className="form-actions">
                <button type="button" className="clear-btns" onClick={handleClear}>CLEAR</button>
                <button type="submit" className="submit-btns">SUBMIT</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;