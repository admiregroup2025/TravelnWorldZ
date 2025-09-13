import React from "react";
import whyUs from "../../assets/images/logo/aboutUsHero/whyUs.png";

export default function WhyUs() {
  return (
    <div
      className="relative w-full h-[70vh] bg-cover bg-center"
      style={{
        backgroundImage: `url(${whyUs})`
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* H1 Text */}
      <div className="absolute top-6 w-full flex justify-center px-4">
        <h1 className="text-white text-2xl md:text-3xl font-bold text-center drop-shadow-lg">
          If you can’t find the tour you are looking for, just contact us
        </h1>
      </div>

      {/* Bubbles in Horizontal Layout */}
      <div className="absolute inset-0 flex items-center justify-center flex-row gap-6 px-4">
        <div className="bg-white/20 backdrop-blur-lg text-white rounded-full p-6 shadow-lg w-40 h-40 flex items-center justify-center text-center text-base">
          Worldwide Services
        </div>
        <div className="bg-white/20 backdrop-blur-lg text-white rounded-full p-6 shadow-lg w-40 h-40 flex items-center justify-center text-center text-base">
          Customized Tours
        </div>
        <div className="bg-white/20 backdrop-blur-lg text-white rounded-full p-6 shadow-lg w-40 h-40 flex items-center justify-center text-center text-base">
          Expert Guidance
        </div>
        <div className="bg-white/20 backdrop-blur-lg text-white rounded-full p-6 shadow-lg w-40 h-40 flex items-center justify-center text-center text-base">
          24/7 Support
        </div>
        <div className="bg-white/20 backdrop-blur-lg text-white rounded-full p-6 shadow-lg w-40 h-40 flex items-center justify-center text-center text-base">
          Affordable Packages
        </div>
      </div>
    </div>
  );
}
