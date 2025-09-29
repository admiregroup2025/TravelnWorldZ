import React from "react";
import {
  FaMapMarkedAlt,
  FaLaptopCode,
  FaUsers,
  FaPlaneDeparture,
  FaSuitcaseRolling,
  FaRegClock,
  FaBlog,
  FaShieldAlt,
} from "react-icons/fa";

const services = [
  {
    icon: <FaPlaneDeparture className="text-2xl sm:text-3xl text-blue-500" />,
    title: "B2B Travel Packages",
    description:
      "We collaborate with ticketing agents and transport providers to offer seamless travel solutions — including flights, stays, and logistics for corporate or group travel.",
  },
  {
    icon: <FaUsers className="text-2xl sm:text-3xl text-blue-500" />,
    title: "Digital Travel Services",
    description:
      "From zero-interest EMI options to digital booking tools, we simplify bulk travel management and empower our B2B clients with flexible financial and digital solutions.",
  },
  {
    icon: <FaRegClock className="text-2xl sm:text-3xl text-blue-500" />,
    title: "24/7 Partner Support",
    description:
      "Get round-the-clock assistance with bookings, updates, or technical queries — ensuring you never face downtime during critical B2B operations.",
  },
  {
    icon: <FaLaptopCode className="text-2xl sm:text-3xl text-blue-500" />,
    title: "Website Development",
    description:
      "We build responsive, high-converting websites tailored for travel businesses. From design to deployment, we manage it all — fast and SEO-optimized.",
  },
  {
    icon: <FaShieldAlt className="text-2xl sm:text-3xl text-blue-500" />,
    title: "Secure & Reliable Systems",
    description:
      "Safety is non-negotiable. Our systems ensure insured travel, secure transactions, and real-time support — so your customers can trust your brand.",
  },
  {
    icon: <FaBlog className="text-2xl sm:text-3xl text-blue-500" />,
    title: "Industry Insights & Blogs",
    description:
      "Explore our curated blogs focused on travel trends, digital transformation, and business growth strategies for B2B travel partners.",
  },
  {
    icon: <FaLaptopCode className="text-2xl sm:text-3xl text-blue-500" />,
    title: "Social Media Management",
    description:
      "We handle your brand’s presence across all major platforms — content creation, scheduling, analytics — to boost your online visibility and engagement.",
  },
  {
    icon: <FaUsers className="text-2xl sm:text-3xl text-blue-500" />,
    title: "Logo Design",
    description:
      "Establish a strong visual identity with our custom logo and branding packages — built specifically for travel startups and agencies.",
  },
  {
    icon: <FaUsers className="text-2xl sm:text-3xl text-blue-500" />,
    title: "Branding & Social Media Management",
    description:
      "We craft your travel brand’s identity with custom logo design, consistent visual language, and professional social media management. From strategy to execution, we handle your complete digital presence to boost trust and visibility.",
  },
];

const AboutOurServices = () => {
  return (
    <section className="bg-orange-50 py-12 px-4 sm:px-6 md:px-10 lg:px-20">
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600 mb-10">
        ✈️ TravelnWorlds At Your Service
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-5 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-orange-100 rounded-full mr-4">
                {service.icon}
              </div>
              <h3 className="font-semibold text-base sm:text-lg text-gray-800">
                {service.title}
              </h3>
            </div>
            <p className="text-sm sm:text-base text-gray-600 flex-grow">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutOurServices;
