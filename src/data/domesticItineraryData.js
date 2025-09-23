import goa1 from "../assets/images/tourPackages/goa.jpg"

const domesticItineraryData = {
  "goa": [
    {
      id: 1,
      name: "Sunset Goa Tours",
      title: "3 Nights, 4 Days - Beach Party Package",
      image: goa1,
      details: [
        { title: "Arrival & Check-in", description: "Transfer to hotel and relax by the beach." },
        { title: "Beach Party", description: "Enjoy the vibrant beach parties at Baga and Anjuna." },
        { title: "Local Sightseeing", description: "Visit Fort Aguada, Basilica of Bom Jesus and other heritage sites." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "3 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "Beach Party Entry",
        "Local Sightseeing",
        "All Applicable Taxes"
      ],
      exclusions: [
        "Personal expenses",
        "Lunch and Dinner",
        "Water sports charges"
      ],
      terms: "Booking confirmation subject to availability. Prices may change without prior notice.",
      cancellation: "Free cancellation up to 7 days before the trip. 50% charge within 7 days.",
      paymentPolicy: "50% advance payment at booking, balance 7 days before trip start."
    },
    {
      id: 2,
      name: "Goa Adventure",
      title: "5 Nights - Adventure & Water Sports",
      image: goa1,
      details: [
        { title: "Arrival & Hotel Check-in", description: "Welcome and rest at the hotel." },
        { title: "Water Sports", description: "Enjoy activities like jet skiing, parasailing, and scuba diving." },
        { title: "Adventure Tour", description: "Trekking, zip-lining and nature trails in the Western Ghats." },
        { title: "Local Exploration", description: "Visit local markets and cultural landmarks." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "5 Nights Hotel Stay",
        "Daily Breakfast",
        "All Water Sports Entry Fees",
        "Adventure Tour Guide",
        "Airport Transfers",
        "All Applicable Taxes"
      ],
      exclusions: [
        "Lunch & Dinner",
        "Personal expenses",
        "Travel insurance"
      ],
      terms: "All adventure activities are subject to weather conditions and availability.",
      cancellation: "Cancellations allowed up to 10 days before trip with full refund, else 25% deduction.",
      paymentPolicy: "Full payment required 10 days before trip start."
    },
    {
      id: 3,
      name: "Romantic Goa Getaway",
      title: "4 Days - Couple Special Package",
      image: goa1,
    },
    {
      id: 4,
      name: "Goa Heritage Trails",
      title: "3 Days - Churches, Forts & Culture",
      image: goa1,
    },
  ],
  "kashmir": [
    {
      id: 5,
      name: "Kashmir Valley Tours",
      title: "5 Days - Srinagar to Gulmarg",
      image: goa1,
    },
    {
      id: 6,
      name: "Heavenly Kashmir",
      title: "6 Nights - Nature & Lakes",
      image: goa1,
    },
    {
      id: 7,
      name: "Romantic Kashmir Escape",
      title: "5 Days - Couple Package",
      image: goa1,
    },
  ],
  "mumbai": [
    {
      id: 8,
      name: "Mumbai City Break",
      title: "2 Days - City Tour & Nightlife",
      image: goa1,
    },
    {
      id: 9,
      name: "Mumbai Bollywood Tour",
      title: "3 Days - Film City & Attractions",
      image: goa1,
    },
  ],
  "darjeeling": [
    {
      id: 10,
      name: "Darjeeling Discovery",
      title: "4 Days - Toy Train & Tea Gardens",
      image: goa1,
    },
    {
      id: 11,
      name: "Himalayan Views Tour",
      title: "5 Days - Darjeeling & Kalimpong",
      image: goa1,
    },
  ],
  "jaipur": [
    {
      id: 12,
      name: "Jaipur Fort Tour",
      title: "3 Days - Amer, Nahargarh & Hawa Mahal",
      image: goa1,
    },
    {
      id: 13,
      name: "Royal Rajasthan",
      title: "4 Days - Jaipur, Pushkar & Ajmer",
      image: goa1,
    },
  ],
  // Add more destinations below in the same format
};

export default domesticItineraryData;
