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
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageName, setImageName] = useState("");

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
      const token = "YOUR_TOKEN_HERE";
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
    try {
      const formData = new FormData();
      formData.append("image", selectedImage, imageName);

      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "http://localhost:3001/api/v1/vehicles/uploadImage",
        formData,
        config
      );
      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
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
                      <form className="image-upload-form">
                        <h2 className="font-semibold">Add New Vehicle</h2>
                      </form>
                      <form onSubmit={handleSubmit}>
                        <div className="car__item-info">
                          {/* All input fields go here */}
                          {Object.keys(vehicleData).map((key) => (
                            key !== "dimensions" ? (
                              <div className="info-group" key={key}>
                                <label htmlFor={key}>{key.split(/(?=[A-Z])/).join(" ")}:</label>
                                <input
                                  type={key === "assembled" ? "checkbox" : "text"}
                                  name={key}
                                  value={vehicleData[key]}
                                  onChange={key === "assembled" ? handleCheckboxChange : handleChange}
                                  checked={key === "assembled" ? vehicleData[key] : undefined}
                                />
                              </div>
                            ) : (
                              ["length", "width", "height"].map((dim) => (
                                <div className="info-group" key={dim}>
                                  <label htmlFor={dim}>{dim.charAt(0).toUpperCase() + dim.slice(1)} (m):</label>
                                  <input
                                    type="number"
                                    step="0.01"
                                    name={dim}
                                    value={vehicleData.dimensions[dim]}
                                    onChange={handleChange}
                                  />
                                </div>
                              ))
                            )
                          ))}
                        </div>
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

                <Row>
                  <Col lg="12">
                    <form
                      onSubmit={handleImageUpload}
                      className="image-upload-form inline-table"
                    >
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
                      <button type="submit">Upload Image</button>
                    </form>
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
