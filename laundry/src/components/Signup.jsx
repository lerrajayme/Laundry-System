import React, { useState, useRef, useEffect } from 'react';
import './styles/Signup.css';
import { FaUser, FaEyeSlash, FaEye, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdClose, MdEmail } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
   
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

  const handleClose = () => {
    navigate('/');
  };

   const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);

     if (!value) {
      setPasswordError('');
    } else if (value.length < 8 || value.length > 20) {
      setPasswordError('Your password must have: 8 - 20 characters.');
    } else {
      setPasswordError('');
    }

    if (confirmPassword) {
      if (value !== confirmPassword) {
        setConfirmPasswordError('Passwords do not match. Try again.');
      } else {
        setConfirmPasswordError('');
      }
    }
  };

  const handleConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (!value) {
      setConfirmPasswordError('');
    } else if (password && value !== password) {
      setConfirmPasswordError('Passwords do not match. Try again.');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    if (password.length < 8 || password.length > 20) {
      setPasswordError('Your password must have: 8 - 20 characters.');
      hasError = true;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match. Try again.');
      hasError = true;
    }

    if (!selectedRole) {
      alert('Please select a role.');
      hasError = true;
    }

    if (hasError) return;

    try {
    const response = await axios.post('http://localhost:8000/api/signup', {
      fullName: e.target[0].value,  // or use useState for name/email
      email: e.target[1].value,
      password: password,
      role: selectedRole
    });

    alert('Signup successful!');
    navigate('/login');
    } catch (error) {
    if (error.response && error.response.data) {
      alert(error.response.data.message || 'Signup failed.');
    } else {
      alert('Something went wrong. Try again.');
    }
    console.error(error);
  }
  };



  return (
    <div className="wrapper-signup">
      <span className="icon-close" onClick={handleClose}>
        <MdClose className="x" />
      </span>
      <form onSubmit={handleSubmit}>
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
            value={password}
            onChange={handlePassword}
            required
            className={passwordError ? 'input-error' : ''}
          />
          {showPassword ? (
            <FaEye className={`icon ${passwordError ? 'input-error' : ''}`}
            onClick={() => setShowPassword(false)} />
          ) : (
            <FaEyeSlash className={`icon ${passwordError ? 'input-error' : ''}`} 
            onClick={() => setShowPassword(true)} />
          )}
        </div>
        {passwordError && <p className="password-error">{passwordError}</p>}

        {/* Confirm Password Field */}
        <div className="input-box">
          <input 
            type={showConfirm ? "text" : "password"} 
            placeholder="Confirm Password" 
            value={confirmPassword}
            onChange={handleConfirmPassword}
            required 
            className={confirmPasswordError ? 'input-error' : ''}
          />
          {showConfirm ? (
           <FaEye className={`icon ${confirmPasswordError ? 'input-error' : ''}`} 
           onClick={() => setShowConfirm(false)} />
          ) : (
            <FaEyeSlash className={`icon ${confirmPasswordError ? 'input-error' : ''}`} 
            onClick={() => setShowConfirm(true)} />
          )}
        </div>
        {confirmPasswordError && <p className="confirm-password-error">{confirmPasswordError}</p>}

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