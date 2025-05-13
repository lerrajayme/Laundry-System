import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
      <Link to="/" className="logo-link"> {/* Wrap logo in a link */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/4666/4666163.png"
          alt="Logo"
          className="logoImg"
        />
        <span className="logoText"> Laundry Wise Co. </span>
      </Link>
      </div>
      <ul>
        <li><Link to="/about">About us</Link></li>
        <li><Link to="/faqs">FAQs</Link></li>
        <li>
          <Link to="/login">
            <button className="btnLogin-popup">Login</button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
