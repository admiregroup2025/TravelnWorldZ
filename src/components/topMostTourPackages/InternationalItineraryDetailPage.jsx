import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getJson, USE_BACKEND } from "../../utils/api";
import internationalItineraryData from "../../data/internationalItineraryData";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheck,
  FaBan,
  FaShieldAlt,
  FaTimes,
  FaCreditCard,
} from "react-icons/fa";

const InternationalItineraryDetailPage = () => {
  const { destinationId, itineraryId } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!itineraryId) return;
    if (!USE_BACKEND) {
      const items = internationalItineraryData[destinationId] || [];
      const local = items.find((item) => String(item.id) === String(itineraryId));
      setItinerary(local || null);
      return;
    }
    getJson(`/api/itineraries/${itineraryId}`)
      .then((doc) => setItinerary(doc))
      .catch(() => setItinerary(null));
  }, [itineraryId, destinationId]);

  if (!itinerary) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
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
    { id: "exclusions", label: "Exclusions", icon: FaBan },
    { id: "terms", label: "Terms", icon: FaShieldAlt },
    { id: "cancellation", label: "Cancellation", icon: FaTimes },
    { id: "paymentPolicy", label: "Payment Policy", icon: FaCreditCard },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        to={`/international-itinerary/${destinationId}`}
        className="text-blue-600 hover:underline mb-4 inline-flex items-center"
      >
        <FaArrowLeft className="mr-2" />
        Back to {destinationId.replace("-", " ")} Itineraries
      </Link>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-6 text-center sm:text-left">
        {itinerary.title || itinerary.name}
      </h1>

      {/* Image + Agent Profile */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Left: Image */}
        <div className="w-full lg:w-3/5">
          <img
            src={itinerary.coverImageUrl || itinerary.image}
            alt={itinerary.title || itinerary.name}
            className="w-full h-64 sm:h-80 lg:h-[400px] object-cover rounded-lg shadow"
          />
        </div>

        {/* Right: Profile */}
        <div className="w-full lg:w-2/5 bg-white p-6 rounded-lg shadow flex flex-col items-center">
          <img
            src="https://via.placeholder.com/120"
            alt="Agent Profile"
            className="rounded-full border-4 border-orange-300 mb-4 w-24 h-24 sm:w-28 sm:h-28"
          />
          <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-1">Agent Uttarakhand</h3>
          <p className="text-orange-500 mb-4">Travel Expert</p>
          <button className="bg-orange-500 text-white w-full mb-3 py-2 rounded">
            Call: +91-9876543210
          </button>
          <button className="bg-blue-600 text-white w-full mb-3 py-2 rounded">
            Email Us
          </button>
          <button className="bg-green-500 text-white w-full py-2 rounded">
            WhatsApp
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-3 sm:px-4 flex items-center border-b-2 text-sm sm:text-base transition-all ${
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
      <div className="bg-white p-6 rounded-lg shadow border min-h-[200px] text-sm sm:text-base">
        {activeTab === "overview" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">About this Trip</h2>
            <p className="text-gray-700 leading-relaxed">
              {itinerary.shortDescription || itinerary.title}
            </p>
          </div>
        )}

        {activeTab === "itinerary" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Day-wise Itinerary</h2>
            {(itinerary.dayPlans || itinerary.details)?.map((day, index) => (
              <div
                key={index}
                className="mb-4 border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded"
              >
                <h3 className="font-bold text-blue-700">
                  Day {day.day || index + 1}: {day.title}
                </h3>
                <p className="text-gray-700">{day.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "inclusions" && (
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {itinerary.inclusions?.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}

        {activeTab === "exclusions" && (
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {(itinerary.exclusions && itinerary.exclusions.length > 0) ? (
              itinerary.exclusions.map((item, idx) => <li key={idx}>{item}</li>)
            ) : (
              <li>No exclusions specified.</li>
            )}
          </ul>
        )}

        {activeTab === "terms" && <p className="text-gray-700">No terms available.</p>}
        {activeTab === "cancellation" && <p className="text-gray-700">No cancellation policy available.</p>}
        {activeTab === "paymentPolicy" && <p className="text-gray-700">No payment policy available.</p>}
      </div>

      {/* Bottom Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button className="bg-blue-700 hover:bg-blue-900 text-white px-6 py-3 rounded">
          Get a Quote
        </button>
        <Link to="/contactUs" className="w-full sm:w-auto">
          <button className="border border-gray-400 px-6 py-3 rounded w-full hover:bg-gray-100">
            Enquire Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default InternationalItineraryDetailPage;
