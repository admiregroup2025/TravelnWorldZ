import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

export default function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <AdminHeader />

      <div className="flex flex-1">
        {/* Left Sidebar (fixed) */}
        <aside className="w-64 fixed top-16 left-0 bottom-0 bg-indigo-900 text-white overflow-auto">
          <LeftSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 mr-72 mt-[16vh] p-4 bg-gray-50 min-h-screen overflow-auto">
          <Outlet />
        </main>

        {/* Right Sidebar (fixed) */}
        <aside className="w-72 fixed top-16 right-0 bottom-0 bg-gray-100 border-l overflow-auto">
          <RightSidebar />
        </aside>
      </div>
    </div>
  );
}
