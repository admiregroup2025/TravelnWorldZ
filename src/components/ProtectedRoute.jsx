import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("TOKEN_KEY");

  if (!token) {
    return <Navigate to="/b2blogin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;