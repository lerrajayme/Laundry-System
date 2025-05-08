import React from 'react';
import './styles/PasswordResetSuccess.css';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdClose } from "react-icons/md";
import "./styles/PasswordResetSuccess.css";

function PasswordResetSuccess() {

  const handleClose = () => {
    window.location.href = "/login"; // or redirect to wherever you want
  };

  return (
    <div className="prs-wrapper">
      <span className="close-icon" onClick={handleClose}>
              <MdClose className="icon" />
            </span>
      <div className="prs-content">
        <IoMdCheckmarkCircleOutline className='svg'/>
        <h2>Password Updated!</h2>
        <p>Your password has been changed successfully. Use your new password to log in.</p>
    </div>
    </div>
  );
}

export default PasswordResetSuccess;
