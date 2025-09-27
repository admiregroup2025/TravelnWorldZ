import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FaMapMarkerAlt, FaEdit, FaTrash, FaEye, FaEyeSlash, FaGlobe, FaLock } from "react-icons/fa";

const ItineraryCard = ({ destination, onEdit, onDelete, onTogglePublic }) => {
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(false);

  if (!destination) {
    return (
      <div className="bg-gray-200 rounded-xl shadow-md overflow-hidden h-48 animate-pulse">
        {/* Loading skeleton */}
      </div>
    );
  }

  const handleCardClick = () => {
    if (destination.slug) {
      navigate(`/admin/destinations/${destination.slug}`, { state: { destination } });
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(destination);
    } else {
      // Navigate to edit form with pre-filled data
      navigate('/admin/Create-Itinary', { 
        state: { 
          destinationSlug: destination.slug, 
          itineraryId: destination.id,
          destination 
        } 
      });
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this itinerary?')) {
      if (onDelete) {
        onDelete(destination.id);
      }
    }
  };

  const handleTogglePublic = (e) => {
    e.stopPropagation();
    if (onTogglePublic) {
      onTogglePublic(destination.id, !destination.public);
    }
  };

  // defensive: image might be an object (file preview) or string url
  const firstImage = destination.images && destination.images.length ? destination.images[0] : null;
  const imageUrl = typeof firstImage === "string" ? firstImage : firstImage?.url || "/path-to-default-image.jpg";

  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer relative group"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => { if (e.key === "Enter") handleCardClick(); }}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="w-full h-48 relative overflow-hidden">
        <img
          src={imageUrl}
          alt={destination.name || "itinerary image"}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/path-to-default-image.jpg";
          }}
        />
        
        {/* Action buttons overlay */}
        {showActions && (
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <button
              onClick={handleEdit}
              className="p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors"
              title="Edit Itinerary"
            >
              <FaEdit className="text-blue-600" size={14} />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors"
              title="Delete Itinerary"
            >
              <FaTrash className="text-red-600" size={14} />
            </button>
            <button
              onClick={handleTogglePublic}
              className={`p-2 rounded-full shadow-md transition-colors ${
                destination.public 
                  ? 'bg-green-500/90 hover:bg-green-500' 
                  : 'bg-gray-500/90 hover:bg-gray-500'
              }`}
              title={destination.public ? "Make Private" : "Make Public"}
            >
              {destination.public ? (
                <FaEye className="text-white" size={14} />
              ) : (
                <FaLock className="text-white" size={14} />
              )}
            </button>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-orange-400" />
              <span className="font-medium">{destination.name || "Untitled"}</span>
            </div>
            <div className="flex items-center gap-2">
              {destination.public ? (
                <span className="text-xs bg-green-500 px-2 py-1 rounded flex items-center gap-1">
                  <FaGlobe size={10} />
                  Public
                </span>
              ) : (
                <span className="text-xs bg-gray-500 px-2 py-1 rounded flex items-center gap-1">
                  <FaLock size={10} />
                  Private
                </span>
              )}
            </div>
          </div>
        </div>

        {destination.type === "international" && (
          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
            International
          </div>
        )}
      </div>

      {/* Card footer with additional info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2">{destination.title || destination.name}</h3>
        {destination.price && (
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-orange-600">₹{Number(destination.price).toLocaleString()}</span>
            {destination.discount && (
              <span className="text-sm text-green-600">{destination.discount}% off</span>
            )}
          </div>
        )}
        {destination.destinations && Array.isArray(destination.destinations) && (
          <p className="text-sm text-gray-600 mt-2">
            {destination.destinations.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
};

ItineraryCard.propTypes = {
  destination: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    slug: PropTypes.string,
    images: PropTypes.array,
    type: PropTypes.oneOf(["domestic", "international"]),
  }),
};

ItineraryCard.defaultProps = {
  destination: null,
};

export default ItineraryCard;
