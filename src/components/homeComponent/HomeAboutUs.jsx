import React from "react";
import { useNavigate } from "react-router-dom";
import Img1 from "../../assets/images/aboutUsHome/image1.jpg";
import Img2 from "../../assets/images/aboutUsHome/image2.jpg";

const HomeAboutUs = () => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-15 px-6 md:px-25 py-5 max-w-6xl mx-auto md:-translate-x-20 md:-translate-y-10">
      {/* LEFT IMAGES */}
      <div className="relative flex-1 flex justify-center mb-6 md:mb-0">
        {/* Large Image */}
        <img
          src={Img1}
          alt="Beach"
          className="w-80 h-100 md:w-80 object-cover rounded-[40%] shadow-lg"
        />

        {/* Small Overlapping Image */}
        <img
          src={Img2}
          alt="Mountain"
          className="w-40 h-52 md:w-44 object-cover rounded-full border-4 border-white shadow-lg absolute bottom-0 right-4 md:right-10"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-[1.2] text-center md:text-left md:-translate-y-4 px-4 md:px-0">
        <h3 className="text-red-500 font-semibold mb-2 text-sm md:text-base">About Us</h3>
        <h1 className="text-2xl md:text-4xl font-bold text-[#0f1b60] leading-snug mb-4">
          We are professional planners <br /> for your trip
        </h1>
        <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">
          At TravelnWorld, we believe that every journey is more than just a trip  it's a story
          waiting to be written. Our passion is to turn your travel dreams into reality by crafting
          seamless, personalized, and unforgettable experiences across the globe.
          With a team of expert planners, trusted partners, and verified travel services, we ensure
          that your adventures are not only exciting but also safe and stress-free. From breathtaking
          beach escapes to adventurous mountain treks, from luxury holidays to budget-friendly getaways
          we design trips that match your style, budget, and aspirations.
          Because for us, travel is not about ticking destinations off a list it's about discovering
          cultures, making memories, and finding joy in every corner of the world.
        </p>
        <button
          onClick={() => navigate("/aboutUs")}
          className="bg-blue-700 text-white px-6 py-2 rounded-full shadow-md hover:bg-[#0c164d] transition text-sm md:text-base"
        >
          Know more
        </button>
      </div>
    </section>
  );
};

export default HomeAboutUs;
