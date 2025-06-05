import React, { useState, useRef, useEffect } from 'react';
import './styles/LoginForm.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdClose, MdEmail } from "react-icons/md";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const togglePassword = () => setShowPassword(!showPassword);
  const handleClose = () => navigate('/');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setPasswordError('');

    // Basic validation
    let valid = true;
    if (!password) {
      setPasswordError('Password is required.');
      valid = false;
    }
    if (!valid) return;

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password
      });

      if (response.data.success) {
        // Store user data and token
        localStorage.setItem('user', JSON.stringify(response.data.user));
        if (response.data.access_token) {
          localStorage.setItem('token', response.data.access_token);
        }

        // Navigate based on the role from the response
        const userRole = response.data.user.role; // Assuming the backend returns the role
        navigate(userRole === "CUSTOMER" ? "/customer" : "/owner");
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