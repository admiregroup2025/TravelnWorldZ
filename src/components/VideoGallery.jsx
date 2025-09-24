import React, { useState } from 'react';

import vid1 from '../assets/videos/hero.mp4';
import vid2 from '../assets/videos/contactUs.mp4';
import vid3 from '../assets/videos/hero.mp4';
import vid4 from '../assets/videos/contactUs.mp4';

const videos = [
  { id: 1, src: vid1 },
  { id: 2, src: vid2 },
  { id: 3, src: vid3 },
  { id: 4, src: vid4 },
];

function VideoGallery({ isOpen, setIsOpen }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const showNext = () => {
    setSelectedIndex((prev) => (prev + 1) % videos.length);
  };

  const showPrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  return (
    <>
      {/* ▶️ Preview Video */}
      <div
        className="w-[200px] h-[150px] border rounded-md overflow-hidden shadow-sm cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <video
          src={videos[0].src}
          className="w-full h-full object-cover"
          muted
          loop
          autoPlay
          playsInline
        />
      </div>

      {/* 🔥 Video Grid Modal */}
      {isOpen && selectedIndex === null && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center px-2">
          <div className="bg-white rounded-md p-4 w-full max-w-6xl max-h-[90vh] overflow-y-auto relative">
            {/* ❌ Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-6 text-gray-600 hover:text-black text-3xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold mb-6 text-center">Video Gallery</h2>

            {/* 📼 Video Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {videos.map(({ id, src }, index) => (
                <video
                  key={id}
                  src={src}
                  controls
                  className="w-full h-[200px] rounded shadow object-cover cursor-pointer"
                  onClick={() => setSelectedIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 🔍 Fullscreen Video View */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          {/* ⬅️ Prev Button */}
          <button
            onClick={showPrev}
            className="absolute left-[calc(50%-300px)] top-1/2 transform -translate-y-1/2 
                      w-12 h-12 rounded-full bg-orange-500 
                      flex items-center justify-center 
                      text-white text-3xl font-extrabold 
                      hover:bg-orange-600 z-50 shadow-lg"
            title="Previous"
          >
            &#8592;
          </button>

          {/* ➡️ Next Button */}
          <button
            onClick={showNext}
            className="absolute right-[calc(50%-300px)] top-1/2 transform -translate-y-1/2 
                      w-12 h-12 rounded-full bg-orange-500 
                      flex items-center justify-center 
                      text-white text-3xl font-extrabold 
                      hover:bg-orange-600 z-50 shadow-lg"
            title="Next"
          >
            &#8594;
          </button>

          {/* 📺 Video Box */}
          <div className="relative w-[500px] h-[500px] bg-white rounded-lg shadow-lg z-40 flex items-center justify-center">
            {/* ❌ Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center
                         rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 text-2xl font-bold z-50"
              title="Close"
            >
              &times;
            </button>

            {/* 🖥️ Video Element */}
            <video
              src={videos[selectedIndex].src}
              controls
              autoPlay
              className="max-w-full max-h-full object-contain rounded"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default VideoGallery;
