import React from 'react';
import HeroVideo from '../../assets/videos/contactUs.mp4';
const HeroSection = () => {
  return (
    <div className="relative w-full md:h-[80vh]">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src={HeroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay text container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-40 text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Explore the World with Us</h1>
        <p className="text-lg md:text-2xl max-w-2xl">
          Your adventure starts here. Discover new places, cultures, and memories.
        </p>
      </div>
    </div>
  );
};
 
export default HeroSection;
