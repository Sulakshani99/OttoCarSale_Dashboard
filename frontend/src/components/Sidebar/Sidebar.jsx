import React from "react";
import { NavLink } from "react-router-dom";
import Axios from "axios";
import navLinks from "../../assets/dummy-data/navLinks";
import logo from "../../assets/images/Logo/oriLogo.svg";
import "./sidebar.css";

const Sidebar = () => {
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token"); // Replace with your actual bearer token
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
      window.location.href = "/user";
    } catch (error) {
      console.error("Error occurred during logout:", error);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h2 className="">
          <img className="h-16" src={logo} alt="logo"></img>
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
                  {item.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar__bottom">
          <button onClick={handleLogout} className="logout-button w-full ">
            <i className="ri-logout-circle-r-line"></i> 
             Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;


// // Sidebar.jsx
// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import navLinks from "../../assets/dummy-data/navLinks";
// import logo from "../../assets/images/Logo/oriLogo.svg";
// import "./sidebar.css";

// const Sidebar = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className={isSidebarOpen ? "sidebar open" : "sidebar"}>
//       <div className="sidebar__top" onClick={toggleSidebar}>
//         <h2>
//           <img src={logo} alt="logo" className="logo"></img>
//         </h2>
//       </div>

//       <div className="sidebar__content">
//         <div className="menu">
//           <ul className="nav__list">
//             {navLinks.map((item, index) => (
//               <li className="nav__item" key={index}>
//                 <NavLink
//                   to={item.path}
//                   className="nav__link"
//                   activeClassName="nav__active"
//                 >
//                   <i className={`${item.icon} icon`}></i>
//                   {isSidebarOpen && <span className="nav__text">{item.display}</span>}
//                 </NavLink>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="sidebar__bottom">
//           <span>
//             <i className="ri-logout-circle-r-line icon"></i> 
//             {isSidebarOpen && <span className="nav__text">Logout</span>}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

