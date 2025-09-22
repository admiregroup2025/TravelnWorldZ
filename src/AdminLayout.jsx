// src/layouts/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./components/admin/adminHeader";

export default function AdminLayout() {
  return (
    <div className="">
      {/* No NavBar, no Footer */}
        <AdminHeader />
      <Outlet />
    </div>
  );
}
