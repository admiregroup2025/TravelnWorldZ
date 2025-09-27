import ayodhya from '../assets/images/verified/ayodhya.jpg';
import ram from '../assets/images/verified/ram.JPG';
import shivam from '../assets/images/verified/Shivam_travels.jpeg';
import arora from '../assets/images/verified/arora.jpeg'
function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
const transportData = [
  {
    id: 1,
    image: ayodhya,
    title: "Ayodhya Darshan Yatra",
    slug: generateSlug("Ayodhya Darshan Yatra"),
    location: "Jharkhandi, Rikabganj, Ayodhya",
    fullAddress:"54H/54 Jharkhandi, Rikabganj, Ayodhya,India", 
    rating: 4.8,
    reviews: 120,
    verified: true,
    website: "https://ayodhyadarshanyatra.com/",
    distance: "500 mts",
    phone: "08147943975",
    whatsapp: "918147943975",
    tags: ["Hotels", "Hotels Rs 501 To Rs 1000"],
    tourPackages: [
      {
        destination: "Ayodhya",
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
      {
        destination: "Nearby Pilgrimage",
        description: "Half day trip to nearby temples",
        price: "₹1499",
      },
      {
        destination: "Ayodhya",
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
    ],
  },
  {
    id: 2,
    image: shivam,
    title: "Shivam travels",
    slug: generateSlug("Shivam travels"),
    location: "Paonta Sahib",
    fullAddress:"Near, Paonta Sahib, Himachal Pradesh 173025, India",
    rating: 4.7,
    reviews: 98,
    verified: true,
    website: "https://example.com/skyline",
    phone: "08147943975",
    whatsapp: "918147943975",
    tags: ["Hotels", "Hotels Rs 501 To Rs 1000"],
     tourPackages: [
      {
        destination: "Ayodhya",
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
      {
        destination: "Nearby Pilgrimage",
        description: "Half day trip to nearby temples",
        price: "₹1499",
      },
      {
        destination: "Ayodhya",
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
       {
        destination: "Ayodhya",
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
      {
        destination: "Nearby Pilgrimage",
        description: "Half day trip to nearby temples",
        price: "₹1499",
      },
      {
        destination: "Rajashthan",
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
    ], // ✅ Add this
  },
  {
    id: 3,
    image: ram,
    title: "RAM RATH TOUR AND TRAVELS",
    slug: generateSlug("RAM RATH TOUR AND TRAVELS"),
    location: "Beniganj Ayodhya",
    fullAddress:"12A/32G Beniganj Ayodhya,Up,India",
    rating: 4.9,
    reviews: 150,
    verified: true,
    phone: "08147943975",
    whatsapp: "918147943975",
    tags: ["Hotels", "Hotels Rs 501 To Rs 1000"],
     tourPackages: [
      {
        destination: "Ayodhya",
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
      {
        destination: "Nearby Pilgrimage",
        description: "Half day trip to nearby temples",
        price: "₹1499",
      },
      {
        destination: "Ayodhya",
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
       {
        destination: "Ayodhya",
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
      {
        destination: "Nearby Pilgrimage",
        description: "Half day trip to nearby temples",
        price: "₹1499",
      },
      {
        destination: "Rajashthan",
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
    ], // ✅ Add this
  },
  {
    id: 4,
    image: arora,
    title: "Arora Tour and Travel",
    slug: generateSlug("Arora Tour and Travel"),
    location: "Lucknow, India",
    fullAddress:"23R/65J ,Lucknow,India", 
    rating: 4.6,
    reviews: 75,
    verified: true,
    website: "https://example.com/extra",
    phone: "08147943975",
    whatsapp: "918147943975",
    tags: ["Hotels", "Hotels Rs 501 To Rs 1000"],
     tourPackages: [
      {
        destination: "Ayodhya",
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
      {
        destination: "Nearby Pilgrimage",
        description: "Half day trip to nearby temples",
        price: "₹1499",
      },
      {
        destination: "Ayodhya",
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
       {
        destination: "Ayodhya",
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
      {
        destination: "Nearby Pilgrimage",
        description: "Half day trip to nearby temples",
        price: "₹1499",
      },
      {
        destination: "Rajashthan",
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
    ],// ✅ Add this
  },
  {
    id: 5,
    image: "https://via.placeholder.com/300x150",
    title: "Shiv Tour & Travel",
    slug: generateSlug("Shiv Tour & Travel"),
    location: "Kanpur, India",
    rating: 4.5,
    reviews: 80,
    verified: true,
    website: "https://example.com/shiv",
    phone: "08147943975",
    whatsapp: "918147943975",
    tags: ["Hotels", "Hotels Rs 501 To Rs 1000"],
    tourPackages: [
      {
        destination: "Ayodhya",
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
      {
        destination: "Nearby Pilgrimage",
        description: "Half day trip to nearby temples",
        price: "₹1499",
      },
      {
        destination: "Rajashthan",
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
      {
        destination: "Ayodhya",
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
      {
        destination: "Ayodhya",
        description: "Darshan & Sightseeing tour",
        price: "₹2999",
      },
    ], // ✅ Add this
  },
];



export default transportData;
