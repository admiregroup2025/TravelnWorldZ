import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Bookmark, Share2, Edit3 } from "lucide-react";
import CustomerEnquiryForm from "../../forms/CustomerEnquiryFrom";
const Header = ({ travelItem }) => {
  const [saved, setSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleShare = async () => {
    const shareData = {
      title: travelItem.title,
      text: `Check out this travel spot: ${travelItem.title}`,
      url: window.location.href, 
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Shared successfully!");
      } catch (error) {
        console.log("Sharing failed:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert("Share not supported on this device. Link copied to clipboard.");
      } catch (err) {
        alert("Unable to copy the link.");
      }
    }
  };

  return (
   <header className="mb-6 border rounded-md p-5 shadow-sm relative">
  <div className="flex flex-col gap-4">
    {/* TITLE AND BADGES */}
    <div>
      <div className="flex items-start gap-2 mb-1 flex-wrap">
        {/* <span className="text-2xl">👍</span> */}
        <h1 className="font-bold text-2xl sm:text-3xl">{travelItem.title}</h1>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 text-sm mb-2">
        <div className="bg-green-600 text-white rounded-md px-2 py-0.5 font-semibold flex items-center gap-1">
          {travelItem.rating} ★
          <span className="text-white/80 font-normal">
            ({travelItem.reviewsCount} Ratings)
          </span>
        </div>
        <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-md text-xs font-medium">
          🏆 Trust
        </span>
        <span className="relative group bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md text-xs font-medium cursor-pointer">
        ✔ Verified
          <div className="absolute hidden group-hover:block bg-white text-black text-xs rounded p-2 top-full left-1/2 -translate-x-1/2 mt-1 w-max max-w-xs shadow-lg border z-10">
            This business information is verified.
          </div>
        </span>
        <span className="relative group bg-gray-100 text-black px-2 py-0.5 rounded-md text-xs font-medium cursor-pointer">
          ✅ Claimed
          <div className="absolute hidden group-hover:block bg-white text-black text-xs rounded p-2 top-full left-1/2 -translate-x-1/2 mt-1 w-max max-w-xs shadow-lg border z-10">
            This profile is officially claimed by the business.
          </div>
        </span>
      </div>

      {/* ADDRESS */}
      <p className="relative group text-sm text-gray-700 mb-2  font-semibold cursor-pointer">
        {travelItem.location || "Dwarka Mor Vipin Garden"} ·{" "}
        <span className="text-green-600 font-semibold">Open 24 Hrs</span> ·{" "}
        {travelItem.yearsInBusiness || "14 Years"} in Business
        <div className="absolute hidden group-hover:block bg-white text-black font-semibold text-xs text-semibold rounded p-4 top-full left-0 mt-1 w-max max-w-lg shadow-lg border z-10">
          {travelItem.fullAddress}
        </div>
      </p>
      {/* Services */}
      <div className="flex flex-wrap gap-4 text-gray-700 text-sm font-semibold mb-4">
        <span>Flight Booking</span>
        <span>Hotel Booking</span>
        <span>Good offers 17 Suggestions</span>
      </div>

      {/* BUTTONS + REVIEW */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Buttons */}
        <div className="flex flex-wrap gap-2">
          <button className="bg-green-600 text-white px-4 py-1.5 rounded font-semibold flex items-center gap-1">
            📞{travelItem.phone}
          </button>
          <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-1.5 rounded font-semibold">
            Enquire Now
          </button>
          <button className="border border-green-600 text-green-600 px-4 py-1.5 rounded font-semibold bg-green-50">
            WhatsApp
          </button>
          <button
            onClick={handleShare}
            className="border border-blue-600 px-3 py-1.5 rounded hover:bg-gray-100 text-blue-600 flex items-center gap-2"
            title="Share this travel item"
            aria-label="Share this travel item"
            >
            <Share2 size={16} /> <span className="hidden sm:inline text-blue-600 font-semibold ">Share</span>
          </button>
          <div className="relative group">
          <button className="border px-3 py-1.5 rounded hover:bg-gray-100 flex items-center gap-2">
            <Edit3 size={16} /> <span className="hidden sm:inline">Edit</span>
          </button>
          <div className="absolute hidden group-hover:block bg-white text-black text-xs rounded p-2 top-full left-1/2 -translate-x-1/2 mt-1 w-max shadow-lg border z-10">
            Edit/Suggest business information.
          </div>
        </div>
        </div>
        {showModal && (
          <CustomerEnquiryForm
            travelItem={travelItem}
            onClose={() => setShowModal(false)}
          />
        )}

        {/* Review Stars */}
        
      </div>
    </div>

    {/* NAVIGATION LINKS */}
    <nav className="mt-2 border-t pt-3 flex flex-wrap gap-4 sm:gap-6 text-gray-700 font-semibold text-sm">
      <a href="#overview" className="hover:text-blue-600">Overview</a>
      <a href="#photos" className="border-b-2 border-blue-600 text-blue-600">Photos</a>
      <a href="#packages" className="hover:text-blue-600">Tour Packages</a>
      <a href="#info" className="hover:text-blue-600">Quick Info</a>
      <a href="#services" className="hover:text-blue-600">Services</a>
      <a href="#reviews" className="hover:text-blue-600">Reviews</a>
      <Link
        to={`/transporter/${travelItem.id}/${travelItem.slug}/blogs`}
        className="hover:text-blue-600"
      >
        Blog
      </Link>

    </nav>
  </div>

  {/* TAGS + BOOKMARK */}
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
  );
};

export default Header;
