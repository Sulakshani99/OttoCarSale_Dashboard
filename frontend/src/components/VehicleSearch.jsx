import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "reactstrap";
import "../styles/searching__car-item.css";

const VehicleSearch = () => {
  const [searchParams, setSearchParams] = useState({
    vehicleType: "",
    brand: "",
    model: "",
    style: "",
    fuelType: "",
    manufacturedYear: "",
  });

  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isAnyParameterProvided = Object.values(searchParams).some(
      (param) => param !== ""
    );

    if (!isAnyParameterProvided) {
      alert("Please select at least one search parameter!");
      return;
    }

    try {
      const response = await axios.post(
       "http://localhost:3001/api/v1/vehicles/retrieveVehicles/${token}",
        searchParams,
        {
          headers: {
            // Pass the token if required by your backend API
            // "Authorization": `Bearer ${token}`
          },
        }
      );
      setVehicles(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setError("Error fetching vehicles. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value,
    });
  };

  return (
    <section className="become__driver" style={{ marginTop: "100px", background: "#f0f0f8" }}>
      <Container style={{ marginTop: "100px" }}>
        <Row>
          <Col lg="6" md="6" sm="12" style={{ marginTop: "-240px", marginLeft: "0px", color: "" }}>
            <div style={{ background: "#f9a826", padding: "10px" }}>
              <h2 className="section__title become__driver-title" style={{ marginBottom: "10px", color: "#021F61" }}>
                Find Your Car
              </h2>
              <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", padding: "20px" }}>
                  <select
                    style={{ margin: "10px", padding: "10px", width: "200px" }}
                    name="vehicleType"
                    value={searchParams.vehicleType}
                    onChange={handleInputChange}
                  >
                    <option value="">Vehicle Type</option>
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                    <option value="truck">Truck</option>
                    <option value="cab">Cab</option>
                    <option value="van">Van</option>
                  </select>
                  <input
                    style={{ margin: "10px", padding: "10px" }}
                    type="text"
                    name="brand"
                    value={searchParams.brand}
                    onChange={handleInputChange}
                    placeholder="Brand"
                  />
                  <input
                    style={{ margin: "10px", padding: "10px" }}
                    type="text"
                    name="model"
                    value={searchParams.model}
                    onChange={handleInputChange}
                    placeholder="Model"
                  />
                  <input
                    style={{ margin: "10px", padding: "10px" }}
                    type="text"
                    name="style"
                    value={searchParams.style}
                    onChange={handleInputChange}
                    placeholder="Style"
                  />
                  <select
                    style={{ margin: "10px", padding: "10px", width: "200px" }}
                    name="fuelType"
                    value={searchParams.fuelType}
                    onChange={handleInputChange}
                  >
                    <option value="">Fuel Type</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="CNG">CNG</option>
                  </select>
                  <input
                    style={{ margin: "10px", padding: "10px" }}
                    type="text"
                    name="manufacturedYear"
                    value={searchParams.manufacturedYear}
                    onChange={handleInputChange}
                    placeholder="Manufactured Year"
                  />
                  <Button type="submit" color="primary" style={{ margin: "10px", padding: "10px" }}>
                    Search
                  </Button>
                </div>
              </form>
            </div>

            <div className="d-flex flex-wrap">
              <div className="selling__car-list">
                {vehicles.map((vehicle) => (
                  <Col lg="3" md="3" sm="6" key={vehicle.vehicleId}>
                    <div key={vehicle.vehicleId}>
                      <div className="searching___car-list" style={{}}>
                        <div className="car__item" style={{ width: "250px" }}>
                          <div className="car__image">
                            {vehicle.album.length > 0 && (
                              <img src={vehicle.album[0].photoURL} alt={`Image 1`} className="w-100" />
                            )}
                          </div>

                          <div className="car__item-content mt-4">
                            <h4 className="section__title text-center">{vehicle.brand}</h4>

                            <div className="car__item-info car--details d-flex align-items-center justify-content-between align-baseline mt-3 mb-4 ml-3 mr-10">
                              <span className="d-flex align-items-center gap-10">
                                <i className="ri-car-line"></i>
                                {vehicle.model}
                              </span>
                              <span className="d-flex align-items-center gap-10">
                                <i className="ri-settings-2-line"></i>
                                {vehicle.fuelType}
                              </span>
                              <span className="d-flex align-items-center gap-10">
                                <i className="ri-timer-flash-line"></i>
                                {vehicle.manufacturedCountry}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </div>
            </div>

            {error && <p>{error}</p>}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default VehicleSearch;
