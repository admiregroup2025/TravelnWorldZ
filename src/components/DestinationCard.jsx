// src/components/DestinationCard.jsx
import React from "react";

const DestinationCard = ({ title, description, image, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative w-full rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl"
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Gradient Overlay + Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4 sm:p-5">
        <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold drop-shadow-lg">
          {title}
        </h3>
        <p className="text-gray-200 text-xs sm:text-sm mt-1 line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export default DestinationCard;
