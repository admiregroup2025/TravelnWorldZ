// src/data/hotels.js
import img1 from '../assets/images/verifiedHotels/hotel1.jpg';
import img2 from '../assets/images/verifiedHotels/hotel2.jpg';
import img3 from '../assets/images/verifiedHotels/hotel3.jpg';

const hotels = [
  {
    id: 'h1',
    name: 'The Grand Resort',
    title: 'Luxury Stay in Goa',
    image: img1,
    phone: '0832-1234567',
    address: 'Beach Road, Goa 403001',
    gstin: '29ABCDE1234F2Z5',
    city: 'Goa',
    timings: 'Open 24 Hrs',
    tags: ['Luxury Hotels', 'Beach View', 'Spa Resort'],
    averageRating: 4.8,
    totalRatings: 312,
    highlights: ['Sea view', 'Clean rooms', 'Spa service', 'Friendly staff'],
    lastReview: {
      name: 'Ananya Mehta',
      date: '15 Sep 2025',
      rating: 5,
      tags: ['Sea view', 'Quick check-in', 'Excellent food'],
      text: 'Absolutely loved the sea view and quick check-in. Great stay overall!',
    }
  },
  {
    id: 'h2',
    name: 'Ocean View Inn',
    title: 'Comfort with sea breeze',
    image: img2,
    phone: '0832-7654321',
    address: 'Marine Drive, Goa 403002',
    gstin: '29XYZDE1234F2Z5',
    city: 'Goa',
    timings: 'Check-in: 12PM, Check-out: 11AM',
    tags: ['Budget Hotels', 'Sea View', 'Family Friendly'],
    averageRating: 4.8,
    totalRatings: 312,
    highlights: ['Sea view', 'Clean rooms', 'Spa service', 'Friendly staff'],
    lastReview: {
      name: 'Ananya Mehta',
      date: '15 Sep 2025',
      rating: 5,
      tags: ['Sea view', 'Quick check-in', 'Excellent food'],
      text: 'Absolutely loved the sea view and quick check-in. Great stay overall!',
    }
  },
  {
    id: 'h3',
    name: 'Mountain Escape',
    title: 'Peaceful Hillside Retreat',
    image: img3,
    phone: '01892-123123',
    address: 'Hillside Road, Manali 175131',
    gstin: '02ABCDE1234F2Z5',
    city: 'Manali',
    timings: 'Open 24 Hrs',
    tags: ['Mountain View', 'Resorts', 'Nature Stay'],
    averageRating: 4.8,
    totalRatings: 312,
    highlights: ['Sea view', 'Clean rooms', 'Spa service', 'Friendly staff'],
    lastReview: {
      name: 'Ananya Mehta',
      date: '15 Sep 2025',
      rating: 5,
      tags: ['Sea view', 'Quick check-in', 'Excellent food'],
      text: 'Absolutely loved the sea view and quick check-in. Great stay overall!',
    }
  },
  {
    id: 'h4',
    name: 'City Central Hotel',
    title: 'Stay in the heart of the city',
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&auto=format&fit=crop",
    phone: '011-22334455',
    address: 'Connaught Place, Delhi 110001',
    gstin: '07ABCDE1234F2Z5',
    city: 'Delhi',
    timings: 'Open 24 Hrs',
    tags: ['Business Hotel', 'City Center', 'Fast WiFi'],
    averageRating: 4.8,
    totalRatings: 312,
    highlights: ['Sea view', 'Clean rooms', 'Spa service', 'Friendly staff'],
    lastReview: {
      name: 'Ananya Mehta',
      date: '15 Sep 2025',
      rating: 5,
      tags: ['Sea view', 'Quick check-in', 'Excellent food'],
      text: 'Absolutely loved the sea view and quick check-in. Great stay overall!',
    }
  },
  {
  id: 'h5',
  name: 'Lakeside Paradise',
  title: 'Tranquility by the Water',
  image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&auto=format&fit=crop',
},
{
  id: 'h6',
  name: 'Desert Dunes Resort',
  title: 'Luxury Amidst the Sands',
  image: 'https://images.unsplash.com/photo-1600488995319-37fc5c9b194a?w=400&auto=format&fit=crop',
},
{
  id: 'h7',
  name: 'Forest Hideaway',
  title: 'Reconnect with Nature',
  image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&auto=format&fit=crop',
},
{
  id: 'h8',
  name: 'Island Breeze Hotel',
  title: 'Tropical Bliss Awaits',
  image: 'https://images.unsplash.com/photo-1576671081837-c10f5f1b5b96?w=400&auto=format&fit=crop',
}
];

export default hotels;
