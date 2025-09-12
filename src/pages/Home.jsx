import React from "react";
import VideoBackground from "../components/VideoBackground";
import BannerAds from "../components/homeComponent/BannerAds";
import HomeContactUs from "../components/homeComponent/homeContactUs";
import Testimonials from "../components/homeComponent/Testimonials";
import GetAQuote from "../forms/GetAQuote";
import TrendingDestination from "../components/homeComponent/TrendingDestination";



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
