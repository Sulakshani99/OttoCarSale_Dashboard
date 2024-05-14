import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';

const UpdateVehicleForm = ({ match }) => {
  const [formData, setFormData] = useState({
    vehicleId: '',
    chassisNumber: '',
    engineNo: '',
    vehicleState: '',
    companyName: '',
    numberOfDoors: 1,
    color: '',
    seatingCapacity: 1,
    condition: '',
    length: 0,
    height: 0,
    width: 0,
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

  const onDrop = (acceptedFiles) => {
    const updatedPhotos = [...formData.photos, ...acceptedFiles];
    // Limit the number of uploaded photos to 6
    const limitedPhotos = updatedPhotos.slice(0, 6);
    setFormData({ ...formData, photos: limitedPhotos });
  };


  useEffect(() => {
    // Fetch vehicle data based on match.params.id if required
  }, [match]); // Ensure that match is included in the dependency array

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update logic here
      const response = await axios.post(`http://localhost:3001/api/v1/vehicles/updatevehicle`);
    
      console.log('Updated Form Data:', formData);
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <form onSubmit={handleSubmit}>
        {/* Render form fields with current data */}
        <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold', color: 'white', textAlign:'center' }}>Edit Vehicle</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ width: '48%' }}>
          <label htmlFor="vehicleId">Vehicle ID</label>
        <input type="text" name="vehicleId" value={formData.vehicleId} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>
          <div style={{ width: '48%' }}>
            <label htmlFor="chassisNumber">Chassis Number</label>
        <input type="text" name="chassisNumber" value={formData.chassisNumber} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ width: '48%' }}>
          <label htmlFor="engineNo">Engine Number</label>
          <input type="text" name="engineNo" value={formData.engineNo} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>
          <div style={{ width: '48%' }}>
          <label htmlFor="vehicleState">Vehicle State</label>
          <input type="text" name="vehicleState" value={formData.vehicleState} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ width: '48%' }}>
            <label htmlFor="companyName">Company Name</label>
            <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>
          <div style={{ width: '48%' }}>
            <label htmlFor="numberOfDoors">Number of Doors</label>
            <input type="number" name="numberOfDoors" value={formData.numberOfDoors} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ width: '48%' }}>
            <label htmlFor="color">Color</label>
            <input type="text" name="color" value={formData.color} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>
          <div style={{ width: '48%' }}>
            <label htmlFor="seatingCapacity">Seating Capacity</label>
            <input type="number" name="seatingCapacity" value={formData.seatingCapacity} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ width: '48%' }}>
            <label htmlFor="condition">Condition</label>
            <input type="text" name="condition" value={formData.condition} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>
          <div style={{ width: '48%' }}>
            <label htmlFor="length">Length (m)</label>
            <input type="number" name="length" value={formData.length} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ width: '48%' }}>
            <label htmlFor="height">Height (m)</label>
            <input type="number" name="height" value={formData.height} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>
          <div style={{ width: '48%' }}>
            <label htmlFor="width">Width (m)</label>
            <input type="number" name="width" value={formData.width} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ width: '48%' }}>
            <label htmlFor="vehiclePrice">Vehicle Price</label>
            <input type="text" name="vehiclePrice" value={formData.vehiclePrice} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>
          <div style={{ width: '48%' }}>
            <label htmlFor="fuelType">Fuel Type</label>
            <select name="fuelType" value={formData.fuelType} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }}>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
              <option value="CNG">CNG</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ width: '48%' }}>
            <label htmlFor="manufacturedCountry">Manufactured Country</label>
            <input type="text" name="manufacturedCountry" value={formData.manufacturedCountry} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>
          <div style={{ width: '48%' }}>
            <label htmlFor="assembled">Assembled</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input type="checkbox" name="assembled" checked={formData.assembled} onChange={handleCheckboxChange} style={{ cursor: 'pointer' }} />
              <span style={{ marginLeft: '10px', textDecorationStyle:'solid', color: 'white' }}>Is the vehicle assembled?</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ width: '48%' }}>
            <label htmlFor="vehicleType">Vehicle Type</label>
            <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }}>
              <option value="car">Car</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="truck">Truck</option>
              <option value="bus">Bus</option>
              <option value="van">Van</option>
              <option value="suv">SUV</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div style={{ width: '48%' }}>
            <label htmlFor="brand">Brand</label>
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ width: '48%' }}>
            <label htmlFor="style">Style</label>
            <input type="text" name="style" value={formData.style} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>
          <div style={{ width: '48%' }}>
            <label htmlFor="model">Model</label>
            <input type="text" name="model" value={formData.model} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ width: '48%' }}>
          <label htmlFor="manufacturedYear">Manufactured Year</label>
          <input type="text" name="manufacturedYear" value={formData.manufacturedYear} onChange={handleChange} style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} />
        </div>
        {/* <div style={{ width: '48%' }}>
            <label htmlFor="addPhoto">Add Photo</label>
            <div {...getRootProps()} className="dropzone" style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
              <input {...getInputProps()} />
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {formData.photos.map((photo, index) => (
                  <div key={index} style={{ width: '100px', height: '100px', margin: '5px', overflow: 'hidden', position: 'relative', borderRadius: '5px' }}>
                    <img src={URL.createObjectURL(photo)} alt={`Photo ${index}`} style={{ width: '50%', height: '50%', objectFit: 'cover', position: 'absolute' }} />
                  </div>
                ))}
                {formData.photos.length < 6 && <button type="button" className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Photo</button>}
              </div>
            </div>
          </div> */}
           <div style={{ width: '48%' }}>
            <label htmlFor="addPhoto">Add Photo</label>
            <div {...getRootProps()} className="dropzone" style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
              <input {...getInputProps()} />
              {/* <p>Drag 'n' drop some files here, or click to select files</p> */}
              {/* You can customize the appearance of the dropzone message */}
              <button type="button" className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Photo</button>
            </div>
          </div>
        </div>

        <button type="submit" style={{ width: '40%',marginLeft:'160px', marginTop: '20px',marginInline:'250px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
      
        {/* <button type="submit" className="btn-primary">Update Vehicle</button> */}
      </form>
    </div>
  );
};

export default UpdateVehicleForm;
