import React, { useState } from "react";
import "../styles/login.css";
import Helmet from "../components/Helmet/Helmet";
import { Link } from "react-router-dom";
import CommonSection from "../components/UI/CommonSection";
import axios from "axios";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendLink = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/forgot",
        { email }
      );
      if (response.status === 200) {
        setSuccess("Password reset link sent successfully");
      }
    } catch (error) {
      console.error("Error sending reset password link:", error);
      setError("Error sending reset password link. Please try again.");
    }
  };

  return (
    <Helmet title="Forgot Password">
      {/* <CommonSection title="Forgot Password" /> */}
      <div className="flex items-center justify-center my-10" style={{marginTop:'200px'}}>
        <div className="main">
          <input type="checkbox" id="chk" aria-hidden="true" />
          <div className="login">
            <form className="form">
              <label htmlFor="chk" className="label" aria-hidden="true">
                Forgot Password
              </label>
              {error && (
                <p className="error" style={{ color: "red", padding: "0" }}>
                  {error}
                </p>
              )}
              {success && (
                <p className="success" style={{ color: "green", padding: "0" }}>
                  {success}
                </p>
              )}
              <input
                className="input"
                type="Email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
                required
              />
              <button type="button" onClick={handleSendLink} >
              <Link to={`/user`}> Send Link to Email</Link>
              </button>
            </form>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default ForgetPassword;
