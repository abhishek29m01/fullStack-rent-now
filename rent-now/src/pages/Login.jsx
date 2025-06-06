import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/authentication.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:2001/login",
        formData
      );
      if (response.status === 200) {
        navigate("/addnewpg");
      }
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Network or server error.");
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form-heading">
          <div className="back-to-home">
            <Link to="/">
              <FontAwesomeIcon
                icon={faArrowLeftLong}
                className="f-18"
              ></FontAwesomeIcon>
            </Link>
          </div>
          <h2>Sign in to Your Account</h2>
        </div>
        <form action="" onSubmit={submitForm} className="auth-form">
          <div className="auth-inputs">
            <div className="auth-input">
              <label htmlFor="">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="auth-input">
              <label htmlFor="">
                Password <span className="required">*</span>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="toggle-password"></div>
            </div>
          </div>
          <div className="forget-password">
            <a href="#">Forgot your password?</a>
          </div>
          <div className="message">{message}</div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        <div className="toggle-form">
          <p>
            new to Rent Now? <Link to="/signup">create account</Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
