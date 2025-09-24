import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Phone,
  MapPin,
  Clock,
  Mail,
  Share2,
  Globe,
  Star,
  Edit,
  Copy,
  Edit3,
  Bookmark,
} from "lucide-react";
import transportData from "../data/transportData";
import ReviewForm from "../forms/ReviewForm";
import HappyCustomer from "./verifiedTransportDetails/HappyCustomer";
import HappyCustomerVideo from "./verifiedTransportDetails/HappyCustomerVideo";
import HappyCustomerImages from "./verifiedTransportDetails/HappyCustomerImages";

const VerifiedTransportDetails = () => {
  const { id } = useParams();
  const travelItem = transportData.find((item) => item.id === parseInt(id));

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [saved, setSaved] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);

  if (!travelItem) return <div className="p-4">Travel details not found.</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${name}! We'll contact you at ${mobile} shortly.`);
    setName("");
    setMobile("");
  };

  return (
    <div className="w-full px-4 py-6 bg-white min-h-screen font-sans">
      {/* HEADER */}
      <header className="mb-6 border rounded-md p-5 shadow-sm relative">
        <div className="flex flex-col gap-4">
{/* TITLE AND BADGES */}
<div>
  <div className="flex items-center gap-2 mb-1">
    <span className="text-2xl">👍</span>
    <h1 className="font-bold text-3xl">{travelItem.title}</h1>
  </div>
  <div className="flex items-center flex-wrap gap-2 text-sm mb-2">
    <div className="bg-green-600 text-white rounded-md px-2 py-0.5 font-semibold flex items-center gap-1">
      {travelItem.rating} ★{" "}
      <span className="text-white/80 font-normal">
        ({travelItem.reviewsCount} Ratings)
      </span>
    </div>

    {/* Trust Badge with Tooltip */}
    <span className="relative group bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-md text-xs font-medium cursor-pointer">
      🏆 Trust
      {/* <div className="absolute hidden group-hover:block bg-white text-black text-xs rounded p-2 top-full left-1/2 -translate-x-1/2 mt-1 w-max max-w-xs shadow-lg border z-10">
        This business is marked as trusted.
      </div> */}
    </span>

    {/* Verified Badge with Tooltip */}
    <span className="relative group bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md text-xs font-medium cursor-pointer">
      ✔ Verified
      <div className="absolute hidden group-hover:block bg-white text-black text-xs rounded p-2 top-full left-1/2 -translate-x-1/2 mt-1 w-max max-w-xs shadow-lg border z-10">
        This business information is verified.
      </div>
    </span>

    {/* Claimed Badge with Tooltip */}
    <span className="relative group bg-gray-100 text-black px-2 py-0.5 rounded-md text-xs font-medium cursor-pointer">
      ✅ Claimed
      <div className="absolute hidden group-hover:block bg-white text-black text-xs rounded p-2 top-full left-1/2 -translate-x-1/2 mt-1 w-max max-w-xs shadow-lg border z-10">
        This profile is officially claimed by the business.
      </div>
    </span>
  </div>

  {/* ADDRESS WITH SHORT + FULL TOOLTIP */}
  <p className="relative group text-sm text-gray-700 mb-2  font-semibold cursor-pointer">
    {travelItem.shortAddress || "Dwarka Mor Vipin Garden"} ·{" "}
    <span className="text-green-600 font-semibold">Open 24 Hrs</span> ·{" "}
    {travelItem.yearsInBusiness || "14 Years"} in Business
    <div className="absolute hidden group-hover:block bg-white text-black font-semibold text-xs text-semibold rounded p-4 top-full left-0 mt-1 w-max max-w-lg shadow-lg border z-10">
      {travelItem.fullAddress ||
        "Dwarka Mor Vipin Garden, Nawada, Delhi, 110059"}
    </div>
  </p>

  <div className="flex gap-6 text-gray-700 text-sm  mb-4 flex-wrap">
    <span>Flight Booking</span>
    <span>Hotel Booking</span>
    <span > <b>"Good offers"</b> 17 Suggestions</span>
  </div>

  {/* BUTTONS + REVIEW START */}
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div className="flex gap-2 flex-wrap">
      <button className="bg-green-600 text-white px-4 py-1.5 rounded font-semibold flex items-center gap-1">
        📞 07329212 {travelItem.phone}
      </button>
      <button className="bg-blue-600 text-white px-4 py-1.5 rounded font-semibold">
        Enquire Now
      </button>
      <button className="border border-green-600 text-green-600 px-4 py-1.5 rounded font-semibold bg-green-50">
        WhatsApp
      </button>
      <button className="border px-3 py-1.5 rounded hover:bg-gray-100 flex items-center gap-2">
        <Share2 size={16} /> <span className="hidden sm:inline">Share</span>
       </button>
      {/* Edit Button with Tooltip */}
        <div className="relative group">
          <button className="border px-3 py-1.5 rounded hover:bg-gray-100 flex items-center gap-2">
            <Edit3 size={16} /> <span className="hidden sm:inline"></span>
          </button>
          <div className="absolute hidden group-hover:block bg-white text-black text-xs rounded p-2 top-full left-1/2 -translate-x-1/2 mt-1 w-max shadow-lg border z-10">
            Edit/Suggest business information.
          </div>
        </div> 
    </div>
  </div>
</div>


          {/* NAVIGATION LINKS */}
          <nav className="mt-2 border-t pt-3 flex gap-6 text-gray-700 font-semibold text-sm">
            <a href="#overview" className="hover:text-blue-600">
              Overview
            </a>
            <a href="#photos" className="border-b-2 border-blue-600 text-blue-600">
              Photos
            </a>
            <a href="#packages" className="hover:text-blue-600">
              Tour Packages
            </a>
            <a href="#info" className="hover:text-blue-600">
              Quick Info
            </a>
            <a href="#services" className="hover:text-blue-600">
              Services
            </a>
            <a href="#reviews" className="hover:text-blue-600">
              Reviews
            </a>
          </nav>
        </div>

        {/* ✅ ABSOLUTE TAGS + BOOKMARK BUTTON */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md text-xs">
            Travel Agents
          </span>
          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md text-xs">
            Tour Operators For Chardham
          </span>
          <button
            onClick={() => setSaved(!saved)}
            className={`ml-2 border rounded p-2 transition ${
              saved ? "bg-yellow-400 text-white" : "hover:bg-gray-100"
            }`}
            title="Save"
          >
            <Bookmark
              size={18}
              className={saved ? "fill-white" : ""}
              fill={saved ? "white" : "none"}
            />
          </button>
        </div>
      </header>

       {/* MAIN CONTENT SPLIT */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* LEFT SIDE */}
        <div className="w-full lg:w-[80%] flex flex-col gap-6 mb-6 border rounded-md p-5 shadow-sm relative">

          {/* Photos */}
            <section id="photos">
            <h2 className="font-semibold text-lg mb-4">Photos</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* All */}
              <div className="border rounded-md overflow-hidden shadow-sm">
                <img src={travelItem.image} alt="All" className="w-full h-[140px] object-cover" />
                <div className="p-2">
                  <p className="font-semibold text-sm">All</p>
                  <p className="text-sm text-gray-600">58 Photos / Videos</p>
                </div>
              </div>
              {/* Video */}
              <div className="border rounded-md overflow-hidden shadow-sm relative">
                <img src={travelItem.image} alt="Video" className="w-full h-[140px] object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/50 text-white rounded-full p-2 text-sm">▶</div>
                </div>
                <div className="p-2">
                  <p className="font-semibold text-sm">Video</p>
                  <p className="text-sm text-gray-600">3 Videos</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button className="bg-blue-600 text-white px-5 py-2 rounded font-semibold">Upload Photos</button>
            </div>
          </section>

          {/* Tour Packages */}
          <section id="packages">
            <h2 className="font-semibold text-lg mb-4">Tour Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {travelItem.tourPackages.map((pkg, i) => (
                <div key={i} className="border rounded-md p-4 shadow-sm">
                  <h3 className="font-bold text-base mb-1">Packages For {pkg.destination}</h3>
                  <p className="text-gray-600 text-sm mb-2">{pkg.description}</p>
                  <p className="font-semibold text-sm mb-2">{pkg.price} onwards</p>
                  <div className="flex flex-col gap-1">
                    <button className="text-blue-600 text-sm font-medium underline w-fit">View Details</button>
                    <button className="border border-blue-600 text-blue-600 text-sm font-semibold py-1 rounded hover:bg-blue-50 w-full">
                      Enquire Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Info */}
          <section id="info">
            <h2 className="font-semibold text-lg mb-4">Quick Information</h2>
            <p>Year of Establishment: <strong>{travelItem.established || "2011"}</strong></p>
          </section>
          <HappyCustomer />
      
          <HappyCustomerVideo />
          <HappyCustomerImages />

          {/* Reviews */}
          <section id="reviews">
            <h2 className="font-semibold text-xl mb-4">Reviews & Ratings</h2>

            {/* Top Summary */}
            <div className="flex items-center gap-4 mb-6">
                <div className="bg-green-600 text-white text-xl font-bold px-4 py-2 rounded-md">
                4.9
                </div>
                <div>
                <p className="font-semibold text-gray-800">599 Ratings</p>
                <p className="text-sm text-gray-500">Jd rating index based on 599 ratings across the web</p>
                </div>
            </div>

            {/* Start Your Review */}
            <div className="mb-6">
                <p className="font-medium text-gray-800 mb-2">Start your Review</p>
                <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                    <span
                    key={n}
                    onClick={() => {
                    setSelectedRating(n);       
                    setShowReviewForm(true);   
                    }}
                    className="text-gray-400 text-2xl cursor-pointer hover:text-yellow-400 transition"
                    >
                    ★
                    </span>
                ))}
                </div>
            </div>
                {showReviewForm && (
                    <ReviewForm
                        isOpen={showReviewForm}
                        onClose={() => setShowReviewForm(false)}
                        rating={selectedRating}
                    />
                )}  
            {/* Recent Rating Trend */}
            <div className="mb-6">
                <p className="font-medium text-gray-800 mb-2">Recent rating trend</p>
                <div className="flex flex-wrap gap-2">
                {Array(10).fill().map((_, i) => (
                    <div
                    key={i}
                    className="flex items-center gap-1 border px-3 py-1 rounded-full text-sm"
                    >
                    <span className="text-black font-semibold">5.0</span>
                    <span className="text-yellow-500">★</span>
                    </div>
                ))}
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 mb-4">
                <button className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full">
                Relevant
                </button>
                <button className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
                Latest
                </button>
                <button className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
                High to Low
                </button>
            </div>

            {/* Review Highlights */}
            <div className="flex flex-wrap gap-2 mb-6">
                {[
                "Good offers (17)",
                "Great service (16)",
                "Reasonably priced (16)",
                "Great recommendations (15)",
                "Quick service (14)",
                "Multilingual assistance (12)",
                "Hassle-free process (11)",
                "Efficient (10)",
                "Food restrictions considered (8)",
                "Timely reservations (7)",
                ].map((tag, i) => (
                <span
                    key={i}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                    {tag}
                </span>
                ))}
            </div>

            {/* User Review */}
            <div className="border-t pt-6">
                <div className="flex items-center gap-3 mb-2">
                <img
                    src="https://via.placeholder.com/40"
                    alt="user"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                    <p className="font-semibold text-sm">Isha Rajput</p>
                    <p className="text-xs text-gray-500">1 review</p>
                </div>
                <span className="ml-auto text-xs text-gray-400">31 Dec 2024</span>
                </div>

                {/* 5 Star Display */}
                <div className="text-red-500 text-lg mb-2">★★★★★</div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                {["Timely reservations", "Fast response", "Reasonably priced", "Good offers"].map((tag, i) => (
                    <span key={i} className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                    ✅ {tag}
                    </span>
                ))}
                </div>

                {/* Review Text */}
                <p className="text-sm text-gray-700 italic mb-4">
                "Sitaaram Travels Pvt Ltd is an excellent choice for travel needs. They are always prompt in making reservations and provide fast responses to queries. Their prices are reasonable and they often have good offers available. I highly recommend their services!"
                </p>

                {/* Actions */}
                <div className="flex gap-6 text-sm text-gray-500">
                <button className="flex items-center gap-1 hover:text-gray-800">
                    👍 Helpful (1)
                </button>
                <button className="flex items-center gap-1 hover:text-gray-800">
                    💬 Comment
                </button>
                <button className="flex items-center gap-1 hover:text-gray-800">
                    🔗 Share
                </button>
                </div>
            </div>
        </section>


        </div>

        {/* RIGHT SIDE */}


        <div className="w-full lg:w-[20%] flex flex-col gap-6">

        {/* Contact Card */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border rounded-lg shadow-sm bg-white"
        >
            <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-800 text-sm">Contact</h3>
            <a
                href={`tel:${travelItem.phone}`}
                className="text-blue-600 font-medium text-sm hover:underline"
            >
                {travelItem.phone}
            </a>
            </div>

            <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-800 text-sm mb-1">Address</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{travelItem.address}</p>
            <div className="flex gap-4 mt-2 text-xs text-blue-600">
                <button className="flex items-center gap-1 hover:underline">
                <MapPin size={14} /> Get Directions
                </button>
                <button className="flex items-center gap-1 hover:underline">
                <Copy size={14} /> Copy
                </button>
            </div>
            </div>

            <div className="p-4 flex items-center justify-between border-b">
            <span className="flex items-center gap-2 text-green-600 font-medium text-sm">
                <Clock size={14} /> Open 24 Hrs
            </span>
            </div>

            <div className="p-4 flex flex-col gap-3 text-sm text-blue-600">
            <button className="flex items-center gap-2 hover:underline">
                <Edit size={14} /> Suggest New Timings
            </button>
            <button className="flex items-center gap-2 hover:underline">
                <Mail size={14} /> Send Enquiry by Email
            </button>
            <button className="flex items-center gap-2 hover:underline">
                <Phone size={14} /> Get info via SMS/Email
            </button>
            <button className="flex items-center gap-2 hover:underline">
                <Share2 size={14} /> Share
            </button>
            <button className="flex items-center gap-2 hover:underline">
                <Star size={14} /> Tap to rate
            </button>
            <button className="flex items-center gap-2 hover:underline">
                <Edit size={14} /> Edit this Listing
            </button>
            <button className="flex items-center gap-2 hover:underline">
                <Globe size={14} /> Visit our Website
            </button>
            <button className="flex items-center gap-2 hover:underline">
                <Share2 size={14} /> Follow us
            </button>
            </div>

            <div className="p-4 border-t text-xs text-gray-600">
            GSTIN: <span className="font-medium">{travelItem.gstin}</span>
            </div>
        </motion.div>

        {/* Also listed in */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="border rounded-lg shadow-sm bg-white p-4"
        >
            <h3 className="font-semibold text-gray-800 text-sm mb-3">Also listed in</h3>
            <div className="flex flex-wrap gap-2">
            {[
                "Travel Agents",
                "Tour Operators For Chardham",
                "Tour Packages For Chardham",
                "Tour Operators",
                "Tour Operators For Kedarnath",
                "Tour Packages For Kedarnath",
                "Car Rental For Chardham",
                "Tour Packages",
                "Tour Packages For Badrinath",
                "Tour Operators For Badrinath",
            ].map((tag, i) => (
                <span
                key={i}
                className="px-3 py-1 text-xs bg-gray-100 border rounded-full cursor-pointer hover:bg-gray-200 transition"
                >
                {tag}
                </span>
            ))}
            </div>
            <button className="mt-3 text-blue-600 text-sm font-medium hover:underline">More</button>
        </motion.div>

        {/* Report an error */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="border rounded-lg shadow-sm bg-white p-4"
        >
            <h3 className="font-semibold text-gray-800 text-sm mb-2">Report an error</h3>
            <p className="text-xs text-gray-600 mb-3">
            Help us to make this listing more updated and relevant for you.
            </p>
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-600 hover:text-white transition">
            Report Now
            </button>
        </motion.div>

        {/* Extra Card 1 */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="border rounded-lg shadow-sm bg-white p-4"
        >
            <h3 className="font-semibold text-gray-800 text-sm mb-2">Nearby Listings</h3>
            <ul className="text-sm text-blue-600 space-y-1">
            <li><a href="#" className="hover:underline">Hotels in Rishikesh</a></li>
            <li><a href="#" className="hover:underline">Taxi Services</a></li>
            <li><a href="#" className="hover:underline">Tour Guides</a></li>
            </ul>
        </motion.div>        
    </div>

    </div>
    </div>
  );
};

export default VerifiedTransportDetails;
