import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DestinationCard from "../components/DestinationCard";
import internationalDestinations from "../data/internationalDestinationsData";

const InternationalDestinationsList = () => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  
  const visibleDestinations = showAll
    ? internationalDestinations
    : internationalDestinations.slice(0, 8);
  
  const handleCardClick = (title) => {
    const slug = title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/international-itinerary/${slug}`);
  };


  return (
    <div className="px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-10 text-black">
        International Tour
      </h2>

      <div className="flex flex-wrap gap-6 justify-center">
        {visibleDestinations.map((place, index) => (
          <DestinationCard
            key={index}
            title={place.title}
            description={place.description}
            image={place.image}
            onClick={() => handleCardClick(place.title)}
          />
        ))}
      </div>

      {/* View All Button */}
      {!showAll && (
        <div className="text-center mt-8">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => setShowAll(true)}
          >
            View All
          </button>
        </div>
      )}
    </div>
  );
};

export default InternationalDestinationsList;
