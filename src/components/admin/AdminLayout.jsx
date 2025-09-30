import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader.jsx";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import initialDestinations from "../admin/MyItineraries/data.json";
import { useState, useMemo } from "react";

export default function AdminLayout() {
  const [itineraries, setItineraries] = useState(initialDestinations);
  const [filters, setFilters] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false); // for mobile sidebar toggle
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

  const handelChange = (filterType) => {
    setFilters((prev) =>
      prev.includes(filterType)
        ? prev.filter((f) => f !== filterType)
        : [...prev, filterType]
    );
  };

  const filteredItineraries = useMemo(() => {
    if (filters.length === 0) return itineraries;
    return itineraries.filter((d) => filters.includes(d.type));
  }, [itineraries, filters]);

  const addItinerary = (newItinerary) => {
    const item = {
      ...newItinerary,
      id: newItinerary.id ?? Date.now().toString(),
      slug:
        newItinerary.slug ??
        (newItinerary.name
          ? newItinerary.name.toLowerCase().replace(/\s+/g, "-")
          : Date.now().toString()),
    };
    setItineraries((prev) => [item, ...prev]);
  };

  const updateItinerary = (updatedItinerary) => {
    setItineraries((prev) =>
      prev.map((it) => (it.id === updatedItinerary.id ? { ...it, ...updatedItinerary } : it))
    );
  };

  const removeItinerary = (id) => {
    setItineraries((prev) => prev.filter((it) => it.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <AdminHeader
        toggleSidebar={() => setSidebarOpen((prev) => !prev)}
        toggleRightSidebar={() => setRightSidebarOpen((prev) => !prev)}
      />

      <div className="flex flex-1 relative">
        {/* Left Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full bg-indigo-900 text-white z-30 transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            md:translate-x-0 w-64`}
        >
          <div className="h-full overflow-auto pt-24">
            <LeftSidebar />
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main
          className="flex-1 ml-0 md:ml-64 p-4 pt-24 transition-all duration-300 min-h-screen overflow-auto"
        >
          <Outlet
            context={{
              destinations: filteredItineraries,
              rawDestinations: itineraries,
              addItinerary,
              updateItinerary,
              removeItinerary,
            }}
          />
        </main>
        {rightSidebarOpen && window.innerWidth < 1024 && (
          <div
            className="fixed inset-0 bg-black/30 z-20"
            onClick={() => setRightSidebarOpen(false)}
          ></div>
        )}
      </div>
    </div>
  );
}
