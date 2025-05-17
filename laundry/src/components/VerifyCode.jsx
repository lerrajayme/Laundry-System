import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEmail, MdClose } from "react-icons/md";
import './styles/VerifyCode.css';

const ForgotPassword = () => {
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [resendAvailable, setResendAvailable] = useState(false);
  const [infoMessage, setInfoMessage] = useState("Check your email. Enter the code we’ve sent to your email address.");

  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft <= 0) {
      setResendAvailable(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/resetpassword');
  };

  const handleResend = () => {
    setTimeLeft(300); // Reset to 5 mins
    setResendAvailable(false);
    // Simulate resend code here
    setInfoMessage("Check your email. New code was sent to your email address."); // ✅ change shown here
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="fp-wrapper">
      <span className="icon-close" onClick={handleClose}>
        <MdClose className="x" />
      </span>
      <h1>Account Recovery</h1>
      <p>{infoMessage}</p>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="number"
            placeholder="Enter Code"
            value={code}
            onChange={(e) => {
              if (e.target.value.length <= 6) {setCode(e.target.value);
            }
          }}
            required
          />
          <MdEmail className="icon" />
        </div>

        {/* Timer */}
        <div className="timer-text">{formatTime(timeLeft)}</div>

        {/* Resend Option */}
        <div className="resend-text">
          Didn’t receive a code?{" "}
          {resendAvailable ? (
            <span className="resend-link" onClick={handleResend}>
              Resend Code
            </span>
          ) : (
            <span className="resend-disabled">Resend Code</span>
          )}
        </div>
        
        <button type="submit">Continue</button>

      </form>
    </div>
  );
};

export default ForgotPassword;
