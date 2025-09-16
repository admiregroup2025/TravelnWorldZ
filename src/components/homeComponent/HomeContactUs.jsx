import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import bgimage from "../../assets/images/logo/newImage1.jpg";

const HomeContactUs = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate

  return (
    <div className="relative w-full h-[400px] bg-gray-100 mb-12">
      {/* Background image */}
      <img
        src={bgimage}
        alt="Business discussion"
        className="w-full h-full object-cover"
      />

      {/* Overlay with text and button */}
      <div className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-40 flex items-center">
        <div className="ml-16 max-w-xs text-white">
          <h2 className="text-3xl font-semibold leading-snug mb-6">
            Grow Your <br /> Business with us
          </h2>

          {/* ✅ Navigate on click */}
          <button
            onClick={() => navigate("/contactUs")}
            className="bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeContactUs;
