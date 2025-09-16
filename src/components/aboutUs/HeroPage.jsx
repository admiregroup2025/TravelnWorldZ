import React from "react";
import heroBg from "../../assets/images/logo/aboutUsHero/heroPage.jpg";

const HeroPage = () => {
  return (
    <section
      className="relative h-screen w-full bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-20 max-w-2xl px-6 text-left text-white">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Explore The World With Us
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200">
          Discover breathtaking destinations, unforgettable experiences, and
          create memories that last a lifetime.
        </p>
      </div>


    </section>
  );
};

export default HeroPage;
