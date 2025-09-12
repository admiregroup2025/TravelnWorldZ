import React from "react";
import VideoBackground from "../components/VideoBackground";
import BannerAds from "../components/homeComponent/BannerAds";
import HomeContactUs from "../components/homeComponent/HomeContactUs.jsx";
import Testimonials from "../components/homeComponent/Testimonials.jsx";
import GetAQuote from "../forms/GetAQuote.jsx";
import TrendingDestination from "../components/homeComponent/TrendingDestination.jsx";



const Home = () => {
  return (
    <div>
      {/* Hero Section with Video + Form   */}
      <VideoBackground />

      {/*  Next section after Hero */}
      <section className="p-10 text-center">
        <h2 className="text-2xl font-bold"></h2>
        <p className="mt-4 text-gray-600">
          
        </p>
      </section>
      <div> 
        <BannerAds/>
        <TrendingDestination />
        
        <HomeContactUs/>
        <Testimonials />
        <GetAQuote />
      </div>
    </div>   
  );
};

export default Home; 
