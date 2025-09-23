import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader.jsx";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
// imported JSON data (initial seed)
import initialDestinations from "../admin/MyItineraries/data.json";
import { useState, useMemo } from "react";

export default function AdminLayout() {
  // local state holds the live list of itineraries
  const [itineraries, setItineraries] = useState(initialDestinations);

  // filters state (you already had this)
  const [filters, setFilters] = useState([]);

  const handelChange = (filterType) => {
    setFilters((prev) =>
      prev.includes(filterType)
        ? prev.filter((f) => f !== filterType) // remove if already selected
        : [...prev, filterType] // add if not selected
    );
  };

  // compute filtered list (memoized)
  const filteredItineraries = useMemo(() => {
    if (filters.length === 0) return itineraries;
    return itineraries.filter((d) => filters.includes(d.type));
  }, [itineraries, filters]);

  // add a new itinerary (call this from ItineraryForm via Outlet context)
  const addItinerary = (newItinerary) => {
    // ensure id exists and slug exists (you can enhance this)
    const item = {
      ...newItinerary,
      id: newItinerary.id ?? Date.now().toString(),
      slug:
        newItinerary.slug ??
        (newItinerary.name ? newItinerary.name.toLowerCase().replace(/\s+/g, "-") : Date.now().toString()),
    };

    setItineraries((prev) => [item, ...prev]);

    // TODO: persist to backend (POST) and replace with server response id/url if needed
  };

  // update existing itinerary by id (call this from ItineraryDetail on save)
  const updateItinerary = (updatedItinerary) => {
    setItineraries((prev) =>
      prev.map((it) => (it.id === updatedItinerary.id ? { ...it, ...updatedItinerary } : it))
    );

    // TODO: persist to backend (PUT/PATCH) and handle errors
  };

  // optional: remove itinerary
  const removeItinerary = (id) => {
    setItineraries((prev) => prev.filter((it) => it.id !== id));
    // TODO: call DELETE on backend
  };

  // debug logging (optional)
  // console.log(filteredItineraries, "Filtered Itineraries");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <AdminHeader />

      <div className="flex flex-1">
        {/* Left Sidebar (fixed) */}
        <aside className="w-64 fixed h-[91vh] left-0 bottom-0 bg-indigo-900 text-white overflow-auto">
          <LeftSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 py-24 mr-72 p-4 bg-gray-50 min-h-screen overflow-auto">
          {/* provide filtered items and helper functions to nested routes */}
          <Outlet
            context={{
              destinations: filteredItineraries,
              rawDestinations: itineraries, // if a child needs full unfiltered list
              addItinerary,
              updateItinerary,
              removeItinerary,
            }}
          />
        </main>

        {/* Right Sidebar (fixed) */}
        <aside className="w-72 fixed h-[91vh] right-0 bottom-0 bg-gray-100 border-l overflow-auto">
          <RightSidebar filters={filters} filterChange={handelChange} />
        </aside>
      </div>
    </div>
  );
}
