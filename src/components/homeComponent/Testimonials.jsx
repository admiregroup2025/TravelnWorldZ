import React, { useState, useEffect } from "react";
import { Star, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import PropTypes from 'prop-types';
import axios from 'axios';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        console.log("Fetching testimonials from backend...");
        const res = await axios.get('http://localhost:5000/api/testimonials');
        console.log("Response data:", res.data);
        if (res.data.success) {
          // Show if visibility is Public or not set
          const publicData = res.data.data.filter(t => !t.visibility || t.visibility === 'Public');
          console.log("Filtered Public Data:", publicData);
          setTestimonials(publicData);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const TestimonialCard = ({ image, name, role, text, stars = 5, type, videoUrl, location }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative bg-white/70 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 w-80 mx-3 shrink-0 border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        {/* Top Quote */}
        <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-br-xl flex items-center justify-center text-xl font-bold shadow-md z-10">
          ❝
        </div>

        {/* Video Type indicator or Text Icon */}
        <div className="flex justify-end mb-2">
          {type === 'video' ? (
            <a href={videoUrl} target="_blank" rel="noreferrer" className="text-red-500 hover:scale-110 transition-transform">
              <PlayCircle className="w-8 h-8" />
            </a>
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-xs font-bold">
              IMG
            </div>
          )}
        </div>

        {/* Testimonial Text / Content */}
        <p className="text-sm italic text-gray-700 dark:text-gray-200 mb-4 min-h-[60px] leading-relaxed">
          {text || "Check out our travel experience!"}
        </p>

        {/* Profile Image / Video Thumbnail */}
        <div className="relative mb-3">
          <img
            src={image || (type === 'video' ? 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400' : 'https://via.placeholder.com/150')}
            alt={name}
            className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-blue-400 shadow-sm"
          />
        </div>

        {/* Name + Role */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{role} {location && `• ${location}`}</p>
        </div>

        {/* Stars */}
        <div className="flex justify-center mt-2">
          {[...Array(stars)].map((_, idx) => (
            <Star
              key={idx}
              className="w-4 h-4 text-yellow-400 fill-yellow-400 drop-shadow-sm"
            />
          ))}
        </div>

        {/* Bottom Quote */}
        <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-tl-xl flex items-center justify-center text-xl font-bold shadow-md z-10">
          ❞
        </div>
      </motion.div>
    );
  };

  if (loading) return null;
  
  // If no testimonials, show a placeholder or nothing
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 my-10">
      <section className="bg-gradient-to-r from-amber-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 rounded-[3rem] group overflow-hidden shadow-inner border border-white/50">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900 dark:text-white tracking-tight">
          Heartfelt <span className="text-blue-600">Stories</span> from Our Travelers
        </h2>
        <div className="overflow-hidden">
          <div className="flex animate-scroll gap-8 w-max hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((t, i) => (
              <TestimonialCard
                key={i}
                image={t.image}
                name={t.name}
                role={t.role}
                text={t.content}
                stars={t.rating || 5}
                type={t.type}
                videoUrl={t.videoUrl}
                location={t.location}
              />
            ))}
          </div>
        </div>
      </section>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1rem)); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Testimonials;
