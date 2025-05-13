import React, { useState, useRef, useEffect } from 'react';
import './styles/Signup.css';
import { FaUser, FaEyeSlash, FaEye, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdClose, MdEmail } from "react-icons/md";
import { Link } from 'react-router-dom';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
   
    const [roleOpen, setRoleOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const roleRef = useRef(null);

  const toggleRole = () => {
    setRoleOpen(prev => !prev);
  };

  const selectRole = (role) => {
    setSelectedRole(role);
    setRoleOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (roleRef.current && !roleRef.current.contains(e.target)) {
        setRoleOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="wrapper">
      <span className="icon-close">
        <MdClose className="icon" />
      </span>
      <form action=''>
        <h1>Registration</h1>

        {/* Name Field */}
        <div className="input-box">
          <input type="text" placeholder="Full Name" required />
          <FaUser className="icon" />
        </div>

        {/* Email Field */}
        <div className="input-box">
          <input type="email" placeholder="Email" required />
          <MdEmail className="icon" />
        </div>

           {/* Toggle-style Role Dropdown */}
        <div className="role" ref={roleRef}>
         <div className="role-select" onClick={toggleRole}>
          <span>{selectedRole || "-- Select Role --"}</span>
          {roleOpen ? <FaChevronUp className="dropdown-icon" /> : <FaChevronDown className="dropdown-icon" />}
        </div>
        {roleOpen && (
          <ul className="role-options">
            <li onClick={() => selectRole("CUSTOMER")}>CUSTOMER</li>
            <li onClick={() => selectRole("OWNER")}>OWNER</li>
          </ul>
        )}
        </div>

          {/* Password Field */}
          <div className="input-box">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            required 
          />
          {showPassword ? (
            <FaEye className="icon" onClick={() => setShowPassword(false)} />
          ) : (
            <FaEyeSlash className="icon" onClick={() => setShowPassword(true)} />
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="input-box">
          <input 
            type={showConfirm ? "text" : "password"} 
            placeholder="Confirm Password" 
            required 
          />
          {showConfirm ? (
            <FaEye className="icon" onClick={() => setShowConfirm(false)} />
          ) : (
            <FaEyeSlash className="icon" onClick={() => setShowConfirm(true)} />
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="tac">
          <p>
            By creating an account, you agree to our{" "}
            <Link to="/terms">terms of service</Link>.
          </p>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn">Submit</button>

        {/* Login Link */}
        <div className="login">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;