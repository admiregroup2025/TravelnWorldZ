import React from "react";
import transportData from "../../data/transportData";

const CARD_WIDTH = 260;
const CARD_GAP = 24;

const VerifiedTransportCard = () => {
  const data = transportData;

  return (
    <div className="w-full py-10 bg-gray-100"> 
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Verified Transporters
      </h2>

      <div className="overflow-hidden relative w-full"> {/* Reduced side padding to 8px */}
        <div
          className="flex gap-[24px] w-max animate-scroll"
          style={{
            width: `${CARD_WIDTH * 3 + CARD_GAP * 2}px`, // shows exactly 3 cards with minimal space
          }}
        >
          <div className="flex gap-[24px] w-max animate-scroll">
            {[...data, ...data].map((item, index) => (
              <div
                key={index}
                className="w-[260px] flex-shrink-0 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <a
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-36 object-cover rounded-t-lg"
                  />
                </a>
                <div className="flex flex-col flex-grow p-4 text-sm h-full">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    {item.verified && (
                      <span className="text-green-600 text-xs font-bold">
                        ✔ Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-gray-500 text-xs mb-2">
                    <svg
                      className="w-4 h-4 mr-1 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    {item.location}
                  </div>
                  <div className="text-yellow-500 text-xs mb-3">
                    ★ {item.rating} ({item.reviews} reviews)
                  </div>
                  <div className="mt-auto pt-2">
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-blue-600 text-white text-center py-2 rounded-md text-sm hover:bg-blue-700 transition"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifiedTransportCard;
