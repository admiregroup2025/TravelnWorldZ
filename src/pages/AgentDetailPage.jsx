import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaRupeeSign,
  FaStar,
  FaPhone,
} from "react-icons/fa";
 
const trendingDestinations = [
  {
    id: "agency1",
    title: "Agent Uttarakhand",
    description:
      "Connect with our expert Uttarakhand travel agent for the best deals, personalized planning, and insider access to hidden gems across the Himalayas.",
    price: "Contact for Pricing",
    duration: "Custom Packages",    
    images: [
      "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562565652-914c2c8f704d?w=800&auto=format&fit=crop",
    ],
    highlights: [
      "Personalized trip planning",
      "Local travel expert guidance",
      "24/7 on-trip support",
      "Access to remote & offbeat destinations",
      "Exclusive hotel and activity discounts",
    ],
    itinerary: [
      {
        day: 1,
        title: "Free Consultation",
        description:
          "Schedule a one-on-one call to discuss your travel preferences, budget, and timeline. The agent will gather all your requirements.",
      },
      {
        day: 2,
        title: "Itinerary Planning",
        description:
          "Based on your input, the agent will craft a tailored plan, suggest hotels, activities, and send a detailed proposal with pricing.",
      },
    ],
    inclusions: [
      "Customized itinerary design",
      "Local support throughout the trip",
      "Hotel and activity recommendations",
      "Optional add-ons based on request",
    ],
    exclusions: [
      "Flight/train tickets",
      "Meals unless mentioned",
      "Entry fees for sightseeing",
      "Personal expenses and shopping",
    ],
    terms: [
      "All consultations are prepaid and non-refundable",
      "50% advance required for booking confirmations",
      "Itinerary changes allowed up to 7 days prior to travel",
      "Prices may vary during peak seasons or due to availability",
    ],
    cancellation: [
      "100% refund if canceled 10+ days before travel",
      "50% refund if canceled within 3–10 days",
      "No refund if canceled less than 3 days before travel",
      "Non-refundable consultation fee",
    ],
    paymentModes: [
      "UPI (Google Pay, PhonePe, Paytm)",
      "Credit/Debit Cards (Visa, MasterCard, Rupay)",
      "Net Banking (All major banks)",
      "Wallets (Paytm, Amazon Pay)",
      "Bank Transfer / NEFT",
    ],
    contact: "+91-9876543210", // ← added contact number
  },
];
 
const AgentDetailPage = () => {
  const { agencyId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
 
  const agent = trendingDestinations.find((a) => a.id === agencyId);
 
  if (!agent) {
    return <p className="text-center p-10">Agency not found</p>;
  }
 
  return (
    <div className="bg-gray-50">
      <section className="pt-28 pb-12">
        <div className="mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm">
            <Link to="/" className="text-[#E69233] hover:underline">Home</Link> &gt;
            <Link to="/trending-destinations" className="text-[#E69233] hover:underline"> Trending Destinations</Link> &gt;
            <span className="text-gray-600"> {agent.title}</span>
          </div>
 
          {/* Header Section with Agent Info on Right */}
            <div className="mb-12 flex flex-col md:flex-row md:justify-between md:items-start gap-8">
            {/* Left: Title + Details */}
            <div className="flex-1">
                <h1 className="text-[#261F43] text-4xl font-bold mb-2">{agent.title}</h1>
 
                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center">
                    <FaMapMarkerAlt className="text-[#E69233] mr-2" />
                    {agent.title}
                </div>
                <div className="flex items-center">
                    <FaCalendarAlt className="text-[#E69233] mr-2" />
                    {agent.duration}
                </div>
                <div className="flex items-center">
                    <FaRupeeSign className="text-[#E69233] mr-2" />
                    {agent.price}
                </div>
                </div>
 
                <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                ))}
                <span className="ml-2 text-gray-600">(12 reviews)</span>
                </div>
            </div>
 
            {/* Right: Agent Info Card */}
            <div className="w-full md:w-80 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="flex flex-col items-center text-center">
                <img
                    src={agent.photo}
                    alt={agent.title}
                    className="w-20 h-20 rounded-full object-cover mb-3"
                />
                <h3 className="text-lg font-semibold text-[#261F43]">{agent.title}</h3>
                <div className="text-sm text-gray-500 mb-3">Travel Expert</div>
 
                <div className="flex flex-col gap-2 text-sm w-full">
                    <div className="flex items-center justify-center text-[#E69233]">
                    <FaPhone className="mr-2" />
                    <a href={`tel:${agent.contact}`} className="hover:underline">
                        {agent.contact}
                    </a>
                    </div>
                    <div className="flex items-center justify-center text-[#261F43]">
                    📧{" "}
                    <a
                        href={`mailto:${agent.email}`}
                        className="ml-2 hover:underline break-words"
                    >
                        {agent.email}
                    </a>
                    </div>
                    <div className="flex items-center justify-center text-green-600">
                    💬{" "}
                    <a
                        href={`https://wa.me/${agent.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 hover:underline"
                    >
                        Chat on WhatsApp
                    </a>
                    </div>
                </div>
                </div>
            </div>
            </div>
 
         
          {/* Image Gallery */}
          <div className="mb-12">
            <div className="relative h-96 rounded-xl overflow-hidden mb-6">
              <img
                src={agent.images[activeImageIndex]}
                alt={agent.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-4">
              {agent.images.slice(0, 4).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setActiveImageIndex(i)}
                  className={`w-24 h-24 rounded-lg object-cover cursor-pointer ${activeImageIndex === i ? "ring-4 ring-[#E69233]" : ""}`}
                  alt={`${agent.title} ${i + 1}`}
                />
              ))}
            </div>
          </div>
 
          {/* Tabs */}
          <div className="border-b mb-6">
            {["overview", "itinerary", "inclusions", "terms", "cancellation", "paymentModes"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-4 text-sm font-medium border-b-2 ${
                  activeTab === tab
                    ? "border-[#E69233] text-[#E69233]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab[0].toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
 
          {/* Tab Content */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            {activeTab === "overview" && (
              <>
                <h2 className="text-2xl font-bold mb-4 text-[#261F43]">Overview</h2>
                <p className="text-gray-600 mb-6">{agent.description}</p>
 
                <h3 className="text-xl font-semibold mb-3 text-[#E69233]">Highlights</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {agent.highlights.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[#E69233] mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
 
            {activeTab === "itinerary" && (
              <>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#261F43]">Itinerary</h2>
                  <div className="bg-[#F9FAFB] border border-gray-200 rounded-lg p-4 shadow-sm mt-4 sm:mt-0 sm:ml-4 w-full sm:w-auto">
                    <div className="text-sm text-gray-600 mb-1">Agent</div>
                    <div className="text-lg font-semibold text-[#261F43]">{agent.title}</div>
                    <div className="flex items-center text-[#E69233] mt-1">
                      <FaPhone className="mr-2" />
                      <a href={`tel:${agent.contact}`} className="hover:underline">
                        {agent.contact}
                      </a>
                    </div>
                  </div>
                </div>
 
                {agent.itinerary.map((day, i) => (
                  <div key={i} className="border-l-4 border-[#E69233] pl-6 py-2 mb-4">
                    <div className="flex items-center mb-2">
                      <div className="bg-[#E69233] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                        {day.day}
                      </div>
                      <h3 className="text-lg font-semibold">{day.title}</h3>
                    </div>
                    <p className="text-gray-600 pl-12">{day.description}</p>
                  </div>
                ))}
              </>
            )}
 
            {activeTab === "inclusions" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-[#E69233]">Inclusions</h3>
                  <ul className="space-y-2">
                    {agent.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-[#E69233] mr-2">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-[#E69233]">Exclusions</h3>
                  <ul className="space-y-2">
                    {agent.exclusions.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-red-500 mr-2">✗</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
 
            {activeTab === "terms" && (
              <>
                <h2 className="text-2xl font-bold mb-4 text-[#261F43]">Terms & Conditions</h2>
                <ul className="space-y-3">
                  {agent.terms.map((term, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[#E69233] mr-2">•</span>
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
 
            {activeTab === "cancellation" && (
              <>
                <h2 className="text-2xl font-bold mb-4 text-[#261F43]">Cancellation Policy</h2>
                <ul className="space-y-3">
                  {agent.cancellation.map((policy, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span>{policy}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
 
            {activeTab === "paymentModes" && (
              <>
                <h2 className="text-2xl font-bold mb-4 text-[#261F43]">Payment Modes</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {agent.paymentModes.map((mode, i) => (
                    <li
                      key={i}
                      className="bg-gray-100 p-4 rounded-lg text-center text-[#261F43] font-medium"
                    >
                      {mode}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
 
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-start mt-6">
            <button
              onClick={() => alert(`Quote requested for ${agent.title}`)}
              className="bg-[#E69233] text-white px-6 py-3 rounded-lg hover:bg-[#d77e27] transition"
            >
              Get a Quote
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="border border-[#E69233] text-[#E69233] px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
 
export default AgentDetailPage;
 
 