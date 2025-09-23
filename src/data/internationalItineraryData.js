// src/data/internationalItineraryData.js

import dubaiImg from "../assets/images/tourPackages/dubai.jpeg";
import vietnamImg from "../assets/images/tourPackages/vietnam.jpeg";
import parisImg from "../assets/images/tourPackages/paris.jpeg";
import maldiveImg from "../assets/images/tourPackages/maldive.jpeg";
// You can use the same images for multiple itineraries or add more specific ones

const internationalItineraryData = {
  "dubai": [
    {
      id: 1,
      name: "Dubai Luxury Tour",
      title: "5 Days - Luxury Shopping & Desert Safari",
      image: dubaiImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },

    {
      id: 2,
      name: "Family Fun in Dubai",
      title: "4 Days - Theme Parks & Burj Khalifa",
      image: dubaiImg,
      details: [
      { title: "Arrival & Leisure", description: "Transfer to hotel and relax." },
      { title: "Theme Park Day", description: "Visit IMG Worlds of Adventure or Motiongate." },
      { title: "Burj Khalifa & Fountain Show", description: "Visit 124th floor and watch Dubai Fountain." },
      { title: "Departure", description: "Breakfast and transfer to airport." }
    ],
    inclusions: [
      "3 Nights Accommodation",
      "Entry Tickets to Parks",
      "Burj Khalifa Entry",
      "Daily Breakfast",
      "Airport Transfers"
    ],
    exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
  ],
  "vietnam": [
    {
      id: 3,
      name: "Vietnam Heritage Trail",
      title: "6 Days - Hanoi to Ho Chi Minh",
      image: vietnamImg,
      details: [
      { title: "Arrival & Leisure", description: "Transfer to hotel and relax." },
      { title: "Theme Park Day", description: "Visit IMG Worlds of Adventure or Motiongate." },
      { title: "Burj Khalifa & Fountain Show", description: "Visit 124th floor and watch Dubai Fountain." },
      { title: "Departure", description: "Breakfast and transfer to airport." }
    ],
    inclusions: [
      "3 Nights Accommodation",
      "Entry Tickets to Parks",
      "Burj Khalifa Entry",
      "Daily Breakfast",
      "Airport Transfers"
    ],
    exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 4,
      name: "Vietnam Beaches",
      title: "5 Days - Da Nang & Hoi An",
      image: vietnamImg,
      details: [
      { title: "Arrival & Leisure", description: "Transfer to hotel and relax." },
      { title: "Theme Park Day", description: "Visit IMG Worlds of Adventure or Motiongate." },
      { title: "Burj Khalifa & Fountain Show", description: "Visit 124th floor and watch Dubai Fountain." },
      { title: "Departure", description: "Breakfast and transfer to airport." }
    ],
    inclusions: [
      "3 Nights Accommodation",
      "Entry Tickets to Parks",
      "Burj Khalifa Entry",
      "Daily Breakfast",
      "Airport Transfers"
    ],
    exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
  ],
  "paris": [
    {
      id: 5,
      name: "Romantic Paris",
      title: "4 Days - Eiffel Tower & Seine River Cruise",
      image: parisImg,
    },
    {
      id: 6,
      name: "Paris Culture Tour",
      title: "5 Days - Museums & Local Cuisine",
      image: parisImg,
    },
  ],
  "maldives": [
    {
      id: 7,
      name: "Maldives Honeymoon",
      title: "5 Days - Overwater Villas & Private Beaches",
      image: maldiveImg,
    },
    {
      id: 8,
      name: "Adventure in Maldives",
      title: "4 Days - Diving, Snorkeling & Jet Skiing",
      image: maldiveImg,
    },
  ],
  // You can add more destinations in the same format:
  "thailand": [],
  "singapore": [],
  "bali": [],
  "london": [],
  "rome": [],
  "switzerland": [],
  "turkey": [],
  "greece": [],
  "new-york": [],
  "tokyo": [],
  "sydney": [],
  "egypt": [],
};

export default internationalItineraryData;
