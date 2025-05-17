import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaBell, FaUserCircle, FaHeadset, FaAddressCard, FaChevronDown, FaRegCalendarAlt } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { GiBeachBag } from 'react-icons/gi';
import { VscFeedback, VscCalendar } from 'react-icons/vsc';
import { IoArrowBackCircle } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import './styles/BookingForm.css';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    pickupDate: '',
    pickupTime: '',
    services: { washOnly: false, washDry: false },
    savedAddresses: []
  });

  const [addressDropdownOpen, setAddressDropdownOpen] = useState(false);
  const [pickupTimeDropdownOpen, setPickupTimeDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchedAddresses = ['Address 1', 'Address 2', 'Address 3'];
    setFormData(prev => ({ ...prev, savedAddresses: fetchedAddresses }));
  }, []);

  useEffect(() => {
  console.log('Address changed:', formData.address);
}, [formData.address]);


  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, services: { ...prev.services, [name]: checked } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleClear = () => {
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      pickupDate: '',
      pickupTime: '',
      services: { washOnly: false, washDry: false },
      savedAddresses: formData.savedAddresses
    });
    setAddressDropdownOpen(false);
    setPickupTimeDropdownOpen(false);
  };

  const navigate = useNavigate();

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
  console.log('Submitted', formData);
  navigate('/subscription');  // changed from '/customer-payment' to '/subscription'
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
          <Link to="/laundry-details"><IoArrowBackCircle className="back-button" /></Link>
          <h1 className="book-title">BOOKING FORM</h1>
        </div>

        <div className="booking-wrapper">
          <h2 className='booking-title'> BOOKING FORM </h2>
          <p className="booking-desc">
            Our customer service representative will contact you within one (1) hour from the time of your submission for order confirmation.
          </p>

          <form className="booking-form" onSubmit={handleSubmit}>
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

                  // Always keep "+63" prefix
                  if (!input.startsWith('+63')) return;

                  // Remove all non-digit characters
                  const digitsOnly = input.replace(/\D/g, '');

                  // Slice off the first two digits (63) if they exist
                  const cleaned = digitsOnly.startsWith('63') ? digitsOnly.slice(2) : digitsOnly;

                  // Limit to 10 digits (for local number)
                  const limited = cleaned.slice(0, 10);

                  setFormData(prev => ({ ...prev, phone: limited }));
                }}
                onKeyDown={(e) => {
                  // Prevent deleting the "+63" prefix
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
              <label> Services <span className="required">*</span></label>
              <div className="services-options">
                <label>
                  <input type="checkbox" name="washOnly" checked={formData.services.washOnly} onChange={handleChange} /> WASH ONLY
                </label>
                <label>
                  <input type="checkbox" name="washDry" checked={formData.services.washDry} onChange={handleChange} /> WASH, DRY & FOLD
                </label>
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
  );
};

export default BookingForm;
