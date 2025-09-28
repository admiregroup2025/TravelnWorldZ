import React from 'react';

const ItineraryCard = ({ id, name, title, image, children }) => {
  return (
    <div className="border rounded shadow hover:shadow-lg transition p-3 flex flex-col items-center">
      <img
        src={image}
        alt={name}
        className="w-full h-36 object-cover rounded mb-3" // changed h-48 to h-32
      />
      <h3 className="text-base font-semibold">{name}</h3> {/* smaller text */}
      <p className="text-sm text-gray-600 mb-3 text-center">{title}</p> {/* smaller margin */}
      {children}
    </div>
  );
};

export default ItineraryCard;
