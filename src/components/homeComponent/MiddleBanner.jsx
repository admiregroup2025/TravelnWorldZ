// import React from "react";
// import img1 from "../../assets/images/logo/bannerAdds/image1.png";
// import img2 from "../../assets/images/logo/bannerAdds/image2.png";
// import img3 from "../../assets/images/logo/bannerAdds/image3.png";
// import img4 from "../../assets/images/logo/bannerAdds/image4.png";
// import img5 from "../../assets/images/logo/bannerAdds/image5.png";
// import PropTypes from 'prop-types';
// const BannerAds = () => {
//   const images = [img1, img2, img3, img4, img5];

//   const Card = ({ src }) => (
//     <div className="flex-shrink-0 w-72 h-40 border border-dashed border-gray-500 rounded-md overflow-hidden bg-white flex items-center justify-center p-3">
//       <img
//         src={src}
//         alt="banner"
//         className="w-full h-full object-contain"
//         loading="lazy"
//       />
//     </div>
//   );

//   return (
//     <div className="py-12 bg-gray-100">
//       <div className="relative overflow-hidden ml-[47px] mr-[47px]">
//         <div className="flex animate-marquee gap-3">
//           {[...images, ...images].map((img, index) => (
//             <Card key={`${img}-${index}`} src={img} />
//           ))}
//         </div>
//       </div>

//       <style>{`
//         @keyframes marquee {
//           0% { transform: translateX(0%); }
//           100% { transform: translateX(-50%); }
//         }
//         .animate-marquee {
//           animation: marquee 12s linear infinite;
//           will-change: transform;
//         }  

//         /* Custom thick dashed border */
//         .custom-dash-border {
//           border: 2px dashed transparent;
//           border-radius: 6px;
//           border-image: repeating-linear-gradient(
//             to right,
//             #6b7280 0,
//             #6b7280 30px,
//             transparent 30px,
//             transparent 38px
//           ) 1;
//         }
//       `}</style>
//     </div>
//   );
// };
// BannerAds.propTypes = {
//   src: PropTypes.string.isRequired,
// };
// export default BannerAds;


//above was the hardcoded code
//below is the new code
import { useEffect, useState } from "react";
import axios from "axios";

const MiddleBanner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_BASE || "";
    axios.get(`${apiBase}/api/banners?position=middle`)
      .then(res => setBanners(res.data))
      .catch(err => {
        console.error("Error fetching banners:", err);
        setBanners([]);
      });
  }, []);

  if (!banners.length) return null;

  // duplicate banners for infinite loop
  const loopBanners = [...banners, ...banners,  ...banners]; 

  return (
    <div style={styles.wrapper}>
      <div className="scroll-track">
        {loopBanners.map((banner, i) => (
          <div key={i} style={styles.card}>
            <img
              src={banner.imageUrl}
              alt="banner"
              style={styles.image}
            />
          </div>
        ))}
      </div>

      <style>{`
        .scroll-track {
          display: flex;
          width: max-content;
          animation: scrollLeft 15s linear infinite;
        }

        @keyframes scrollLeft {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
      `}</style>
    </div>
  );
};

const styles = {
  wrapper: {
    overflow: "hidden",
    width: "100%",
    margin: "50px 0",
    padding: "10px 10px",
  },

  card: {
    background: "#fff",              // white box
    minWidth: "260px",
    height: "180px",
    marginRight: "0px",
    borderRadius: "16px",
    padding: "10px",                 //  space inside box
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)", // premium shadow
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink:0,
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "12px", // ✅ inner rounded
  },
};

export default MiddleBanner;
