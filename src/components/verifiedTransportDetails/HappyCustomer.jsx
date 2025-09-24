import React, { useRef } from "react"; 
import { ChevronRight, ChevronLeft } from "lucide-react";
import Icon1 from "../../assets/images/icons/icon1.png";
import Icon2 from "../../assets/images/icons/icon2.png";
import Icon3 from "../../assets/images/icons/icon3.png";
import Icon4 from "../../assets/images/icons/icon4.png";

const testimonials = [
  {
    name: "isha rajput",
    image: Icon1,
    text: "Sitaaram Travels Pvt Ltd is an excellent choice for travel needs. They are always prompt in making reservations and provide fast responses to queries.",
    time: "00:17 PM",
    date: "31 Dec, 2024",
  },
  {
    name: "Vaibhav",
    image: Icon2,
    text: "Sitaaram Travels Pvt Ltd offers excellent deals and discounts. Their service is top-notch and their packages are budget-friendly. I highly recommend them.",
    time: "06:47 PM",
    date: "04 Mar, 2024",
  },
  {
    name: "Rahul",
    image: Icon3,
    text: "I had a great experience with Sitaaram Travels Pvt Ltd. They provided excellent customer service which was very helpful for my trip planning.",
    time: "09:36 AM",
    date: "29 Jan, 2024",
  },
  {
    name: "Neha",
    image: Icon4,
    text: "Booking was smooth and easy. The team guided me with best offers. My family trip turned out to be amazing because of them!",
    time: "11:15 AM",
    date: "15 Feb, 2024",
  },
];

const HappyCustomer = () => {
  const scrollRef = useRef(null);

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      <h2 className="text-xl font-semibold mb-4">Our Happy Customers</h2>

      {/* Cards Wrapper */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="min-w-[300px] max-w-[320px] bg-white border rounded-lg shadow-sm p-4 flex-shrink-0"
          >
            {/* Profile */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 rounded-md object-cover"
              />
              <span className="font-semibold text-gray-900">{item.name}</span>
            </div>

            {/* Review Text */}
            <p className="text-sm text-gray-700 mb-3 line-clamp-3">
              {item.text}{" "}
              <span className="text-blue-500 cursor-pointer">...More</span>
            </p>

            {/* Time + Date */}
            <p className="text-xs text-gray-500">
              {item.time} • {item.date}
            </p>
          </div>
        ))}
      </div>

      {/* Left Scroll Button */}
      <button
        onClick={handleScrollLeft}
        className="absolute top-1/2 -translate-y-1/2 left-0 bg-white border rounded-full shadow-md p-2 hover:bg-gray-100"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Right Scroll Button */}
      <button
        onClick={handleScrollRight}
        className="absolute top-1/2 -translate-y-1/2 right-0 bg-white border rounded-full shadow-md p-2 hover:bg-gray-100"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default HappyCustomer;
