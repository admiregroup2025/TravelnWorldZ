import React, { useRef, useEffect } from "react";
import img1 from "../../assets/images/places/goa.png";
import img2 from "../../assets/images/places/darjheeling.png";
import img3 from "../../assets/images/places/kashmir.png";

const places = [
  { id: 1, name: "Goa", desc: "Sun, sand, and nightlife on India's western coast.", img: img1 },
  { id: 2, name: "Darjeeling", desc: "A peaceful hill station with scenic beauty and tea gardens.", img: img2 },
  { id: 3, name: "Kashmir", desc: "Heaven on earth – valleys, lakes, and snowcapped peaks.", img: img3 },
];

const PlaceToVisit = () => {
  const scrollRef = useRef(null);

  // Auto-scroll marquee
  useEffect(() => {
    const container = scrollRef.current;
    let scrollPos = 0;
    const speed = 1; // pixels per frame
    let frameId;

    const autoScroll = () => {
      if (!container) return;
      scrollPos += speed;
      if (scrollPos >= container.scrollWidth / 2) scrollPos = 0; // loop
      container.scrollLeft = scrollPos;
      frameId = requestAnimationFrame(autoScroll);
    };

    frameId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollDistance = 320; // width of a card
      container.scrollBy({
        left: direction === "left" ? -scrollDistance : scrollDistance,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-white py-8 sm:py-12 relative">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8 gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0f1b60] text-center sm:text-left">
          Places to visit
        </h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
          Explore All
        </button>
      </div>

      {/* SCROLLABLE CARDS */}
      <div className="overflow-hidden relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="hidden sm:flex absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-blue-600 text-white p-3 rounded-full shadow hover:bg-orange-700 transition duration-300"
          aria-label="Previous"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="hidden sm:flex absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-blue-600 text-white p-3 rounded-full shadow hover:bg-orange-700 transition duration-300"
          aria-label="Next"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Cards Container */}
        <div ref={scrollRef} className="flex space-x-3 sm:space-x-4 overflow-x-auto scrollbar-hide">
          {[...places, ...places].map((place, index) => (
            <div
              key={index}
              className="relative min-w-[260px] sm:min-w-[280px] md:min-w-[320px] h-72 sm:h-80 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 transition-transform duration-300 hover:scale-105"
            >
              <img src={place.img} alt={place.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg sm:text-xl font-semibold">{place.name}</h3>
                <p className="text-sm text-gray-200 max-w-xs leading-relaxed">{place.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlaceToVisit;
