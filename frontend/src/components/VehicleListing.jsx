import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleCarItem from "../components/reuseable/SingleCarItem"; // Import the SingleCarItem component

const VehicleListing = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/v1/vehicles/retrieveAllVehicles");
        setVehicles(response.data); // Assuming the response contains an array of vehicles
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch vehicles. Please try again later.");
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Admin Vehicle Listing</h2>
      {vehicles.length === 0 ? (
        <div>No vehicles found.</div>
      ) : (
        <div>
          {vehicles.map((vehicle) => (
            <SingleCarItem key={vehicle.id} vehicle={vehicle} /> // Assuming each vehicle has a unique ID
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleListing;




// import React from "react";
// import SingleCarItem from "../components/reuseable/SingleCarItem";
// import SingleCard from "../components/reuseable/SingleCard"

// const VehicleListing = () => {
//   const dummyData = [
//     { id: 1, make: "Dummy Make 1", model: "Dummy Model 1", year: 2022 },
//     { id: 2, make: "Dummy Make 2", model: "Dummy Model 2", year: 2021 },
//     { id: 3, make: "Dummy Make 3", model: "Dummy Model 3", year: 2020 },
//   ];

//   return (
//     <div>
//       <h2>Vehicle Listing</h2>
//       {dummyData.map((vehicle) => (
//         <SingleCarItem key={vehicle.id} vehicle={vehicle} />
//       ))}
//     </div>
//   );
// };

// export default VehicleListing;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import SingleCarItem from "../components/reuseable/SingleCarItem"; // Import the SingleCarItem component

// const VehicleListing = () => {
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchVehicles = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/api/v1/vehicles/retrieveAllVehicles");
//         setVehicles(response.data.car); // Assuming the response contains an array of vehicles under the 'car' property
//         setLoading(false);
//       } catch (error) {
//         setError("Failed to fetch vehicles. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchVehicles();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h2>Admin Vehicle Listing</h2>
//       {vehicles.length === 0 ? (
//         <div>No vehicles found.</div>
//       ) : (
//         <div>
//           {vehicles.map((vehicle) => (
//             <SingleCarItem key={vehicle.vehicleId} vehicle={vehicle} /> // Assuming each vehicle has a unique ID
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default VehicleListing;




// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import SingleCarItem from "../components/reuseable/SingleCarItem";

// // const VehicleListing = () => {
// //   const [vehicles, setVehicles] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchVehicles = async () => {
// //       try {
// //         const response = await axios.get("http://localhost:3001/api/v1/vehicles/retrieveAllVehicles");
// //         setVehicles(response.data); // Assuming the response contains an array of vehicles
// //         setLoading(false);
// //       } catch (error) {
// //         setError("Failed to fetch vehicles. Please try again later.");
// //         setLoading(false);
// //       }
// //     };

// //     fetchVehicles();
// //   }, []);

// //   if (loading) {
// //     return <div>Loading...</div>;
// //   }

// //   if (error) {
// //     return <div>Error: {error}</div>;
// //   }

// //   return (
// //     <div>
// //       <h2>Admin Vehicle Listing</h2>
// //       {vehicles.length === 0 ? (
// //         <div>No vehicles found.</div>
// //       ) : (
// //         <div>
// //           {vehicles.map((vehicle) => (
// //             <SingleCarItem key={vehicle.id} vehicle={vehicle} />
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default VehicleListing;
