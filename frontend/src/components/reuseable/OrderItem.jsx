import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/order.css";

const OrderItem = ({ item }) => {
  if (!item) {
    return null; // If item is undefined, return null to render nothing
  }

  const { orderedDate, customerName, _id } = item;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // This will include both date and time
    // return date.toLocaleDateString(); // This will include only date
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/api/v1/orders/deleteOrder/${_id}`);
        alert("Order deleted successfully");
        console.log("Order deleted successfully");
        window.location.reload(); // Refresh the page after deletion
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  return (
    <div className="order__item">
      <div className="order__item-content">
        <div className="order__item-info">
          <div className="order__item-data">
            <span className="order__item-label">Ordered Date:</span>
            <span className="order__item-value">{formatDate(orderedDate)}</span>
          </div>
          <div className="order__item-data">
            <span className="order__item-label">Customer Name:</span>
            <span className="order__item-value">{customerName}</span>
          </div>
        </div>
        <div className="order__item-actions">
          <button className="order__item-btn order__btn-rent">
            <Link to={`/orders/${_id}`}>Edit</Link>
          </button>
          <button onClick={handleDelete} className="order__item-btn order__btn-details">
            Delete
          </button>
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
