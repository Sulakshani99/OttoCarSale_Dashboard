import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Helmet from '../components/Helmet/Helmet';
import '../styles/order-details.css';
import Loading from "../components/UI/Loading";
import { useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/orders/retrieveOneOrder/${slug}`);
        const orderData = response.data;
        const formattedDate = new Date(orderData.orderedDate).toISOString().slice(0, 16);
        setOrder({ ...orderData, orderedDate: formattedDate });
        setStatus(orderData.status);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch order details. Please try again later.");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [slug]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const updatedOrder = { ...order, newStatus: status, massage: newMessage };
      if (newMessage) {
        updatedOrder.chatBox.push({ message: newMessage, owner: 'owner' });
      }
  
      // Log the updated order before sending the request
      console.log("Updated Order: ", updatedOrder);
  
      const response = await axios.put(`http://localhost:3001/api/v1/orders/editOrder/${slug}`, updatedOrder);
      console.log("Response from server: ", response.data); // Log the response data for debugging
  
      alert("Order details updated successfully");
      setOrder(updatedOrder);
      setNewMessage("");
      navigate("/orders");
    } catch (error) {
      console.error("Error updating order details:", error);
      alert("Failed to update order details. Please try again later.");
    }
  };
  

  if (loading) {
    return <Loading />;
  }

  if (!order) {
    return <p>Order not found.</p>;
  }

  return (
    <Helmet title="Order Details">
      <div className="flex items-center justify-center my-10" style={{ marginTop: '100px' }}>
        <div className="main1">
          <div className="register">
            <form className="form">
              <div className="order-details-container">
                <h2 className="order-details-header">Order Details</h2>
                <h4>Customer Information</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{ width: '48%' }}>
                    <label className="order-details-label" htmlFor="customerName">Customer Name</label>
                    <input className="order-details-input" type="text" name="customerName" value={order.customerName} readOnly />
                  </div>
                  <div style={{ width: '48%' }}>
                    <label className="order-details-label" htmlFor="customerEmail">Customer Email</label>
                    <input className="order-details-input" type="text" name="customerEmail" value={order.customerEmail} readOnly />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{ width: '48%' }}>
                    <label className="order-details-label" htmlFor="orderedDate">Ordered Date</label>
                    <input className="order-details-input" type="datetime-local" name="orderedDate" value={order.orderedDate} readOnly />
                  </div>
                  <div style={{ width: '48%' }}>
                    <label className="order-details-label" htmlFor="customerMobileNumber">Customer Mobile Number</label>
                    <input className="order-details-input" type="text" name="customerMobileNumber" value={order.customerMobileNumber} readOnly />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{ width: '48%' }}>
                    <label className="order-details-label" htmlFor="customerAddress">Customer Address</label>
                    <input className="order-details-input" type="text" name="customerAddress" value={order.customerAddress} readOnly />
                  </div>
                </div>

                <h4>Vehicle Details</h4>
                {order.items.map((item, index) => (
                  <div key={index}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <div style={{ width: '48%' }}>
                        <label className="order-details-label" htmlFor={`vehicleBrand${index}`}>Vehicle Brand</label>
                        <input className="order-details-input" type="text" name={`vehicleBrand${index}`} value={item.vehicleBrand} readOnly />
                      </div>
                      <div style={{ width: '48%' }}>
                        <label className="order-details-label" htmlFor={`vehicleModel${index}`}>Vehicle Model</label>
                        <input className="order-details-input" type="text" name={`vehicleModel${index}`} value={item.vehicleModel} readOnly />
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <div style={{ width: '48%' }}>
                        <label className="order-details-label" htmlFor={`vehiclePriceRange${index}`}>Vehicle Price Range (Rs)</label>
                        <input className="order-details-input" type="text" name={`vehiclePriceRange${index}`} value={item.vehiclePriceRange} readOnly />
                      </div>
                      <div style={{ width: '48%' }}>
                        <label className="order-details-label" htmlFor={`vehicleType${index}`}>Vehicle Type</label>
                        <input className="order-details-input" type="text" name={`vehicleType${index}`} value={item.vehicleType} readOnly />
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <div style={{ width: '48%' }}>
                        <label className="order-details-label" htmlFor={`vehicleColor${index}`}>Vehicle Color</label>
                        <input className="order-details-input" type="text" name={`vehicleColor${index}`} value={item.vehicleColor} readOnly />
                      </div>
                      <div style={{ width: '48%' }}>
                        <label className="order-details-label" htmlFor={`quantity${index}`}>Quantity</label>
                        <input className="order-details-input" type="text" name={`quantity${index}`} value={item.quantity} readOnly />
                      </div>
                    </div>
                  </div>
                ))}

                <h4>Update Order Status</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{ width: '48%' }}>
                    <label className="order-details-label" htmlFor="status">Status</label>
                    <select className="order-details-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <h4>Chat Box</h4>
                {/* <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                  {order.chatBox && order.chatBox.length > 0 ? (
                    order.chatBox.map((chat, index) => (
                      <div key={index} style={{ textAlign: chat.owner === 'owner' ? 'right' : 'left' }}>
                        <p style={{
                          margin: '5px 0',
                          padding: '10px',
                          background: chat.owner === 'owner' ? '#e1f5fe' : '#fff',
                          borderRadius: '10px',
                          display: 'inline-block',
                          maxWidth: '80%',
                          textAlign: chat.owner === 'owner' ? 'right' : 'left'
                        }}>
                          {chat.message}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No messages</p>
                  )}
                </div> */}

               <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                  {order.chatBox && order.chatBox.length > 0 ? (
                    order.chatBox.map((chat, index) => (
                      <div key={index} style={{ marginBottom: '10px' }}>
                        <strong>{chat.owner || "Owner"}: </strong>
                        <span>{chat.message}</span>
                      </div>
                    ))
                  ) : (
                    <p>No messages in the chat box.</p>
                  )}
                </div>
                

                <div style={{ marginBottom: '20px' }}>

                  {/* <div>
                    {order.chatBox.map((chat, index) => (
                      <div key={index} style={{ marginBottom: '10px' }}>
                        <strong>{chat.owner}</strong>: {chat.message}
                      </div>
                    ))}
                  </div> */}

                  <div>
                    <label className="order-details-label" htmlFor="newMessage">Add a message</label>
                    <textarea className="order-details-input" name="newMessage" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }}></textarea>
                  </div>
                </div>

                <button onClick={handleSave} className="order-details-save-button">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default OrderDetails;
