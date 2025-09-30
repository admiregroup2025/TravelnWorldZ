import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getJson, USE_BACKEND } from "../../utils/api";
import domesticItineraryData from "../../data/domesticItineraryData";
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
  const [itinerary, setItinerary] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!itineraryId) return;
    if (!USE_BACKEND) {
      const items = domesticItineraryData[destinationId] || [];
      const local = items.find((item) => String(item.id) === String(itineraryId));
      setItinerary(local || null);
      return;
    }
    getJson(`/api/itineraries/${itineraryId}`)
      .then((doc) => setItinerary(doc))
      .catch(() => setItinerary(null));
  }, [itineraryId]);

  if (!itinerary) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Itinerary Not Found
          </h2>
          <Link
            to="/"
            className="text-blue-600 underline mt-4 block hover:text-blue-800"
          >
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        to={`/domestic-itinerary/${destinationId}`}
        className="text-blue-600 hover:text-blue-800 mb-6 inline-flex items-center text-sm font-medium"
      >
        <FaArrowLeft className="mr-2" />
        Back to {destinationId.replace("-", " ")} Itineraries
      </Link>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
        {itinerary.title || itinerary.name}
      </h1>

      {/* Image + Agent Info */}
      <div className="grid md:grid-cols-5 gap-6 mb-8">
        {/* Left: Cover Image */}
        <img
          src={itinerary.coverImageUrl || itinerary.image}
          alt={itinerary.title || itinerary.name}
          className="md:col-span-3 w-full h-64 md:h-96 object-cover rounded-xl shadow-md"
        />

        {/* Right: Agent Profile */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow flex flex-col items-center text-center">
          <img
            src="https://via.placeholder.com/120"
            alt="Agent Profile"
            className="rounded-full border-4 border-orange-400 mb-4 w-28 h-28 object-cover"
          />
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            Agent Uttarakhand
          </h3>
          <p className="text-orange-500 mb-6">Travel Expert</p>
          <div className="w-full space-y-3">
            <button className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded-lg shadow transition flex items-center justify-center gap-2">
              Call: +91-9876543210
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg shadow transition flex items-center justify-center gap-2">
              Email Us
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded-lg shadow transition flex items-center justify-center gap-2">
              WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b pb-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 rounded-t-lg text-sm md:text-base transition ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow"
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
            }`}
          >
            <tab.icon className="mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 rounded-xl shadow border">
        {activeTab === "overview" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              About this Trip
            </h2>
            <p className="text-gray-700 leading-relaxed">{itinerary.title}</p>
          </div>
        )}

        {activeTab === "itinerary" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Day-wise Itinerary
            </h2>
            {(itinerary.dayPlans || itinerary.details)?.map((day, index) => (
              <div
                key={index}
                className="mb-4 border-l-4 border-blue-500 pl-4 py-3 bg-gray-50 rounded-lg shadow-sm"
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
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Inclusions
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {itinerary.inclusions?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "exclusions" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Exclusions
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {itinerary.exclusions?.map((item, idx) => (
                <li key={idx}>{item}</li>
              )) || <li>No exclusions specified.</li>}
            </ul>
          </div>
        )}

        {activeTab === "terms" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Terms & Conditions
            </h2>
            <p className="text-gray-700 leading-relaxed">
              No terms available.
            </p>
          </div>
        )}

        {activeTab === "cancellation" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Cancellation Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              No cancellation policy available.
            </p>
          </div>
        )}

        {activeTab === "paymentPolicy" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Payment Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              No payment policy specified.
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col md:flex-row gap-4">
        <button className="bg-blue-700 hover:bg-blue-900 text-white px-6 py-3 rounded-lg shadow transition">
          Get a Quote
        </button>
        <Link to="/contactUs">
          <button className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 shadow-sm transition w-full md:w-auto">
            Enquire Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DomesticItineraryDetailPage;
