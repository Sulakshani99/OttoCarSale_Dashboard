import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Helmet from "../Helmet/Helmet";
import "../../styles/add-vehicle.css";
import CommonSection from '../../components/UI/CommonSection';

const AddVehicle = () => {
  const navigate = useNavigate();
  const [vehicleData, setVehicleData] = useState({
    vehicleId: "",
    chassisNumber: "",
    engineNo: "",
    vehicleState: "",
    companyName: "",
    numberOfDoors: 1,
    color: "",
    seatingCapacity: 1,
    dimensions: {
      length: 0,
      width: 0,
      height: 0,
    },
    condition: "",
    vehiclePrice: "",
    fuelType: "Petrol",
    manufacturedCountry: "",
    assembled: false,
    vehicleType: "Car",
    brand: "",
    style: "",
    model: "",
    manufacturedYear: new Date().getFullYear(),
    images: []
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageName, setImageName] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
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
      const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbi5kb2VAZXhhbXBsZS5jb20iLCJ1c2VySWQiOjYsInJvbGUiOlt7ImF1dGhvcml0eSI6IkFETUlOIn1dLCJpYXQiOjE3MTkzMjYwMzUsImV4cCI6MTcxOTQxMjQzNX0.kuw6Ez2YPI4eU62Af2vf0Lgc9rc12qGU2DT-5qTVWIg";
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "http://localhost:3001/api/v1/vehicles/addVehicle",
        vehicleData,
        config
      );

      console.log("New Vehicle Data:", vehicleData);
      console.log("Vehicle added successfully:", response.data);
      alert("Vehicle added successfully");
      navigate("/selling");
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
    setImageName(file.name);
  };

  const handleImageNameChange = (e) => {
    setImageName(e.target.value);
  };
  
  const handleImageUpload = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage, imageName);

      const response = await axios.post(
        "http://localhost:4000/api/v1/upload",
        formData     
      );

      console.log("Image uploaded successfully:", response.data);
      const imagePath = response.data.filepath;
      

      setVehicleData((prevData) => {
        const newImages =[]
        newImages.push(imagePath)
        // sconst newImage = prevData.images ? [...prevData.images, imagePath] : [imagePath];
        console.log("New images array:", newImages); // Added logging
        return {
          ...prevData,
          images: newImages
        };
      });

    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Helmet title="Add Vehicle">
      <CommonSection title="Add Vehicle" />
      <section className="car1-details-container">
        <Container>
          <Row>
            <Col lg="12" md="6">
              <div className="car-details-content">
                <Row>
                  <Col lg="12" md="6">
                    <div className="car1__item-content">
                      <h2 className="font-semibold">Add New Vehicle</h2>
                      <form onSubmit={handleSubmit}>
                        <div className="car__item-info">
                          {/* Your form inputs here */}
                          <div className="info-group">
                            <label htmlFor="vehicleId">Vehicle ID: </label>
                            <input
                              type="text"
                              name="vehicleId"
                              value={vehicleData.vehicleId}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="info-group">
                            <label htmlFor="chassisNumber">Chassis Number: </label>
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
                            <label htmlFor="seatingCapacity">Seating Capacity: </label>
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
                            <label htmlFor="manufacturedYear">Manufactured Year: </label>
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
                            <label htmlFor="vehiclePrice">Vehicle Price (Rs): </label>
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
                            <label htmlFor="manufacturedCountry">Manufactured Country: </label>
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
                              <option value="Car">Car</option>
                              <option value="Bike">Motorcycle</option>
                              <option value="Truck">Truck</option>
                              <option value="Van">Van</option>
                              <option value="Cab">Cab</option>
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
                     
                        <Row>
                          <Col lg="12">
                            <div className="image-upload-form inline-table">
                              <input
                                type="file"
                                onChange={handleImageChange}
                                accept="image/*"
                              />
                              {imagePreview && (
                                <div className="car-image-container">
                                  <img
                                    src={imagePreview}
                                    alt="Selected"
                                    className="car-image w-100"
                                  />
                                </div>
                              )}
                              {selectedImage && (
                                <div className="info-group">
                                  <label htmlFor="imageName">Image Name: </label>
                                  <input
                                    type="text"
                                    name="imageName"
                                    value={imageName}
                                    onChange={handleImageNameChange}
                                  />
                                </div>
                              )}
                              <button
                                type="button"
                                onClick={handleImageUpload}
                                disabled={isUploading}
                              >
                                {isUploading ? "Uploading..." : "Upload Image"}
                              </button>
                            </div>
                          </Col>
                        </Row>

                        <div className="d1-flex justify-center align-items-center">
                          <button
                            type="submit"
                            className="back__btn me-4"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
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

export default AddVehicle;
