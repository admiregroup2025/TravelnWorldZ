import React from "react";
import img1 from "../../assets/images/logo/bannerAdds/image1.png";
import img2 from "../../assets/images/logo/bannerAdds/image2.png";
import img3 from "../../assets/images/logo/bannerAdds/image3.png";
import img4 from "../../assets/images/logo/bannerAdds/image4.png";
import img5 from "../../assets/images/logo/bannerAdds/image5.png";

const BannerAds = () => {
  const images = [img1, img2, img3, img4, img5];

  const Card = ({ src }) => (
    <div className="flex-shrink-0 w-72 h-40 border border-dashed border-gray-500 rounded-md overflow-hidden bg-white flex items-center justify-center p-3">
      <img
        src={src}
        alt="banner"
        className="w-full h-full object-contain"
        loading="lazy"
      />
    </div>
  );

  return (
    <div className="py-12 bg-gray-100">
      <div className="relative overflow-hidden ml-[47px] mr-[47px]">
        <div className="flex animate-marquee gap-3">
          {[...images, ...images].map((img, index) => (
            <Card key={`${img}-${index}`} src={img} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 12s linear infinite;
          will-change: transform;
        }  

        /* Custom thick dashed border */
        .custom-dash-border {
          border: 2px dashed transparent;
          border-radius: 6px;
          border-image: repeating-linear-gradient(
            to right,
            #6b7280 0,
            #6b7280 30px,
            transparent 30px,
            transparent 38px
          ) 1;
        }
      `}</style>
    </div>
  );
};

export default BannerAds;
