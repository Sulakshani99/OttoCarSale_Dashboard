import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Axios from "axios";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import navLinks from "../../assets/dummy-data/navLinks";
import logo from "../../assets/images/Logo/oriLogo.svg";
import "../../styles/sidebar.css";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token"); 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      // Send a request to logout endpoint
      await Axios.post("http://localhost:3001/api/v1/user/adminlogout", {}, config);
      // Redirect user to login page or perform any other action after logout
      console.log("Logout successful");
      alert("Logout!");
      window.location.href = "/main";
    } catch (error) {
      console.error("Error occurred during logout:", error);
    }
  };

  return (
    <div className="container">
      <div style={{ width: isOpen ? "250px" : "70px" }} className={`sidebar ${isOpen ? '' : 'sidebar-closed'}`}>
      <div className="bars" onClick={toggleSidebar} style={{marginBottom:"20px",cursor:"pointer"}}>
            <FaBars />
          </div>

        <div className="sidebar__top"  style={{marginBottom:"30px"}}>
          <h2 className={`logo ${isOpen ? '' : 'logo-small'}`}>
            <img className="h-16" src={logo} alt="logo" />
          </h2>
          
        </div>

        <div className="sidebar__content">
          <div className="menu">
            <ul className="nav__list">
              {navLinks.map((item, index) => (
                <li className="nav__item" key={index}>
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__link" : "nav__link"
                    }
                  >
                    <i className={item.icon}></i>
                    <span style={{ marginLeft:"15px", display: isOpen ? "inline" : "none" }}>{item.display}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="sidebar__bottom">
            <button onClick={handleLogout} className="logout-button w-full">
              <FaSignOutAlt />
              <span style={{ display: isOpen ? "inline" : "none" }}> Logout</span>
            </button>
          </div>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
