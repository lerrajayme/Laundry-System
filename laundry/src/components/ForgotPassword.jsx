import React, { useState } from 'react';
import { MdEmail, MdClose } from "react-icons/md";
import './styles/ForgotPassword.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function genOTP()
{
  let token = '';
  let numbers = '0123456789';
  for (let i = 1; i <= 6; ++i)
  {
    token += numbers[Math.floor(Math.random() * (0 + numbers.length - 1) + 0)];
  }
  if (token.length !== 6) genOTP() // generate again
  else return token
}

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(''); // ✅ FIXED
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };
  
  const handleContinue = async (e) => {
    e.preventDefault();
    setError('');
    try {
      let otp = genOTP()
      // 1. Get user by email
      const userResponse = await axios.get(`http://localhost:8000/api/user/${email}`);
      const name = userResponse.data.name;
      // const response2 = await axios.get('http://localhost:8000/api/userlist')
      const response2 = await axios.post('http://localhost:8000/api/forgot', {
        company: 'Laundry Wise Co. Account',
        email: email,
        website: 'Laundry Wise Co.',
        website_title: '<p style="color: #006071;">Laundry Wise Co.</p>',
        body: `
            <p>
            Hi <b style="font-size: 20px">${name}</b>,<br>
            Here is your OTP for account recovery: <b style="font-size: 20px">${otp}</b>
            </p>
          `
      })
      navigate("/verify-code")
      localStorage.setItem('_ajkshdas_',otp)
    } catch (err) {
      console.error("AXIOS ERROR:", err.response?.data || err.message || err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fp-wrapper">
      <span className="icon-close" onClick={handleClose}>
        <MdClose className="x" />
      </span>
      <h1>Account Recovery</h1>
      <p>Forgot your password? Let's get you back in.</p>

      <form onSubmit={handleContinue}>
        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            required
          />
          <MdEmail className="icon" />
        </div>

        {/* ✅ Show error if exists */}
        {error && <p className="error-text">{error}</p>}
        
        <button type="submit" className="link-button">
          Continue
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
