import Home from "../pages/Home";
import React from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({children}: any): JSX.Element  => {
  if (!localStorage.getItem("accessToken")) {
    return <Navigate to='/login'/>
  }
  return <Outlet />;
};

export default ProtectedRoute;
