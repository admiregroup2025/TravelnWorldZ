import React, { useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
 
// Videos (replace with your actual assets & YouTube links)
import Video1 from "../../assets/videos/verifiedCustomers/video1.mp4";
import Video2 from "../../assets/videos/verifiedCustomers/video2.mp4";
// import Video3 from "../../assets/videos/verifiedCustomers/video3.mp4";
 
const mediaItems = [
  { type: "video", src: Video1, link: "https://www.youtube.com/watch?v=abc1" },
  { type: "video", src: Video2, link: "https://www.youtube.com/watch?v=abc2" },
  { type: "video", src: Video1, link: "https://www.youtube.com/watch?v=abc1" },
  { type: "video", src: Video2, link: "https://www.youtube.com/watch?v=abc2" }, // repeat for demo
];
 
const HappyCustomerVideo = () => {
  const scrollRef = useRef(null);
 
  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };
 
  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };
 
  return (
    <div className="relative w-full">
      <h2 className="text-xl font-semibold mb-4"> Videos</h2>
 
      {/* Media Cards Wrapper */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {mediaItems.map((item, index) => (
          <div
            key={index}
            className="min-w-[300px] max-w-[320px] bg-white border rounded-lg shadow-sm overflow-hidden flex-shrink-0 cursor-pointer"
          >
            <video
              src={item.src}
              muted
              className="w-full h-60 object-cover"
              onMouseEnter={(e) => e.target.play()}
              onMouseLeave={(e) => {
                e.target.pause();
                e.target.currentTime = 0;
              }}
              onClick={() => window.open(item.link, "_blank")}
            />
          </div>
        ))}
      </div>
 
      {/* Left Scroll Button */}
      <button
        onClick={handleScrollLeft}
        className="absolute top-1/2 -translate-y-1/2 left-0 bg-white border rounded-full shadow-md p-2 hover:bg-gray-100"
      >
        <ChevronLeft size={20} />
      </button>
 
      {/* Right Scroll Button */}
      <button
        onClick={handleScrollRight}
        className="absolute top-1/2 -translate-y-1/2 right-0 bg-white border rounded-full shadow-md p-2 hover:bg-gray-100"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
 
export default HappyCustomerVideo;