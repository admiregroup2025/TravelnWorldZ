import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaRupeeSign,
  FaStar,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaHeadset,
  FaShieldAlt,
  FaCreditCard,
  FaFileContract,
  FaList,
  FaEye,
  FaShare,
  FaHeart,
  FaDownload,
} from "react-icons/fa";


const agentData = {
  "agency1": {
    id: "agency1",
    title: "Agent Uttarakhand",
    subtitle: "Premium Himalayan Travel Expert",
    description: "Connect with our expert Uttarakhand travel agent for the best deals, personalized planning, and insider access to hidden gems across the Himalayas. Experience authentic mountain culture with our locally-rooted expertise.",
    price: "Contact for Pricing",
    duration: "Custom Packages",
    rating: 4.8,
    reviewCount: 127,
    verified: true,
    responseTime: "Within 2 hours",
    images: [
      "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562565652-914c2c8f704d?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop"
    ],
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&crop=face",
    contact: {
      phone: "+91-9876543210",
      email: "agent.uttarakhand@travelworld.com",
      whatsapp: "919876543210"
    },
    highlights: [
      "Personalized trip planning with local insights",
      "24/7 on-trip support and emergency assistance",
      "Access to remote & offbeat destinations",
      "Exclusive partnerships with local hotels",
      "Sustainable and eco-friendly travel options",
      "Multi-language support (Hindi, English, Local dialects)"
    ],
    itinerary: [
      {
        day: 1,
        title: "Free Consultation & Planning",
        description: "Schedule a comprehensive consultation to discuss your travel preferences, budget, timeline, and special requirements. Our expert will provide initial recommendations and gather detailed requirements.",
        duration: "45-60 minutes",
        type: "consultation"
      },
      {
        day: 2,
        title: "Custom Itinerary Design",
        description: "Based on your consultation, we'll craft a detailed, personalized itinerary with accommodations, activities, transportation, and local experiences tailored to your interests.",
        duration: "2-3 business days",
        type: "planning"
      },
      {
        day: 3,
        title: "Booking Confirmation & Support Setup",
        description: "Finalize bookings, receive detailed travel documentation, emergency contacts, and setup 24/7 support system for your journey.",
        duration: "1-2 business days",
        type: "booking"
      }
    ],
    inclusions: [
      "Comprehensive travel consultation",
      "Custom itinerary design and planning",
      "Local expert guidance and recommendations",
      "24/7 customer support during travel",
      "Emergency assistance and backup planning",
      "Detailed travel documentation and guides"
    ],
    exclusions: [
      "Flight/train ticket bookings",
      "Hotel accommodation costs",
      "Meals and dining expenses",
      "Entry fees for tourist attractions",
      "Personal expenses and shopping",
      "Travel insurance (recommended separately)"
    ],
    terms: [
      "All consultations require advance booking and are subject to availability",
      "50% advance payment required for confirmed itinerary bookings",
      "Itinerary modifications allowed up to 7 days before travel date",
      "Prices may vary during peak seasons and festive periods",
      "Service agreement must be signed before trip commencement"
    ],
    cancellation: [
      "100% refund for cancellations made 10+ days before travel",
      "50% refund for cancellations made 3-10 days before travel",
      "No refund for cancellations within 3 days of travel",
      "Consultation fees are non-refundable in all cases",
      "Refunds processed within 7-10 business days"
    ],
    paymentModes: [
      { name: "UPI", description: "Google Pay, PhonePe, Paytm", icon: "📱" },
      { name: "Cards", description: "Visa, MasterCard, RuPay", icon: "💳" },
      { name: "Net Banking", description: "All major banks", icon: "🏦" },
      { name: "Digital Wallets", description: "Paytm, Amazon Pay", icon: "💰" },
      { name: "Bank Transfer", description: "NEFT, RTGS, IMPS", icon: "🏧" },
      { name: "Cash", description: "At office location", icon: "💵" }
    ]
  },
   "agency2": {
    id: "agency1",
    title: "Agent Uttarakhand",
    subtitle: "Premium Himalayan Travel Expert",
    description: "Connect with our expert Uttarakhand travel agent for the best deals, personalized planning, and insider access to hidden gems across the Himalayas. Experience authentic mountain culture with our locally-rooted expertise.",
    price: "Contact for Pricing",
    duration: "Custom Packages",
    rating: 4.8,
    reviewCount: 127,
    verified: true,
    responseTime: "Within 2 hours",
    images: [
      "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562565652-914c2c8f704d?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop"
    ],
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&crop=face",
    contact: {
      phone: "+91-9876543210",
      email: "agent.uttarakhand@travelworld.com",
      whatsapp: "919876543210"
    },
    highlights: [
      "Personalized trip planning with local insights",
      "24/7 on-trip support and emergency assistance",
      "Access to remote & offbeat destinations",
      "Exclusive partnerships with local hotels",
      "Sustainable and eco-friendly travel options",
      "Multi-language support (Hindi, English, Local dialects)"
    ],
    itinerary: [
      {
        day: 1,
        title: "Free Consultation & Planning",
        description: "Schedule a comprehensive consultation to discuss your travel preferences, budget, timeline, and special requirements. Our expert will provide initial recommendations and gather detailed requirements.",
        duration: "45-60 minutes",
        type: "consultation"
      },
      {
        day: 2,
        title: "Custom Itinerary Design",
        description: "Based on your consultation, we'll craft a detailed, personalized itinerary with accommodations, activities, transportation, and local experiences tailored to your interests.",
        duration: "2-3 business days",
        type: "planning"
      },
      {
        day: 3,
        title: "Booking Confirmation & Support Setup",
        description: "Finalize bookings, receive detailed travel documentation, emergency contacts, and setup 24/7 support system for your journey.",
        duration: "1-2 business days",
        type: "booking"
      }
    ],
    inclusions: [
      "Comprehensive travel consultation",
      "Custom itinerary design and planning",
      "Local expert guidance and recommendations",
      "24/7 customer support during travel",
      "Emergency assistance and backup planning",
      "Detailed travel documentation and guides"
    ],
    exclusions: [
      "Flight/train ticket bookings",
      "Hotel accommodation costs",
      "Meals and dining expenses",
      "Entry fees for tourist attractions",
      "Personal expenses and shopping",
      "Travel insurance (recommended separately)"
    ],
    terms: [
      "All consultations require advance booking and are subject to availability",
      "50% advance payment required for confirmed itinerary bookings",
      "Itinerary modifications allowed up to 7 days before travel date",
      "Prices may vary during peak seasons and festive periods",
      "Service agreement must be signed before trip commencement"
    ],
    cancellation: [
      "100% refund for cancellations made 10+ days before travel",
      "50% refund for cancellations made 3-10 days before travel",
      "No refund for cancellations within 3 days of travel",
      "Consultation fees are non-refundable in all cases",
      "Refunds processed within 7-10 business days"
    ],
    paymentModes: [
      { name: "UPI", description: "Google Pay, PhonePe, Paytm", icon: "📱" },
      { name: "Cards", description: "Visa, MasterCard, RuPay", icon: "💳" },
      { name: "Net Banking", description: "All major banks", icon: "🏦" },
      { name: "Digital Wallets", description: "Paytm, Amazon Pay", icon: "💰" },
      { name: "Bank Transfer", description: "NEFT, RTGS, IMPS", icon: "🏧" },
      { name: "Cash", description: "At office location", icon: "💵" }
    ]
  },
   "agency3": {
    id: "agency1",
    title: "Agent Uttarakhand",
    subtitle: "Premium Himalayan Travel Expert",
    description: "Connect with our expert Uttarakhand travel agent for the best deals, personalized planning, and insider access to hidden gems across the Himalayas. Experience authentic mountain culture with our locally-rooted expertise.",
    price: "Contact for Pricing",
    duration: "Custom Packages",
    rating: 4.8,
    reviewCount: 127,
    verified: true,
    responseTime: "Within 2 hours",
    images: [
      "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562565652-914c2c8f704d?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop"
    ],
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&crop=face",
    contact: {
      phone: "+91-9876543210",
      email: "agent.uttarakhand@travelworld.com",
      whatsapp: "919876543210"
    },
    highlights: [
      "Personalized trip planning with local insights",
      "24/7 on-trip support and emergency assistance",
      "Access to remote & offbeat destinations",
      "Exclusive partnerships with local hotels",
      "Sustainable and eco-friendly travel options",
      "Multi-language support (Hindi, English, Local dialects)"
    ],
    itinerary: [
      {
        day: 1,
        title: "Free Consultation & Planning",
        description: "Schedule a comprehensive consultation to discuss your travel preferences, budget, timeline, and special requirements. Our expert will provide initial recommendations and gather detailed requirements.",
        duration: "45-60 minutes",
        type: "consultation"
      },
      {
        day: 2,
        title: "Custom Itinerary Design",
        description: "Based on your consultation, we'll craft a detailed, personalized itinerary with accommodations, activities, transportation, and local experiences tailored to your interests.",
        duration: "2-3 business days",
        type: "planning"
      },
      {
        day: 3,
        title: "Booking Confirmation & Support Setup",
        description: "Finalize bookings, receive detailed travel documentation, emergency contacts, and setup 24/7 support system for your journey.",
        duration: "1-2 business days",
        type: "booking"
      }
    ],
    inclusions: [
      "Comprehensive travel consultation",
      "Custom itinerary design and planning",
      "Local expert guidance and recommendations",
      "24/7 customer support during travel",
      "Emergency assistance and backup planning",
      "Detailed travel documentation and guides"
    ],
    exclusions: [
      "Flight/train ticket bookings",
      "Hotel accommodation costs",
      "Meals and dining expenses",
      "Entry fees for tourist attractions",
      "Personal expenses and shopping",
      "Travel insurance (recommended separately)"
    ],
    terms: [
      "All consultations require advance booking and are subject to availability",
      "50% advance payment required for confirmed itinerary bookings",
      "Itinerary modifications allowed up to 7 days before travel date",
      "Prices may vary during peak seasons and festive periods",
      "Service agreement must be signed before trip commencement"
    ],
    cancellation: [
      "100% refund for cancellations made 10+ days before travel",
      "50% refund for cancellations made 3-10 days before travel",
      "No refund for cancellations within 3 days of travel",
      "Consultation fees are non-refundable in all cases",
      "Refunds processed within 7-10 business days"
    ],
    paymentModes: [
      { name: "UPI", description: "Google Pay, PhonePe, Paytm", icon: "📱" },
      { name: "Cards", description: "Visa, MasterCard, RuPay", icon: "💳" },
      { name: "Net Banking", description: "All major banks", icon: "🏦" },
      { name: "Digital Wallets", description: "Paytm, Amazon Pay", icon: "💰" },
      { name: "Bank Transfer", description: "NEFT, RTGS, IMPS", icon: "🏧" },
      { name: "Cash", description: "At office location", icon: "💵" }
    ]
  },
   "agency4": {
    id: "agency1",
    title: "Agent Uttarakhand",
    subtitle: "Premium Himalayan Travel Expert",
    description: "Connect with our expert Uttarakhand travel agent for the best deals, personalized planning, and insider access to hidden gems across the Himalayas. Experience authentic mountain culture with our locally-rooted expertise.",
    price: "Contact for Pricing",
    duration: "Custom Packages",
    rating: 4.8,
    reviewCount: 127,
    verified: true,
    responseTime: "Within 2 hours",
    images: [
      "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562565652-914c2c8f704d?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop"
    ],
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&crop=face",
    contact: {
      phone: "+91-9876543210",
      email: "agent.uttarakhand@travelworld.com",
      whatsapp: "919876543210"
    },
    highlights: [
      "Personalized trip planning with local insights",
      "24/7 on-trip support and emergency assistance",
      "Access to remote & offbeat destinations",
      "Exclusive partnerships with local hotels",
      "Sustainable and eco-friendly travel options",
      "Multi-language support (Hindi, English, Local dialects)"
    ],
    itinerary: [
      {
        day: 1,
        title: "Free Consultation & Planning",
        description: "Schedule a comprehensive consultation to discuss your travel preferences, budget, timeline, and special requirements. Our expert will provide initial recommendations and gather detailed requirements.",
        duration: "45-60 minutes",
        type: "consultation"
      },
      {
        day: 2,
        title: "Custom Itinerary Design",
        description: "Based on your consultation, we'll craft a detailed, personalized itinerary with accommodations, activities, transportation, and local experiences tailored to your interests.",
        duration: "2-3 business days",
        type: "planning"
      },
      {
        day: 3,
        title: "Booking Confirmation & Support Setup",
        description: "Finalize bookings, receive detailed travel documentation, emergency contacts, and setup 24/7 support system for your journey.",
        duration: "1-2 business days",
        type: "booking"
      }
    ],
    inclusions: [
      "Comprehensive travel consultation",
      "Custom itinerary design and planning",
      "Local expert guidance and recommendations",
      "24/7 customer support during travel",
      "Emergency assistance and backup planning",
      "Detailed travel documentation and guides"
    ],
    exclusions: [
      "Flight/train ticket bookings",
      "Hotel accommodation costs",
      "Meals and dining expenses",
      "Entry fees for tourist attractions",
      "Personal expenses and shopping",
      "Travel insurance (recommended separately)"
    ],
    terms: [
      "All consultations require advance booking and are subject to availability",
      "50% advance payment required for confirmed itinerary bookings",
      "Itinerary modifications allowed up to 7 days before travel date",
      "Prices may vary during peak seasons and festive periods",
      "Service agreement must be signed before trip commencement"
    ],
    cancellation: [
      "100% refund for cancellations made 10+ days before travel",
      "50% refund for cancellations made 3-10 days before travel",
      "No refund for cancellations within 3 days of travel",
      "Consultation fees are non-refundable in all cases",
      "Refunds processed within 7-10 business days"
    ],
    paymentModes: [
      { name: "UPI", description: "Google Pay, PhonePe, Paytm", icon: "📱" },
      { name: "Cards", description: "Visa, MasterCard, RuPay", icon: "💳" },
      { name: "Net Banking", description: "All major banks", icon: "🏦" },
      { name: "Digital Wallets", description: "Paytm, Amazon Pay", icon: "💰" },
      { name: "Bank Transfer", description: "NEFT, RTGS, IMPS", icon: "🏧" },
      { name: "Cash", description: "At office location", icon: "💵" }
    ]
  },

};

// Custom hooks for better code organization
const useImageGallery = (images) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const nextImage = useCallback(() => {
    setActiveIndex(prev => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setActiveIndex(prev => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(nextImage, 3000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, nextImage]);

  return {
    activeIndex,
    setActiveIndex,
    nextImage,
    prevImage,
    isAutoPlaying,
    setIsAutoPlaying
  };
};

// Optimized components for better performance
const Breadcrumb = React.memo(({ agentTitle }) => (
  <nav className="mb-6 text-sm" aria-label="Breadcrumb">
    <ol className="flex items-center space-x-2">
      <li><Link to="/" className="text-[#E69233] hover:underline">Home</Link></li>
      <li className="text-gray-400">/</li>
      <li><Link to="/trending-destinations" className="text-[#E69233] hover:underline">Trending Destinations</Link></li>
      <li className="text-gray-400">/</li>
      <li className="text-gray-600 truncate max-w-48" title={agentTitle}>{agentTitle}</li>
    </ol>
  </nav>
));

const StarRating = React.memo(({ rating, reviewCount, className = "" }) => (
  <div className={`flex items-center ${className}`}>
    <div className="flex items-center mr-2">
      {[...Array(5)].map((_, i) => (
        <FaStar 
          key={i} 
          className={`${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'} text-sm`} 
        />
      ))}
    </div>
    <span className="text-sm font-medium text-gray-700">{rating}</span>
    <span className="text-sm text-gray-500 ml-1">({reviewCount} reviews)</span>
  </div>
));

const ContactButton = React.memo(({ type, value, icon: Icon, label, className = "" }) => {
  const getHref = () => {
    switch (type) {
      case 'phone': return `tel:${value}`;
      case 'email': return `mailto:${value}`;
      case 'whatsapp': return `https://wa.me/${value}`;
      default: return '#';
    }
  };

  return (
    <a
      href={getHref()}
      target={type === 'whatsapp' ? '_blank' : undefined}
      rel={type === 'whatsapp' ? 'noopener noreferrer' : undefined}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${className}`}
    >
      <Icon className="text-lg" />
      <span className="text-sm font-medium">{label}</span>
    </a>
  );
});

const ImageGallery = React.memo(({ images, title }) => {
  const { activeIndex, setActiveIndex, nextImage, prevImage, isAutoPlaying, setIsAutoPlaying } = useImageGallery(images);

  return (
    <div className="mb-12">
      {/* Main Image */}
      <div 
        className="relative h-96 rounded-xl overflow-hidden mb-6 group cursor-pointer"
        onMouseEnter={() => setIsAutoPlaying(true)}
        onMouseLeave={() => setIsAutoPlaying(false)}
      >
        <img
          src={images[activeIndex]}
          alt={`${title} - View ${activeIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <FaChevronRight />
            </button>
          </>
        )}
        
        {/* Image Counter & Controls */}
        <div className="absolute bottom-4 right-4 flex items-center gap-3">
          <div className="bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-medium">
            {activeIndex + 1} / {images.length}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200"
              title={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isAutoPlaying ? '⏸' : '▶'}
            </button>
          </div>
        </div>
        
        {/* Progress Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                activeIndex === i ? 'bg-white scale-125' : 'bg-white bg-opacity-50'
              }`}
              aria-label={`View image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200 ${
              activeIndex === i 
                ? 'ring-3 ring-[#E69233] scale-105' 
                : 'hover:scale-105 opacity-70 hover:opacity-100'
            }`}
          >
            <img
              src={img}
              className="w-full h-full object-cover"
              alt={`${title} thumbnail ${i + 1}`}
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
});

const TabButton = React.memo(({ tab, activeTab, onClick, icon: Icon, label, count }) => (
  <button
    onClick={() => onClick(tab)}
    className={`relative py-4 px-6 text-sm font-medium border-b-2 transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
      activeTab === tab
        ? "border-[#E69233] text-[#E69233] bg-orange-50"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
    }`}
  >
    <Icon className="text-lg" />
    <span>{label}</span>
    {count && (
      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs ml-1">
        {count}
      </span>
    )}
    {activeTab === tab && (
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E69233] rounded-full" />
    )}
  </button>
));

const InfoCard = React.memo(({ icon: Icon, title, value, color = "text-gray-600" }) => (
  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
    <Icon className={`text-xl ${color}`} />
    <div>
      <div className="text-sm text-gray-500">{title}</div>
      <div className="font-medium text-gray-800">{value}</div>
    </div>
  </div>
));

const AgentDetailPage = () => {
  const { agencyId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Memoized agent data
  const agent = useMemo(() => agentData[agencyId], [agencyId]);

  // Memoized tab configuration
  const tabConfig = useMemo(() => [
    { key: "overview", label: "Overview", icon: FaEye },
    { key: "itinerary", label: "Process", icon: FaList, count: agent?.itinerary?.length },
    { key: "inclusions", label: "Inclusions", icon: FaCheckCircle, count: agent?.inclusions?.length + agent?.exclusions?.length },
    { key: "terms", label: "Terms", icon: FaFileContract, count: agent?.terms?.length },
    { key: "cancellation", label: "Cancellation", icon: FaShieldAlt },
    { key: "paymentModes", label: "Payments", icon: FaCreditCard, count: agent?.paymentModes?.length }
  ], [agent]);

  // Handle share functionality
  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: agent.title,
          text: agent.description,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  }, [agent, showShareMenu]);

  // Handle quote request
  const handleQuoteRequest = useCallback(() => {
    // In a real app, this would open a form modal or navigate to a quote page
    const message = `Hi! I'm interested in your travel services for ${agent.title}. Could you please provide a detailed quote?`;
    window.open(`https://wa.me/${agent.contact.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  }, [agent]);

  if (!agent) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaExclamationTriangle className="text-gray-400 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-[#261F43] mb-2">Agent Not Found</h2>
          <p className="text-gray-600 mb-6">The travel agent you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/trending-destinations" 
            className="inline-flex items-center gap-2 bg-[#E69233] text-white px-6 py-3 rounded-lg hover:bg-[#d77e27] transition-colors"
          >
            <FaChevronLeft />
            Back to Destinations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="pt-28 pb-12">
        <div className="mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
          <Breadcrumb agentTitle={agent.title} />

          {/* Header Section */}
          <div className="mb-8 flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
            {/* Left: Agent Information */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl lg:text-4xl font-bold text-[#261F43]">{agent.title}</h1>
                    {agent.verified && (
                      <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                        <FaCheckCircle className="text-xs" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>
                  <p className="text-lg text-gray-600 mb-3">{agent.subtitle}</p>
                </div>
                
                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`p-2 rounded-full transition-colors ${
                      isBookmarked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title={isBookmarked ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <FaHeart className={isBookmarked ? 'fill-current' : ''} />
                  </button>
                  <div className="relative">
                    <button
                      onClick={handleShare}
                      className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                      title="Share this agent"
                    >
                      <FaShare />
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                <InfoCard 
                  icon={FaMapMarkerAlt} 
                  title="Specializes in" 
                  value="Uttarakhand" 
                  color="text-[#E69233]"
                />
                <InfoCard 
                  icon={FaCalendarAlt} 
                  title="Duration" 
                  value={agent.duration} 
                  color="text-[#E69233]"
                />
                <InfoCard 
                  icon={FaRupeeSign} 
                  title="Pricing" 
                  value={agent.price} 
                  color="text-[#E69233]"
                />
                <InfoCard 
                  icon={FaHeadset} 
                  title="Response Time" 
                  value={agent.responseTime} 
                  color="text-green-600"
                />
              </div>

              <StarRating rating={agent.rating} reviewCount={agent.reviewCount} className="mb-4" />
            </div>

            {/* Right: Agent Contact Card */}
            <div className="w-full lg:w-96 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={agent.photo}
                    alt={agent.title}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-3 ring-4 ring-orange-100"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full" />
                </div>
                <h3 className="text-xl font-semibold text-[#261F43] mb-1">{agent.title}</h3>
                <p className="text-sm text-gray-500 mb-1">Certified Travel Expert</p>
                <StarRating rating={agent.rating} reviewCount={agent.reviewCount} className="justify-center mb-4" />
              </div>

              {/* Contact Options */}
              <div className="space-y-3 mb-6">
                <ContactButton
                  type="phone"
                  value={agent.contact.phone}
                  icon={FaPhone}
                  label="Call Now"
                  className="w-full bg-[#E69233] text-white hover:bg-[#d77e27]"
                />
                <ContactButton
                  type="whatsapp"
                  value={agent.contact.whatsapp}
                  icon={FaWhatsapp}
                  label="WhatsApp Chat"
                  className="w-full bg-green-600 text-white hover:bg-green-700"
                />
                <ContactButton
                  type="email"
                  value={agent.contact.email}
                  icon={FaEnvelope}
                  label="Send Email"
                  className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50"
                />
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <button
                  onClick={handleQuoteRequest}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Get Free Quote
                </button>
                <button
                  onClick={() => navigate("/contact")}
                  className="w-full border border-[#E69233] text-[#E69233] py-3 rounded-lg hover:bg-[#E69233] hover:text-white transition-colors font-medium"
                >
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <ImageGallery images={agent.images} title={agent.title} />

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 mb-8 overflow-x-auto">
            <div className="flex min-w-max">
              {tabConfig.map(({ key, label, icon, count }) => (
                <TabButton
                  key={key}
                  tab={key}
                  activeTab={activeTab}
                  onClick={setActiveTab}
                  icon={icon}
                  label={label}
                  count={count}
                />
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            {activeTab === "overview" && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <FaEye className="text-[#E69233] text-2xl" />
                  <h2 className="text-2xl font-bold text-[#261F43]">Overview</h2>
                </div>
                <p className="text-gray-600 mb-8 leading-relaxed">{agent.description}</p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-[#E69233] flex items-center gap-2">
                      <FaCheckCircle />
                      Service Highlights
                    </h3>
                    <ul className="space-y-3">
                      {agent.highlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                          <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-[#E69233] flex items-center gap-2">
                      <FaInfoCircle />
                      Why Choose Us?
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">Local Expertise</h4>
                        <p className="text-blue-700 text-sm">Deep knowledge of Uttarakhand's hidden gems and local culture.</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-2">24/7 Support</h4>
                        <p className="text-purple-700 text-sm">Round-the-clock assistance throughout your journey.</p>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <h4 className="font-semibold text-orange-800 mb-2">Custom Planning</h4>
                        <p className="text-orange-700 text-sm">Tailored itineraries based on your preferences and budget.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "itinerary" && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <FaList className="text-[#E69233] text-2xl" />
                  <h2 className="text-2xl font-bold text-[#261F43]">Our Process</h2>
                </div>
                
                <div className="space-y-6">
                  {agent.itinerary.map((step, i) => (
                    <div key={i} className="relative flex gap-6 p-6 bg-gradient-to-r from-orange-50 to-transparent rounded-xl border border-orange-100">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-[#E69233] text-white rounded-full flex items-center justify-center text-lg font-bold">
                          {step.day}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-[#261F43]">{step.title}</h3>
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "inclusions" && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <FaCheckCircle className="text-[#E69233] text-2xl" />
                  <h2 className="text-2xl font-bold text-[#261F43]">What's Included & Excluded</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-green-600 flex items-center gap-2">
                      <FaCheckCircle />
                      Included Services
                    </h3>
                    <ul className="space-y-3">
                      {agent.inclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                          <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-red-600 flex items-center gap-2">
                      <FaTimesCircle />
                      Not Included
                    </h3>
                    <ul className="space-y-3">
                      {agent.exclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                          <FaTimesCircle className="text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "terms" && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <FaFileContract className="text-[#E69233] text-2xl" />
                  <h2 className="text-2xl font-bold text-[#261F43]">Terms & Conditions</h2>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <FaExclamationTriangle className="text-yellow-600" />
                    <p className="text-yellow-800 font-medium">Important Information</p>
                  </div>
                  <p className="text-yellow-700 text-sm">
                    Please read these terms carefully before booking. By proceeding with our services, you agree to these conditions.
                  </p>
                </div>

                <ul className="space-y-4">
                  {agent.terms.map((term, i) => (
                    <li key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="w-6 h-6 bg-[#E69233] text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                        {i + 1}
                      </div>
                      <span className="text-gray-700 leading-relaxed">{term}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "cancellation" && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <FaShieldAlt className="text-[#E69233] text-2xl" />
                  <h2 className="text-2xl font-bold text-[#261F43]">Cancellation Policy</h2>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <FaExclamationTriangle className="text-red-600" />
                    <p className="text-red-800 font-medium">Cancellation Notice</p>
                  </div>
                  <p className="text-red-700 text-sm">
                    Cancellation charges apply based on timing. Please review the policy below before booking.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">100%</div>
                    <div className="text-sm text-green-700 font-medium">Refund</div>
                    <div className="text-xs text-green-600 mt-1">10+ days before</div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-center">
                    <div className="text-2xl font-bold text-yellow-600 mb-2">50%</div>
                    <div className="text-sm text-yellow-700 font-medium">Refund</div>
                    <div className="text-xs text-yellow-600 mt-1">3-10 days before</div>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200 text-center">
                    <div className="text-2xl font-bold text-red-600 mb-2">0%</div>
                    <div className="text-sm text-red-700 font-medium">Refund</div>
                    <div className="text-xs text-red-600 mt-1">Less than 3 days</div>
                  </div>
                </div>

                <ul className="space-y-3">
                  {agent.cancellation.map((policy, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <FaInfoCircle className="text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{policy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "paymentModes" && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <FaCreditCard className="text-[#E69233] text-2xl" />
                  <h2 className="text-2xl font-bold text-[#261F43]">Payment Options</h2>
                </div>
                
                <p className="text-gray-600 mb-8">We offer multiple secure payment methods for your convenience:</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {agent.paymentModes.map((mode, i) => (
                    <div
                      key={i}
                      className="group p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105"
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-3">{mode.icon}</div>
                        <h4 className="font-semibold text-[#261F43] mb-2">{mode.name}</h4>
                        <p className="text-sm text-gray-600">{mode.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FaShieldAlt className="text-blue-600" />
                    <p className="text-blue-800 font-medium">Secure Payment</p>
                  </div>
                  <p className="text-blue-700 text-sm">
                    All transactions are secured with 256-bit SSL encryption. You will receive instant payment confirmation via email and SMS.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Action Bar for Mobile */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
            <div className="flex gap-3">
              <ContactButton
                type="phone"
                value={agent.contact.phone}
                icon={FaPhone}
                label="Call"
                className="flex-1 bg-[#E69233] text-white"
              />
              <ContactButton
                type="whatsapp"
                value={agent.contact.whatsapp}
                icon={FaWhatsapp}
                label="Chat"
                className="flex-1 bg-green-600 text-white"
              />
              <button
                onClick={handleQuoteRequest}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium"
              >
                Quote
              </button>
            </div>
          </div>

          {/* Additional padding for mobile sticky bar */}
          <div className="lg:hidden h-20" />
        </div>
      </section>
    </div>
  );
};

export default AgentDetailPage;