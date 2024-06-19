import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/reuseable/CarItem";
import axios from "axios";
import Loading from "../components/UI/Loading";

const BikeListing = () => {
  const [bikeData, setbikeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/vehicles/retrieveAllVehicles"
      );
      setbikeData(response.data.bike);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch data. Please try again later.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const source = axios.CancelToken.source();

    fetchData().catch((error) => {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else {
        setError("Failed to fetch data. Please try again later.");
      }
    });

    return () => {
      source.cancel("Component unmounted, request canceled.");
    };
  }, [fetchData]);

  useEffect(() => {
    if (bikeData.length === 0) {
      const timer = setTimeout(() => {
        setShowEmptyMessage(true);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setShowEmptyMessage(false);
    }
  }, [bikeData]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center">
        <h4 className="font-semibold">{error}</h4>
      </div>
    );
  }

  return (
    <Helmet title="bikes">
      <CommonSection title="Bike Listing" />
      <section>
        <Container>
          <Row>
            {/* <Col lg="12">
              <div className="d-flex align-items-center gap-3 mb-5">
                <span className="d-flex align-items-center gap-2">
                  <i className="ri-sort-asc"></i> Sort By
                </span>
                <select>
                  <option>Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div>
            </Col> */}
            {showEmptyMessage && (
              <div className="flex justify-center items-center">
                <h4 className="font-semibold">No bike found.</h4>
              </div>
            )}
            {!showEmptyMessage &&
            <div className="selling__car-list">
              {bikeData.map((item, index) => <CarItem item={item} key={index} />)}
              </div>}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default BikeListing;
