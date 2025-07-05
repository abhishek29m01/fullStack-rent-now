import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

const AuthOTP = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("pendingEmail");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setCanResend(true);
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const verifyOTP = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:2001/verify-otp", {
        email,
        otp,
      });
      if (res.status === 200) {
        localStorage.removeItem("pendingEmail");
        navigate("/login");
      }
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid OTP");
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;
    try {
      const res = await axios.post("http://localhost:2001/resend-otp", { email });
      setTimer(30);
      setCanResend(false);
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Failed to resend OTP.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form-heading">
          <div className="back-to-home">
            <Link to="/">
              <FontAwesomeIcon icon={faArrowLeftLong} className="f-18" />
            </Link>
          </div>
          <h2>OTP Verification</h2>
        </div>
        <form onSubmit={verifyOTP} className="auth-form">
          <div className="auth-input">
            <label>
              Enter OTP <span className="required">*</span>
            </label>
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <div className="message">{message}</div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        <div className="resend-otp">
          {!canResend ? (
            <p>Resend OTP in {timer}s</p>
          ) : (
            <p onClick={handleResendOTP} className="clickable-text"><button className="request-new-otp-button">Resend OTP</button></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthOTP;
