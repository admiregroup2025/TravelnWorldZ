import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TourPackages from "../../assets/images/tourPackage.jpeg";
import travelItemPropType from '../../propTypes/travelItemPropType.js';
function VerifyTour({ travelItem }) {
  const navigate = useNavigate();
  const { id } = useParams(); // Get dynamic ID from the URL
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
 
  const handleViewAll = () => {
    navigate(`/verified-transport-details/${id}/packages`);
  };
 
  // Duplicate dataset for infinite marquee
  const duplicatedPackages = [
    ...travelItem.tourPackages,
    ...travelItem.tourPackages,
  ];
 
  // Continuous marquee logic
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
 
    const speed = 0.8; // adjust speed here
 
    const step = () => {
      if (!isPaused && !isDragging.current) {
        scrollContainer.scrollLeft += speed;
 
        // Reset at halfway for seamless loop
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(step);
    };
 
    animationRef.current = requestAnimationFrame(step);
 
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPaused]);
 
  // Mouse/touch drag scroll handlers
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    setIsPaused(true);
  };
 
  const handleMouseLeave = () => {
    isDragging.current = false;
    setIsPaused(false);
  };
 
  const handleMouseUp = () => {
    isDragging.current = false;
    setIsPaused(false);
  };
 
  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // drag sensitivity
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };
 
  return (
    <section id="packages" className="mb-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-xl flex items-center gap-2">
          Tour Packages
        </h2>
        <button
          onClick={handleViewAll}
          className="text-blue-600 text-md font-medium underline"
        >
          View All
        </button>
      </div>
 
      {/* Marquee container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll scrollbar-hide gap-4 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {duplicatedPackages.map((pkg, i) => (
          <div
            key={i}
            className="border rounded-md shadow-md overflow-hidden flex flex-col h-80 min-w-[280px] bg-white"
          >
            {/* IMAGE SECTION */}
            <div className="h-1/2 w-full">
              <img
                src={TourPackages}
                alt={`Package for ${pkg.destination}`}
                className="w-full h-full object-cover"
              />
            </div>
 
            {/* DETAILS SECTION */}
            <div className="h-1/2 p-4 flex flex-col justify-between bg-white">
              <div>
                <h3 className="font-bold text-base mb-1">
                  Packages For {pkg.destination}
                </h3>
                <p className="text-gray-700 font-medium text-sm mb-2">
                  {pkg.description}
                </p>
                <p className="font-bold text-sm mb-2">{pkg.price} onwards</p>
              </div>
              <div className="flex flex-col gap-1">
                <button className="text-blue-600 text-sm font-semibold underline w-fit">
                  View Details
                </button>
                <button className="border border-blue-600 text-blue-600 text-sm font-semibold py-1 rounded hover:bg-blue-50 w-full">
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
VerifyTour.propTypes = {
  travelItem: travelItemPropType.isRequired,
}; 
export default VerifyTour;