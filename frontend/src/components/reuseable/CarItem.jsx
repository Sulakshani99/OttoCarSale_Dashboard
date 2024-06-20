// import React from "react";
// import { Col } from "reactstrap";
// import { Link } from "react-router-dom";
// import "../../styles/car-item.css";
// import Car from "../../assets/images/car-02.png";

// const CarItem = (props) => {
//   const {  album, model, brand, fuelType, manufacturedCountry, vehicleId } = props.item;

// // const firstAlbumUrl = Array.isArray(album) && album.length > 0 ? album[0] : null;

// return (
//   <Col lg="4" md="4" sm="6" className="mb-5">
//     <div className="car__item">
//       <div className="car__img">
//         <img src={Car} alt="" className="w-100" />
//       </div>
        

//         <div className="car__item-content mt-4">
//           <h4 className="section__title text-center">
//             {brand} 
//             </h4>
//           {/* <h6 className="rent__price text-center mt-">
//             ${price}.00 <span>/ Day</span>
//           </h6> */}

//           <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
//             <span className=" d-flex align-items-center gap-1">
//               <i class="ri-car-line"></i> 
//               {model}
//             </span>
//             <span className=" d-flex align-items-center gap-1">
//               <i class="ri-settings-2-line"></i> 
//               {fuelType} 
//             </span>
//             <span className=" d-flex align-items-center gap-1">
//               <i class="ri-timer-flash-line"></i> 
//               {manufacturedCountry} 
//             </span>
//           </div>

//           <button className=" w-50 car__item-btn car__btn-rent">
//             <Link to={`/`}>Edit</Link>
//           </button>

//           <button className=" w-50 car__item-btn car__btn-details">
//             <Link to={`/`}>Delete</Link>
//           </button>

//           <button className=" w-50 car__item-btn car__btn-details">
//             <Link to={`/vehicles/${vehicleId}`}>Details</Link>
//           </button>
//         </div>
//       </div>
//     </Col>
//   );
// };

// export default CarItem;




import React from "react";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
import Car from "../../assets/images/car-02.png";
import axios from "axios";

const CarItem = ({ item }) => {
  if (!item) {
    return null; // If item is undefined, return null to render nothing
  }

  const { brand, model, fuelType, manufacturedCountry, album = [],  _id } = item;

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbi5kb2VAZXhhbXBsZS5jb20iLCJ1c2VySWQiOjYsInJvbGUiOlt7ImF1dGhvcml0eSI6IkFETUlOIn1dLCJpYXQiOjE3MTg4OTMyMjAsImV4cCI6MTcxODk3OTYyMH0.WP1qonRc-BN__9Yfj7UitMepXNzp76oV_BomLRTdFfA";
        // localStorage.getItem("token"); 

        // Set the request headers with the bearer token
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
        <div className="">
          {album && album.length > 0 ? (
            <img src={album[0].photoURL} alt="Vehicle" className="w-100" />
          ) : (
            <img src={Car} alt="Default Car" className="w-100" />
          )}
        </div>
      </div>

      <div className="car__item-content mt-4">
        <h4 className="section__title text-center">{brand}</h4>

        <div className="car__item-info car--details d-flex align-items-center justify-content-between align-baseline mt-3 mb-4 ml-3 mr-10">
          <span className="d-flex align-items-center gap-10">
            <i className="ri-car-line"></i>
            {model}
          </span>
          <span className="d-flex align-items-center gap-10">
            <i className="ri-settings-2-line"></i>
            {fuelType}
          </span>
          <span className="d-flex align-items-center gap-10">
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
