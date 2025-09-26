import React, { useEffect, useRef, useState } from "react";
import transportData from "../../data/transportData";
import { useNavigate } from "react-router-dom";
 
const CARD_WIDTH = 260;
const CARD_GAP = 24;
const AUTO_SCROLL_SPEED = 1; // px per frame
const PAUSE_DURATION = 1000; // ms
 
const VerifiedTransportCard = () => {
  const data = transportData;
  const scrollRef = useRef(null);
  const rafRef = useRef(null);
  const pauseTimeout = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
 
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
 
  const navigate = useNavigate();
 
  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
 
  // Auto-advance for mobile
  useEffect(() => {
    if (!isMobile || isPaused) return;
   
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 4000);
   
    return () => clearInterval(interval);
  }, [isMobile, isPaused, data.length]);
 
  // Auto-scroll continuous marquee (desktop only)
  useEffect(() => {
    if (isMobile) return; // Don't auto-scroll on mobile
   
    const container = scrollRef.current;
    if (!container) return;
 
    const scrollStep = () => {
      if (!isPaused && !isDragging.current) {
        container.scrollLeft += AUTO_SCROLL_SPEED;
 
        // Reset seamlessly at half scroll (since data is doubled)
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      rafRef.current = requestAnimationFrame(scrollStep);
    };
 
    rafRef.current = requestAnimationFrame(scrollStep);
 
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPaused, isMobile]);
 
  // Manual drag handlers
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    setIsPaused(true);
  };
 
  const handleMouseLeave = () => {
    isDragging.current = false;
  };
 
  const handleMouseUp = () => {
    isDragging.current = false;
    clearTimeout(pauseTimeout.current);
    pauseTimeout.current = setTimeout(() => setIsPaused(false), PAUSE_DURATION);
  };
 
  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX.current;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };
 
  // Touch handlers
  const handleTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    setIsPaused(true);
  };
 
  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = x - startX.current;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };
 
  const handleTouchEnd = () => {
    isDragging.current = false;
    clearTimeout(pauseTimeout.current);
    pauseTimeout.current = setTimeout(() => setIsPaused(false), PAUSE_DURATION);
  };
 
  // Button navigation
  const handleScroll = (direction) => {
    if (isMobile) {
      // Mobile navigation - change current index
      if (direction === "next") {
        setCurrentIndex((prev) => (prev + 1) % data.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
      }
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 2000);
    } else {
      // Desktop navigation - scroll container
      const container = scrollRef.current;
      const scrollAmount =
        direction === "next" ? CARD_WIDTH + CARD_GAP : -(CARD_WIDTH + CARD_GAP);
   
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setIsPaused(true);
      clearTimeout(pauseTimeout.current);
      pauseTimeout.current = setTimeout(() => setIsPaused(false), PAUSE_DURATION);
    }
  };
 
  return (
    <div className="relative flex flex-col items-center gap-6 px-4 sm:px-6 md:px-8 lg:px-16 py-6 bg-gray-100 min-h-fit">
      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 relative">
        {/* Heading - Always centered */}
        <div className="w-full sm:w-auto text-center sm:absolute left-1/2 sm:-translate-x-1/2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
            Verified Transporters
          </h1>
        </div>
 
        {/* Button - Centered on mobile, right-aligned on desktop */}
        <div className="mt-3 sm:mt-0 sm:ml-auto sm:static text-center sm:text-right">
          <button
            onClick={() => navigate("/verified-transporters-list")}
            className="text-sm px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            View All
          </button>
        </div>
      </div>
      {/* Navigation Buttons - Desktop: side position, Mobile: visible */}
      <button
        onClick={() => handleScroll("prev")}
        className={`absolute z-20 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700 transition transform ${
          isMobile
            ? 'left-4 top-1/2 -translate-y-1/2 flex'
            : 'left-2 top-1/2 -translate-y-1/2 hidden sm:flex'
        }`}
        aria-label="Previous"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
 
      <button
        onClick={() => handleScroll("next")}
        className={`absolute z-20 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700 transition transform ${
          isMobile
            ? 'right-4 top-1/2 -translate-y-1/2 flex'
            : 'right-2 top-1/2 -translate-y-1/2 hidden sm:flex'
        }`}
        aria-label="Next"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
 
      {/* Cards Container */}
      {isMobile ? (
        /* Mobile: Single Card View */
        <div className="w-full px-12">
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 max-w-sm mx-auto">
            <img
              src={data[currentIndex].image}
              alt={data[currentIndex].title}
              className="w-full h-40 object-cover rounded-t-lg cursor-pointer"
              onClick={() => navigate(`/verified-transport-details/${data[currentIndex].id}`)}
            />
           
            <div className="flex flex-col p-4">
              {/* Title + Verified */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-800 text-base">
                  {data[currentIndex].title}
                </h3>
                {data[currentIndex].verified && (
                  <span className="text-green-600 text-xs font-bold whitespace-nowrap ml-2">
                    ✔ Verified
                  </span>
                )}
              </div>
 
              {/* Location */}
              <div className="flex items-center text-gray-500 text-sm mb-2">
                <svg
                  className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>{data[currentIndex].location}</span>
              </div>
 
              {/* Rating */}
              <div className="text-yellow-500 text-sm mb-4">
                ★ {data[currentIndex].rating} ({data[currentIndex].reviews} reviews)
              </div>
 
              {/* CTA Button */}
              <button
                onClick={() => navigate(`/verified-transport-details/${data[currentIndex].id}`)}
                className="bg-blue-600 text-white text-sm px-6 py-2 rounded-full hover:bg-blue-700 transition w-full"
              >
                View Profile
              </button>
            </div>
          </div>
         
          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {data.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsPaused(true);
                  setTimeout(() => setIsPaused(false), 2000);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-blue-600 scale-125 shadow-lg' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to ${data[index].title}`}
              />
            ))}
          </div>
         
          <div className="text-center mt-3">
            <p className="text-sm text-gray-500">{currentIndex + 1} of {data.length} transporters</p>
          </div>
        </div>
      ) : (
        /* Desktop: Scroll Area with Multiple Cards */
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="overflow-hidden no-scrollbar w-full px-1 sm:px-2 md:px-4"
          style={{ whiteSpace: "nowrap" }}
        >
          {[...data, ...data].map((item, index) => (
            <div
              key={index}
              className="inline-block align-top w-[260px] mr-[24px] last:mr-0 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex-shrink-0"
            >
             
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-28 object-cover rounded-t-lg p-1 cursor-pointer"
              onClick={() => navigate(`/verified-transport-details/${item.id}`)}
            />
             
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
      )}
    </div>
  );
};
 
export default VerifiedTransportCard;
 
 