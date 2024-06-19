import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Bookings from "../pages/Bookings";
import SellCar from "../pages/SellCar";
import Settings from "../pages/Settings";
// import AddVehicleForm from "../components/AddVehicleForm";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import UpdateVehicleForm from "../components/UpdateVehicleForm";
import VanListing from "../pages/VanListing";
import BikeListing from "../pages/BikeListing";
import TruckListing from "../pages/TruckListing";
import CabListing from "../pages/CabListing";
import OrderListing from "../pages/OrderListing";
import AddVehicleForm from "../components/AddVehicleForm";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import OrderDetails from "../pages/OrderDetails";
import SellingPage from "../pages/SellingPage";
import ForgetPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/ResetPassword";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/selling" element={<SellingPage />} />}
      />
      {/* <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/bookings" element={<Bookings />} /> */}
      {/* <Route path="/sell-car" element={<SellCar />} /> */}
      <Route path="/settings" element={<Settings />} />
      <Route path="/user" element={<Login />} />
      {/* <Route path="/forget" element={<ForgetPassword/>} /> */}
      {/* <Route path="/resetpassword/:id/:token" element={<ResetPassword/>} /> */}
      <Route path="/selling" element={<SellingPage/>} />
      <Route path="/addvehicle" element={<AddVehicleForm/>} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/vans" element={<VanListing />} />
      <Route path="/trucks" element={<TruckListing />} />
      <Route path="/bikes" element={<BikeListing />} />
      <Route path="/cabs" element={<CabListing />} />
      <Route path="/orders" element={<OrderListing/>}/>
      <Route path="/vehicles/:slug" element={<CarDetails />} />
      <Route path="/orders/:slug" element={<OrderDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
