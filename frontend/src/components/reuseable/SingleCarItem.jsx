import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/single-car-item.css";
import UpdateVehicleForm from "../UpdateVehicleForm";

const SingleCarItem = () => {
  const { vehicleId } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    // Fetch vehicle data by vehicleId
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/vehicles/retrieveAllVehicles`);
        setVehicle(response.data);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };

    fetchVehicle();
  }, [vehicleId]);

  const handleEdit = () => {
    // Implement edit functionality
    // Redirect or show edit form
    <UpdateVehicleForm/>
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/vehicles/deleteVehicle/${vehicleId}`);
      // Redirect to vehicle list or perform other actions after deletion
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      await axios.post(`http://localhost:3001/api/v1/vehicles/uploadImage/${vehicleId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Add authorization token if required
          // "Authorization": `Bearer ${token}`
        },
      });
      // Handle success
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{vehicle.brand} {vehicle.model}</h2>
      {/* Display other vehicle details */}
      {/* <img src={vehicle.photoURL} alt={vehicle.model} /> */}

      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>

      {/* <input type="file" accept="image/*" onChange={handleImageUpload} /> */}
    </div>
  );
};

export default SingleCarItem;




// import React from "react";
// import { Col } from "reactstrap";
// import "../../styles/single-car-item.css";

// const SingleCarItem = (props) => {
//   const {  model, brand, fuelType, manufacturedCountry, vehicleId } = props.vehicle;

//   // const firstAlbumUrl = Array.isArray(album) && album.length > 0 ? album[0] : null;

//   return (
//     <Col lg="4" md="4" sm="6" className="mb-5">
//       <div className="car__item">
//         {/* <div className="car__img">
//           <img src={firstAlbumUrl.photoURL} alt="" className="w-100" />
//         </div> */}

//         <div className="car__item-content mt-4">
//           <h4 className="section__title text-center">{brand}</h4>

//           <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
//             <span className="d-flex align-items-center gap-1">
//               <i className="ri-car-line"></i> {model}
//             </span>
//             <span className="d-flex align-items-center gap-1">
//               <i className="ri-settings-2-line"></i> {fuelType}
//             </span>
//             <span className="d-flex align-items-center gap-1">
//               <i className="ri-timer-flash-line"></i> {manufacturedCountry}
//             </span>
//           </div>
//         </div>
//       </div>
//     </Col>
//   );
// };

// export default SingleCarItem;





// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const SingleCarItem = () => {
//   const { vehicleId } = useParams();
  
//   const dummyVehicle = {
//     id: 1,
//     brand: "Toyota",
//     model: "Corolla",
//     year: 2020,
//     color: "Silver",
//     price: 25000,
//     photoURL: "https://example.com/car.jpg",
//   };

//   const [vehicle, setVehicle] = useState(dummyVehicle);

//   useEffect(() => {
//     // Fetch vehicle data by vehicleId
//     const fetchVehicle = async () => {
//       try {
//         // Simulating API call with dummy data
//         setVehicle(dummyVehicle);
//       } catch (error) {
//         console.error("Error fetching vehicle data:", error);
//       }
//     };

//     fetchVehicle();
//   }, [vehicleId]);

//   const handleEdit = () => {
//     // Implement edit functionality
//     // Redirect or show edit form
//   };

//   const handleDelete = async () => {
//     try {
//       // Implement delete functionality
//     } catch (error) {
//       console.error("Error deleting vehicle:", error);
//     }
//   };

//   const handleImageUpload = async (event) => {
//     // Implement image upload functionality
//   };

//   if (!vehicle) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>{vehicle.brand} {vehicle.model}</h2>
//       <p>Year: {vehicle.year}</p>
//       <p>Color: {vehicle.color}</p>
//       <p>Price: ${vehicle.price}</p>
//       <img src={vehicle.photoURL} alt={vehicle.model} />

//       <button onClick={handleEdit}>Edit</button>
//       <button onClick={handleDelete}>Delete</button>

//       <input type="file" accept="image/*" onChange={handleImageUpload} />
//     </div>
//   );
// };

// export default SingleCarItem;








// import React from "react";
// import { Col } from "reactstrap";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "../../styles/single-car-item.css";

// const SingleCarItem = (props) => {
//   const { album, model, brand, fuelType, manufacturedCountry, vehicleId } = props.vehicle;

//   const firstAlbumUrl = Array.isArray(album) && album.length > 0 ? album[0] : null;

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:3001/api/v1/vehicles/deleteVehi/${vehicleId}`);
//       console.log("Vehicle deleted successfully");
//       // Optionally, you can update the state or perform other actions after deletion
//     } catch (error) {
//       console.error("Error deleting vehicle:", error);
//     }
//   };

//   return (
//     <Col lg="4" md="4" sm="6" className="mb-5">
//       <div className="car__item">
//         <div className="car__img">
//           <img src={firstAlbumUrl.photoURL} alt="" className="w-100" />
//         </div>

//         <div className="car__item-content mt-4">
//           <h4 className="section__title text-center">{brand}</h4>

//           <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
//             <span className=" d-flex align-items-center gap-1">
//               <i className="ri-car-line"></i> {model}
//             </span>
//             <span className=" d-flex align-items-center gap-1">
//               <i className="ri-settings-2-line"></i> {fuelType}
//             </span>
//             <span className=" d-flex align-items-center gap-1">
//               <i className="ri-timer-flash-line"></i> {manufacturedCountry}
//             </span>
//           </div>

//           <div className="d-flex justify-content-between">
//             <button className="w-45 car__item-btn car__btn-edit">
//               <Link to={`/edit/${vehicleId}`}>Edit</Link>
//             </button>
//             <button className="w-45 car__item-btn car__btn-delete" onClick={handleDelete}>
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     </Col>
//   );
// };

// export default SingleCarItem;



