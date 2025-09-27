import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/b2blogin" replace />;
  }

  // If token exists, render the component
  return <Outlet/>;
};

export default ProtectedRoute;