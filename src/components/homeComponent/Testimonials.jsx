import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Pritam Ghosh',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Pritam Ghosh',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    {
      name: 'Pritam Ghosh',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://randomuser.me/api/portraits/men/51.jpg',
    },
    {
      name: 'Yash Joshi',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    {
        name: 'Parul Joshi',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
  ];


  const TestimonialCard = ({ image, name, text, stars = 4 }) => {
    return (
      <div className="relative bg-white rounded-xl p-6 shadow-md w-72 mx-3 shrink-0">
        {/* Top Quote */}
        <div className="absolute top-0 left-0 w-10 h-10 bg-blue-500 text-white rounded-br-xl flex items-center justify-center text-xl font-bold">
          ❝
        </div>

        {/* Testimonial Text */}
        <p className="text-sm text-gray-600 mb-4 mt-2">{text}</p>

        {/* Profile Image */}
        <img
          src={image}
          alt={name}
          className="w-14 h-14 rounded-full object-cover mx-auto mb-2 border border-gray-300"
        />

        {/* Name */}
        <h3 className="text-sm font-semibold text-gray-800">{name}</h3>

        {/* Stars */}
        <div className="text-orange-400 mt-2">{'★ '.repeat(stars).trim()}</div>

        {/* Bottom Quote */}
        <div className="absolute bottom-0 right-0 w-10 h-10 bg-blue-500 text-white rounded-tl-xl flex items-center justify-center text-xl font-bold">
          ❞
        </div>
      </div>
    );
  };

 return (
  <div className="max-w-[900px] mx-auto px-4">
    <section className="bg-amber-100 py-12 rounded-xl">
      <h2 className="text-2xl font-bold text-blue-600 text-center mb-10">
        Testimonials
      </h2>
      <div className="overflow-hidden">
        <div className="flex animate-scroll gap-4 w-max">
          {/* Duplicate content for infinite loop illusion */}
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard
              key={i}
              image={t.image}
              name={t.name}
              text={t.text}
              stars={4}
            />
          ))}
        </div>
      </div>
    </section>
  </div>
);

};

export default Testimonials;