import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";


import Settings from "../pages/Settings";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import VanListing from "../pages/VanListing";
import BikeListing from "../pages/BikeListing";
import TruckListing from "../pages/TruckListing";
import CabListing from "../pages/CabListing";
import OrderListing from "../pages/OrderListing";
import AddVehicleForm from "../components/Forms/AddVehicleForm";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import OrderDetails from "../pages/OrderDetails";
import SellingPage from "../pages/SellingPage";
import ForgetPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/ResetPassword";
import Sidebar from "../components/Sidebar/Sidebar";

const Router = () => {
  return (
    

    <Sidebar>

    <Routes>
      
      <Route
        path="/"
        element={<Navigate to="/selling" element={<SellingPage />} />}
      />
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

    </Sidebar>
  );
};

export default Router;
