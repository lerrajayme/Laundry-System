import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdClose } from "react-icons/md";
import './styles/ResetPassword.css';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;

    if (newPassword.length < 8 || newPassword.length > 20) {
      setNewPasswordError('Your password must have: 8 - 20 characters.');
      hasError = true;
    } else {
      setNewPasswordError('');
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match. Try again.');
      hasError = true;
    } else {
      setConfirmPasswordError('');
    }

    if (hasError) return;

    // Placeholder for submitting password
    console.log('New password submitted:', newPassword);
    navigate('/password-reset-success');
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);

    // Real-time validation
    if (!value) {
      setNewPasswordError('');
    } else if (value.length < 8 || value.length > 20) {
      setNewPasswordError('Your password must have: 8 - 20 characters.');
    } else {
      setNewPasswordError('');
    }

    if (confirmPassword) {
      if (value !== confirmPassword) {
        setConfirmPasswordError('Passwords do not match. Try again.');
      } else {
        setConfirmPasswordError('');
      }
    }
  };

  const handleConfirmChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (!value) {
      setConfirmPasswordError('');
    } else if (newPassword && value !== newPassword) {
      setConfirmPasswordError('Passwords do not match. Try again.');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="rp-wrapper">
      <span className="icon-close" onClick={handleClose}>
        <MdClose className="x" />
      </span>
      <h1>Reset Password</h1>
      <p>Enter and confirm your new password below.</p>

      <form onSubmit={handleSubmit}>
        {/* New Password Field */}
        <div className="input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="New Password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
            className={newPasswordError ? 'input-error' : ''}
          />
          {showPassword ? (
          <FaEye
            className={`icon ${newPasswordError ? 'input-error' : ''}`}
            onClick={() => setShowPassword(false)}
          />
          ) : (
          <FaEyeSlash
          className={`icon ${newPasswordError ? 'input-error' : ''}`}
          onClick={() => setShowPassword(true)}
          />
          )}

        </div>
        {newPasswordError && <p className="new-password-error">{newPasswordError}</p>}

        {/* Confirm Password Field */}
        <div className="input-container">
          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmChange}
            required
            className={confirmPasswordError ? 'input-error' : ''}
          />
          {showConfirm ? (
          <FaEye
             className={`icon ${confirmPasswordError ? 'input-error' : ''}`}
             onClick={() => setShowConfirm(false)}
            />
         ) : (
          <FaEyeSlash
            className={`icon ${confirmPasswordError ? 'input-error' : ''}`}
            onClick={() => setShowConfirm(true)}
            />
          )}

        </div>
        {confirmPasswordError && <p className="confirm-password-error">{confirmPasswordError}</p>}

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
