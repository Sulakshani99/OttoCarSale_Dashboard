import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Helmet from '../components/Helmet/Helmet';

const OrderDetails = () => {
    const {slug} = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  // const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/orders/retrieveOneOrder/${slug}`);
        const orderData = response.data;
        // Format the orderedDate for the datetime-local input
        const formattedDate = new Date(orderData.orderedDate).toISOString().slice(0, 16);
        setOrder({ ...orderData, orderedDate: formattedDate });
        setStatus(orderData.status); // Set current status
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
      // Update order status and message
      const updatedOrder = { ...order, status };
      if (newMessage) {
        updatedOrder.chatBox.push({ message: newMessage, owner: 'owner' });
      }
      await axios.put(`http://localhost:3001/api/v1/orders/editOrder/${slug}`, updatedOrder);
      alert("Order details updated successfully");
      setOrder(updatedOrder);
      setNewMessage("");
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
    // <div>
    //   <h2 style={{marginTop:'100px'}}>Order Details</h2>
      
    //   <p>Customer ID : {order.customerID} </p>
    //   <p>Customer Name : {order.customerName}</p>
    //   <p>Customer Email : {order.customerEmail}</p>
    //   {order.items.map((item, index) => (
    //     <div key={index}>
    //     <p style={{ fontWeight:'bold'}}> Vehicle {index + 1}:</p>
    //     <p>Vehicle Brand: {item.vehicleBrand}</p>
    //     <p>Vehicle Model: {item.vehicleModel}</p>
    //     <p>Vehicle Price Range: {item.vehiclePriceRange}</p>
    //     <p>Vehicle Type: {item.vehicleType}</p>
    //     <p>Vehicle Color: {item.vehicleColor}</p>
    //     <p>Quantity: {item.quantity}</p>
    //     </div>
    //   ))}

    //    <div style={{display:'inline-flex', gap:'20px'}}>
    //    <p>Status:</p>
    //   <select value={status} onChange={(e) => setStatus(e.target.value)}>
    //     <option value="pending">Pending</option>
    //     <option value="processing">Processing</option>
    //     <option value="shipped">Shipped</option>
    //     <option value="delivered">Delivered</option>
    //     <option value="cancelled">Cancelled</option>
    //   </select>
    //    </div>

    //    <div>
    //    <div style={{display:'inline-flex', gap:'20px'}}>
    //    <p>Message:</p>
    //   <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
    //    </div>
    //    </div>
       
    //   <br /> 
    //   <button onClick={handleSave}>Save</button>
    // </div>

    <Helmet title="Order Details">
      <div className="flex items-center justify-center my-10" style={{ marginTop: '100px' }}>
        <div className="main1">
          <div className="register">
            <form className="form">
              <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '20px', border: '1px solid #fff', borderRadius: '5px', marginTop: '10px' }}>
                <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold', color: '#233c5c', textAlign: 'center' }}>Order Details</h2>
                <h4>Customer Information</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  {/* <div style={{ width: '48%' }}>
                    <label htmlFor="customerID">Customer ID</label>
                    <input type="text" name="customerID" value={order.customerID} readOnly style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
                  </div> */}
                  <div style={{ width: '48%' }}>
                    <label htmlFor="customerName">Customer Name</label>
                    <input type="text" name="customerName" value={order.customerName} readOnly style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
                  </div>
                  <div style={{ width: '48%' }}>
                    <label htmlFor="customerEmail">Customer Email</label>
                    <input type="text" name="customerEmail" value={order.customerEmail} readOnly style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ width: '48%' }}>
                    <label htmlFor="orderedDate">Ordered Date</label>
                    <input type="datetime-local" name="orderedDate" value={order.orderedDate} readOnly style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
                  </div>
                  <div style={{ width: '48%' }}>
                    <label htmlFor="customerMobileNumber">Customer Mobile Number</label>
                    <input type="text" name="customerMobileNumber" value={order.customerMobileNumber} readOnly style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{ width: '48%' }}>
                    <label htmlFor="customerAddress">Customer Address</label>
                    <input type="text" name="customerAddress" value={order.customerAddress} readOnly style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
                  </div>
                </div>

                <h4>Vehicle Details</h4>
                {order.items.map((item, index) => (
                  <div key={index}>
                    {/* <h3 style={{ fontWeight: 'bold' }}>Vehicle {index + 1}:</h3> */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <div style={{ width: '48%' }}>
                        <label htmlFor={`vehicleBrand${index}`}>Vehicle Brand</label>
                        <input type="text" name={`vehicleBrand${index}`} value={item.vehicleBrand} readOnly style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
                      </div>
                      <div style={{ width: '48%' }}>
                        <label htmlFor={`vehicleModel${index}`}>Vehicle Model</label>
                        <input type="text" name={`vehicleModel${index}`} value={item.vehicleModel} readOnly style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <div style={{ width: '48%' }}>
                        <label htmlFor={`vehiclePriceRange${index}`}>Vehicle Price Range</label>
                        <input type="text" name={`vehiclePriceRange${index}`} value={item.vehiclePriceRange} readOnly style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
                      </div>
                      <div style={{ width: '48%' }}>
                        <label htmlFor={`vehicleType${index}`}>Vehicle Type</label>
                        <input type="text" name={`vehicleType${index}`} value={item.vehicleType} readOnly style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <div style={{ width: '48%' }}>
                        <label htmlFor={`vehicleColor${index}`}>Vehicle Color</label>
                        <input type="text" name={`vehicleColor${index}`} value={item.vehicleColor} readOnly style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
                      </div>
                      <div style={{ width: '48%' }}>
                        <label htmlFor={`quantity${index}`}>Quantity</label>
                        <input type="number" name={`quantity${index}`} value={item.quantity} readOnly style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
                      </div>
                    </div>
                  </div>
                ))}

                <h4>Order Status</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{ width: '48%' }}>
                    <label htmlFor="status">Status</label>
                    <select name="status" value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }}>
                      {/* <text value="select status">Select Status</text> */}
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ marginBottom: '20px', width: '100%' }}>
                  <h4>Messages</h4>
                  <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
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
                  </div>
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here"
                    style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px', minHeight: '100px' }}
                  ></textarea>
                </div>
                </div>


                <button style={{ background: '#021F61', color: '#ffffff', marginLeft: '100px', marginTop: '50px' }} type="submit" className="form-button" onClick={handleSave}>
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
