import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const internationalPackages = [
  {
    id: 1,
    duration: "7 days & 6 nights",
    rating: 5.0,
    reviews: 512,
    title: "Singapore And Bali Honeymoon Bliss | City Romance To Tropical Retreat",
    cities: "3D Singapore • 4D Kuta",
    originalPrice: 84616,
    discountedPrice: 55000,
    image: "https://assets.traveltriangle.com/blog/wp-content/uploads/2019/07/cover-Debosmita.jpg",
  },
    {
    id: 2,
    duration: "7 days & 6 nights",
    rating: 5.0,
    reviews: 512,
    title: "Singapore And Bali Honeymoon Bliss | City Romance To Tropical Retreat",
    cities: "3D Singapore • 4D Kuta",
    originalPrice: 84616,
    discountedPrice: 55000,
    image:"https://hldak.mmtcdn.com/prod-s3-hld-hpcmsadmin/holidays/images/cities/1971/Eye-on-Malaysia.jpg?downsize=414:200",
    },
    {
    id: 3,
    duration: "7 days & 6 nights",
    rating: 5.0,
    reviews: 512,
    title: "Singapore And Bali Honeymoon Bliss | City Romance To Tropical Retreat",
    cities: "3D Singapore • 4D Kuta",
    originalPrice: 84616,
    discountedPrice: 55000,
    image:"https://hldak.mmtcdn.com/prod-s3-hld-hpcmsadmin/holidays/images/cities/6679/DJI_0230.JPG?downsize=414:200",
    },
    {
    id: 4,
    duration: "7 days & 6 nights",
    rating: 5.0,
    reviews: 512,
    title: "Singapore And Bali Honeymoon Bliss | City Romance To Tropical Retreat",
    cities: "3D Singapore • 4D Kuta",
    originalPrice: 84616,
    discountedPrice: 55000,
    image:"https://hldak.mmtcdn.com/prod-s3-hld-hpcmsadmin/holidays/images/cities/2514/night%20safari.jpg?downsize=414:200",
    },
    {
    id: 5,
    duration: "7 days & 6 nights",
    rating: 5.0,
    reviews: 512,
    title: "Singapore And Bali Honeymoon Bliss | City Romance To Tropical Retreat",
    cities: "3D Singapore • 4D Kuta",
    originalPrice: 84616,
    discountedPrice: 55000,
    image:"https://media1.thrillophilia.com/filestore/bguq6u9kpzpbkf6hma9863o4dvrq_shutterstock_1069596530%20(1).jpg?h=382&w=auto&dpr=1.25",
    },
    {
    id: 6,
    duration: "7 days & 6 nights",
    rating: 5.0,
    reviews: 512,
    title: "Singapore And Bali Honeymoon Bliss | City Romance To Tropical Retreat",
    cities: "3D Singapore • 4D Kuta",
    originalPrice: 84616,
    discountedPrice: 55000,
    image:"https://media1.thrillophilia.com/filestore/8e1t9z62s8gzin6jtpq3ihthuq97_w09hlz63uyzk224oau0e6av3nsa6_1595506608_shutterstock_663463981.jpg.jpg?h=382&w=auto&dpr=1.25",
     },
    {
     id: 7,
    duration: "7 days & 6 nights",
    rating: 5.0,
    reviews: 512,
    title: "Singapore And Bali Honeymoon Bliss | City Romance To Tropical Retreat",
    cities: "3D Singapore • 4D Kuta",
    originalPrice: 84616,
    discountedPrice: 55000,
    image:"https://media1.thrillophilia.com/filestore/ym0de25271c8bed0430y159uwrwe_shutterstock_235800778.jpg?w=580&dpr=2",
     },
    {
     id: 8,
    duration: "7 days & 6 nights",
    rating: 5.0,
    reviews: 512,
    title: "Singapore And Bali Honeymoon Bliss | City Romance To Tropical Retreat",
    cities: "3D Singapore • 4D Kuta",
    originalPrice: 84616,
    discountedPrice: 55000,
    image:"https://media1.thrillophilia.com/filestore/h0r525o9avdbe7nm839mrkczy16p_shutterstock_1153538392.jpg?dpr=1.25&w=1536",
     },
    {
     id: 9,
    duration: "7 days & 6 nights",
    rating: 5.0,
    reviews: 512,
    title: "Singapore And Bali Honeymoon Bliss | City Romance To Tropical Retreat",
    cities: "3D Singapore • 4D Kuta",
    originalPrice: 84616,
    discountedPrice: 55000,
    image:"https://media1.thrillophilia.com/filestore/sfw0sw4nhgzk0yegkil8jla98ydq_shutterstock_743903413.jpg?dpr=1.25&w=1536",

  },
  {
    id: 10,
    duration: "5 days & 4 nights",
    rating: 4.9,
    reviews: 407,
    title: "Splendid Bangkok Pattaya Honeymoon Package From India",
    cities: "5D  Sattahip  ",
    originalPrice: 63507,
    discountedPrice: 47750,
    image: "https://img.traveltriangle.com/apac/attachments/pictures/865988/original/Cartoon_Network_Amazone_Water_Park.jpg?tr=w-680,h-400",
     },
    {
     id: 11,
    duration: "7 days & 6 nights",
    rating: 5.0,
    reviews: 512,
    title: "Singapore And Bali Honeymoon Bliss | City Romance To Tropical Retreat",
    cities: "3D Singapore • 4D Kuta",
    originalPrice: 84616,
    discountedPrice: 55000,
    image:"https://media2.thrillophilia.com/images/photos/000/383/322/original/1649936699_Grand_Palace_Bangkok.jpg?w=753&h=450&dpr=1.5",
     },
    {
     id: 12,
    duration: "7 days & 6 nights",
    rating: 5.0,
    reviews: 512,
    title: "Singapore And Bali Honeymoon Bliss | City Romance To Tropical Retreat",
    cities: "3D Singapore • 4D Kuta",
    originalPrice: 84616,
    discountedPrice: 55000,
    image:"https://media2.thrillophilia.com/images/photos/000/383/326/original/1649936952_Dream_World.jpg?w=753&h=450&dpr=1.5",
     },
    {
     id: 13,
    duration: "7 days & 6 nights",
    rating: 5.0,
    reviews: 512,
    title: "Singapore And Bali Honeymoon Bliss | City Romance To Tropical Retreat",
    cities: "3D Singapore • 4D Kuta",
    originalPrice: 84616,
    discountedPrice: 55000,
    image:"https://media2.thrillophilia.com/images/photos/000/383/323/original/1649936820_Siam_Amazing_Park.jpg?w=753&h=450&dpr=1.5",
     },
    {
     id: 14,
    duration: "7 days & 6 nights",
    rating: 5.0,
    reviews: 512,
    title: "Singapore And Bali Honeymoon Bliss | City Romance To Tropical Retreat",
    cities: "3D Singapore • 4D Kuta",
    originalPrice: 84616,
    discountedPrice: 55000,
    image:"https://media1.thrillophilia.com/filestore/lidriwjyt1swfocqho114yizg1r7_ae3ngvrdbzkwezf5l0reo1r9krpw_dl.beatsnoop.com-3000-ONyZLuzdFU.jpg?w=580&dpr=2",
    },
    {
    id: 15,
    duration: "7 days & 6 nights",
    rating: 5.0,
    reviews: 512,
    title: "Singapore And Bali Honeymoon Bliss | City Romance To Tropical Retreat",
    cities: "3D Singapore • 4D Kuta",
    originalPrice: 84616,
    discountedPrice: 55000,
    image:"https://media1.thrillophilia.com/filestore/sh3ccvp85jj6r66k8mz2debse6gn_98.jpg?w=auto&h=600",
     },
    {
     id: 16,
    duration: "7 days & 6 nights",
    rating: 5.0,
    reviews: 512,
    title: "Singapore And Bali Honeymoon Bliss | City Romance To Tropical Retreat",
    cities: "3D Singapore • 4D Kuta",
    originalPrice: 84616,
    discountedPrice: 55000,
    image:"https://media1.thrillophilia.com/filestore/ct8psymd4qtguzgap8p4k151wlcw_302420147_3376176309293829_6392722203322518698_n.jpg?w=600&dpr=1.3",
     },
    {
     id: 17,
    duration: "7 days & 6 nights",
    rating: 5.0,
    reviews: 512,
    title: "Singapore And Bali Honeymoon Bliss | City Romance To Tropical Retreat",
    cities: "3D Singapore • 4D Kuta",
    originalPrice: 84616,
    discountedPrice: 55000,
    image:"https://media1.thrillophilia.com/filestore/rql1mx97sa1x2o3zv9nwnwkp1vi8_Grand%20Palace-Bangkok.jpg?w=600&dpr=1.3",
  },
  {
    id: 18,
    duration: "7 days & 6 nights",
    rating: 4.8,
    reviews: 146,
    title: "An evening view of Wat Pho temple complex in Thailand",
    cities: "3D  Thailand • 4D Kuala Lumpur",
    originalPrice: 119000,
    discountedPrice: 79000,
    image: "https://img.traveltriangle.com/apac/attachments/pictures/879215/original/An_evening_view_of_Wat_Pho_temple_complex_in_Thailand.jpg?tr=w-680,h-400",
     },
    {
    id: 19,
    duration: "7 days & 6 nights",
    rating: 4.8,
    reviews: 146,
    title: "Dubai Honeymoon Escape | Arabian Nights & City Lights",
    cities: "3D  Dubai • 4D Kuala Lumpur",
    originalPrice: 119000,
    discountedPrice: 79000,
    image:"https://media1.thrillophilia.com/filestore/fcfvegglkeiuyjxdt9r18pxapf67_shutterstock_2386280701%20(1).jpg?w=340&dpr=2",
     },
    {
    id: 20,
    duration: "7 days & 6 nights",
    rating: 4.8,
    reviews: 146,
    title: "An evening view of Wat Pho temple complex in Dubai",
    cities: "3D  Dubai • 4D Kuala Lumpur",
    originalPrice: 119000,
    discountedPrice: 79000,
    image:"https://media1.thrillophilia.com/filestore/plo8mfkpn40x6t8w3vzypnje6fnx_shutterstock_2042237531.jpg?w=1080&h=auto&dpr=2",
     },
    {
    id: 21,
    duration: "7 days & 6 nights",
    rating: 4.8,
    reviews: 146,
    title: "Dubai Half Day City Tour An evening view of Wat Pho temple complex in Dubai",
    cities: "3D Dubai  • 4D Jumeirah Mosque ",
    originalPrice: 119000,
    discountedPrice: 79000,
    image:"https://media1.thrillophilia.com/filestore/6zjjeq03zqckbxagoa4z32wmzlpt_1556364213_shutterstock_181414508.jpg?h=382&w=auto&dpr=1.25",
     },
    {
    id: 22,
    duration: "7 days & 6 nights",
    rating: 4.8,
    reviews: 146,
    title: "Romantic Escape to Dubai | Love Amidst the Dunes",
    cities: "3D  Dubai • 4D Kuala Lumpur",
    originalPrice: 119000,
    discountedPrice: 79000,
    image:"https://media1.thrillophilia.com/filestore/moituzcfstpqjhaxxrdjuy27k3g3_shutterstock_2472689121.jpg?w=340&dpr=2",
     },
    {
    id: 23,
    duration: "7 days & 6 nights",
    rating: 4.8,
    reviews: 146,
    title: "An evening view of Wat Pho temple complex in Thailand",
    cities: "3D  Thailand • 4D Kuala Lumpur",
    originalPrice: 119000,
    discountedPrice: 79000,
    image:"https://hldak.mmtcdn.com/prod-s3-hld-hpcmsadmin/holidays/images/cities/3051/Mesmerizing%20Pattaya%20and%20Bangkok%20-%2053558.jpg?downsize=414:200",
     },
    {
    id: 24,
    duration: "7 days & 6 nights",
    rating: 4.8,
    reviews: 146,
    title: "An evening view of Wat Pho temple complex in Thailand",
    cities: "3D  Thailand • 4D Kuala Lumpur",
    originalPrice: 119000,
    discountedPrice: 79000,
    image:"https://hldak.mmtcdn.com/prod-s3-hld-hpcmsadmin/holidays/images/cities/3051/Best%20of%20Pattaya%20&%20Bangkok%20Getaway%20-%2053559.jpg?downsize=414:200",
     },
    {
    id: 25,
    duration: "7 days & 6 nights",
    rating: 4.8,
    reviews: 146,
    title: "An evening view of Wat Pho temple complex in Thailand22",
    cities: "3D  Thailand • 4D Kuala Lumpur",
    originalPrice: 119000,
    discountedPrice: 79000,
    image:"https://media1.thrillophilia.com/filestore/ubtqla2vliig9gtkad8lxt99v2dk_01031120008jddl9v3ECE.jpg?w=340&dpr=2",
     },
    {

   id: 28,
    duration: "7 days & 6 nights",
    rating: 4.8,
    reviews: 146,
    title: "Luxury Honeymoon in Dubai | Golden Sands & City Lights",
    cities: "3D  Honeymoon • 4D Kuala Lumpur",
    originalPrice: 119000,
    discountedPrice: 79000,
    image:"https://media1.thrillophilia.com/filestore/fua6qo0t8msgos46pzchtevpx1e6_dl.beatsnoop.com-final-AwVZNOkM5P.jpg?h=382&w=auto&dpr=1.25"

  },
  {
    id: 27,
    duration: "7 days & 6 nights",
    rating: 4.8,
    reviews: 146,
    title: "An evening view of Wat Pho temple complex in Thailand",
    cities: "3D  Thailand • 4D Kuala Lumpur",
    originalPrice: 119000,
    discountedPrice: 79000,
    image:"https://media1.thrillophilia.com/filestore/lidriwjyt1swfocqho114yizg1r7_ae3ngvrdbzkwezf5l0reo1r9krpw_dl.beatsnoop.com-3000-ONyZLuzdFU.jpg?w=340&dpr=2"

  },



];

const InternationalDestination = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState("");

  const openForm = (place) => {
    setSelectedPlace(place);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedPlace("");
  };

  return (
    <div>
      <div className="  py-10 text-center">
        <h1 className="text-blue-700 text-3xl md:text-4xl font-bold">
          International Destinations
        </h1>
        <p className="mt-2 text-lg opacity-90">
          Explore our curated international travel package
        </p>
      </div>  

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {internationalPackages.map((pkg) => {
          const savings = pkg.originalPrice - pkg.discountedPrice;

          return (
            <div
              key={pkg.id}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="overflow-hidden h-64 rounded-t-xl">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Details */}
              <div className="p-4 space-y-2">
                <p className="text-sm text-gray-500 group-hover:text-black transition">
                  {pkg.duration}
                </p>

                <div className="flex items-center text-green-600 text-sm font-semibold group-hover:text-green-700 transition">
                  <span className="mr-1">★</span>
                  <span>{pkg.rating}</span>
                  <span className="text-gray-400 ml-1 group-hover:text-gray-600 transition">
                    ({pkg.reviews})
                  </span>
                </div>

                <h3 className="text-gray-900 font-semibold text-[16px] leading-snug group-hover:text-orange-600 transition">
                  {pkg.title}
                </h3>

                <div className="bg-orange-100 text-sm text-gray-800 px-2 py-1 rounded-md w-fit group-hover:bg-orange-200 transition">
                  {pkg.cities}
                </div>

                <p className="text-sm text-gray-500 line-through mt-1 group-hover:text-gray-700 transition">
                  INR {pkg.originalPrice.toLocaleString()}
                </p>
                <p className="text-xs font-semibold text-green-700 group-hover:text-green-800 transition">
                  SAVE INR {savings.toLocaleString()}
                </p>
                <p className="text-xl font-bold text-gray-900 group-hover:text-black transition">
                  INR {pkg.discountedPrice.toLocaleString()}
                  <span className="text-sm font-normal text-gray-500 group-hover:text-gray-700">
                    {" "} /Adult
                  </span>
                </p>

                {/* Button to open form */}
                <button
                  onClick={() => openForm(pkg.title)}
                  className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md relative">
            <button
              onClick={closeForm}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-4">Enquiry Form</h3>
            <form className="space-y-4">
              <input
                type="text"
                value={selectedPlace}
                readOnly
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="tel"
                placeholder="Your Phone"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <textarea
                placeholder="Your Message"
                rows={3}
                className="w-full border border-gray-300 rounded px-3 py-2"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default InternationalDestination;