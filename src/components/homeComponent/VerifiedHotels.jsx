import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ItineraryCard from "../../components/ItineraryCard";
import hotels from "../../data/hotels";

const GAP = 32;

const VerifiedHotels = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [cardWidth, setCardWidth] = useState(260);
  const [visibleCards, setVisibleCards] = useState(4);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const totalCards = hotels.length;

  const updateLayout = () => {
    const width = window.innerWidth;

    if (width < 640) {
      setVisibleCards(1);
      setCardWidth(width - 40); 
    } else if (width < 1024) {
      setVisibleCards(2);
      setCardWidth(240); 
    } else if (width < 1280) {
      setVisibleCards(3);
      setCardWidth(260); 
    } else {
      setVisibleCards(4);
      setCardWidth(260); 
    }
  };

  useEffect(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const scrollStep = cardWidth + GAP;
  const maxIndex = Math.max(0, totalCards - visibleCards);

  const scrollToCard = (index) => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({
        left: index * scrollStep,
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    if (currentCardIndex < maxIndex) {
      const newIndex = currentCardIndex + 1;
      setCurrentCardIndex(newIndex);
      scrollToCard(newIndex);
    }
  };

  const handlePrev = () => {
    if (currentCardIndex > 0) {
      const newIndex = currentCardIndex - 1;
      setCurrentCardIndex(newIndex);
      scrollToCard(newIndex);
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-12 py-10 max-w-[1400px] w-full mx-auto">
      {/* Heading */}
      <div className="flex justify-center items-center relative mb-8">
        <h1 className="text-xl md:text-3xl font-bold capitalize tracking-wide text-black text-center flex-1">
          Verified Hotels
        </h1>

        <button
          onClick={() => navigate("/all-hotels")}
          className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-semibold shadow-md transition duration-300"
        >
          View All
        </button>
      </div>

      {/* Carousel */}
      <div className="relative flex items-center justify-center">
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          disabled={currentCardIndex === 0}
          className={`absolute top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition duration-300 z-20 ${
            currentCardIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          style={{ left: "0px" }}
          aria-label="Previous"
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

        {/* Card Container */}
        <div
          ref={scrollRef}
          className="overflow-x-hidden scroll-smooth "
          style={{
            width: visibleCards * (cardWidth + GAP) - GAP,
          }}
        >
          <div
            className="flex space-x-8"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {hotels.map(({ id, name, title, image }, idx) => (
              <div
                key={`${id}-${idx}`}
                className="flex-shrink-0 bg-white rounded-md shadow-sm"
                style={{
                  scrollSnapAlign: "start",
                  minWidth: `${cardWidth}px`,
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

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentCardIndex >= maxIndex}
          className={`absolute top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition duration-300 z-20 ${
            currentCardIndex >= maxIndex ? "opacity-50 cursor-not-allowed" : ""
          }`}
          style={{ right: "0px" }}
          aria-label="Next"
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
