import React from "react";
import HeroVideo from "../../assets/videos/hero.mp4";
import EnquiryForm from "../../forms/EnquiryForm.jsx";

const Hero = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background video */}
        <video
          src={HeroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute w-full h-full bg-black opacity-40"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-center justify-center md:justify-between h-full px-6 md:px-12">
          {/* Left side text */}
          <div className="text-white max-w-lg text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Let's Explore Goa
            </h1>
            <p className="text-base md:text-lg text-gray-200">
              Enjoy the beaches, nightlife, and culture of Goa with our
              exclusive travel packages.
            </p>
          </div>

          {/* Right side form (only for md and above) */}
          <div className="hidden md:flex md:items-center md:justify-end md:pr-8">
            <div className="w-[320px] lg:w-[340px] xl:w-[360px] md:ml-6">
              <EnquiryForm variant="transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Form below video for small screens */}
      <div className="block md:hidden px-4 py-6 flex justify-center">
        <div className="w-full max-w-md">
          <EnquiryForm variant="solid" />
        </div>
      </div>
    </div>
  );
};

export default Hero;