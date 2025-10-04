import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaRupeeSign,
  FaStar,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaShare,
  FaHeart,
  FaChevronLeft,
  FaChevronRight,
  FaUsers,
  FaClock,
  FaCheck,
  FaTimes,
  FaQuoteLeft,
  FaShieldAlt,
  FaCreditCard,
} from "react-icons/fa";

import { trendingDestinations } from "../data/agentData";

const AgentDetailPage = () => {
  const { agencyId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const agent = trendingDestinations.find((a) => a.id === agencyId);

  // Handle sticky contact card
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <FaMapMarkerAlt className="text-gray-400 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Agency Not Found</h2>
          <p className="text-gray-600 mb-6">The travel agency you are looking for does not exist.</p>
          <Link 
            to="/" 
            className="bg-[#E69233] text-white px-6 py-3 rounded-lg hover:bg-[#d77e27] transition-colors"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  const tabConfig = [
    { id: "overview", label: "Overview", icon: FaQuoteLeft },
    { id: "itinerary", label: "Itinerary", icon: FaCalendarAlt },
    { id: "inclusions", label: "Inclusions", icon: FaCheck },
    { id: "terms", label: "Terms", icon: FaShieldAlt },
    { id: "cancellation", label: "Cancellation", icon: FaTimes },
    { id: "paymentModes", label: "Payment", icon: FaCreditCard },
  ];

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % agent.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + agent.images.length) % agent.images.length);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: agent.title,
          text: agent.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Fixed Contact Card for Mobile */}
      {isSticky && (
        <div className="fixed top-20 right-4 z-40 bg-white rounded-xl shadow-lg p-4 border border-gray-200 lg:hidden">
          <div className="flex items-center gap-3">
            <img
              src={agent.photo}
              alt={agent.title}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-[#261F43] truncate">{agent.title}</div>
              <a 
                href={`tel:${agent.contact}`}
                className="text-[#E69233] text-sm hover:underline flex items-center"
              >
                <FaPhone className="mr-1 text-xs" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      )}

      <section className="pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Enhanced Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link 
                  to="/" 
                  className="text-[#E69233] hover:text-[#d77e27] transition-colors font-medium"
                >
                  Home
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <Link 
                  to="/trending-destinations" 
                  className="text-[#E69233] hover:text-[#d77e27] transition-colors font-medium"
                >
                  Trending Destinations
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-600 font-medium truncate">{agent.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                  <div className="flex-1">
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#261F43] mb-4 leading-tight">
                      {agent.title}
                    </h1>
                    
                    {/* Enhanced Info Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center bg-orange-50 px-4 py-3 rounded-lg border border-orange-100">
                        <FaMapMarkerAlt className="text-[#E69233] mr-3 flex-shrink-0" />
                        <div>
                          <div className="text-xs text-gray-500 font-medium">DESTINATION</div>
                          <div className="font-semibold text-[#261F43] text-sm">{agent.title}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center bg-blue-50 px-4 py-3 rounded-lg border border-blue-100">
                        <FaClock className="text-blue-500 mr-3 flex-shrink-0" />
                        <div>
                          <div className="text-xs text-gray-500 font-medium">DURATION</div>
                          <div className="font-semibold text-[#261F43] text-sm">{agent.duration}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center bg-green-50 px-4 py-3 rounded-lg border border-green-100">
                        <FaRupeeSign className="text-green-500 mr-3 flex-shrink-0" />
                        <div>
                          <div className="text-xs text-gray-500 font-medium">STARTING FROM</div>
                          <div className="font-semibold text-[#261F43] text-sm">{agent.price}</div>
                        </div>
                      </div>
                    </div>

                    {/* Rating & Actions */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center">
                        <div className="flex items-center mr-4">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className="text-yellow-400 text-sm" />
                          ))}
                          <span className="ml-2 text-gray-600 text-sm font-medium">(12 reviews)</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setIsWishlisted(!isWishlisted)}
                          className={`p-2 rounded-lg border transition-all ${
                            isWishlisted 
                              ? 'bg-red-50 border-red-200 text-red-500' 
                              : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                          }`}
                          aria-label="Add to wishlist"
                        >
                          <FaHeart className={isWishlisted ? 'fill-current' : ''} />
                        </button>
                        <button
                          onClick={handleShare}
                          className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors"
                          aria-label="Share"
                        >
                          <FaShare />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Image Gallery */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="relative">
                  <div className="relative h-64 sm:h-96 rounded-xl overflow-hidden mb-6 group">
                    <img
                      src={agent.images[activeImageIndex]}
                      alt={`${agent.title} - Image ${activeImageIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    {/* Image Navigation */}
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-opacity-70"
                      aria-label="Previous image"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-opacity-70"
                      aria-label="Next image"
                    >
                      <FaChevronRight />
                    </button>
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                      {activeImageIndex + 1} / {agent.images.length}
                    </div>
                  </div>
                  
                  {/* Thumbnail Grid */}
                  <div className="grid grid-cols-4 gap-3">
                    {agent.images.slice(0, showAllImages ? agent.images.length : 4).map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImageIndex(i)}
                        className={`aspect-square rounded-lg overflow-hidden transition-all ${
                          activeImageIndex === i 
                            ? "ring-3 ring-[#E69233] ring-offset-2" 
                            : "hover:opacity-80"
                        }`}
                      >
                        <img
                          src={img}
                          className="w-full h-full object-cover"
                          alt={`${agent.title} thumbnail ${i + 1}`}
                        />
                      </button>
                    ))}
                    {agent.images.length > 4 && !showAllImages && (
                      <button
                        onClick={() => setShowAllImages(true)}
                        className="aspect-square bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                      >
                        <div className="text-center">
                          <div className="font-bold">+{agent.images.length - 4}</div>
                          <div className="text-xs">More</div>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Enhanced Tabs */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                {/* Tab Headers */}
                <div className="border-b border-gray-200 px-6">
                  <div className="flex overflow-x-auto scrollbar-hide">
                    {tabConfig.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center py-4 px-4 text-sm font-medium border-b-2 whitespace-nowrap transition-all ${
                            activeTab === tab.id
                              ? "border-[#E69233] text-[#E69233] bg-orange-50"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          <Icon className="mr-2 text-xs" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === "overview" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold mb-4 text-[#261F43] flex items-center">
                          <FaQuoteLeft className="mr-3 text-[#E69233]" />
                          Overview
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg">{agent.description}</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-[#E69233] flex items-center">
                          <FaStar className="mr-2" />
                          Highlights
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {agent.highlights.map((item, i) => (
                            <div key={i} className="flex items-start bg-orange-50 p-3 rounded-lg border border-orange-100">
                              <FaCheck className="text-[#E69233] mr-3 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "itinerary" && (
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <h2 className="text-2xl font-bold text-[#261F43] flex items-center">
                          <FaCalendarAlt className="mr-3 text-[#E69233]" />
                          Detailed Itinerary
                        </h2>
                        <div className="bg-gradient-to-r from-[#E69233] to-[#d77e27] text-white p-4 rounded-lg shadow-sm">
                          <div className="text-sm opacity-90">Your Travel Expert</div>
                          <div className="font-semibold">{agent.title}</div>
                          <a 
                            href={`tel:${agent.contact}`}
                            className="flex items-center mt-2 text-sm hover:underline opacity-90"
                          >
                            <FaPhone className="mr-2" />
                            {agent.contact}
                          </a>
                        </div>
                      </div>

                      <div className="space-y-6">
                        {agent.itinerary.map((day, i) => (
                          <div key={i} className="relative pl-8">
                            {/* Timeline line */}
                            {i !== agent.itinerary.length - 1 && (
                              <div className="absolute left-4 top-12 bottom-0 w-0.5 bg-gradient-to-b from-[#E69233] to-gray-200"></div>
                            )}
                            
                            {/* Day badge */}
                            <div className="absolute left-0 top-0 bg-gradient-to-r from-[#E69233] to-[#d77e27] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-lg">
                              {day.day}
                            </div>
                            
                            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                              <h3 className="text-lg font-semibold text-[#261F43] mb-3">{day.title}</h3>
                              <p className="text-gray-600 leading-relaxed">{day.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "inclusions" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-green-600 flex items-center">
                          <FaCheck className="mr-2" />
                          What is Included
                        </h3>
                        <div className="space-y-3">
                          {agent.inclusions.map((item, i) => (
                            <div key={i} className="flex items-start bg-green-50 p-3 rounded-lg border border-green-100">
                              <FaCheck className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-red-600 flex items-center">
                          <FaTimes className="mr-2" />
                          What is Not Included
                        </h3>
                        <div className="space-y-3">
                          {agent.exclusions.map((item, i) => (
                            <div key={i} className="flex items-start bg-red-50 p-3 rounded-lg border border-red-100">
                              <FaTimes className="text-red-500 mr-3 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "terms" && (
                    <div>
                      <h2 className="text-2xl font-bold mb-6 text-[#261F43] flex items-center">
                        <FaShieldAlt className="mr-3 text-[#E69233]" />
                        Terms & Conditions
                      </h2>
                      <div className="space-y-4">
                        {agent.terms.map((term, i) => (
                          <div key={i} className="flex items-start bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <div className="bg-[#E69233] text-white rounded-full w-6 h-6 flex items-center justify-center mr-4 flex-shrink-0 text-sm font-bold">
                              {i + 1}
                            </div>
                            <span className="text-gray-700 leading-relaxed">{term}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "cancellation" && (
                    <div>
                      <h2 className="text-2xl font-bold mb-6 text-[#261F43] flex items-center">
                        <FaTimes className="mr-3 text-red-500" />
                        Cancellation Policy
                      </h2>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-red-800 font-medium">Please read the cancellation terms carefully before booking.</p>
                      </div>
                      <div className="space-y-4">
                        {agent.cancellation.map((policy, i) => (
                          <div key={i} className="flex items-start bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                            <FaTimes className="text-red-500 mr-4 mt-1 flex-shrink-0" />
                            <span className="text-gray-700 leading-relaxed">{policy}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "paymentModes" && (
                    <div>
                      <h2 className="text-2xl font-bold mb-6 text-[#261F43] flex items-center">
                        <FaCreditCard className="mr-3 text-[#E69233]" />
                        Payment Options
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {agent.paymentModes.map((mode, i) => (
                          <div
                            key={i}
                            className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg text-center border border-gray-200 hover:shadow-md transition-shadow"
                          >
                            <FaCreditCard className="text-[#E69233] text-2xl mx-auto mb-3" />
                            <div className="text-[#261F43] font-semibold">{mode}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Agent Contact Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <div className="text-center mb-6">
                    <img
                      src={agent.photo}
                      alt={agent.title}
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-4 ring-4 ring-orange-100"
                    />
                    <h3 className="text-xl font-bold text-[#261F43] mb-1">{agent.title}</h3>
                    <p className="text-[#E69233] font-medium">Travel Expert</p>
                  </div>

                  <div className="space-y-4">
                    <a
                      href={`tel:${agent.contact}`}
                      className="flex items-center justify-center bg-[#E69233] text-white p-3 rounded-lg hover:bg-[#d77e27] transition-colors group"
                    >
                      <FaPhone className="mr-3 group-hover:animate-pulse" />
                      <span className="font-medium">Call: {agent.contact}</span>
                    </a>

                    <a
                      href={`mailto:${agent.email}`}
                      className="flex items-center justify-center bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors group"
                    >
                      <FaEnvelope className="mr-3 group-hover:animate-pulse" />
                      <span className="font-medium">Email Us</span>
                    </a>

                    <a
                      href={`https://wa.me/${agent.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors group"
                    >
                      <FaWhatsapp className="mr-3 group-hover:animate-pulse" />
                      <span className="font-medium">WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <h4 className="font-bold text-[#261F43] mb-4 text-center">Ready to Book?</h4>
                  <div className="space-y-3">
                    <button
                      onClick={() => alert(`Quote requested for ${agent.title}`)}
                      className="w-full bg-gradient-to-r from-[#E69233] to-[#d77e27] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                    >
                      Get Free Quote
                    </button>
                    <button
                      onClick={() => navigate("/contact")}
                      className="w-full border-2 border-[#E69233] text-[#E69233] py-3 rounded-lg font-semibold hover:bg-[#E69233] hover:text-white transition-all"
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
                  <h4 className="font-bold text-[#261F43] mb-4 text-center">Why Choose Us?</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-blue-700">
                      <FaShieldAlt className="mr-3 text-blue-500" />
                      <span>Secure & Safe Booking</span>
                    </div>
                    <div className="flex items-center text-blue-700">
                      <FaUsers className="mr-3 text-blue-500" />
                      <span>Expert Travel Guidance</span>
                    </div>
                    <div className="flex items-center text-blue-700">
                      <FaStar className="mr-3 text-yellow-500" />
                      <span>5-Star Customer Service</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgentDetailPage;