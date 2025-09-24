import React, { useRef, useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
 
import Video1 from "../../assets/videos/verifiedCustomers/video1.mp4";
import Video2 from "../../assets/videos/verifiedCustomers/video2.mp4";
const mediaItems = [
  {
    type: "youtube",
    src: "https://img.youtube.com/vi/h3zk-cwS8hU/hqdefault.jpg", 
    link: "https://www.youtube.com/watch?v=h3zk-cwS8hU",
  },
  {
    type: "video",
    src: Video1,
    link: "https://www.youtube.com/watch?v=abc1",
  },
  {
    type: "video",
    src: Video2,
    link: "https://www.youtube.com/watch?v=abc2",
  },
  {
    type: "video",
    src: Video1,
    link: "https://www.youtube.com/watch?v=abc3",
  },
  {
    type: "video",
    src: Video2,
    link: "https://www.youtube.com/watch?v=abc4",
  },
];
 
// Duplicate for seamless loop
const loopedItems = [...mediaItems, ...mediaItems];
 
const HappyCustomerVideo = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
 
  // Lock/unlock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? "hidden" : "auto";
  }, [activeIndex]);
 
  // Infinite auto-scroll marquee
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
 
    const scrollSpeed = 1.2; // pixels per frame
    let animationFrameId;
 
    const step = () => {
      if (!isPaused) {
        scrollContainer.scrollLeft += scrollSpeed;
 
        // Reset scroll to simulate seamless loop
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };
 
    animationFrameId = requestAnimationFrame(step);
 
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);
 
  // Left/right buttons for marquee
  const handleScrollRight = () => {
    const container = scrollRef.current;
    if (!container) return;
 
    const newScroll = container.scrollLeft + 320;
    if (newScroll >= container.scrollWidth / 2) {
      container.scrollLeft = newScroll - container.scrollWidth / 2;
    } else {
      container.scrollLeft = newScroll;
    }
  };
 
  const handleScrollLeft = () => {
    const container = scrollRef.current;
    if (!container) return;
 
    const newScroll = container.scrollLeft - 320;
    if (newScroll < 0) {
      container.scrollLeft = container.scrollWidth / 2 + newScroll;
    } else {
      container.scrollLeft = newScroll;
    }
  };
 
  // Modal navigation
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % mediaItems.length);
  };
 
  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? mediaItems.length - 1 : prev - 1
    );
  };
 
  const handleClose = () => {
    setActiveIndex(null);
  };
 
  return (
    <div className="relative w-full">
      <h2 className="text-xl font-semibold mb-4">Videos</h2>
 
      {/* Auto-scrolling wrapper */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {loopedItems.map((item, index) => (
          <div
            key={index}
            className="min-w-[300px] max-w-[320px] bg-white border rounded-lg shadow-sm overflow-hidden flex-shrink-0 cursor-pointer"
            onClick={() => setActiveIndex(index % mediaItems.length)}
          >
            {item.type === "youtube" ? (
              <div className="relative w-full h-60">
                <img
                  src={item.src}
                  alt="YouTube thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25">
                  <div className="bg-red-600 text-white rounded-full p-3">
                    ▶
                  </div>
                </div>
              </div>
            ) : (
              <video
                src={item.src}
                muted
                className="w-full h-60 object-cover"
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => {
                  e.target.pause();
                  e.target.currentTime = 0;
                }}
              />
            )}
          </div>
        ))}
      </div>
 
      {/* Left/Right Scroll Buttons */}
      <button
        onClick={handleScrollLeft}
        className="absolute top-1/2 -translate-y-1/2 left-0 bg-white border rounded-full shadow-md p-2 hover:bg-gray-100"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={handleScrollRight}
        className="absolute top-1/2 -translate-y-1/2 right-0 bg-white border rounded-full shadow-md p-2 hover:bg-gray-100"
      >
        <ChevronRight size={20} />
      </button>
 
      {/* Modal Popup */}
      {activeIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-[90%] max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 bg-white text-red-600 rounded-full p-2 shadow hover:bg-gray-200 z-10"
            >
              <X size={20} />
            </button>
 
            {/* YouTube or Video */}
            {mediaItems[activeIndex].type === "youtube" ? (
              <iframe
                src={mediaItems[activeIndex].link.replace(
                  "watch?v=",
                  "embed/"
                )}
                title="YouTube video"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <iframe
                src={mediaItems[activeIndex].link.replace(
                  "watch?v=",
                  "embed/"
                )}
                title="Video"
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            )}
 
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute top-1/2 -translate-y-1/2 left-2 bg-white text-black rounded-full p-2 shadow hover:bg-gray-200"
            >
              <ChevronLeft size={24} />
            </button>
 
            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute top-1/2 -translate-y-1/2 right-2 bg-white text-black rounded-full p-2 shadow hover:bg-gray-200"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default HappyCustomerVideo;