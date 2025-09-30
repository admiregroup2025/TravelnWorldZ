import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DestinationCard from "../components/DestinationCard";
import domesticDestinations from "../data/domesticDestinationData";
import internationalDestinations from "../data/internationalDestinationsData";

const Packages = () => {
  const [activeTab, setActiveTab] = useState("domestic");
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // 🔹 Prepare destinations based on active tab
  const destinations =
    activeTab === "domestic"
      ? domesticDestinations.map((d) => ({ ...d, type: "domestic" }))
      : activeTab === "international"
      ? internationalDestinations.map((d) => ({ ...d, type: "international" }))
      : [
          ...domesticDestinations.map((d) => ({ ...d, type: "domestic" })),
          ...internationalDestinations.map((d) => ({ ...d, type: "international" })),
        ];

  // 🔹 Filtered by search
  const filteredDestinations = destinations.filter((destination) =>
    destination.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 🔹 Slice for "View All / Show Less"
  const visibleDestinations = showAll
    ? filteredDestinations
    : filteredDestinations.slice(0, 8);

  const handleCardClick = (title, type) => {
    const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
    navigate(`/${type}-itinerary/${slug}`);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-6">
      {/* Tabs + Search (Responsive) */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Tabs */}
        <div className="flex justify-center md:justify-start gap-3 flex-wrap">
          {["domestic", "international", "all"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setShowAll(false);
                setSearchQuery("");
              }}
              className={`px-5 py-2 rounded-full capitalize text-sm sm:text-base transition duration-300 ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-80">
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-lg"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Destination Cards Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {visibleDestinations.length > 0 ? (
          visibleDestinations.map((destination, index) => (
            <DestinationCard
              key={index}
              title={destination.title}
              description={destination.description}
              image={destination.image}
              onClick={() => handleCardClick(destination.title, destination.type)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No destinations found.
          </p>
        )}
      </div>

      {/* View All Button */}
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
