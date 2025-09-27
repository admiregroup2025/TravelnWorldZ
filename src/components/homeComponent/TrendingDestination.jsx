import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const CARD_GAP = 24;

const TrendingDestination = () => {
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = useState(false);

  const destinations = [
    {
      id: "uttarakhand",
      title: "Uttarakhand",
      description: "Experience the majestic Himalayas and spiritual sites",
      price: "From ₹15,000",
      images: [
        "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=800&auto=format&fit=crop",
      ],
    },
    {
      id: "uttar-pradesh",
      title: "Uttar Pradesh",
      description: "Explore cultural and historical treasures",
      price: "From ₹12,500",
      images: [
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1598947146667-47b6865deb64?w=800&auto=format&fit=crop",
      ],
    },
    {
      id: "himachal-pradesh",
      title: "Himachal Pradesh",
      description: "Discover scenic hill stations and adventure",
      price: "From ₹18,000",
      images: [
        "https://images.unsplash.com/photo-1563906267088-b029e7101114?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=800&auto=format&fit=crop",
      ],
    },
    {
      id: "delhi",
      title: "Delhi",
      description: "Experience the capital's rich history and culture",
      price: "From ₹8,000",
      images: [
        "https://images.unsplash.com/photo-1587334274527-ba54f0b5a357?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1587334274527-ba54f0b5a357?w=800&auto=format&fit=crop",
      ],
    },
    // Add more destinations as needed
  ];

  const DestinationCard = ({ id, title, description, price, images }) => {
    const handleKnowMore = () => {
      navigate(`/trending/${id}`);
    };

    return (
      <div className="cursor-pointer flex-shrink-0 w-full flex flex-col md:flex-row bg-[#fffaf1] border border-gray-300 rounded-lg overflow-hidden shadow-md transition-opacity duration-300">
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
            <p className="text-red-600 font-bold text-md">{price || "From ₹4,000"}</p>
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
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop
            speed={1000}
            effect="fade"
            className="w-full h-full"
          >
            {images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4 bg-gray-100 min-h-fit md:px-8 lg:px-16 relative">
      {/* Heading + View All */}
      <div className="w-full flex justify-between items-center relative px-4 md:px-0 mb-3">
        <h1 className="text-3xl font-bold text-black">Trending Destinations</h1>
        <button
          onClick={() => navigate("/trending-destination-list")}
          className="text-sm px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-600 transition"
        >
          View All
        </button>
      </div>

      {/* Swiper with arrows */}
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        spaceBetween={CARD_GAP}
        centeredSlides={true}
        slidesPerView="auto"
        breakpoints={{
          640: { slidesPerView: 2, centeredSlides: false },
          1024: { slidesPerView: 3, centeredSlides: false },
        }}
        className="w-full relative"
      >
        {destinations.map((destination) => (
          <SwiperSlide key={destination.id} className="!w-[85%] sm:!w-[320px]">
            <DestinationCard {...destination} />
          </SwiperSlide>
        ))}

        {/* Prev arrow */}
        <div className="swiper-button-prev-custom flex absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700 transition cursor-pointer">
          &#8592;
        </div>

        {/* Next arrow */}
        <div className="swiper-button-next-custom flex absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700 transition cursor-pointer">
          &#8594;
        </div>
      </Swiper>
    </div>
  );
};

export default TrendingDestination;