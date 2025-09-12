import React from 'react';
import HeroVideo from '../../assets/videos/hero.mp4';
const HeroSection = () => {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-full md:h-[80vh] object-cover"
    >
      <source src={HeroVideo} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};
 
export default HeroSection;