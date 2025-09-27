import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FaMapMarkerAlt } from "react-icons/fa";

const ItineraryCard = ({ destination }) => {
  const navigate = useNavigate();

  if (!destination) {
    return (
      <div className="bg-gray-200 rounded-xl shadow-md overflow-hidden h-48 animate-pulse"></div>
    );

  }
  const handleCardClick = () => {
    if (destination.slug)
      navigate(`/admin/destinations/${destination.slug}`, {
        state: { destination },
      });
  };

  const firstImage =
    destination.images && destination.images.length
      ? destination.images[0]
      : null;
  const imageUrl =
    typeof firstImage === "string"
      ? firstImage
      : firstImage?.url || "/path-to-default-image.jpg";

  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter") handleCardClick();
      }}
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
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center text-white">
            <FaMapMarkerAlt className="mr-2 text-orange-400" />
            <span className="font-medium">
              {destination.name || "Untitled"}
            </span>
          </div>
        </div>

        {destination.type === "international" && (
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
