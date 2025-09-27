import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const CARD_WIDTH = 320;
const CARD_GAP = 24;

const destinations = [
    {
      id: "uttarakhand",
      title: "Uttarakhand",
      description: "Experience the majestic Himalayas and spiritual sites",
      images: [
        "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=800&auto=format&fit=crop",
      ],
    },
    {
      id: "uttar-pradesh",
      title: "Uttar Pradesh",
      description: "Explore cultural and historical treasures",
      images: [
        "https://plus.unsplash.com/premium_photo-1697730277839-440df1a4415f?w=800&auto=format&fit=cr…",
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&auto=format&fit=crop",
      ],
    },
    {
      id: "himachal-pradesh",
      title: "Himachal Pradesh",
      description: "Discover scenic hill stations and adventure",
      images: [
        "https://images.unsplash.com/photo-1563906267088-b029e7101114?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=800&auto=format&fit=crop",
      ],
    },
    {
      id: "delhi",
      title: "Delhi",
      description: "Experience the capital's rich history and culture",
      images: [
        "https://plus.unsplash.com/premium_photo-1697730150003-26a1d469adb4?w=800&auto=format&fit=cr…",
        "https://images.unsplash.com/photo-1587334274527-ba54f0b5a357?w=800&auto=format&fit=crop",
      ],
    },
    {
      id: "madhya-pradesh",
      title: "Madhya Pradesh",
      description: "Explore heart of India's heritage",
      images: [
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1598947146667-47b6865deb64?w=800&auto=format&fit=crop",
      ],
    },
    {
      id: "goa",
      title: "Goa",
      description: "Relax on beautiful beaches and enjoy nightlife",
      images: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop",
      ],
    },
    {
      id: "maharashtra",
      title: "Maharashtra",
      description: "Discover diverse landscapes and bustling cities",
      images: [
        "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1605108721178-97a9514c0b9b?w=800&auto=format&fit=crop",
      ],
    },
    {
      id: "kerala",
      title: "Kerala",
      description: "Experience backwaters and lush greenery",
      images: [
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=800&auto=format&fit=crop",
      ],
    },
    {
      id: "tamil-nadu",
      title: "Tamil Nadu",
      description: "Explore ancient temples and rich culture",
      images: [
        "https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1616392967126-2d9f46b475c0?w=800&auto=format&fit=crop",
      ],
    },
    {
      id: "karnataka",
      title: "Karnataka",
      description: "Discover heritage sites and modern cities",
      images: [
        "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1616392967126-2d9f46b475c0?w=800&auto=format&fit=crop",
      ],
    },
    {
      id: "west-bengal",
      title: "West Bengal",
      description: "Experience cultural richness and natural beauty",
      images: [
        "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1598947146667-47b6865deb64?w=800&auto=format&fit=crop",
      ],
    },
    {
      id: "odisha",
      title: "Odisha",
      description: "Discover ancient temples and pristine beaches",
      images: [
        "https://images.unsplash.com/photo-1563906267088-b029e7101114?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1587334274527-ba54f0b5a357?w=800&auto=format&fit=crop",
      ],
    },
    {
      id: "assam",
      title: "Assam",
      description: "Explore tea gardens and wildlife sanctuaries",
      images: [
        "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=800&auto=format&fit=crop",
      ],
    },
  ];

const DestinationCard = ({
  id,
  title,
  description,
  price,
  images,
  onHoverStart,
  onHoverEnd,
}) => {
  const navigate = useNavigate();

  const handleKnowMore = () => {
    navigate(`/trending/${id}`);
  };

  return (
    <div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className="cursor-pointer flex-shrink-0 w-[320px] flex flex-col md:flex-row bg-[#fffaf1] border border-gray-300 rounded-lg overflow-hidden shadow-md transition-opacity duration-300"
    >
      <div className="flex flex-col justify-between p-4 w-full md:w-2/3">
        <div>          
          <h2 className="text-xl font-semibold text-gray-800 break-words whitespace-normal leading-snug">
            {title}
          </h2>
          <p className="text-sm text-gray-600 mt-1 break-words whitespace-normal leading-snug">
            {description || "Explore top attractions and experiences."}
          </p>
        </div>
        <div className="mt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleKnowMore();
            }}
            className="mt-2 px-4 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-900 transition"
          >
            Know more
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/3 h-40 md:h-auto">
        <Swiper
          modules={[Autoplay, EffectFade]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
            pauseOnInteraction: false,
          }}
          loop
          speed={1000}
          effect="fade"
          className="w-full h-full"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              {/* FIX: empty alt so text not shown over image */}
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

const TrendingDestination = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);
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

  useEffect(() => {
    if (!isMobile || isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % destinations.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isMobile, isPaused, destinations.length]);
  const handleMouseDown = (e) => {
    if (isMobile) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    if (isMobile) return;
    isDragging.current = false;
    setTimeout(() => setIsPaused(false), 1000);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || isMobile) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = x - startX.current;
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleTouchStart = (e) => {
    if (isMobile) return;
    isDragging.current = true;
    startX.current = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current || isMobile) return;
    e.preventDefault();
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = x - startX.current;
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleTouchEnd = () => {
    if (isMobile) return;
    isDragging.current = false;
    setTimeout(() => setIsPaused(false), 1000);
  };

  const handleScroll = (direction) => {
    if (isMobile) {
      if (direction === "next") {
        setCurrentIndex((prev) => (prev + 1) % destinations.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
      }
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 2000);
    } else {
      const container = scrollContainerRef.current;
      const scrollAmount =
        direction === "next" ? CARD_WIDTH + CARD_GAP : -(CARD_WIDTH + CARD_GAP);
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 1000);
    }
  };
  const marqueeDestinations = [...destinations, ...destinations];
  return (
    <div className="relative flex flex-col items-center gap-6 px-4 sm:px-6 md:px-8 lg:px-16 py-6 bg-gray-100 min-h-fit">
      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 relative">
        {/* Heading -*/}
        <div className="w-full sm:w-auto text-center sm:absolute left-1/2 sm:-translate-x-1/2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
            Trending Tour Packages
          </h1>
        </div>
        {/* Button */}
        <div className="mt-3 sm:mt-0 sm:ml-auto sm:static text-center sm:text-right hidden sm:block">
          <button
            onClick={() => navigate("/trending-destination-list")}
            className="text-sm px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            View All
          </button>
        </div>
      </div>
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
        <div className="w-full px-12">
          <div className="bg-[#fffaf1] border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 max-w-sm mx-auto">
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col justify-between p-4 w-full">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 break-words whitespace-normal leading-snug">
                    {destinations[currentIndex].title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1 break-words whitespace-normal leading-snug">
                    {destinations[currentIndex].description || "Explore top attractions and experiences."}
                  </p>
                </div>
                <div className="mt-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/trending/${destinations[currentIndex].id}`);
                    }}
                    className="mt-2 px-4 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-900 transition w-full"
                  >
                    Know more
                  </button>
                </div>
              </div>
              <div className="w-full h-40">
                <Swiper
                  modules={[Autoplay, EffectFade]}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  loop
                  speed={1000}
                  effect="fade"
                  className="w-full h-full"
                >
                  {destinations[currentIndex].images.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {destinations.map((_, index) => (
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
                aria-label={`Go to ${destinations[index].title}`}
              />
            ))}
          </div>
          {/* Mobile View All Button - Below the card */}
          <div className="mt-6 text-center block sm:hidden">
            <button
              onClick={() => navigate("/trending-destination-list")}
              className="text-sm px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              View All
            </button>
          </div>
        </div>
      ) : (
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto cursor-grab select-none no-scrollbar mx-auto px-4 md:px-12 w-full max-w-[calc(100%-100px)]"
        style={{ maxWidth: "calc(100% - 100px)" }}
        onMouseDown={(e) => {
          handleMouseDown(e);
          setIsPaused(true);
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={(e) => {
          handleMouseLeave(e);
          setIsPaused(false);
        }}
        onTouchStart={(e) => {
          handleTouchStart(e);
          setIsPaused(true);
        }}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
      >
        <div
          className="flex whitespace-nowrap gap-6 animate-marquee"
          style={{
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {marqueeDestinations.map((destination, idx) => (
            <DestinationCard
              key={`${destination.id}-${idx}`}
              {...destination}
              onHoverStart={() => setIsPaused(true)}
              onHoverEnd={() => setIsPaused(false)}
            />
          ))}
        </div>
      </div> 
      )}
    </div>
  );
};

export default TrendingDestination;
