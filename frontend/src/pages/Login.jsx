import React, { useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams hook
import "../styles/login.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({
    login: { email: "", password: "" },
    register: { firstName: "", lastName: "", email: "", password: "", profile: null },
  });
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");

  const handleFormChange = (e, formType) => {
    setForm({
      ...form,
      [formType]: { ...form[formType], [e.target.name]: e.target.value },
    });
  };

  // const handleSignIn = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3001/api/v1/user/login",
  //       form.login
  //     );
  //     if (response.status === 200) {
  //       localStorage.setItem("token", response.data.token);
  //       localStorage.setItem("userID", response.data.user._id); // Adjusted for admin ID
  //       window.location.href = "/selling";
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setLoginError("Invalid email or password");
  //   }
  // };

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        form.login
      );
      if (response.status === 200) {
        if (response.data.token && response.data.user && response.data.user._id) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userID", response.data.user._id);
          localStorage.setItem("firstName",response.data.user.firstName);
          localStorage.setItem("lastName",response.data.user.lastName);
          localStorage.setItem("email",response.data.user.email);
          window.location.href = "/selling";
        } else {
          setLoginError("Invalid response from server");
        }
      } else {
        setLoginError("Invalid response status: " + response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoginError("Invalid email or password");
    }
  };
  

  const handleSignUp = async () => {
    try {
      const formData = new FormData();
      Object.entries(form.register).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(
        "http://localhost:3001/api/v1/user/adminregister",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        console.log("Sign-up successful:", response.data);
        // Optionally, you can redirect the user to another page after successful sign-up
        // window.location.href = "/some-other-page";
      }
    } catch (error) {
      console.error("Error signing up:", error);
      // Handle specific error messages or display a general error message
      setSignupError("Error signing up. Please try again.");
    }
  };

  // const handleForgotPassword = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3001/api/v1/user/forgot",
  //       { email: form.login.email }
  //     );
  //     if (response.status === 200) {
  //       // Optionally, you can display a success message or redirect the user to a different page
  //       console.log("Password reset link sent successfully");
  //     }
  //   } catch (error) {
  //     console.error("Error sending reset password link:", error);
  //     // Handle specific error messages or display a general error message
  //     setLoginError("Error sending reset password link. Please try again.");
  //   }
  // };

  // const getParams = () => {
  //   // Logic to extract parameters from the URL
  // };
  
  // const handleResetPassword = async () => {
  //   const { userId, token } = getParams(); // Assuming you have a function to extract parameters from the URL
  //   const newPassword = ""; // Placeholder for the new password, replace it with the actual user input
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:3001/api/v1/admin/reset/${userId}/${token}`,
  //       { password: newPassword }
  //     );
  //     if (response.status === 200) {
  //       // Optionally, you can display a success message or redirect the user to a different page
  //       console.log("Password reset successful");
  //     }
  //   } catch (error) {
  //     console.error("Error resetting password:", error);
  //     // Handle specific error messages or display a general error message
  //     setLoginError("Error resetting password. Please try again.");
  //   }
  // };
  

  return (
    <Helmet title="Login" >
      <div style={{marginTop:'100px'}}>
        {/* <CommonSection title="Otto Car Sale" /> */}
      <div className="flex items-center justify-center my-10">
        <div className="main">
          <input type="checkbox" id="chk" aria-hidden="true" />
          <div className="login">
            <form className="form">
              <label htmlFor="chk" className='label' aria-hidden="true">
                Log in
              </label>
              {loginError && (
                <p className="error" style={{ color: "red", padding: "0" }}>
                  {loginError}
                </p>
              )}
              <input
                className="input"
                type="Email"
                name="email"
                value={form.login.email}
                onChange={(e) => handleFormChange(e, "login")}
                placeholder="Email"
                required
              />
              <input
                className="input"
                type="Password"
                name="password"
                value={form.login.password}
                onChange={(e) => handleFormChange(e, "login")}
                placeholder="Password"
                required
              />
              <button type="button" onClick={handleSignIn}>
                Log in
              </button>
              <p style={{ color: "white", margin: "0" }}>
                <a href="/forget">Do you forgot password?</a>
              </p>
            </form>
          </div>

          <div className="register">
            <form className="form">
              <label htmlFor="chk" className='label' aria-hidden="true">
                Register
              </label>
              <input
                className="input"
                type="text"
                name="firstName"
                value={form.register.firstName}
                onChange={(e) => handleFormChange(e, "register")}
                placeholder="First Name"
                required
              />
               <input
                className="input"
                type="text"
                name="lastName"
                value={form.register.lastName}
                onChange={(e) => handleFormChange(e, "register")}
                placeholder="Last Name"
                required
              />
              <input
                className="input"
                type="Email"
                name="email"
                value={form.register.email}
                onChange={(e) => handleFormChange(e, "register")}
                placeholder="Email"
                required
              />
              <input
                className="input"
                type="Password"
                name="password"
                value={form.register.password}
                onChange={(e) => handleFormChange(e, "register")}
                placeholder="Password"
                required
              />
              <input
                type="file"
                name="profile"
                onChange={(e) =>
                  setForm({
                    ...form,
                    register: { ...form.register, profile: e.target.files[0] },
                  })
                }
                accept="image/*"
              />
              <button type="button" onClick={handleSignUp}>
                Register
              </button>
              {signupError && (
                <p className="error" style={{ color: "red", padding: "0" }}>
                  {signupError}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
      </div>
    
    </Helmet>
  );
};

export default Login;
