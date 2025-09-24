// src/components/ItineraryParticularCard.jsx
import React from "react";
import { useLocation } from "react-router-dom";

const ItineraryParticularCard = () => {
  const location = useLocation();
  const itinerary = location.state?.itinerary;
  const destination = location.state?.destination;

  console.log(destination,"imglink")

  

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 max-w-sm">
      <h1>{destination.name}</h1>
      <img
        src={destination.image}
        alt={destination.title}
        className="w-full h-48 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold mt-4">{destination.title}</h3>
      <p className="text-gray-600 text-sm mt-1">{destination.subtitle}</p>
      <p className="text-gray-500 text-sm">{destination.days} Days</p>
    </div>
  );
};

export default ItineraryParticularCard;
