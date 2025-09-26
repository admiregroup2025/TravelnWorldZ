import React from 'react';
import { useNavigate } from 'react-router-dom';
import transportData from '../../data/transportData';
import TopMostBanner from './TopMostBanner';
 
const TransportersList = () => {
  const navigate = useNavigate();
 
  return (
    <div className="px-4 pb-10 bg-gray-50 min-h-screen">
      <TopMostBanner />
 
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 text-sm font-semibold flex items-center"
        >
          ← Back
        </button>
      </div>
 
      {/* Title */}
      <h1 className="text-3xl mt-1 font-serif font-bold mb-10 text-black">
        Transporters List
      </h1>
 
      {/* Two-column layout (Responsive) */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column - Transport Cards */}
        <div className="w-full lg:w-[70%] space-y-6">
          {transportData.map((item, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-xl shadow-lg border border-gray-200 flex flex-col md:flex-row overflow-hidden"
            >
              {/* Left: Image */}
              <div className="relative w-full md:w-[300px]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[200px] object-cover md:h-[170px] p-[5px]"
                />
                {/* Carousel Buttons */}
                <button className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-xl hidden sm:block">❮</button>
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-xl hidden sm:block">❯</button>
              </div>
 
              {/* Right: Details */}
              <div className="md:w-2/3 p-4 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-800 text-lg">{item.title}</h3>
                  {item.verified && (
                    <span className="text-blue-600 text-xs font-semibold ml-2">✔ Verified</span>
                  )}
                </div>
 
                <div className="flex items-center mb-1 flex-wrap">
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded mr-2">
                    {item.rating} ★
                  </span>
                  <span className="text-gray-500 text-sm">({item.reviews} reviews)</span>
                  {item.popular && (
                    <span className="ml-2 text-orange-500 text-xs bg-orange-100 px-2 py-0.5 rounded">
                      🔥 Popular
                    </span>
                  )}
                </div>
 
                <div className="text-sm text-gray-600 mb-2">
                  📍 {item.location} • {item.distance}
                </div>
 
                <div className="flex flex-wrap gap-2 text-xs mb-3">
                  {item.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
 
                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 mt-auto">
                  <a
                    href={`tel:${item.phone}`}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    📞 {item.phone}
                  </a>
                  <a
                    href={`https://wa.me/${item.whatsapp}`}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    💬 WhatsApp
                  </a>
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm ml-auto"
                  >
                    Get Best Deal
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
 
        {/* Right Column - Ads Section */}
        <div className="w-full lg:w-[30%] bg-white shadow-lg rounded-xl p-6 h-fit sticky top-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">We Have ads Sections</h2>
          {/* Placeholder for future ads or form */}
        </div>
      </div>
    </div>
  );
};
 
export default TransportersList;
 

 