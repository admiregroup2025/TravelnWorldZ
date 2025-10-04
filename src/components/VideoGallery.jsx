import React, { useState } from "react";
import PropTypes from 'prop-types';
import { ChevronRight, ChevronLeft, X } from "lucide-react";
 
import vid1 from "../assets/videos/hero.mp4";
import vid2 from "../assets/videos/contactUs.mp4";
import vid3 from "../assets/videos/hero.mp4";
import vid4 from "../assets/videos/contactUs.mp4";
 
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
    setSelectedIndex((prev) =>
      prev === 0 ? videos.length - 1 : prev - 1
    );
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-2">
          <div className="bg-white rounded-lg p-4 w-full max-w-6xl relative shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 text-2xl z-50"
            >
              <X size={20} />
            </button>
 
            <h2 className="text-xl font-semibold mb-4 text-center">
              Video Gallery
            </h2>
 
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {videos.map(({ id, src }, index) => (
                 <div
                  key={id}
                  className="w-full h-40 rounded shadow overflow-hidden cursor-pointer"
                  onClick={() => setSelectedIndex(index)} 
                >
                  <video
                    src={src}
                    controls
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
 
      {/* 🔍 Fullscreen Video Popup */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-2">
          {/* Background blur */}
          <div className="absolute inset-0 backdrop-blur-sm bg-black bg-opacity-50"></div>
 
          {/* Popup Card */}
          <div className="relative w-full max-w-[400px] h-[500px] bg-white rounded-lg shadow-lg flex items-center justify-center z-40">
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 text-2xl z-50"
            >
              <X size={20} />
            </button>
 
            {/* Video */}
            <video
              src={videos[selectedIndex].src}
              controls
              autoPlay
              className="w-full h-full object-cover rounded"
            />
          </div>
 
          {/* Prev Button */}
          <button
            onClick={showPrev}
            className="absolute left-2 sm:left-[calc(50%-200px-40px)] top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center text-black shadow hover:bg-gray-100 z-50"
          >
            <ChevronLeft size={20} />
          </button>
 
          {/* Next Button */}
          <button
            onClick={showNext}
            className="absolute right-2 sm:right-[calc(50%-200px-40px)] top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center text-black shadow hover:bg-gray-100 z-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </>
  );
}

VideoGallery.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
}; 
export default VideoGallery;