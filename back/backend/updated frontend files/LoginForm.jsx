import React, { useState, useRef, useEffect } from 'react';
import './styles/LoginForm.css';
import { FaEye, FaEyeSlash, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdClose, MdEmail } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';

// Added import
import axios from 'axios';

const LoginForm = () => {
  const navigate = useNavigate();

  const [roleOpen, setRoleOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const roleRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Added password state
  const [errorMessage, setErrorMessage] = useState('');

  const toggleRole = () => {
    setRoleOpen(!roleOpen);
  };

  const selectRole = (role) => {
    setSelectedRole(role);
    setRoleOpen(false);
    setErrorMessage(''); // Clear error when selecting role
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (roleRef.current && !roleRef.current.contains(e.target)) {
        setRoleOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleClose = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRole) {
      setErrorMessage("Please select a role.");
      return;
    }

    try {
      // Step 1: Get CSRF token
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });

      // Step 2: Make login request with axios
      const response = await axios.post(
        'http://localhost:8000/api/login',
        {
          email,
          password,
          role: selectedRole,  // Added role if needed by backend
        },
        { withCredentials: true }
      );

      // Assuming token is in response.data.token (adjust if different)
      const token = response.data.token;
      if (token) {
        localStorage.setItem('authToken', token);
      }

      // Redirect based on role
      if (selectedRole === "CUSTOMER") {
        navigate("/Customer");
      } else if (selectedRole === "OWNER") {
        navigate("/owner");
      }
    } catch (error) {
      // Extract message if available
      const msg = error.response?.data?.message || "Login failed, please try again.";
      setErrorMessage(msg);
    }
  };

  return (
    <div className="login-wrapper">
      <span className="icon-close" onClick={handleClose}>
        <MdClose className="icon" />
      </span>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <MdEmail className="icon" />
        </div>

        {/* Role Dropdown */}
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

        <div className="input-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}                        
            onChange={(e) => setPassword(e.target.value)}  
            required
          />
          <span className="icon" onClick={togglePassword}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        <div className="remember-forgot">
          <label><input type="checkbox" />Remember me</label>
          <Link to="/forgot-password">Forgot password?</Link>
        </div>

        <button type="submit" className="btn">Login</button>

        <div className="register">
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
