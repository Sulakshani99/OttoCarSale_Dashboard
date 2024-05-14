import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import OrderItem from "../components/reuseable/OrderItem"
import axios from "axios";
import Loading from "../components/UI/Loading";

const OrderListing = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);

//   const fetchData = useCallback(async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:3001/api/v1/orders/retrieveAllOrders"
//       );
//       setOrderData(response.data.order);
//       setLoading(false);
//     } catch (error) {
//       setError("Failed to fetch data. Please try again later.");
//       setLoading(false);
//     }
//   }, []);

useEffect(() => {
    const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/orders/retrieveAllOrders"
      );
    //   console.log("Response data:", response.data); // Log response data
    //   console.log("Order data:", response.data.order); // Log order data
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch orders. Please try again later.");
      setLoading(false);
    }
  };

  fetchOrders();
}, []);
  

//   useEffect(() => {
//     const source = axios.CancelToken.source();

//     fetchData().catch((error) => {
//       if (axios.isCancel(error)) {
//         console.log("Request canceled:", error.message);
//       } else {
//         setError("Failed to fetch data. Please try again later.");
//       }
//     });

//     return () => {
//       source.cancel("Component unmounted, request canceled.");
//     };
//   }, [fetchData]);

//   useEffect(() => {
//     if (orderData.length === 0) {
//       const timer = setTimeout(() => {
//         setShowEmptyMessage(true);
//       }, 1000);

//       return () => clearTimeout(timer);
//     } else {
//       setShowEmptyMessage(false);
//     }
//   }, [orderData]);



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
    <Helmet title="Orders">
      <CommonSection title="Order Listing"/>
      <section>
        <Container>
          <Row>
            {/* <Col lg="12" style={{marginBottom:'30px'}}>
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

            
            {/* {showEmptyMessage && (
              <div className="flex justify-center items-center">
                <h4 className="font-semibold">No Order found.</h4>
              </div>
            )}
            {!showEmptyMessage && 
            <div className="selling__car-list">
              {orderData.map((item) => <OrderItem item={item} key={item.id} />)}
              </div> } */}

            {orders.length === 0 ? (
            <div className="flex justify-center items-center">
            <h4 className="font-semibold">No orders found.</h4>
            </div>
            ) : (
            <div className="order-list">
            {orders.map((order) => (
                <OrderItem key={order._id} item={order} />
            ))}
            </div>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default OrderListing;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Loading from "../components/UI/Loading";
// import OrderItem from "../components/reuseable/OrderItem";

// const OrderListing = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/api/v1/orders/retrieveAllOrders");
//         setOrders(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError("Failed to fetch orders. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) {
//     return <Loading />;
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center">
//         <h4 className="font-semibold">{error}</h4>
//       </div>
//     );
//   }

//   return (
//     <div className="order-listing">
//       <h2>All Orders</h2>
//       {orders.length === 0 ? (
//         <div className="flex justify-center items-center">
//           <h4 className="font-semibold">No orders found.</h4>
//         </div>
//       ) : (
//         <div className="order-list">
//           {orders.map((order) => (
//             <OrderItem key={order._id} item={order} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderListing;
