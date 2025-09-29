import React, { useRef, useEffect } from "react";
import img1 from "../../assets/images/places/goa.jpg";
import img2 from "../../assets/images/places/goa.jpg";
import img3 from "../../assets/images/places/goa.jpg";
import { useState } from "react";
 
const places = [
  { id: 1, name: "Goa", desc: "Sun, sand, and nightlife on India's western coast.", img: img1 },
  { id: 2, name: "Darjeeling", desc: "A peaceful hill station with scenic beauty and tea gardens.", img: img2 },
  { id: 3, name: "Kashmir", desc: "Heaven on earth – valleys, lakes, and snowcapped peaks.", img: img3 },
];

const AUTO_SCROLL_SPEED = 1;

const PlaceToVisit = () => {
  const scrollRef = useRef(null);
  const rafRef = useRef(null);
  const isPaused = useRef(false);
  const scrollPos = useRef(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [cardWidth, setCardWidth] = useState(300);
  const [cardGap, setCardGap] = useState(24);

  // Check screen size and adjust card dimensions
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 750;
      setIsMobile(mobile);

      if (mobile) {
        setCardWidth(window.innerWidth * 0.80);
        setCardGap(16);
      } else {
        setCardWidth(300);
        setCardGap(24);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Auto-scroll continuous marquee (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const container = scrollRef.current;
    if (!container) return;

    scrollPos.current = container.scrollLeft;

    const autoScroll = () => {
      if (!container) return;

      if (!isPaused.current) {
        scrollPos.current += AUTO_SCROLL_SPEED;

        if (scrollPos.current >= container.scrollWidth / 2) {
          scrollPos.current = 0;
          container.scrollLeft = 0;
          setCurrentCardIndex(0);
        } else {
          container.scrollLeft = scrollPos.current;
          const cardWidthWithGap = cardWidth + cardGap;
          const newIndex = Math.floor(scrollPos.current / cardWidthWithGap) % places.length;
          setCurrentCardIndex(newIndex);
        }
      } else {
        scrollPos.current = container.scrollLeft;
      }

      rafRef.current = requestAnimationFrame(autoScroll);
    };

    rafRef.current = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(rafRef.current);
  }, [isMobile, cardWidth, cardGap]);

  // Auto-advance for mobile
  useEffect(() => {
    if (!isMobile || isPaused.current) return;

    const interval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % places.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isMobile]);

  // Hover handlers (desktop only)
  const handleMouseEnter = () => {
    if (!isMobile) isPaused.current = true;
  };
  const handleMouseLeave = () => {
    if (!isMobile) isPaused.current = false;
  };

  // Manual button scroll
  const handleManualScroll = (direction) => {
    isPaused.current = true;

    let newIndex;
    if (direction === "next") newIndex = (currentCardIndex + 1) % places.length;
    else newIndex = (currentCardIndex - 1 + places.length) % places.length;

    setCurrentCardIndex(newIndex);

    if (!isMobile) {
      const container = scrollRef.current;
      if (container) {
        const cardWidthWithGap = cardWidth + cardGap;
        let targetScroll = newIndex * cardWidthWithGap;

        if (direction === "next" && newIndex === 0) targetScroll = places.length * cardWidthWithGap;

        container.scrollTo({
          left: targetScroll,
          behavior: "smooth",
        });
        scrollPos.current = targetScroll;
      }
    }

    setTimeout(() => {
      isPaused.current = false;
    }, 1000);
  };

  return (
    <section className="w-full bg-white py-6 sm:py-12 relative">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8 gap-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center flex-grow sm:flex-grow-0 sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2">
          Places to visit
        </h2>
        <button className="hidden sm:block ml-auto bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition duration-300">
          Explore All
        </button>
      </div>

      {/* SCROLLABLE CARDS */}
      <div className="relative flex flex-col items-center gap-4 sm:gap-6 px-2 sm:px-6 md:px-8 lg:px-14 py-4 sm:py-6 min-h-fit">
        {/* Left Button */}
        <button
          onClick={() => handleManualScroll("prev")}
          className="absolute z-20 bg-blue-600 text-white p-2 sm:p-2 rounded-full shadow hover:bg-blue-700 transition transform left-0 sm:left-4 top-1/2 -translate-y-1/2"
          aria-label="Previous"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-6 sm:w-6"
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
          onClick={() => handleManualScroll("next")}
          className="absolute z-20 bg-blue-600 text-white p-2 sm:p-2 rounded-full shadow hover:bg-blue-700 transition transform right-0 sm:right-4 top-1/2 -translate-y-1/2"
          aria-label="Next"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Cards */}
        {isMobile ? (
          <div className="w-full px-4">
            <div
              className="group relative w-full rounded-2xl overflow-hidden shadow-lg mx-auto"
              style={{ maxWidth: `${cardWidth}px` }}
            >
              <div className="overflow-hidden">
                <img
                  src={places[currentCardIndex].img}
                  alt={places[currentCardIndex].name}
                  className="w-full h-[250px] sm:h-[350px] object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-white text-lg sm:text-xl font-semibold">
                  {places[currentCardIndex].name}
                </h3>
                <p className="text-gray-200 text-sm">{places[currentCardIndex].desc}</p>
              </div>
            </div>

            {/* Mobile: Explore Button below cards */}
            <div className="mt-4 flex justify-center">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700 transition duration-300">
                Explore All
              </button>
            </div>
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="overflow-hidden no-scrollbar w-full px-1 sm:px-2 md:px-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ whiteSpace: "nowrap" }}
          >
            {[...places, ...places].map((place, index) => (
              <div
                key={index}
                className="inline-block align-top flex-shrink-0"
                style={{
                  width: `${cardWidth}px`,
                  marginRight: `${index === [...places, ...places].length - 1 ? 0 : cardGap}px`,
                }}
              >
                <div
                  className="group relative w-full rounded-2xl overflow-hidden shadow-lg"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="overflow-hidden">
                    <img
                      src={place.img}
                      alt={place.name}
                      className="w-full h-[300px] sm:h-[350px] object-cover transform transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4">
                    <h3 className="text-white text-lg font-semibold">{place.name}</h3>
                    <p className="text-gray-200 text-sm">{place.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PlaceToVisit;