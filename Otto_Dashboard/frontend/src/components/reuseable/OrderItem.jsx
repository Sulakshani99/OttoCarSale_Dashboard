import React from "react";
import { Link } from "react-router-dom";
import "../../styles/order.css";
import Car from "../../assets/images/car-02.png";
import axios from "axios";

const OrderItem = ({ item }) => {
  if (!item) {
    return null; // If item is undefined, return null to render nothing
  }
    
  const { orderedDate, customerName, customerID, vehicleBrand,  _id } = item;

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/api/v1/orders/deleteOrder/${_id}`);
        alert("Order deleted successfully");
        console.log("Order deleted successfully");
        // Optionally, you can update the state or perform other actions after deletion
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  return (
    <div className="order__item">
      <div className="order__image">
        {/* <img src={Car} alt="" className="w-100" /> */}
      </div>
      <div className="order__item-content mt-4">
        <div className="order__item-info order--details d-flex align-items-center justify-content-between align-baseline mt-3 mb-4 ml-3 mr-10">
          <div className="order__item-data">
            <span className="order__item-label">Customer ID:</span>
            <span className="order__item-value">{customerID}</span>
          </div>
          <div className="order__item-data">
            <span className="order__item-label">Ordered Date:</span>
            <span className="order__item-value">{orderedDate}</span>
          </div>
          <div className="order__item-data">
            <span className="order__item-label">Customer Name:</span>
            <span className="order__item-value">{customerName}</span>
          </div>
          
          <div style={{}}>
          <div className="order__item-actions">
            <button className="order__item-btn order__btn-rent order__item-btn-rent ">
              <Link to={`/orders/${_id}`}>Edit</Link>
            </button>
            <button onClick={handleDelete} className="order__item-btn order__btn-details order__item-btn-details">
              Delete
            </button>
          </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderItem;



// import React from 'react';
// import { Col } from 'reactstrap';
// import "../../styles/order.css";

// const OrderItem = (props) => {
//     const { customerAddress, _id, customerName, orderedDate } = props.order;

//     // Function to truncate _id if it's longer than 15 characters
//     const truncatedId = _id.length > 15 ? _id.substring(0, 15) + "..." : _id;

//     return (
//         <Col lg="4" md="4" sm="6" className="mb-5">
//             <div className="car__item">
//                 <div className="car__item-content mt-4">
//                     <h5 className="topics__title2 text-center">{truncatedId}</h5>
//                     <div className="order__item-info mt-3 mb-4">
//                         <span className=" d-flex align-items-center gap-2 mb-1">
//                             <i className="ri-car-line"></i> {customerAddress}
//                         </span>
//                         <span className=" d-flex align-items-center gap-2 mb-1">
//                             <i className="ri-settings-2-line"></i> {customerName}
//                         </span>
//                         <span className=" d-flex align-items-center gap-2 mb-1">
//                             <i className="ri-timer-flash-line"></i> {orderedDate}
//                         </span>
//                         {/* <span className=" d-flex align-items-center gap-2 mb-1">
//                             <i className="ri-settings-2-line"></i> {status}
//                         </span> */}
//                     </div>
//                 </div>
//             </div>
//         </Col>
//     );
// }

// export default OrderItem;
