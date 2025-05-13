import React, { useState } from 'react';
import { MdEmail, MdClose } from "react-icons/md";
import './styles/ForgotPassword.css';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for programmatic navigation

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();  // Initialize navigate

  // Handle form submit to trigger browser validation
  const handleContinue = (e) => {
    e.preventDefault(); // Prevent default behavior so you can validate
    if (email) {
      // If email is filled, continue to the next page
      navigate("/verify-code");  // Use navigate for programmatic redirection
    }
  };

  return (
    <div className="fp-wrapper">
      <span className="icon-close">
        <MdClose className="icon" />
      </span>
      <h1>Account Recovery</h1>
      <p>Forgot your password? Let's get you back in.</p>

      <form onSubmit={handleContinue}>
        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <MdEmail className="icon" />
        </div>

        <button type="submit" className="link-button">
          Continue
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
