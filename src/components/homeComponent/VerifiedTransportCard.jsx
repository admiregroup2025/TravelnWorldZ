import React, { useEffect, useRef, useState } from "react";
import transportData from "../../data/transportData";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
 
const CARD_WIDTH = 260;
const CARD_GAP = 24;
const AUTO_SCROLL_SPEED = 1;
const PAUSE_DURATION = 1000;
 
const VerifiedTransportCard = () => {
  const data = transportData;
  const scrollRef = useRef(null);
  const pauseTimeout = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
 
  const navigate = useNavigate();
  // Auto-scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || isPaused) return;
 
    let animationId;
 
    const autoScroll = () => {
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += AUTO_SCROLL_SPEED;
      }
      animationId = requestAnimationFrame(autoScroll);
    };
 
    animationId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);
 
  // Scroll manually
  const handleScroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = direction === "next" ? CARD_WIDTH + CARD_GAP : -(CARD_WIDTH + CARD_GAP);
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    pauseTemporarily();
  };
 
  const pauseTemporarily = () => {
    setIsPaused(true);
    clearTimeout(pauseTimeout.current);
    pauseTimeout.current = setTimeout(() => setIsPaused(false), PAUSE_DURATION);
  };
 
  // Swipe events for mobile
  const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const deltaX = touchEndX.current - touchStartX.current;
    if (Math.abs(deltaX) > 50) {
      handleScroll(deltaX < 0 ? "next" : "prev");
    }
  };
 
  return (
    <div className="relative flex flex-col items-center gap-6 px-4 sm:px-6 md:px-8 lg:px-16 py-6 bg-gray-100 min-h-fit">
      {/* Header */}
      <div className="w-full relative text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4">
          Verified Transporters
        </h1>
        <button
          onClick={() => navigate("/verified-transporters-list")}
          className="absolute right-0 top-0 text-sm px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-600 transition"
        >
          View All
        </button>
      </div>
 
      {/* Prev Button */}
      <button
        onClick={() => handleScroll("prev")}
        className="hidden sm:flex absolute left-1 top-1/2 transform -translate-y-1/2 z-10 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700 transition"
        aria-label="Previous"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
 
      {/* Next Button */}
      <button
        onClick={() => handleScroll("next")}
        className="hidden sm:flex absolute right-1 top-1/2 transform -translate-y-1/2 z-10 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700 transition"
        aria-label="Next"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>
 
      {/* Cards Scroll Area */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="overflow-x-auto no-scrollbar w-full scroll-smooth px-1 sm:px-2 md:px-4"
        style={{ whiteSpace: "nowrap" }}
      >
        {[...data, ...data].map((item, index) => (
          <div
            key={index}
            className="inline-block align-top w-[260px] mr-[24px] last:mr-0 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex-shrink-0"
          >
            <a href={item.website} target="_blank" rel="noopener noreferrer">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-28 object-cover rounded-t-lg p-1 cursor-pointer"
                onClick={() => navigate(`/verified-transport-details/${item.id}`)}
              />
            </a>
            <div className="flex flex-col flex-grow p-2 text-sm h-full">
              {/* Title + Verified */}
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-gray-800 text-sm truncate max-w-[160px]">
                  {item.title}
                </h3>
                {item.verified && (
                  <span className="text-green-600 text-[10px] font-bold whitespace-nowrap ml-2">
                    ✔ Verified
                  </span>
                )}
              </div>
 
              {/* Location */}
              <div className="flex items-center text-gray-500 text-xs mb-1 overflow-hidden text-ellipsis whitespace-nowrap">
                <svg
                  className="w-4 h-4 mr-1 text-gray-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span className="truncate">{item.location}</span>
              </div>
 
              {/* Rating */}
              <div className="text-yellow-500 text-xs mb-2">
                ★ {item.rating} ({item.reviews} reviews)
              </div>
 
              {/* CTA Button */}
              <div className="mt-auto flex justify-center">
                <button
                  onClick={() => navigate(`/verified-transport-details/${item.id}`)}
                  className="bg-blue-600 text-white text-xs px-4 py-1 rounded-full hover:bg-blue-700 transition mx-auto"
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
 
        ))}
      </div>
    </div>
  );
};
 
export default VerifiedTransportCard;
 
 