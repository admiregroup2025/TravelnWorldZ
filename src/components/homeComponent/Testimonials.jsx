import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import PropTypes from 'prop-types';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Pritam Ghosh",
      role: "Software Engineer",
      text: "This platform helped me a lot. The experience was smooth and seamless.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Ananya Sharma",
      role: "Designer",
      text: "Absolutely loved the UI and usability. Highly recommend to everyone!",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      name: "Rohan Mehta",
      role: "Entrepreneur",
      text: "A game changer for my business. Support team is fantastic too.",
      image: "https://randomuser.me/api/portraits/men/51.jpg",
    },
    {
      name: "Yash Joshi",
      role: "Freelancer",
      text: "Best service I’ve used in years. Totally worth every penny!",
      image: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    {
      name: "Parul Joshi",
      role: "Marketing Head",
      text: "User-friendly and efficient. Made my workflow much easier.",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
    },
  ];

  const TestimonialCard = ({ image, name, role, text, stars = 5 }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative bg-white/70 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 w-80 mx-3 shrink-0 border border-gray-200 dark:border-gray-700"
      >
        {/* Top Quote */}
        <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-br-xl flex items-center justify-center text-xl font-bold shadow-md">
          ❝
        </div>

        {/* Testimonial Text */}
        <p className="text-base italic text-gray-700 dark:text-gray-200 mb-4 mt-4 leading-relaxed">
          {text}
        </p>

        {/* Profile Image */}
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-blue-400 shadow-sm"
        />

        {/* Name + Role */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>

        {/* Stars */}
        <div className="flex justify-center mt-2">
          {[...Array(stars)].map((_, idx) => (
            <Star
              key={idx}
              className="w-5 h-5 text-yellow-400 fill-yellow-400 drop-shadow-sm"
            />
          ))}
        </div>

        {/* Bottom Quote */}
        <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-tl-xl flex items-center justify-center text-xl font-bold shadow-md">
          ❞
        </div>
      </motion.div>
    );
  };
  TestimonialCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  stars: PropTypes.number,
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <section className="bg-gradient-to-r from-amber-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 rounded-3xl group overflow-hidden">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-blue-700 dark:text-blue-400">
          What Our Clients Say
        </h2>
        <div className="overflow-hidden">
          <div className="flex animate-scroll gap-8 w-max hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((t, i) => (
              <TestimonialCard
                key={i}
                image={t.image}
                name={t.name}
                role={t.role}
                text={t.text}
                stars={5}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
