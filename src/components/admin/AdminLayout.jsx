import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader.jsx";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import destinations from "../admin/MyItineraries/data.json"
import { useState } from "react";

export default function AdminLayout() {
  const[filters,setFilters]=useState([])
  const handelChange = (filterType)=>{
      setFilters((prev) =>
      prev.includes(filterType)
        ? prev.filter((f) => f !== filterType) // remove if already selected
        : [...prev, filterType] // add if not selected
    );
  }
   const filteredDestinations =
    filters.length === 0
      ? destinations
      : destinations.filter((d) => filters.includes(d.type));

  console.log(filteredDestinations, "Filtered Destinations");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <AdminHeader />

      <div className="flex flex-1">
        {/* Left Sidebar (fixed) */}
        <aside className="w-64 fixed h-[91vh] left-0  bottom-0 bg-indigo-900 text-white overflow-auto">
          <LeftSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 py-24 mr-72 p-4 bg-gray-50 min-h-screen overflow-auto">
          <Outlet context={{ destinations: filteredDestinations }}/>
        </main>

        {/* Right Sidebar (fixed) */}
        <aside className="w-72 fixed h-[91vh] right-0  bottom-0 bg-gray-100 border-l overflow-auto">
          <RightSidebar filters={filters} filterChange={handelChange}  />
        </aside>
      </div>
    </div>
  );
}
