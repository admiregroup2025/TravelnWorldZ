import React from "react";
import heroBg from "../../assets/images/logo/aboutUsHero/heroPage.jpg";

const HeroPage = () => {
  return (
    <section
      className="relative h-[75vh] w-full flex items-center justify-center md:justify-start bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-[650px] px-6 text-center md:text-left text-white">
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Explore The World With Us
        </h1>
        <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-200">
          Discover breathtaking destinations, unforgettable experiences, and
          create memories that last a lifetime.
        </p>
      </div>
    </section>
  );
};

export default HeroPage;

