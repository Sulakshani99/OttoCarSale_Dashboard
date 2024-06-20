import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import "../styles/car-details.css";

const CarDetails = () => {
  const { slug } = useParams();
  const [vehicleData, setVehicleData] = useState({
    vehicleId: "",
    chassisNumber: "",
    engineNo: "",
    vehicleState: "",
    companyName: "",
    numberOfDoors: 0,
    color: "",
    seatingCapacity: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0,
    },
    condition: "",
    vehiclePrice: "",
    fuelType: "select type",
    manufacturedCountry: "",
    assembled: false,
    vehicleType: "car",
    brand: "",
    style: "",
    model: "",
    manufacturedYear: new Date().getFullYear(),
  });

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const singleCarItem = await axios.get(
          `http://localhost:3001/api/v1/vehicles/findOneVehicle/${slug}`
        );
        setVehicleData(singleCarItem.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the input field is for height, width, or length, convert the value to a float
    if (["height", "width", "length"].includes(name)) {
      setVehicleData({
        ...vehicleData,
        dimensions: {
          ...vehicleData.dimensions,
          [name]: parseFloat(value),
        },
      });
    } else {
      setVehicleData({ ...vehicleData, [name]: value });
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setVehicleData({ ...vehicleData, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `http://localhost:3001/api/v1/vehicles/editVehicle/${slug}`,
        vehicleData,
        config
      );

      console.log("Updated Form Data:", vehicleData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `http://localhost:3001/api/v1/vehicles/uploadImage/${slug}`,
        formData,
        config
      );
      console.log("Image uploaded successfully:", response.data);

      const updatedVehicle = await axios.get(
        `http://localhost:3001/api/v1/vehicles/findOneVehicle/${slug}`
      );
      setVehicleData(updatedVehicle.data[0]);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <Helmet title={vehicleData.brand}>
      <section className="car2-details-container" >
        <Container>
          <Row>
            <Col lg="12">
              <div className="car-details-content">
                <Row>
                  <Col lg="12">
                  <form className="image-upload-form" >
                    
                  <h2 className="font-semibold">
                   {vehicleData.brand} - {vehicleData.model}
                  </h2>

                    <div className="car-image-container">
                      {vehicleData.album && vehicleData.album.length > 0 && (
                        <img
                          src={vehicleData.album[0].photoURL}
                          alt={`Image 1`}
                          className="car-image w-100"
                        />
                      )}
                      <div className="car-image1-container1">
                        {vehicleData.album &&
                          vehicleData.album.length > 0 &&
                          vehicleData.album.slice(0, 4).map((image, index) => (
                            <img
                              key={index}
                              src={image.photoURL}
                              alt={`Image ${index + 1}`}
                              className="car-image1 w-100"
                            />
                          ))}
                      </div>
                      <div className="car-image1-container1">
                        {vehicleData.album &&
                          vehicleData.album.length > 4 &&
                          vehicleData.album
                            .slice(4)
                            .map((image, index) => (
                              <img
                                key={index + 4}
                                src={image.photoURL}
                                alt={`Image ${index + 5}`}
                                className="car-image1 w-100"
                              />
                            ))}
                      </div>
                    </div>
                  </form>

                    <form
                      onSubmit={handleImageUpload}
                      className="image-upload-form"
                    >
                      <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                      <button type="submit">Upload Image</button>
                    </form>

                  </Col>
                </Row>

                <Row>
                  <Col lg="12">
                    <div className="car__item-content">
                      <form onSubmit={handleSubmit}>
                        

                        <div className="car__item-info">
                          <div className="info-group">
                            <label htmlFor="vehicleId">Vehicle ID: </label>
                            <span>{vehicleData.vehicleId}</span>
                          </div>
                          <div className="info-group">
                            <label htmlFor="chassisNumber">
                              Chassis Number:{" "}
                            </label>
                            <input
                              type="text"
                              name="chassisNumber"
                              value={vehicleData.chassisNumber}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="info-group">
                            <label htmlFor="engineNo">Engine No: </label>
                            <input
                              type="text"
                              name="engineNo"
                              value={vehicleData.engineNo}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="info-group">
                            <label htmlFor="vehicleState">Vehicle State: </label>
                            <input
                              type="text"
                              name="vehicleState"
                              value={vehicleData.vehicleState}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="info-group">
                            <label htmlFor="companyName">Company Name: </label>
                            <input
                              type="text"
                              name="companyName"
                              value={vehicleData.companyName}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="info-group">
                            <label htmlFor="numberOfDoors">No. of Doors: </label>
                            <input
                              type="number"
                              name="numberOfDoors"
                              value={vehicleData.numberOfDoors}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="info-group">
                            <label htmlFor="color">Color: </label>
                            <input
                              type="text"
                              name="color"
                              value={vehicleData.color}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="info-group">
                            <label htmlFor="seatingCapacity">
                              Seating Capacity:{" "}
                            </label>
                            <input
                              type="number"
                              name="seatingCapacity"
                              value={vehicleData.seatingCapacity}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="info-group">
                            <label htmlFor="condition">Condition: </label>
                            <input
                              type="text"
                              name="condition"
                              value={vehicleData.condition}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="info-group">
                            <label htmlFor="manufacturedYear">
                              Manufactured Year:{" "}
                            </label>
                            <input
                              type="text"
                              name="manufacturedYear"
                              value={vehicleData.manufacturedYear}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="info-group">
                            <label htmlFor="height">Height (m): </label>
                            <input
                              type="number"
                              step="0.01"
                              name="height"
                              value={vehicleData.dimensions.height}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="info-group">
                            <label htmlFor="width">Width (m): </label>
                            <input
                              type="number"
                              step="0.01"
                              name="width"
                              value={vehicleData.dimensions.width}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="info-group">
                            <label htmlFor="length">Length (m): </label>
                            <input
                              type="number"
                              step="0.01"
                              name="length"
                              value={vehicleData.dimensions.length}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="info-group">
                            <label htmlFor="vehiclePrice">Vehicle Price: </label>
                            <input
                              type="text"
                              name="vehiclePrice"
                              value={vehicleData.vehiclePrice}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="info-group">
                            <label htmlFor="fuelType">Fuel Type: </label>
                            <select
                              name="fuelType"
                              value={vehicleData.fuelType}
                              onChange={handleChange}
                            >
                              <option value="Petrol">Petrol</option>
                              <option value="Diesel">Diesel</option>
                              <option value="Electric">Electric</option>
                              <option value="Hybrid">Hybrid</option>
                              <option value="CNG">CNG</option>
                            </select>
                          </div>
                          <div className="info-group">
                            <label htmlFor="manufacturedCountry">
                              Manufactured Country:{" "}
                            </label>
                            <input
                              type="text"
                              name="manufacturedCountry"
                              value={vehicleData.manufacturedCountry}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="info-group">
                            <label htmlFor="assembled">Assembled: </label>
                            <input
                              type="checkbox"
                              name="assembled"
                              checked={vehicleData.assembled}
                              onChange={handleCheckboxChange}
                            />
                          </div>
                          <div className="info-group">
                            <label htmlFor="vehicleType">Vehicle Type: </label>
                            <select
                              name="vehicleType"
                              value={vehicleData.vehicleType}
                              onChange={handleChange}
                            >
                              <option value="car">Car</option>
                              <option value="motorcycle">Motorcycle</option>
                              <option value="truck">Truck</option>
                              <option value="bus">Bus</option>
                              <option value="van">Van</option>
                              <option value="suv">SUV</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div className="info-group">
                            <label htmlFor="brand">Brand: </label>
                            <input
                              type="text"
                              name="brand"
                              value={vehicleData.brand}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="info-group">
                            <label htmlFor="style">Style: </label>
                            <input
                              type="text"
                              name="style"
                              value={vehicleData.style}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="info-group">
                            <label htmlFor="model">Model: </label>
                            <input
                              type="text"
                              name="model"
                              value={vehicleData.model}
                              onChange={handleChange}
                            />
                          </div>
                          
                        </div>
                        
                      </form>
                    </div>

 
                          <div className="d-flex justify-center align-items-center">
                            <button type="button" className="back1__btn me-4">
                              <Link to="/vehicles">Back</Link>
                            </button>
                            <button
                              type="submit"
                              className="submit__btn" onClick={handleSubmit}
                            >
                              Save
                            </button>
                          </div>

                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;







// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
// import axios from "axios";

// const CarDetails = () => {
//   const { vehicleId } = useParams();
//   const [formData, setFormData] = useState({
//     vehicleId: '',
//     chassisNumber: '',
//     engineNo: '',
//     vehicleState: '',
//     companyName: '',
//     numberOfDoors: 1,
//     color: '',
//     seatingCapacity: 1,
//     condition: '',
//     length: 0,
//     height: 0,
//     width: 0,
//     vehiclePrice: '',
//     fuelType: 'Petrol',
//     manufacturedCountry: '',
//     assembled: false,
//     vehicleType: 'car',
//     brand: '',
//     style: '',
//     model: '',
//     manufacturedYear: new Date().getFullYear(),
//   });

//   useEffect(() => {
//     const fetchVehicleDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3001/api/v1/vehicles/findOneVehicle/${vehicleId}`);
//         setFormData(response.data);
//       } catch (error) {
//         console.error("Error fetching vehicle details:", error);
//       }
//     };

//     fetchVehicleDetails();
//   }, [vehicleId]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:3001/api/v1/vehicles/editVehicle/`, formData);
//       console.log("Vehicle details updated successfully");
//       // Optionally, you can redirect the user to another page or show a success message
//     } catch (error) {
//       console.error("Error updating vehicle details:", error);
//     }
//   };

//   return (
//     <Container>
//       <Row>
//         <Col md={6}>
//           <h3>Edit Car Details</h3>
//           <Form onSubmit={handleSubmit}>
//             {/* Add form fields for vehicle details */}
//             {/* Example: */}
//             <FormGroup>
//               <Label for="brand">Brand</Label>
//               <Input
//                 type="text"
//                 name="brand"
//                 id="brand"
//                 value={formData.brand || ''} // Check if formData.brand is undefined and default to empty string
//                 onChange={handleChange}
//               />
//             </FormGroup>
//             {/* Repeat this pattern for other fields */}
//             <Button type="submit" color="primary">Submit</Button>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default CarDetails;
