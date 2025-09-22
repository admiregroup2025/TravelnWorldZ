
import React from "react";
import LeftSidebar from "./LeftSidebar";
import { Outlet } from "react-router-dom";
import RightSidebar from "./RightSidebar";
import AdminLeads from "./AdminLeads";
import LeadsData from './LeadsData.js'

export default function AdminPannel() {
  return <div className="flex">
      {/* Left Sidebar (fixed) */}
      <div className="w-64 fixed left-0 top-[14%] h-screen bg-indigo-900 text-white">
        <LeftSidebar />
      </div>
    

      {/* Main Content (dynamic via routing) */}
     <main className="flex-1 ml-64 mr-72 p-6 min-h-screen bg-gray-50">
  {LeadsData.map((card, ind) => (
    <div key={ind} className="my-20">
      <AdminLeads data={card} />
    </div>
  ))}
</main>


      {/* Right Sidebar (fixed) */}
      <div className="w-72 fixed right-0 top-[15%]  h-screen bg-gray-100 border-l">
        <RightSidebar />
      </div>
    </div>
;
}
