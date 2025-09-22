import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaMapMarkerAlt } from 'react-icons/fa';

const ItineraryCard = ({ destination }) => {
  const navigate = useNavigate();

  // Handle case where destination is not provided
  if (!destination) {
    return (
      <div className="bg-gray-200 rounded-xl shadow-md overflow-hidden h-48 animate-pulse">
        {/* Loading skeleton */}
      </div>
    );
  }

  const handleCardClick = () => {
    navigate(`/destinations/${destination.slug}`);
  };

  // Get the first image or use a fallback
  const imageUrl = destination.images?.[0] || '/path-to-default-image.jpg';

  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="w-full h-48 relative overflow-hidden">
        <img
          src={imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/path-to-default-image.jpg';
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center text-white">
            <FaMapMarkerAlt className="mr-2 text-orange-400" />
            <span className="font-medium">{destination.name}</span>
          </div>
        </div>
        {destination.type === 'international' && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
            International
          </div>
        )}
      </div>
    </div>
  );
};

ItineraryCard.propTypes = {
  destination: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    type: PropTypes.oneOf(['domestic', 'international']).isRequired
  })
};

ItineraryCard.defaultProps = {
  destination: null
};

export default ItineraryCard;