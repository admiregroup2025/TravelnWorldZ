// src/Packages.jsx
 
import React, { useState } from "react";
import DestinationCard from "../components/DestinationCard";
import domesticDestinations from "../data/domesticDestinationData";
import internationalDestinations from "../data/internationalDestinationsData";
 
const Packages = () => {
  const [activeTab, setActiveTab] = useState("domestic");
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
 
  // Get destinations based on selected tab
  let destinations = [];
 
  if (activeTab === "domestic") {
    destinations = domesticDestinations;
  } else if (activeTab === "international") {
    destinations = internationalDestinations;
  } else {
    destinations = [...domesticDestinations, ...internationalDestinations];
  }
 
  // Filter destinations by search query
  const filteredDestinations = destinations.filter((destination) =>
    destination.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
 
  const visibleDestinations = showAll
    ? filteredDestinations
    : filteredDestinations.slice(0, 8);
 
  return (
    <div className="p-6">
      {/* Tabs & Search Bar */}
      <div className="relative mb-6">
        {/* Centered Buttons */}
        <div className="flex justify-center gap-4">
          {["domestic", "international", "all"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setShowAll(false);
                setSearchQuery("");
              }}
              className={`px-6 py-2 rounded-full transition duration-300 capitalize ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
 
        {/* Search bar on right side */}
        <div className="absolute border-2 border-blue-500 rounded-full right-0 top-1/2 transform -translate-y-1/2 w-full md:w-80 px-4 md:px-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pr-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 text-lg"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>
 
      {/* Cards Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {visibleDestinations.length > 0 ? (
          visibleDestinations.map((destination, index) => (
            <DestinationCard
              key={index}
              title={destination.title}
              description={destination.description}
              image={destination.image}
              onClick={() => console.log(`Clicked on ${destination.title}`)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No destinations found.
          </p>
        )}
      </div>
 
      {/* View All / Show Less */}
      {filteredDestinations.length > 8 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>
      )}
    </div>
  );
};
 
export default Packages;
 
 