import React, { useState, useRef, useEffect } from 'react';
import './styles/Signup.css';
import { FaUser, FaEyeSlash, FaEye, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdClose, MdEmail } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();
    
    // Form states
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
    });
    
    // UI states
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [roleOpen, setRoleOpen] = useState(false);
    
    // Error states
    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
    });
    
    const [apiError, setApiError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const roleRef = useRef(null);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear errors when typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        
        // Password validation
        if (name === 'password') {
            if (!value) {
                setErrors(prev => ({ ...prev, password: '' }));
            } else if (value.length < 8 || value.length > 20) {
                setErrors(prev => ({ ...prev, password: 'Password must be 8-20 characters' }));
            } else {
                setErrors(prev => ({ ...prev, password: '' }));
            }
            
            // Check password match if confirm password exists
            if (formData.confirmPassword && value !== formData.confirmPassword) {
                setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
            } else if (formData.confirmPassword) {
                setErrors(prev => ({ ...prev, confirmPassword: '' }));
            }
        }
        
        // Confirm password validation
        if (name === 'confirmPassword') {
            if (!value) {
                setErrors(prev => ({ ...prev, confirmPassword: '' }));
            } else if (formData.password && value !== formData.password) {
                setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
            } else {
                setErrors(prev => ({ ...prev, confirmPassword: '' }));
            }
        }
    };

    // Role selection
    const selectRole = (role) => {
        setFormData(prev => ({ ...prev, role }));
        setRoleOpen(false);
        if (errors.role) {
            setErrors(prev => ({ ...prev, role: '' }));
        }
    };

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError('');
        
        // Validate form
        let hasErrors = false;
        const newErrors = { ...errors };
        
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
            hasErrors = true;
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            hasErrors = true;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
            hasErrors = true;
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
            hasErrors = true;
        } else if (formData.password.length < 8 || formData.password.length > 20) {
            newErrors.password = 'Password must be 8-20 characters';
            hasErrors = true;
        }
        
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
            hasErrors = true;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            hasErrors = true;
        }
        
        if (!formData.role) {
            newErrors.role = 'Please select a role';
            hasErrors = true;
        }
        
        setErrors(newErrors);
        if (hasErrors) return;
        
        // Submit to backend
        setIsSubmitting(true);
        
        try {
            const response = await axios.post('http://localhost:8000/api/signup', {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                role: formData.role
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.data.success) {
                alert('Registration successful! Please login.');
                navigate('/login');
            } else {
                setApiError(response.data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Signup error:', error);
            
            if (error.response) {
                // Server responded with error status
                if (error.response.data && error.response.data.message) {
                    setApiError(error.response.data.message);
                } else if (error.response.status === 409) {
                    setApiError('Email already exists');
                } else {
                    setApiError('Registration failed. Please try again.');
                }
            } else if (error.request) {
                // Request was made but no response
                setApiError('Network error. Please check your connection.');
            } else {
                // Other errors
                setApiError('An error occurred. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Close dropdown when clicking outside
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
        <div className="wrapper-signup">
            <span className="icon-close" onClick={() => navigate('/')}>
                <MdClose className="x" />
            </span>
            
            <form onSubmit={handleSubmit}>
                <h1>Registration</h1>
                
                {apiError && <div className="api-error">{apiError}</div>}
                
                {/* Name Field */}
                <div className="input-box">
                    <input 
                        type="text" 
                        name="fullName"
                        placeholder="Full Name" 
                        value={formData.fullName}
                        onChange={handleChange}
                        className={errors.fullName ? 'input-error' : ''}
                        required 
                    />
                    <FaUser className={`icon ${errors.fullName ? 'icon-error' : ''}`} />
                    {errors.fullName && <p className="error-message">{errors.fullName}</p>}
                </div>
                
                {/* Email Field */}
                <div className="input-box">
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Email" 
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'input-error' : ''}
                        required 
                    />
                    <MdEmail className={`icon ${errors.email ? 'icon-error' : ''}`} />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
                
                {/* Role Dropdown */}
                <div className="role" ref={roleRef}>
                    <div 
                        className={`role-select ${errors.role ? 'input-error' : ''}`} 
                        onClick={() => setRoleOpen(!roleOpen)}
                    >
                        <span>{formData.role || "-- Select Role --"}</span>
                        {roleOpen ? <FaChevronUp className="dropdown-icon" /> : <FaChevronDown className="dropdown-icon" />}
                    </div>
                    {roleOpen && (
                        <ul className="role-options">
                            <li onClick={() => selectRole("CUSTOMER")}>CUSTOMER</li>
                            <li onClick={() => selectRole("OWNER")}>OWNER</li>
                        </ul>
                    )}
                    {errors.role && <p className="error-message">{errors.role}</p>}
                </div>
                
                {/* Password Field */}
                <div className="input-box">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        name="password"
                        placeholder="Password" 
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? 'input-error' : ''}
                        required 
                    />
                    <span className="icon" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? (
                            <FaEye className={errors.password ? 'icon-error' : ''} />
                        ) : (
                            <FaEyeSlash className={errors.password ? 'icon-error' : ''} />
                        )}
                    </span>
                    {errors.password && <p className="error-message">{errors.password}</p>}
                </div>
                
                {/* Confirm Password Field */}
                <div className="input-box">
                    <input 
                        type={showConfirm ? "text" : "password"} 
                        name="confirmPassword"
                        placeholder="Confirm Password" 
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={errors.confirmPassword ? 'input-error' : ''}
                        required 
                    />
                    <span className="icon" onClick={() => setShowConfirm(!showConfirm)}>
                        {showConfirm ? (
                            <FaEye className={errors.confirmPassword ? 'icon-error' : ''} />
                        ) : (
                            <FaEyeSlash className={errors.confirmPassword ? 'icon-error' : ''} />
                        )}
                    </span>
                    {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                </div>
                
                {/* Terms and Conditions */}
                <div className="tac">
                    <p>
                        By creating an account, you agree to our{" "}
                        <Link to="/terms">terms of service</Link>.
                    </p>
                </div>
                
                {/* Submit Button */}
                <button type="submit" className="btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Processing...' : 'Submit'}
                </button>
                
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