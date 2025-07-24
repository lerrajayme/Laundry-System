import React, { useState, useEffect } from 'react';
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
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Check for saved credentials on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedPassword = localStorage.getItem('rememberedPassword');
    
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

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
      
      console.log("Login response:", response.data);

      if (response.data.success) {
        // Navigate based on the role from the response
        const userRole = response.data.user.role.toUpperCase();
        
        console.log("User role:", userRole);

            if (userRole === "ADMIN") {
            navigate("/admin"); // Redirect to admin page
          } else if (userRole === "OWNER") {
            navigate("/owner"); // Redirect to owner page
          } else {
            navigate("/customer"); // Default to customer page
          }
        
        
        // Store user data and token
        localStorage.setItem('user', JSON.stringify(response.data.user));
        if (response.data.access_token) {
          localStorage.setItem('token', response.data.access_token);
        }
        
        // Handle remember me functionality
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
          localStorage.setItem('rememberedPassword', password);
        } else {
          localStorage.removeItem('rememberedEmail');
          localStorage.removeItem('rememberedPassword');
        }
      
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
          <label>
            <input 
              type="checkbox" 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>
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