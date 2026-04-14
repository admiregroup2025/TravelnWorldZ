// import React, { useState, useEffect } from "react";
// import img1 from "../../assets/images/topBannerAds/image1.jpg";
// import img2 from "../../assets/images/topBannerAds/image2.jpg";
// import img3 from "../../assets/images/topBannerAds/image3.jpg";
// import img4 from "../../assets/images/topBannerAds/image4.jpg";
// import img5 from "../../assets/images/topBannerAds/image5.jpg";
// import img6 from "../../assets/images/topBannerAds/image6.jpg";
// import img7 from "../../assets/images/topBannerAds/image7.jpg";
// import img8 from "../../assets/images/topBannerAds/image8.jpg";
// import img9 from "../../assets/images/topBannerAds/image9.jpg";

// const banners = [
//   {
//     id: 1,
//     images: [img1, img2],
//     title: "Wedding Planner",
//     desc: "Company Name",
//     bg: img3,
//   },
//   {
//     id: 2,
//     images: [img4, img5],
//     title: "Travel Planner",
//     desc: "Company Name",
//     bg: img6,
//   },
//   {
//     id: 3,
//     images: [img7, img8],
//     title: "Corporate Events",
//     desc: "Company Name",
//     bg: img9,
//   },
// ];

// const TopMostBanner = () => {
//   const [current, setCurrent] = useState(0);

//   // Auto-slide every 5 secs
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % banners.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div
//       className="relative w-full overflow-hidden mt-1" 
      
//       style={{ height: "100px", marginBottom: "5px" }}
//     >
//       {/* Slider Wrapper */}
//       <div
//         className="flex transition-transform duration-700 h-full"
//         style={{ transform: `translateX(-${current * 100}%)` }}
//       >
//         {banners.map((banner) => (
//           <div key={banner.id} className="flex w-full flex-shrink-0 h-full">
//             {/* Left Image */}
//             <div className="w-1/3">
//               <img
//                 src={banner.images[0]}
//                 alt="banner left"
//                 className="w-full h-full object-cover object-top" // align from top
//               />
//             </div>

//             {/* Middle Image */}
//             <div className="w-1/3">
//               <img
//                 src={banner.images[1]}
//                 alt="banner middle"
//                 className="w-full h-full object-cover object-top"
//               />
//             </div>

//             {/* Text Section */}
//             <div
//               className="w-1/3 text-white flex flex-col justify-center items-center bg-cover bg-center"
//               style={{ backgroundImage: `url(${banner.bg})` }}
//             >
//               <h3 className="text-[10px] md:text-sm">{banner.desc}</h3>
//               <h2 className="text-sm md:text-lg font-bold mb-1">
//                 {banner.title}
//               </h2>
//               <button className="bg-white text-purple-900 text-[10px] md:text-sm px-2 py-0.5 rounded-md font-medium hover:bg-purple-200 transition">
//                 Know More
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Dots Indicator */}
//       <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
//         {banners.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => setCurrent(idx)}
//             className={`w-2 h-2 rounded-full ${
//               current === idx ? "bg-white" : "bg-gray-400"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TopMostBanner;

import { useEffect, useState } from "react";
import axios from "axios";

const TopMostBanner = () => {
  const [banners, setBanners] = useState([]);
  const [index, setIndex] = useState(0);

  const ITEMS_PER_SLIDE = 3;
  useEffect(() => {
    axios.get("/api/banners?position=top")
      .then((res) => setBanners(Array.isArray(res.data) ? res.data : []));
  }, []);

   const totalSlides = Math.ceil(banners.length / ITEMS_PER_SLIDE);
  // AUTO SLIDE
  useEffect(() => {
    if (totalSlides <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0 ? totalSlides - 1 : prev - 1
    );
  };

  if (banners.length === 0) return null;

  return (
    <div style={styles.container}>
  <div
    style={{
      ...styles.slider,
      transform: `translateX(-${index * 100}%)`,
    }}
  >
    {Array.from({ length: totalSlides }).map((_, slideIndex) => {
      const start = slideIndex * ITEMS_PER_SLIDE;
      const group = banners.slice(start, start + ITEMS_PER_SLIDE);

      return (
        <div key={slideIndex} style={styles.slide}>
          {group.map((banner, i) => (
            <img
              key={i}
              src={banner.imageUrl}
              alt="banner"
              style={styles.image}
            />
          ))}
        </div>
      );
    })}
  </div>

  {totalSlides > 1 && (
    <>
      <button onClick={prevSlide} style={styles.leftBtn}>‹</button>
      <button onClick={nextSlide} style={styles.rightBtn}>›</button>
    </>
  )}
</div>
  );
};

const styles = {
  container: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    height:"110px",
    padding: "10px ",
    marginBottom: "4px",
  },

  slider: {
    display: "flex",
    transition: "transform 0.6s ease-in-out",
  },

  slide: {
    minWidth: "100%",
    display: "flex",
    gap: "2px", // small premium spacing
    padding: "10px",
  },

  card: {
    width: "33.33%",
    height: "220px",
    borderRadius: "14px",
    overflow: "hidden",
    position: "relative",
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
  },

  image: {
    width: "33.33%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s ease",
    display:"block"
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "60%",
    background:
      "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
  },

  leftBtn: {
    position: "absolute",
    top: "50%",
    left: "2px",
    transform: "translateY(-50%)",
    fontSize: "20px",
    background: "rgba(255,255,255,0.2)",
    backdropFilter: "blur(6px)",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    cursor: "pointer",
  },

  rightBtn: {
    position: "absolute",
    top: "50%",
    right: "15px",
    transform: "translateY(-50%)",
    fontSize: "20px",
    background: "rgba(255,255,255,0.2)",
    backdropFilter: "blur(6px)",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    cursor: "pointer",
  },
};

export default TopMostBanner;