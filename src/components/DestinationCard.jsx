// src/components/DestinationCard.jsx

import React from "react";
import PropTypes from "prop-types";

const DestinationCard = ({ title, description, image, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative w-full sm:w-[300px] rounded-2xl overflow-hidden shadow-lg cursor-pointer"
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-[350px] object-cover transform transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Overlay with title and description */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4">
        <h3 className="text-white text-lg font-semibold">{title}</h3>
        <p className="text-gray-200 text-sm">{description}</p>
      </div>
    </div>
  );
};

DestinationCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default DestinationCard;
