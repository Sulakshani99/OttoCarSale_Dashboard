import React from "react";
import { Link } from "react-router-dom";
import profileImg from "../../assets/images/profile-02.png";
import "../../styles/top-nav.css";

const TopNav = () => {
  return (
    <div className="top__nav">
      <div className="top__nav-wrapper">
        <div className="">
        </div>
        
        <div className="top__nav-right">
          <span className="notification">
          <Link to="/orders">
            <i class="ri-notification-3-line"></i>
            <span className="badge">1</span>
            </Link>
          </span>
          <div className="profile">
            <Link to="/settings">
              <img src={profileImg} alt="" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
