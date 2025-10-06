import React from 'react';
import freeAgentsData from '../data/freeAgentsData'; 
import TopMostBanner from '../components/homeComponent/TopMostBanner';

const FreeAgents = () => {

  return (
    <div className="px-4 pb-10 bg-gray-50 min-h-screen">
      <TopMostBanner />
      {/* Title */}
      <h1 className="text-3xl mt-1 font-serif font-bold mb-10 text-black">
        Registered Travel Partners
      </h1>
      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column: List */}
        <div className="w-[65vw] space-y-6">
          {freeAgentsData.map((agent, index) => (
            <div
              key={index}
              className="bg-blue-100 rounded-xl shadow-lg border border-blue-200 flex flex-col md:flex-row overflow-hidden max-w-full"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-[200px] h-[200px] p-2 object-contain"
                />
              </div>
              {/* Details */}
              <div className="md:w-2/3 p-4 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-800 text-lg">{agent.title}</h3>
                  {agent.verified && (
                    <span className="text-blue-600 text-xs font-semibold ml-2">✔ Verified</span>
                  )}
                </div>
                <div className="flex items-center mb-1">
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded mr-2">
                    {agent.rating} ★
                  </span>
                  <span className="text-gray-500 text-sm">({agent.reviews} reviews)</span>
                  {agent.popular && (
                    <span className="ml-2 text-orange-500 text-xs bg-orange-100 px-2 py-0.5 rounded">
                      🔥 Popular
                    </span>
                  )}
                </div>
                {/* Title and Full Address */}
                <p className="text-sm text-gray-700 mb-1 italic">{agent.name}</p>
                <p className="text-sm text-gray-600 mb-1">📍 {agent.fullAddress}</p>

                {/* Location and Experience */}
                <div className="text-sm text-gray-600 mb-3">
                  {agent.location} • {agent.experience}
                </div>
                {/* Contact Info as selectable text */}
                <div className="flex items-center gap-4 mt-auto flex-wrap text-sm">
                  <div className="bg-green-600 text-white p-1 rounded select-text cursor-text">
                    📞 {agent.phone}
                  </div>
                  <div className="bg-green-500 text-white px-3 py-1 rounded select-text cursor-text">
                    💬 {agent.whatsapp}
                  </div>
                  <a
                    href={agent.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-3 py-1 rounded ml-auto"
                  >
                    Get Best Deal
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Sticky Ad */}
        <div className="w-[30vw] bg-blue-100 shadow-lg rounded-xl p-6 h-fit sticky top-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Your Ad Here</h2>
        </div>
      </div>
    </div>
  );
};

export default FreeAgents;
