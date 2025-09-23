import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import domesticItineraryData from "../../data/domesticItineraryData"; // update path if needed
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheck,
  FaShieldAlt,
  FaTimes,
  FaCreditCard,
} from "react-icons/fa";

const DomesticItineraryDetailPage = () => {
  const { destinationId, itineraryId } = useParams();
  const itineraries = domesticItineraryData[destinationId] || [];
  const itinerary = itineraries.find((item) => item.id === parseInt(itineraryId, 10));
  const [activeTab, setActiveTab] = useState("overview");

  if (!itinerary) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Itinerary Not Found</h2>
          <Link to="/" className="text-blue-600 underline mt-4 block">
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: FaMapMarkerAlt },
    { id: "itinerary", label: "Itinerary", icon: FaCalendarAlt },
    { id: "inclusions", label: "Inclusions", icon: FaCheck },
    { id: "exclusions", label: "Exclusions", icon: FaTimes },
    { id: "terms", label: "Terms", icon: FaShieldAlt },
    { id: "cancellation", label: "Cancellation", icon: FaTimes },
    { id: "paymentPolicy", label: "Payment Policy", icon: FaCreditCard },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        to={`/domestic-itinerary/${destinationId}`}
        className="text-blue-600 hover:underline mb-4 inline-flex items-center"
      >
        <FaArrowLeft className="mr-2" />
        Back to {destinationId.replace("-", " ")} Itineraries
      </Link>

      {/* Title */}
      <h1 className="text-3xl font-bold text-blue-900 mb-4">{itinerary.name}</h1>

      <div className="flex gap-6 mb-6">
        {/* Image Left - 60% */}
        <img
          src={itinerary.image}
          alt={itinerary.name}
          className="w-3/5 h-80 object-cover rounded-lg shadow"
        />

        {/* Profile / Summary Right - 40% */}
        <div className="w-2/5 bg-white p-4 rounded-lg shadow flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-2">{itinerary.title}</h2>
          {/* You can customize profile or summary details here */}
          <p className="text-gray-700 mb-4">
            {/* Example summary - replace or add your agent/contact info or highlights */}
            Duration: {itinerary.duration || "N/A"}
            <br />
            Starting Price: {itinerary.startingPrice || "Contact for pricing"}
          </p>
          {/* Example contact buttons - replace or remove as needed */}
          <div className="flex flex-col gap-3">
            <button className="bg-blue-600 text-white py-2 rounded">Contact Agent</button>
            <Link to="/contact" className="text-center border border-blue-600 py-2 rounded text-blue-600 hover:bg-blue-50">
              Enquire Now
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-4 flex items-center border-b-2 transition-all ${
              activeTab === tab.id
                ? "border-blue-600 text-blue-700 font-semibold"
                : "border-transparent text-gray-600 hover:text-blue-600"
            }`}
          >
            <tab.icon className="mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 rounded-lg shadow border">
        {activeTab === "overview" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">About this Trip</h2>
            <p className="text-gray-700 leading-relaxed">{itinerary.title}</p>
          </div>
        )}

        {activeTab === "itinerary" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Day-wise Itinerary</h2>
            {itinerary.details?.map((day, index) => (
              <div
                key={index}
                className="mb-4 border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded"
              >
                <h3 className="font-bold text-blue-700">
                  Day {index + 1}: {day.title}
                </h3>
                <p className="text-gray-700">{day.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "inclusions" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Inclusions</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {itinerary.inclusions?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "exclusions" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Exclusions</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {itinerary.exclusions?.map((item, idx) => (
                <li key={idx}>{item}</li>
              )) || <li>No exclusions specified.</li>}
            </ul>
          </div>
        )}

        {activeTab === "terms" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Terms & Conditions</h2>
            <p className="text-gray-700 leading-relaxed">{itinerary.terms || "No terms available."}</p>
          </div>
        )}

        {activeTab === "cancellation" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Cancellation Policy</h2>
            <p className="text-gray-700 leading-relaxed">{itinerary.cancellation || "No cancellation policy available."}</p>
          </div>
        )}

        {activeTab === "paymentPolicy" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Policy</h2>
            <p className="text-gray-700 leading-relaxed">{itinerary.paymentPolicy || "No payment policy specified."}</p>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-8 flex gap-4">
        <button className="bg-blue-700 hover:bg-blue-900 text-white px-6 py-3 rounded">
          Get a Quote
        </button>
        <Link to="/contact">
          <button className="border border-gray-400 px-6 py-3 rounded hover:bg-gray-100">
            Enquire Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DomesticItineraryDetailPage;
