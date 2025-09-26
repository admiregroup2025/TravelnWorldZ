import React from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import DestinationCard from "../DestinationCard";

import vietnamImg from "../../assets/images/tourPackages/international/vietnam.jpeg";
import dubaiImg from "../../assets/images/tourPackages/international/dubai.jpeg";
import parisImg from "../../assets/images/tourPackages/international/paris.jpeg";
import maldiveImg from "../../assets/images/tourPackages/international/maldive.jpeg";
import goaImg from "../../assets/images/tourPackages/domestic/goa.png";
import darjeelingImg from "../../assets/images/tourPackages/domestic/darjeeling.jpg";
import kashmirImg from "../../assets/images/tourPackages/domestic/kashmir.jpg";
import MumbaiImg from "../../assets/images/tourPackages/domestic/mumbai.JPG";

const TourPackages = () => {
  const navigate = useNavigate();

  const handleCardClick = (title, type) => {
    const destinationId = title.toLowerCase().replace(/\s+/g, "-");
    if (type === "international") {
      navigate(`/international-itinerary/${destinationId}`);
    } else if (type === "domestic") {
      navigate(`/domestic-itinerary/${destinationId}`);
=======

// Import images
import vietnamImg from "../../assets/images/tourPackages/vietnam.jpg";
import dubaiImg from "../../assets/images/tourPackages/dubai.png"
import parisImg from "../../assets/images/tourPackages/paris.png";
import maldiveImg from "../../assets/images/tourPackages/maldive.png"

import goaImg from "../../assets/images/tourPackages/goa.jpg";
import darjeelingImg from "../../assets/images/tourPackages/darjeeling.jpg";
import kashmirImg from "../../assets/images/tourPackages/kashmir.jpg";
import MumbaiImg from "../../assets/images/tourPackages/mumbai.JPG";


// Card Component
const DestinationCard = ({ title, description, image }) => {
  return (
    <div className="group relative w-full sm:w-[300px] rounded-2xl overflow-hidden shadow-lg">
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-[350px] object-cover transform transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4">
        <h3 className="text-white text-lg font-semibold">{title}</h3>
        <p className="text-gray-200 text-sm">{description}</p>
      </div>
    </div>
  );
};

// Main Component
const TourPackages = () => {
  const navigate = useNavigate();

  const handleExploreClick = (section) => {
    if (section === "International") {
      navigate("/international-destination");
    } else if (section === "Domestic") {
      navigate("/domestic-destination");
>>>>>>> origin/neha
    }
  };

  return (
    <div className="px-0 py-0 space-y-20 pb-6">
<<<<<<< HEAD
      {/* Header */}
      <div className="text-center mb-9">
        <h2 className="text-2xl sm:text-3xl mt-10 font-bold text-black capitalize">
=======
      

      {/* Header */}
      <div className="text-center mb-9">
        <h2 className="text-2xl sm:text-3xl mt-10 font-bold text-blue-900">
>>>>>>> origin/neha
          Top most tour package
        </h2>
      </div>

      {/* International Section */}
      <div className="flex flex-wrap gap-6 justify-center relative py-4">
        <div className="absolute -top-8 left-4 sm:left-[7%]">
          <span className="text-red-600 font-semibold text-2xl ">International</span>
        </div>
        <div className="absolute -top-10 right-4 sm:right-[7%]">
          <button
<<<<<<< HEAD
            className="bg-blue-600 text-white px-4 py-1 rounded-lg text-sm"
            onClick={() => navigate('/international')}
=======
            className="bg-blue-900 text-white px-4 py-1 rounded-lg text-sm"
            onClick={() => navigate('/international-list')}
>>>>>>> origin/neha
          >
            Explore All
          </button>
        </div>

        <DestinationCard
          title="Dubai"
          image={dubaiImg}
          description="Explore the modern luxury and desert adventures."
<<<<<<< HEAD
          onClick={() => handleCardClick("Dubai", "international")}
=======
>>>>>>> origin/neha
        />
        <DestinationCard
          title="Vietnam"
          image={vietnamImg}
          description="Experience rich culture and breathtaking landscapes."
<<<<<<< HEAD
          onClick={() => handleCardClick("Vietnam", "international")}
=======
>>>>>>> origin/neha
        />
        <DestinationCard
          title="Paris"
          image={parisImg}
          description="The city of lights, romance, and history awaits."
<<<<<<< HEAD
          onClick={() => handleCardClick("Paris", "international")}
=======
>>>>>>> origin/neha
        />
        <DestinationCard
          title="Maldive"
          image={maldiveImg}
          description="Admire the stunning architecture and culture."
<<<<<<< HEAD
          onClick={() => handleCardClick("Maldive", "international")}
=======
>>>>>>> origin/neha
        />
      </div>

      {/* Domestic Section */}
      <div className="flex flex-wrap gap-6 justify-center relative py-4">
        <div className="absolute -top-8 left-4 sm:left-[7%]">
          <span className="text-red-600 font-semibold text-2xl">Domestic</span>
        </div>
        <div className="absolute -top-10 right-4 sm:right-[7%]">
          <button
<<<<<<< HEAD
            className="bg-blue-600 text-white px-4 py-1 rounded-lg text-sm"
            onClick={() => navigate('/domestic')}
=======
            className="bg-blue-900 text-white px-4 py-1 rounded-lg text-sm"
            onClick={() => handleExploreClick("Domestic")}
>>>>>>> origin/neha
          >
            Explore All
          </button>
        </div>

        <DestinationCard
          title="Goa"
          image={goaImg}
          description="Sun, sand, and nightlife on India’s western coast."
<<<<<<< HEAD
          onClick={() => handleCardClick("Goa", "domestic")}
=======
>>>>>>> origin/neha
        />
        <DestinationCard
          title="Darjeeling"
          image={darjeelingImg}
          description="A peaceful hill station with scenic beauty and tea gardens."
<<<<<<< HEAD
          onClick={() => handleCardClick("Darjeeling", "domestic")}
=======
>>>>>>> origin/neha
        />
        <DestinationCard
          title="Kashmir"
          image={kashmirImg}
          description="Heaven on earth – valleys, lakes, and snowcapped peaks."
<<<<<<< HEAD
          onClick={() => handleCardClick("Kashmir", "domestic")}
=======
>>>>>>> origin/neha
        />
        <DestinationCard
          title="Mumbai"
          image={MumbaiImg}
          description="The City of Dreams, where every street whispers ambition and nights never sleep."
<<<<<<< HEAD
          onClick={() => handleCardClick("Mumbai", "domestic")}
=======
>>>>>>> origin/neha
        />
      </div>
    </div>
  );
};

export default TourPackages;
