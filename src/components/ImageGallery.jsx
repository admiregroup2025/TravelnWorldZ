import React, { useState } from 'react';

import img1 from '../assets/images/topBannerAds/image1.jpg';
import img2 from '../assets/images/topBannerAds/image2.jpg';
import img3 from '../assets/images/topBannerAds/image3.jpg';
import img4 from '../assets/images/topBannerAds/image4.jpg';
import img5 from '../assets/images/topBannerAds/image5.jpg';
import img6 from '../assets/images/topBannerAds/image6.jpg';
import img7 from '../assets/images/topBannerAds/image7.jpg';
import img8 from '../assets/images/topBannerAds/image8.jpg';

function ImageGallery({ isOpen, setIsOpen }) {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8];
  const [selectedIndex, setSelectedIndex] = useState(null);

  const showNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const showPrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      {/* ▶️ Thumbnail Preview */}
      <div
        className="w-[200px] h-[150px] border rounded-md overflow-hidden shadow-sm cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <img
          src={images[0]}
          alt="Preview"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 🔥 Gallery Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-40 flex items-center justify-center px-2">
          <div className="bg-white rounded-md p-4 w-full max-w-6xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-6 text-gray-600 hover:text-black text-3xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold mb-6 text-center">Gallery</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Image ${index + 1}`}
                  className="w-full h-[200px] object-cover rounded shadow cursor-pointer hover:opacity-80"
                  onClick={() => setSelectedIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 🔍 Fullscreen Image Preview */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          {/* 🟧 Prev Button (outside image box) */}
          <button
            onClick={showPrev}
            className="absolute left-[calc(50%-300px)] top-1/2 transform -translate-y-1/2 
                      w-12 h-12 rounded-full bg-white
                      flex items-center justify-center 
                      text-black text-3xl font-extrabold 
                      hover:bg-orange-600 z-50 shadow-lg"
            title="Previous"
          >
            &#8592;
          </button>

          {/* 🟧 Next Button (outside image box) */}
          <button
            onClick={showNext}
            className="absolute right-[calc(50%-300px)] top-1/2 transform -translate-y-1/2 
                      w-12 h-12 rounded-full bg-white 
                      flex items-center justify-center 
                      text-black text-3xl font-extrabold 
                      hover:bg-orange-600 z-50 shadow-lg"
            title="Next"
          >
            &#8594;
          </button>

          {/* 📦 Image Box with full white background */}
          <div className="relative w-[500px] h-[500px] bg-white rounded-lg shadow-lg z-40 flex items-center justify-center">
            {/* ❌ Close Button (inside image box, top-right corner) */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center
                         rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 text-2xl font-bold z-50"
              title="Close"
            >
              &times;
            </button>

            {/* 🖼️ Image - full cover inside white box */}
            <img
              src={images[selectedIndex]}
              alt={`Preview ${selectedIndex + 1}`}
              className="max-w-full max-h-full "
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ImageGallery;
