import React from "react";
import heroBg from "../../assets/images/logo/aboutUsHero/heroPage.jpg";

const HeroPage = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <img
        src={heroBg}
        alt="Hero Background"
        className="w-full object-cover"
        style={{ height: "75vh" }} // 👈 adjust: 70vh, 75vh, etc.
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center px-6">
        <div className="z-20 max-w-2xl text-left text-white">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Explore The World With Us
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            Discover breathtaking destinations, unforgettable experiences, and
            create memories that last a lifetime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroPage;
