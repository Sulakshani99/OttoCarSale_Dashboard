import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import Car from "../assets/images/car-02.png";
import "../styles/car-details.css";

const CarDetails = ({ match }) => {

  const { slug } = useParams();
  // const {_id} = useParams();
  const [vehicleData, setVehicleData] = useState({
    vehicleId: '',
    chassisNumber: '',
    engineNo: '',
    vehicleState: '',
    companyName: '',
    numberOfDoors: 0,
    color: '',
    seatingCapacity: 0,
    length: 0,
    width: 0,
    height: 0,
    condition: '',
    vehiclePrice: '',
    fuelType: 'Petrol',
    manufacturedCountry: '',
    assembled: false,
    vehicleType: 'car',
    brand: '',
    style: '',
    model: '',
    manufacturedYear: new Date().getFullYear(),
  
  });

  const [relatedData, setRelatedData] = useState([]);

  useEffect(() => {
    // Fetch vehicle data based on match.params.id if required
  }, [match]); // Ensure that match is included in the dependency array


  useEffect(() => {
    const fetchData = async () => {
      try {
        const singleCarItem = await axios.get(
          `http://localhost:3001/api/v1/vehicles/findOneVehicle/${slug}`
        );
        setVehicleData(singleCarItem.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [slug]);

  const firstAlbumUrl = vehicleData.album?.[0]?.photoURL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData({ ...vehicleData, [name]: value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Update logic here
  //     const response = await axios.post(`http://localhost:3001/api/v1/vehicles/editVehicle/`);
    
  //     console.log('Updated Form Data:', vehicleData);
  //   } catch (error) {
  //     // Handle error
  //     console.error('Error:', error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Replace "your_bearer_token_here" with your actual bearer token
  
      // Set the request headers with the bearer token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
  
      // Update logic here
      const response = await axios.put(`http://localhost:3001/api/v1/vehicles/editVehicle/${slug}`, vehicleData, config);
  
      console.log('Updated Form Data:', vehicleData);
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
  };
  

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setVehicleData({ ...vehicleData, [name]: checked });
  };


  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const singleCarItem = await axios.get(
          `http://localhost:3001/api/v1/vehicles/findOneVehicle/${slug}`
        );
        setVehicleData(singleCarItem.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [slug, selectedImage]); // Include selectedImage in the dependency array

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
  
      const token = localStorage.getItem("token"); // Replace "your_bearer_token_here" with your actual bearer token
  
      // Set the request headers with the bearer token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
  
      const response = await axios.post(
        `http://localhost:3001/api/v1/vehicles/uploadImage/${slug}`,
        formData,
        config // Include the config object for authorization
      );
      console.log("Image uploaded successfully:", response.data);
  
      // After uploading the image, you may want to fetch the updated vehicle data
      const updatedVehicle = await axios.get(
        `http://localhost:3001/api/v1/vehicles/findOneVehicle/${slug}`
      );
      setVehicleData(updatedVehicle.data[0]);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  


  return (
    <Helmet title={vehicleData.brand}>
      <section className="car-details-container">
        <Container>
          <Row>
            <Col lg="12">
              {/* <div className="navBar">NavBar</div> */}
            </Col>
          </Row>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <Row>
            <Col lg="6">
              <div className="car-image-container">
                 {/* <img src={Car} alt="" className="car-image" /> */}

                {vehicleData.album && vehicleData.album.length > 0 && (
                <img src={vehicleData.album[0].photoURL} alt={`Image 1`} className="car-image w-100" />
              )}
              </div>
              
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
                    vehicleData.album.slice(4).map((image, index) => (
                      <img
                        key={index + 4} // Adjust the key to avoid conflicts
                        src={image.photoURL}
                        alt={`Image ${index + 5}`} // Start index from 5
                        className="car-image1 w-100"
                      />
                    ))}
                </div>


              <form onSubmit={handleImageUpload}>
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                <button type="submit">Upload Image</button>
              </form>
          
                   {/* {Array.isArray(vehicleData.album) && vehicleData.album.map((image, index) => (
                    <img key={index} src={image.photoURL} alt={`Image ${index}`} className="car-image w-100" />
                  ))} */}
            </Col>


            <Col lg="6">
              <div className="car___item " style={{marginTop:'-400px'}}>
                <div className="car__item-content">
                  <form>
                  <h4>{vehicleData.brand} - {vehicleData.model}</h4>
                  <div className="car__item-info">

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div>
                  <span><i class="ri-car-line"></i>
                  <label htmlFor="vehicleId" style={{ width: '50%',  padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }}> Vehicle ID : {vehicleData.vehicleId} </label>
                  {/* <input type="text" name="vehicleId" value={vehicleData.vehicleId} style={{ width: '50%',  padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} /> */}
                  </span>
                  </div>
                  <div><span><i class="ri-car-line"></i>
                  <label htmlFor="chassisNumber"> Chassis Number : </label>
                  <input type="text" name="chassisNumber" value={vehicleData.chassisNumber} onChange={handleChange} style={{ width: '50%',  padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
                  </span>
                  </div> </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div>
                  <span><i class="ri-car-line"></i>
                  <label htmlFor="engineNo"> Engine No : </label>
                  <input type="text" name="engineNo" value={vehicleData.engineNo} onChange={handleChange} style={{ width: '50%',padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
                  </span>
                  </div>
                  <div>
                  <span><i class="ri-car-line"></i>
                  <label htmlFor="vehicleState"> Vehicle State : </label>
                  <input type="text" name="vehicleState" value={vehicleData.vehicleState} onChange={handleChange} style={{ width: '50%',padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
                  </span>
                  </div> </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div>
                  <span><i class="ri-building-line"></i>
                  <label htmlFor="companyName"> Company Name : </label>
                  <input type="text" name="companyName" value={vehicleData.companyName} onChange={handleChange} style={{ width: '50%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
                  </span>
                  </div>
                  <div>
                  <span><i class="ri-car-line"></i>
                  <label htmlFor="numberOfDoors"> No. of Doors : </label>
                  <input type="number" name="numberOfDoors" value={vehicleData.numberOfDoors} onChange={handleChange} style={{ width: '50%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
                  </span>
                  </div> </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div>
                  <span><i class="ri-paint-fill"></i>
                  <label htmlFor="color"> Color : </label>
                  <input type="text" name="Color" value={vehicleData.color} onChange={handleChange} style={{ width: '50%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
                  </span>
                  </div>
                  <div>
                  <span><i class="ri-group-line"></i>
                  <label htmlFor="seatingCapacity"> Seating Capacity : </label>
                  <input type="number" name="seatingCapacity" value={vehicleData.seatingCapacity} onChange={handleChange} style={{ width: '50%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
                  </span>
                  </div> </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div>
                  <span><i class="ri-paint-fill"></i>
                  <label htmlFor="condition"> Condition : </label>
                  <input type="text" name="condition" value={vehicleData.condition} onChange={handleChange} style={{ width: '50%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
                  </span>
                  </div>
                  <div>
                  <span><i class="ri-map-pin-line"></i>
                  <label htmlFor="manufacturedYear"> Manufactured Year : </label>
                  <input type="text" name="manufacturedYear" value={vehicleData.manufacturedYear} onChange={handleChange} style={{ width: '45%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
                  </span>
                  </div> 
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div>
                  <span><i class="ri-paint-fill"></i>
                  <label htmlFor="height"> Height (m) : </label>
                  <input type="number" name="height" value={vehicleData.height} min={1}
                  max={20} onChange={handleChange} style={{ width: '40%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
                  </span>
                  </div>
                  <div>
                  <span><i class="ri-car-line"></i>
                  <label htmlFor="width"> Width (m) : </label>
                  <input type="number" name="width" value={vehicleData.width} min={1}
                    max={20} onChange={handleChange} style={{ width: '40%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
                  </span>
                  </div> </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div>
                  <span><i class="ri-paint-fill"></i>
                  <label htmlFor="vehiclePrice"> Vehicle Price : </label>
                  <input type="text" name="vehiclePrice" value={vehicleData.vehiclePrice} onChange={handleChange} style={{ width: '40%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
                  </span>
                  </div>
                  <div>
                  <span><i class="ri-settings-2-line"></i>
                  <label htmlFor="fuelType"> Fuel Type : </label>
                  <select name="fuelType" value={vehicleData.fuelType} onChange={handleChange} style={{ width: '45%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="CNG">CNG</option>
                  </select></span>
                  </div> </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div>
                  <span><i class="ri-calendar-line"></i>
                  <label htmlFor="manufacturedCountry"> Manufactured Country : </label>
                  <input type="text" name="manufacturedCountry" value={vehicleData.manufacturedCountry} onChange={handleChange} style={{ width: '40%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
                  </span>
                  </div>
                  <div>
                  <span><i class="ri-car-line"></i>
                  <label htmlFor="assembled"> Assembled : </label>
                 <div style={{ display: 'flex', alignItems: 'center' }}>
                 <input type="checkbox" name="assembled" checked={vehicleData.assembled} onChange={handleCheckboxChange} style={{ cursor: 'pointer' , marginTop:'-15px',marginLeft:'190px'}} />
                  {/* <span style={{ marginLeft: '10px', textDecorationStyle:'solid', color: 'black' }}>Is the vehicle assembled?</span> */}
                  </div> </span>
                  </div> </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div>
                  <span><i class="ri-grid-line"></i>
                  <label htmlFor="vehicleType"> Vehicle Type : </label>
                  <select name="vehicleType" value={vehicleData.vehicleType} onChange={handleChange} style={{ width: '50%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <option value="car">Car</option>
                    <option value="motorcycle">Motorcycle</option>
                    <option value="truck">Truck</option>
                    <option value="bus">Bus</option>
                    <option value="van">Van</option>
                    <option value="suv">SUV</option>
                    <option value="other">Other</option>
                  </select></span>
                  </div>
                  <div>
                  <span><i class="ri-car-line"></i>
                  <label htmlFor="brand"> Brand : </label>
                  <input type="text" name="brand" value={vehicleData.brand} onChange={handleChange} style={{ width: '50%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
                  </span>
                  </div> </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div>
                  <span><i class="ri-car-line"></i>
                  <label htmlFor="model"> Model : </label>
                  <input type="text" name="model" value={vehicleData.model} onChange={handleChange} style={{ width: '50%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
                  </span>
                  </div>
                  <div>
                  <span><i class="ri-brush-line"></i>
                  <label htmlFor="style"> Style : </label>
                  <input type="text" name="style" value={vehicleData.style} onChange={handleChange} style={{ width: '50%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
                  </span>
                  </div> </div>

                  <div>
                  <span><i class="ri-car-line"></i>
                  <label htmlFor="length"> Length (m) : </label>
                  <input type="number" name="length" value={vehicleData.length} min={1}
                  max={20} onChange={handleChange} style={{ width: '40%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
                  </span>
                  </div>  
          

                   {/* <div><span><i class="ri-car-line"></i><text > Model:</text> <input></input>{vehicleData.model}</span></div> */}
                    {/* <div><span><i className="ri-building-line"></i> {vehicleData.companyName}</span></div> */}
                    {/* <div><span><i className="ri-map-pin-line"></i> {vehicleData.manufacturedCountry}</span></div> */}
                    {/* <div><span><i className="ri-paint-fill"></i> {vehicleData.color}</span></div> */}
                    {/* <div><span><i class="ri-settings-2-line"></i> {vehicleData.fuelType}</span></div> */}
                    {/* <div><span><i className="ri-calendar-line"></i> {vehicleData.manufacturedYear}</span></div> */}
                    {/* <div><span><i className="ri-group-line"></i> {vehicleData.seatingCapacity}</span></div> */}
                    {/* <div><span><i className="ri-brush-line"></i> {vehicleData.style}</span></div> */}
                    {/* <div><span><i className="ri-grid-line"></i> {vehicleData.vehicleType}</span></div> */}
                  </div>
                  </form>

                  <button onClick={handleSubmit} className="car___item-btn car__btn-rent" style={{marginBottom:'20px'}}>
                    <Link to={`/selling`}>Update</Link>
                  </button>
                </div>
              </div>
            </Col>

          </Row>
         
          </div>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;





// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
// import axios from "axios";

// const CarDetails = () => {
//   const { vehicleId } = useParams();
//   const [formData, setFormData] = useState({
//     vehicleId: '',
//     chassisNumber: '',
//     engineNo: '',
//     vehicleState: '',
//     companyName: '',
//     numberOfDoors: 1,
//     color: '',
//     seatingCapacity: 1,
//     condition: '',
//     length: 0,
//     height: 0,
//     width: 0,
//     vehiclePrice: '',
//     fuelType: 'Petrol',
//     manufacturedCountry: '',
//     assembled: false,
//     vehicleType: 'car',
//     brand: '',
//     style: '',
//     model: '',
//     manufacturedYear: new Date().getFullYear(),
//   });

//   useEffect(() => {
//     const fetchVehicleDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3001/api/v1/vehicles/findOneVehicle/${vehicleId}`);
//         setFormData(response.data);
//       } catch (error) {
//         console.error("Error fetching vehicle details:", error);
//       }
//     };

//     fetchVehicleDetails();
//   }, [vehicleId]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:3001/api/v1/vehicles/editVehicle/`, formData);
//       console.log("Vehicle details updated successfully");
//       // Optionally, you can redirect the user to another page or show a success message
//     } catch (error) {
//       console.error("Error updating vehicle details:", error);
//     }
//   };

//   return (
//     <Container>
//       <Row>
//         <Col md={6}>
//           <h3>Edit Car Details</h3>
//           <Form onSubmit={handleSubmit}>
//             {/* Add form fields for vehicle details */}
//             {/* Example: */}
//             <FormGroup>
//               <Label for="brand">Brand</Label>
//               <Input
//                 type="text"
//                 name="brand"
//                 id="brand"
//                 value={formData.brand || ''} // Check if formData.brand is undefined and default to empty string
//                 onChange={handleChange}
//               />
//             </FormGroup>
//             {/* Repeat this pattern for other fields */}
//             <Button type="submit" color="primary">Submit</Button>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default CarDetails;
