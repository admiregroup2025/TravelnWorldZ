import React from "react";
import HeroVideo from "../../assets/videos/hero.mp4";
import EnquiryForm from "../../forms/EnquiryForm.jsx";

const Hero = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "calc(91vh - 135px)" }}
      >
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
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-6 md:px-12">
          {/* Left side text */}
          <div className="text-white max-w-lg text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Let's Explore Goa
            </h1>
            <p className="text-base md:text-lg text-gray-200">
              Enjoy the beaches, nightlife, and culture of Goa with our
              exclusive travel packages.
            </p>
          </div>

          {/* Right side form (desktop) */}
          <div className="hidden md:flex md:items-start md:justify-end md:pr-8">
            <div className="mt-8 mb-8">   {/* 👈 Added margin top & bottom */}
              <EnquiryForm
                variant="transparent"
                className="w-[300px] lg:w-[320px] xl:w-[340px] md:ml-6 bg-white/20 backdrop-blur-md rounded-xl"
                style={{
                  padding: "20px 16px",
                  height: "auto", // let content decide height
                  width: "340px", // fixed width like in screenshot
                  display: "flex",
                  alignItems: "center",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Form below video for small screens */}
      <div className="md:hidden px-4 py-6 flex justify-center">
        <div
          className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl"
          style={{
            padding: "16px 14px",
          }}
        >
          <EnquiryForm variant="solid" />
        </div>
      </div>
    </div>
  );
};

export default Hero;       



