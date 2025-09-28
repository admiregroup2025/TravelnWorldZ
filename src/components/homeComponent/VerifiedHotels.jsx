import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ItineraryCard from "../../components/ItineraryCard";
import hotels from "../../data/hotels";

const CARD_WIDTH = 260;
const GAP = 32;
const VISIBLE_CARDS = 4;
const SCROLL_STEP = CARD_WIDTH + GAP;

const VerifiedHotels = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const animationFrameId = useRef(null);

  const duplicatedHotels = [...hotels, ...hotels];

  const [isHovered, setIsHovered] = useState(false);
  const [isManualScrolling, setIsManualScrolling] = useState(false);

  const scrollSpeed = 0.5;

  const autoScroll = () => {
    const el = scrollRef.current;
    if (!el || isHovered || isManualScrolling) {
      animationFrameId.current = requestAnimationFrame(autoScroll);
      return;
    }

    el.scrollLeft += scrollSpeed;

    const maxScrollLeft = el.scrollWidth / 2;
    if (el.scrollLeft >= maxScrollLeft) {
      el.scrollLeft -= maxScrollLeft;
    }

    animationFrameId.current = requestAnimationFrame(autoScroll);
  };

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [isHovered, isManualScrolling]);

  const handlePrev = () => {
    const el = scrollRef.current;
    if (!el) return;
    setIsManualScrolling(true);
    el.scrollBy({ left: -SCROLL_STEP, behavior: "smooth" });
    setTimeout(() => setIsManualScrolling(false), 500);
  };

  const handleNext = () => {
    const el = scrollRef.current;
    if (!el) return;
    setIsManualScrolling(true);
    el.scrollBy({ left: SCROLL_STEP, behavior: "smooth" });
    setTimeout(() => setIsManualScrolling(false), 500);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      const maxScrollLeft = el.scrollWidth / 2;
      if (el.scrollLeft >= maxScrollLeft) {
        el.scrollLeft -= maxScrollLeft;
      } else if (el.scrollLeft <= 0) {
        el.scrollLeft += maxScrollLeft;
      }
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="px-6 md:px-12 py-10 max-w-[1400px] w-full mx-auto">
      {/* Heading + View All */}
      <div className="flex justify-center items-center relative mb-8">
        <h1 className="text-xl md:text-3xl font-extrabold uppercase tracking-wide text-black text-center flex-1">
          VERIFIED HOTELS
        </h1>

        <button
          onClick={() => navigate("/all-hotels")}
          className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-semibold shadow-md transition duration-300"
        >
          View All
        </button>
      </div>

      {/* Carousel with arrows */}
      <div className="relative flex items-center justify-center">
        {/* Left arrow */}
        <button
          onClick={handlePrev}
          disabled={isManualScrolling}
          className={`absolute top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition duration-300 z-20 ${
            isManualScrolling ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Previous"
          style={{ left: "-40px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Cards container */}
        <div
          className="overflow-hidden "
          style={{ width: (CARD_WIDTH + GAP) * VISIBLE_CARDS - GAP }}
        >
          <div
            ref={scrollRef}
            className="flex space-x-8 scroll-smooth scrollbar-hide"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ scrollSnapType: "x mandatory" }}
          >
            {duplicatedHotels.map(({ id, name, title, image }, idx) => (
              <div
                key={`${id}-${idx}`}
                className="flex-shrink-0 bg-white rounded-md shadow-sm"
                style={{
                  scrollSnapAlign: "start",
                  minWidth: `${CARD_WIDTH}px`,
                }}
              >
                <ItineraryCard id={id} name={name} title={title} image={image}>
                  <div className="mt-auto w-full">
                    <button
                      onClick={() => navigate(`/book-hotel/${id}`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full text-sm"
                    >
                      Book Hotel
                    </button>
                    <button
                      onClick={() => navigate(`/hotel-details/${id}`)}
                      className="border border-blue-600 mt-1 hover:bg-blue-600 hover:text-white text-blue-600 px-4 py-2 rounded-md w-full text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </ItineraryCard>
              </div>
            ))}
          </div>
        </div>

        {/* Right arrow */}
        <button
          onClick={handleNext}
          disabled={isManualScrolling}
          className={`absolute top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition duration-300 z-20 ${
            isManualScrolling ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Next"
          style={{ right: "-40px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default VerifiedHotels;
