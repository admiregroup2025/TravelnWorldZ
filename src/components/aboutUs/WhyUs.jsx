import React from "react";
import whyUs from "../../assets/images/logo/aboutUsHero/whyUs.png";

export default function WhyUs() {
  return (
    <div
      className="relative w-full h-[80vh] bg-cover bg-center"
      style={{
        backgroundImage: `url(${whyUs})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* H1 Text */}
      <div className="absolute top-6 w-full flex justify-center px-4 z-10">
        <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold text-center drop-shadow-lg leading-snug relative">
          If you can’t find the tour you are looking for, just contact us

          {/* Circular Bubble Overlapping H1 */}
          <span className="absolute -top-5 -right-10 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm sm:text-base font-bold shadow-lg">
            1
          </span>
        </h1>
      </div>

      {/* Bubbles Below H1 */}
      <div className="absolute bottom-10 w-full flex justify-center px-4 z-10">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:flex md:flex-row md:gap-6">
          <div className="bg-white/20 backdrop-blur-lg text-white rounded-full p-6 shadow-lg w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 flex items-center justify-center text-center text-sm sm:text-base">
            Worldwide Services
          </div>
          <div className="bg-white/20 backdrop-blur-lg text-white rounded-full p-6 shadow-lg w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 flex items-center justify-center text-center text-sm sm:text-base">
            Customized Tours
          </div>
          <div className="bg-white/20 backdrop-blur-lg text-white rounded-full p-6 shadow-lg w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 flex items-center justify-center text-center text-sm sm:text-base">
            Expert Guidance
          </div>
          <div className="bg-white/20 backdrop-blur-lg text-white rounded-full p-6 shadow-lg w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 flex items-center justify-center text-center text-sm sm:text-base">
            24/7 Support
          </div>
          <div className="bg-white/20 backdrop-blur-lg text-white rounded-full p-6 shadow-lg w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 flex items-center justify-center text-center text-sm sm:text-base">
            Affordable Packages
          </div>
        </div>
      </div>
    </div>
  );
}




