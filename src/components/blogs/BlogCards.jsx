import React from 'react';
import ShareButton from './ShareButton';
import { Link } from 'react-router-dom';
import img1 from "../../assets/images/blogs/blogIce.jpg";
import img2 from "../../assets/images/blogs/blogSahara.jpg";
import img3 from "../../assets/images/blogs/blogcolorOfIndia.jpg";



const BlogCards = () => {
  const blogs = [
    {
      id: 1,
      title: "Discover the Beauty of Iceland",
      desc: "From waterfalls to glaciers, explore nature’s most stunning creations.",
      img: img1,
      url: "https://travelnworld.com/blog/iceland",
    },
    {
      id: 2,
      title: "A Journey Through the Sahara",
      desc: "Feel the golden dunes and magical sunsets of the vast desert.",
      img:img2,
      url: "https://travelnworld.com/blog/sahara",
    },
    {
      id: 3,
      title: "Colors of India",
      desc: "Dive into the rich culture, food, and traditions of India.",
      img: img3,
      url: "https://travelnworld.com/blog/india",
    },
  ];

  return (
    <div className="py-12 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col overflow-hidden"
          >
            {/* Image at Top */}
            <img
              src={blog.img}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h2>
              <p className="text-gray-600 text-sm flex-grow">{blog.desc}</p>

              {/* Footer */}
              <div className="mt-4 flex justify-between items-center">
                <Link
                  to={`/blogs/${blog.id}`}
                  className="text-orange-500 text-sm font-semibold hover:underline"
                >
                  Read More →
                </Link>

                {/* ✅ Share button component */}
                <ShareButton
                  title={blog.title}
                  text={blog.desc}
                  url={blog.url}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogCards;