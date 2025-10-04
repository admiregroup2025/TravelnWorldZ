import PropTypes from 'prop-types';

const tourPackagePropType = PropTypes.shape({
  destination: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired, // like "₹2999"
});

const travelItemPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  image: PropTypes.any.isRequired,  // imported image
  name: PropTypes.string,           // optional, not all items have name
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  fullAddress: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  reviews: PropTypes.number.isRequired,
  verified: PropTypes.bool.isRequired,
  website: PropTypes.string,
  phone: PropTypes.string.isRequired,
  whatsapp: PropTypes.string.isRequired,
  email: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  tourPackages: PropTypes.arrayOf(tourPackagePropType).isRequired,
  distance: PropTypes.string, 
});

export default travelItemPropType;
