import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import "../styles/car-details.css";
import Loading from "../components/UI/Loading";
import { useNavigate } from "react-router-dom";

const CarDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const singleCarItem = await axios.get(
          `http://localhost:3001/api/v1/vehicles/findOneVehicle/${slug}`
        );
  //       setVehicleData(singleCarItem.data[0]);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [slug]);
        const vehicle = singleCarItem.data[0];
        setVehicleData({
          ...vehicle,
          dimensions: vehicle.dimensions || { length: 0, width: 0, height: 0 }
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);


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
      // localStorage.getItem("token");

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
      alert("Vehicle updateded successfully");
      navigate("/selling");
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

      const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbi5kb2VAZXhhbXBsZS5jb20iLCJ1c2VySWQiOjYsInJvbGUiOlt7ImF1dGhvcml0eSI6IkFETUlOIn1dLCJpYXQiOjE3MTkzMjYwMzUsImV4cCI6MTcxOTQxMjQzNX0.kuw6Ez2YPI4eU62Af2vf0Lgc9rc12qGU2DT-5qTVWIg";
      // localStorage.getItem("token");

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

  if (loading) {
    return <Loading />;
  }

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
                    

                    <div className="car-image-container" style={{marginTop:"100px"}}>
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

                      <h4 className="font-semibold">
                      {vehicleData.brand} - {vehicleData.model}
                      </h4>

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
                              onChange={handleChange} />
                          </div>
                          <div className="info-group">
                            <label htmlFor="numberOfDoors">No. of Doors: </label>
                            <input
                              type="number"
                              name="numberOfDoors"
                              value={vehicleData.numberOfDoors}
                              onChange={handleChange} />
                          </div>
                          <div className="info-group">
                            <label htmlFor="color">Color: </label>
                            <input
                              type="text"
                              name="color"
                              value={vehicleData.color}
                              onChange={handleChange} />
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
                              <option value="Car">Car</option>
                              <option value="Bike">Bike</option>
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
                        
                      </form>
                    </div>

 
                          <div className="d-flex justify-center align-items-center">
                            {/* <button type="button" className="back1__btn me-4">
                              <Link to="/vehicles">Back</Link>
                            </button> */}
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
