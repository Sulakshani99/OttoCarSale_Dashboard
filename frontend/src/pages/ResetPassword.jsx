import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/login.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import axios from "axios";

const ResetPassword = () => {
  const { userId, token } = useParams(); // Get parameters from the URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetError, setResetError] = useState("");

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setResetError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/api/v1/user/reset/${userId}/${token}`,
        { password: newPassword }
      );
      if (response.status === 200) {
        // Optionally, you can display a success message or redirect the user to a different page
        console.log("Password reset successful");
        window.location.href = "/login"; // Redirect to the login page
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      // Handle specific error messages or display a general error message
      setResetError("Error resetting password. Please try again.");
    }
  };

  return (
    <Helmet title="Reset Password">
      {/* <CommonSection title="Reset Password" /> */}
      <div className="flex items-center justify-center my-10" style={{marginTop:'200px'}}>
        <div className="main">
          <input type="checkbox" id="chk" aria-hidden="true" />
          <div className="login">
            <form className="form">
              <label htmlFor="chk" className="label" aria-hidden="true">
                Reset Password
              </label>
              {resetError && (
                <p className="error" style={{ color: "red", padding: "0" }}>
                  {resetError}
                </p>
              )}
              <input
                className="input"
                type="Password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter New Password"
                required
              />
              <input
                className="input"
                type="Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter New Password"
                required
              />
              <button type="button" onClick={handleResetPassword}>
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default ResetPassword;
