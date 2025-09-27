import React from "react";
import { useNavigate } from "react-router-dom";
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
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-0 py-0 space-y-16 md:space-y-20 pb-6">
      {/* Header */}
      <div className="text-center mb-6 md:mb-9">
        <h2 className="text-xl sm:text-2xl lg:text-3xl mt-6 md:mt-10 font-bold text-black capitalize">
          Top most Destinations
        </h2>
      </div>

      {/* International Section */}
      <div className="flex flex-wrap gap-4 sm:gap-6 justify-center relative py-4">
        <div className="absolute -top-6 md:-top-8 left-2 sm:left-4 lg:left-[7%]">
          <span className="text-red-600 font-semibold text-lg sm:text-xl lg:text-2xl">International</span>
        </div>
        <div className="absolute -top-8 md:-top-10 right-2 sm:right-4 lg:right-[7%]">
          <button
            className="bg-blue-600 text-white px-3 py-1 sm:px-4 rounded-lg text-xs sm:text-sm"
            onClick={() => navigate('/international')}
          >
            Explore All
          </button>
        </div>

        {/* Mobile & Tablet: 2 columns, Desktop: 4 columns */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-4 sm:gap-6 mt-8 md:mt-0 justify-center">
          <DestinationCard
            title="Dubai"
            image={dubaiImg}
            description="Explore the modern luxury and desert adventures."
            onClick={() => handleCardClick("Dubai", "international")}
          />
          <DestinationCard
            title="Vietnam"
            image={vietnamImg}
            description="Experience rich culture and breathtaking landscapes."
            onClick={() => handleCardClick("Vietnam", "international")}
          />
          <DestinationCard
            title="Paris"
            image={parisImg}
            description="The city of lights, romance, and history awaits."
            onClick={() => handleCardClick("Paris", "international")}
          />
          <DestinationCard
            title="Maldive"
            image={maldiveImg}
            description="Admire the stunning architecture and culture."
            onClick={() => handleCardClick("Maldive", "international")}
          />
        </div>
      </div>

      {/* Domestic Section */}
      <div className="flex flex-wrap gap-4 sm:gap-6 justify-center relative py-4">
        <div className="absolute -top-6 md:-top-8 left-2 sm:left-4 lg:left-[7%]">
          <span className="text-red-600 font-semibold text-lg sm:text-xl lg:text-2xl">Domestic</span>
        </div>
        <div className="absolute -top-8 md:-top-10 right-2 sm:right-4 lg:right-[7%]">
          <button
            className="bg-blue-600 text-white px-3 py-1 sm:px-4 rounded-lg text-xs sm:text-sm"
            onClick={() => navigate('/domestic')}
          >
            Explore All
          </button>
        </div>

        {/* Mobile & Tablet: 2 columns, Desktop: 4 columns */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-4 sm:gap-6 mt-8 md:mt-0 justify-center">
          <DestinationCard
            title="Goa"
            image={goaImg}
            description="Sun, sand, and nightlife on India's western coast."
            onClick={() => handleCardClick("Goa", "domestic")}
          />
          <DestinationCard
            title="Darjeeling"
            image={darjeelingImg}
            description="A peaceful hill station with scenic beauty and tea gardens."
            onClick={() => handleCardClick("Darjeeling", "domestic")}
          />
          <DestinationCard
            title="Kashmir"
            image={kashmirImg}
            description="Heaven on earth – valleys, lakes, and snowcapped peaks."
            onClick={() => handleCardClick("Kashmir", "domestic")}
          />
          <DestinationCard
            title="Mumbai"
            image={MumbaiImg}
            description="The City of Dreams, where every street whispers ambition and nights never sleep."
            onClick={() => handleCardClick("Mumbai", "domestic")}
          />
        </div>
      </div>
    </div>
  );
};

export default TourPackages;