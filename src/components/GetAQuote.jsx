import React from "react";
import { useParams } from "react-router-dom";
import travelAgenciesData from "../data/travelAgenciesData";
import GetAQuoteForm from "../forms/GetAQuoteForm";

const GetAQuote = () => {
  const { destinationId, agencyId } = useParams();

  const agency = travelAgenciesData[destinationId]?.find(
    (a) => a.id === agencyId
  );

  if (!agency) {
    return (
      <div className="p-6 max-w-6xl mx-auto text-center text-red-500">
        Agency not found.
      </div>
    );
  }

  return (
    <div className="py-6 w-full flex justify-center">
      {/* Responsive container */}
      <div className="flex flex-col md:flex-row gap-6 w-[95vw]">
        {/* Left Side: Agency Info */}
        <div className="bg-gradient-to-b from-blue-50 to-gray-100 p-5 rounded shadow flex flex-col items-center md:w-1/4 w-full">
          {/* Logo + Tagline */}
          <img
            src={agency.image}
            alt={agency.name}
            className="w-full h-40 object-cover rounded mb-3"
          />
          <h2 className="text-xl md:text-2xl font-bold mb-1 text-blue-900 text-center">
            {agency.name}
          </h2>
          <p className="text-sm text-gray-600 italic mb-4 text-center">
            {agency.title}
          </p>

          {/* USP Section */}
          <div className="w-full space-y-2 text-sm text-gray-700">
            <p className="flex items-center gap-2 flex-wrap">
              🏔 20+ Years of Trekking Experience
            </p>
            <p className="flex items-center gap-2 flex-wrap">
              🌍 Trusted by 10,000+ Travelers
            </p>
            <p className="flex items-center gap-2 flex-wrap">
              🛡 24/7 Customer Support
            </p>
          </div>

          {/* Contact Card */}
          <div className="mt-4 w-full bg-white p-3 rounded shadow-sm text-sm">
            <p className="flex items-center gap-2 mb-2 break-words">
              📧 {agency.email || "info@travel.com"}
            </p>
            <p className="flex items-center gap-2 break-words">
              📞 {agency.phone || "+91-9876543210"}
            </p>
          </div>

          {/* CTA Button */}
          <button className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow">
            Talk to a Travel Expert
          </button>
        </div>

        {/* Right Side: Form */}
        <div className="bg-white rounded shadow border md:w-3/4 w-full p-4">
          <GetAQuoteForm agencyName={agency.name} />
        </div>
      </div>
    </div>
  );
};

export default GetAQuote;
