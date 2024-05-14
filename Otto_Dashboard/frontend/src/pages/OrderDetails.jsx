import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
    const {slug} = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/orders/retrieveOneOrder/${slug}`);
        setOrder(response.data);
        setStatus(response.data.status); // Set current status
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch order details. Please try again later.");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [slug]);

  const handleSave = async () => {
    try {
      // Update order status and message
      const updatedOrder = { ...order, status, message };
      await axios.put(`http://localhost:3001/api/v1/orders/editOrder/${slug}`, updatedOrder);
      alert("Order details updated successfully");
    } catch (error) {
      console.error("Error updating order details:", error);
      alert("Failed to update order details. Please try again later.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!order) {
    return <p>Order not found.</p>;
  }

  return (
    <div>
      <h2 style={{marginTop:'100px'}}>Order Details</h2>
      
      <p>Customer ID : {order.customerID} </p>
      <p>Customer Name : {order.customerName}</p>
      <p>Customer Email : {order.customerEmail}</p>
      {order.items.map((item, index) => (
        <div key={index}>
        <p style={{ fontWeight:'bold'}}> Vehicle {index + 1}:</p>
        <p>Vehicle Brand: {item.vehicleBrand}</p>
        <p>Vehicle Model: {item.vehicleModel}</p>
        <p>Vehicle Price Range: {item.vehiclePriceRange}</p>
        <p>Vehicle Type: {item.vehicleType}</p>
        <p>Vehicle Color: {item.vehicleColor}</p>
        <p>Quantity: {item.quantity}</p>
        </div>
      ))}

       <div style={{display:'inline-flex', gap:'20px'}}>
       <p>Status:</p>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
       </div>

       <div>
       <div style={{display:'inline-flex', gap:'20px'}}>
       <p>Message:</p>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
       </div>
       </div>
       
      <br /> 
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default OrderDetails;
