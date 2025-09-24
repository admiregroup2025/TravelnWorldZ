import ayodhya from '../assets/images/verified/ayodhya.png';
import ram from '../assets/images/verified/ram.jpg';
import shivam from '../assets/images/verified/Shivam_travels.jpeg';
import arora from '../assets/images/verified/arora.jpeg'
 
const transportData = [
  {
    id: 1,
    image: ayodhya,
    title: "Ayodhya Darshan Yatra",
    location: "Jharkhandi, Rikabganj, Ayodhya",
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
    ],
  },
  {
    id: 2,
    image: shivam,
    title: "Shivam travels",
    location: "Near, Paonta Sahib, Himachal Pradesh 173025, India",
    rating: 4.7,
    reviews: 98,
    verified: true,
    website: "https://example.com/skyline",
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
    ], // ✅ Add this
  },
  {
    id: 3,
    image: ram,
    title: "RAM RATH TOUR AND TRAVELS",
    location: "Beniganj Ayodhya U.P INDIA",
    rating: 4.9,
    reviews: 150,
    verified: true,
    website: "https://ayodhya.infinityfreeapp.com/?i=1",
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
    ], // ✅ Add this
  },
  {
    id: 4,
    image: arora,
    title: "Arora Tour and Travel",
    location: "Lucknow, India",
    rating: 4.6,
    reviews: 75,
    verified: true,
    website: "https://example.com/extra",
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
    ],// ✅ Add this
  },
  {
    id: 5,
    image: "https://via.placeholder.com/300x150",
    title: "Shiv Tour & Travel",
    location: "Kanpur, India",
    rating: 4.5,
    reviews: 80,
    verified: true,
    website: "https://example.com/shiv",
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
    ], // ✅ Add this
  },
];
 
export default transportData;
 
 