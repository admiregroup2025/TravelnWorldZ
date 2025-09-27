import React, { useState } from "react";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
 
import img1 from "../assets/images/imageGallery/img1.png";
import img2 from "../assets/images/imageGallery/img2.png";
import img3 from "../assets/images/imageGallery/img3.png";
import img4 from "../assets/images/imageGallery/img4.png";
import img5 from "../assets/images/imageGallery/img1.png";
import img6 from "../assets/images/imageGallery/img2.png";
import img7 from "../assets/images/imageGallery/img3.png";
import img8 from "../assets/images/imageGallery/img4.png";
 
function ImageGallery({ isOpen, setIsOpen }) {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8];
  const [selectedIndex, setSelectedIndex] = useState(null);
 
  const showNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };
 
  const showPrev = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };
 
  return (
    <>
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
 
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center px-2">
          <div className="bg-white rounded-lg p-4 w-full max-w-6xl relative shadow-lg">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 text-2xl z-50"
            >
              <X size={20} />
            </button>
 
            <h2 className="text-xl font-semibold mb-4 text-center">Gallery</h2>
 
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Image ${index + 1}`}
                  className="w-full h-40 object-cover rounded shadow cursor-pointer hover:opacity-80"
                  onClick={() => setSelectedIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
 
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
 
            {/* Image */}
            <img
              src={images[selectedIndex]}
              alt={`Preview ${selectedIndex + 1}`}
              className="w-full h-full object-cover rounded"
            />
          </div>
 
          {/* Prev Button (1–2px outside the card) */}
          <button
            onClick={showPrev}
            className="absolute left-[calc(50%-200px-37px)] top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center text-black shadow hover:bg-gray-100 z-50"
          >
            <ChevronLeft size={20} />
          </button>
 
          {/* Next Button (1–2px outside the card) */}
          <button
            onClick={showNext}
            className="absolute right-[calc(50%-200px-37px)] top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center text-black shadow hover:bg-gray-100 z-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </>
  );
}
 
export default ImageGallery;