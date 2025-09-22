// src/layouts/MainLayout.jsx
import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <NavBar />
     
        <Outlet /> {/* This will render child routes */}
    
      <Footer />
    </div>
  );
}
