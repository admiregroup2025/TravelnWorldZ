import React from "react";
import Img1 from "../../assets/images/aboutUsHome/image1.png";
import Img2 from "../../assets/images/aboutUsHome/image2.png";

const HomeAboutUs = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-15 px-6 sm:px-25 py-5 max-w-6xl mx-auto md:-translate-x-20 md:-translate-y-10">
      {/* LEFT IMAGES */}
      <div className="relative flex-1 flex justify-center">
        {/* Large Image */}
        <img
          src={Img1}
          alt="Beach"
          className="w-64 h-80 sm:w-72 sm:h-90 md:w-80 md:h-100 object-cover rounded-[40%] shadow-lg"
        />

        {/* Small Overlapping Image */}
        <img
          src={Img2}
          alt="Mountain"
          className="w-32 h-40 sm:w-36 sm:h-44 md:w-40 md:h-50 object-cover rounded-full border-4 border-white shadow-lg absolute bottom-0 right-2 sm:right-6 md:right-10"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-[1.2] text-center md:text-left md:-translate-y-4">
        <h3 className="text-red-500 font-semibold mb-2">About Us</h3>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f1b60] leading-snug mb-4">
          We are professional planners <br className="hidden md:block" /> 
          <span className="md:inline">for your trip</span>
        </h1>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
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
        <button className="bg-[#0f1b60] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#0c164d] transition">
          Know more
        </button>
      </div>
    </section>
  );
};

export default HomeAboutUs;
