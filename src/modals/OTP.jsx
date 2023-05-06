import { useState, useRef, useEffect, useContext } from 'react';
import '../App.css';
import { AuthContext } from '../contexts/AuthContext';
import PropTypes from 'prop-types';

function OTPFunctionality({ setShowModal }) {
  const handleClose = () => {
    setShowModal(false);
  };
  const [userEnteredOTP, setUserEnteredOTP] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const { phone } = useContext(AuthContext);
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [message, setMessage] = useState('');
  const generateOTP = () => {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    setGeneratedOTP(OTP);
  };
  const resendOTP = () => {
    generateOTP();
    setMessage('OTP Resent');
  };
  const handleVerification = (e) => {
    e.preventDefault();
    let userEnteredOTPString = userEnteredOTP.join('');
    if (userEnteredOTPString.length !== 6) {
      setMessage('Please enter a 6 digit OTP');
      return;
    }
    if (userEnteredOTPString === generatedOTP) {
      setMessage('OTP Verified,Going Back to Home Page');
      setTimeout(() => {
        handleClose();
      }, 2000);

      return;
    } else {
      setMessage(`Incorrect OTP `);
    }
  };
  const otpInputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  useEffect(() => {
    otpInputRefs[0].current.focus();
    generateOTP();
  }, []);
  const handleChange = (index, event) => {
    const value = event.target.value;
    if (isNaN(value) || value === ' ') {
      return;
    }

    const newOtp = [...userEnteredOTP];
    newOtp[index] = value;
    setUserEnteredOTP(newOtp);

    if (value !== '' && index < userEnteredOTP.length - 1) {
      otpInputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && index > 0) {
      if (!userEnteredOTP[index]) {
        otpInputRefs[index - 1].current.focus();
      }
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      otpInputRefs[index - 1].current.focus();
    }

    if (event.key === 'ArrowRight' && index < userEnteredOTP.length - 1) {
      otpInputRefs[index + 1].current.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData('text/plain').slice(0, 6);
    const newOtp = [...userEnteredOTP];
    for (let i = 0; i < newOtp.length; i++) {
      if (pasteData[i] === ' ' || isNaN(pasteData[i])) {
        return [...userEnteredOTP];
      }
      newOtp[i] = pasteData[i];
    }
    setUserEnteredOTP(newOtp);
  };
  return (
    <div className="modal-content">
      <span
        className="close-btn"
        style={{
          backgroundColor: 'red',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          color: 'white',
          textAlign: 'center',
          cursor: 'pointer',
          float: 'right',
        }}
        onClick={handleClose}
      >
        &times;
      </span>
      <h2>Phone Verification</h2>
      <p>Enter the OTP Sent on {phone}</p>
      <div className="otp-inputs">
        {userEnteredOTP.map((digit, index) => (
          <input
            key={index}
            className="otp-input"
            type="text"
            maxLength="1"
            value={digit}
            onChange={(event) => handleChange(index, event)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={(event) => handlePaste(event)}
            ref={otpInputRefs[index]}
          />
        ))}
      </div>
      <div className="button-group">
        <button className="change-number-btn" onClick={handleClose}>
          Change Phone Number?
        </button>
        <button className="resend-otp-btn" onClick={resendOTP}>
          Resend OTP
        </button>
      </div>
      {message && <p>{message}</p>}
      <button className="verify-btn" onClick={(e) => handleVerification(e)}>
        Verify Phone
      </button>
    </div>
  );
}

OTPFunctionality.propTypes = {
  setShowModal: PropTypes.func.isRequired,
};
export default OTPFunctionality;
