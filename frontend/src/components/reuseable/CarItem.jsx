import React from "react";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
import Car from "../../assets/images/car-02.png";
import axios from "axios";

const CarItem = ({ item }) => {
  if (!item) {
    return null;
  }

  const { brand, model, fuelType, manufacturedCountry, album = [],  _id } = item;

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbi5kb2VAZXhhbXBsZS5jb20iLCJ1c2VySWQiOjYsInJvbGUiOlt7ImF1dGhvcml0eSI6IkFETUlOIn1dLCJpYXQiOjE3MTkzMjYwMzUsImV4cCI6MTcxOTQxMjQzNX0.kuw6Ez2YPI4eU62Af2vf0Lgc9rc12qGU2DT-5qTVWIg";
        // localStorage.getItem("token"); 

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        await axios.delete(`http://localhost:3001/api/v1/vehicles/deleteVehi/${_id}`, config);
        alert("Vehicle deleted successfully");
        console.log("Vehicle deleted successfully");
        window.location.reload(); 
      } catch (error) {
        console.error("Error deleting vehicle:", error);
      }
    }
  };

  return (
    <div className="car__item">
      <div className="car__image">
        <div className="car-image-container">
          {album && album.length > 0 && (
            <img src={album[0].photoURL} alt="Vehicle" className="w-100" />
          )}
          {/* {album && album.length > 0 ? (
            <img src={album[0].photoURL} alt="Vehicle" className="w-100" />
          ) : (
            <img src={Car} alt="Default Car" className="w-100 h-10" />
          )} */}
        </div>
      </div>

      <div className="car__item-content mt-4">
        <h4 className="section__title text-center">{brand}</h4>

        <div className="car__item-info car--details d-flex align-items-center justify-content-between align-baseline mt-3 mb-4 ml-3 mr-10">
          <span className="d1-flex align-items-center gap-10">
            <i className="ri-car-line"></i>
            {model}
          </span>
          <span className="d1-flex align-items-center gap-10">
            <i className="ri-settings-2-line"></i>
            {fuelType}
          </span>
          <span className="d1-flex align-items-center gap-10">
            <i className="ri-timer-flash-line"></i>
            {manufacturedCountry}
          </span>
        </div>

        <div className="d-flex justify-content-between">
          <button className="w-50 car__item-btn car__btn-rent" style={{cursor:"pointer"}}>
            <Link to={`/vehicles/${_id}`}>Edit</Link>
          </button>
          <button onClick={handleDelete} className="w-50 car__item-btn car__btn-details" style={{cursor:"pointer"}}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarItem;
