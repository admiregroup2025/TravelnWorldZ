import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

// Destination Card Component
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
      {/* Text Section */}
      <div className="flex flex-col justify-between p-4 w-full md:w-2/3">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-600 mt-2">
            {description || "Explore top attractions and experiences."}
          </p>
        </div>
        <div className="mt-3">
          <p className="text-red-600 font-bold text-md">
            {price || "From"} 4000.00 RS
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent hover reset
              handleKnowMore();
            }}
            className="mt-2 px-4 py-1.5 bg-[#00004a] text-white text-sm rounded hover:bg-blue-900 transition"
          >
            Know more
          </button>
        </div>
      </div>

      {/* Image Section */}
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
              <img
                src={img}
                alt={`${title}-${idx}`}
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

// Trending Destination Component
const TrendingDestination = () => {
  const [isPaused, setIsPaused] = useState(false);

  const destinations = [
    {
      id: "uttarakhand",
      title: "Uttarakhand",
      description: "Experience the majestic Himalayas and spiritual sites",
      price: "From ₹15,000",
      images: [
        "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=800&auto=format&fit=crop"
      ],
    },
    {
      id: "uttar-pradesh",
      title: "Uttar Pradesh",
      description: "Explore cultural and historical treasures",
      price: "From ₹12,500",
      images: [
        "https://plus.unsplash.com/premium_photo-1697730277839-440df1a4415f?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&auto=format&fit=crop"
      ],
    },
    {
      id: "himachal-pradesh",
      title: "Himachal Pradesh",
      description: "Discover scenic hill stations and adventure",
      price: "From ₹18,000",
      images: [
        "https://images.unsplash.com/photo-1563906267088-b029e7101114?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=800&auto=format&fit=crop"
      ],
    },
    {
      id: "delhi",
      title: "Delhi",
      description: "Experience the capital's rich history and culture",
      price: "From ₹8,000",
      images: [
        "https://plus.unsplash.com/premium_photo-1697730150003-26a1d469adb4?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1587334274527-ba54f0b5a357?w=800&auto=format&fit=crop"
      ],
    },
    {
      id: "madhya-pradesh",
      title: "Madhya Pradesh",
      description: "Explore heart of India's heritage",
      price: "From ₹11,000",
      images: [
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1598947146667-47b6865deb64?w=800&auto=format&fit=crop"
      ],
    },
    {
      id: "goa",
      title: "Goa",
      description: "Relax on beautiful beaches and enjoy nightlife",
      price: "From ₹14,000",
      images: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop"
      ],
    },
    {
      id: "maharashtra",
      title: "Maharashtra",
      description: "Discover diverse landscapes and bustling cities",
      price: "From ₹13,000",
      images: [
        "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1605108721178-97a9514c0b9b?w=800&auto=format&fit=crop"
      ],
    },
    {
      id: "kerala",
      title: "Kerala",
      description: "Experience backwaters and lush greenery",
      price: "From ₹16,000",
      images: [
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=800&auto=format&fit=crop"
      ],
    },
    {
      id: "tamil-nadu",
      title: "Tamil Nadu",
      description: "Explore ancient temples and rich culture",
      price: "From ₹14,500",
      images: [
        "https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1616392967126-2d9f46b475c0?w=800&auto=format&fit=crop"
      ],
    },
    {
      id: "karnataka",
      title: "Karnataka",
      description: "Discover heritage sites and modern cities",
      price: "From ₹13,500",
      images: [
        "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1616392967126-2d9f46b475c0?w=800&auto=format&fit=crop"
      ],
    },
    {
      id: "west-bengal",
      title: "West Bengal",
      description: "Experience cultural richness and natural beauty",
      price: "From ₹12,000",
      images: [
        "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1598947146667-47b6865deb64?w=800&auto=format&fit=crop"
      ],
    },
    {
      id: "odisha",
      title: "Odisha",
      description: "Discover ancient temples and pristine beaches",
      price: "From ₹11,500",
      images: [
        "https://images.unsplash.com/photo-1563906267088-b029e7101114?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1587334274527-ba54f0b5a357?w=800&auto=format&fit=crop"
      ],
    },
    {
      id: "assam",
      title: "Assam",
      description: "Explore tea gardens and wildlife sanctuaries",
      price: "From ₹15,500",
      images: [
        "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=800&auto=format&fit=crop"
      ],
    },
  ];

  const marqueeDestinations = [...destinations, ...destinations]; 

  return (
    <div className="flex flex-col items-center gap-6 p-4 bg-gray-100 min-h-fit">
      <h1 className="text-3xl font-bold text-blue-950 mb-4">
        Trending Destinations
      </h1>

      {/* Marquee Section */}
      <div
        className="overflow-hidden mx-auto px-4 md:px-12"
        style={{ maxWidth: "calc(100% - 100px)" }}
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
    </div>
  );
};

export default TrendingDestination;