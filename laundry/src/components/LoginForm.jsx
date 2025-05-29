import React, { useState, useRef, useEffect } from 'react';
import './styles/LoginForm.css';
import { FaEye, FaEyeSlash, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdClose, MdEmail } from "react-icons/md";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  const [roleOpen, setRoleOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const roleRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [passwordError, setPasswordError] = useState('');
  const [roleError, setRoleError] = useState('');

  const toggleRole = () => setRoleOpen(!roleOpen);

  const selectRole = (role) => {
    setSelectedRole(role);
    setRoleOpen(false);
    setLoginError('');
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
  const handleClose = () => navigate('/');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setPasswordError('');
    setRoleError('');

    // Basic validation
    let valid = true;
    if (!password) {
      setPasswordError('Password is required.');
      valid = false;
    }
    if (!selectedRole) {
      setRoleError('Please select a role.');
      valid = false;
    }
    if (!valid) return;

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
        role: selectedRole
      });

      if (response.data.success) {
        navigate(selectedRole === "CUSTOMER" ? "/customer" : "/owner");
      } else {
        setLoginError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setLoginError('Invalid credentials. Please try again.');
      } else {
        setLoginError('Login failed. Please try again later.');
      }
    }
  };

  return (
    <div className="login-wrapper">
      <span className="icon-close" onClick={handleClose}>
        <MdClose className="x" />
      </span>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

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
          {roleError && <p className="field-error">{roleError}</p>}
        </div>

        <div className="input-box password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError('');
              setLoginError('');
            }}
            required
          />
          <span className="icon" onClick={togglePassword}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
          <div className="error-container">
            {passwordError && <p className="field-error">{passwordError}</p>}
            {loginError && !passwordError && <p className="field-error">{loginError}</p>}
          </div>
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