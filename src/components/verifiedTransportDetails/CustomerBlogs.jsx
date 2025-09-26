import React from "react";
import customerblogData from "../../data/customerBlogData";
import { Link } from "react-router-dom";

const CustomerBlogs = ({ transporterId, transporterName }) => {
  // Filter blogs by transporterId if provided
  const blogs = transporterId
    ? customerblogData.filter(blog => blog.transporterId === transporterId)
    : customerblogData;

  if (blogs.length === 0)
    return (
      <div className="text-center mt-10 text-gray-600">
        No blogs available at the moment.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      {transporterName && (
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Blogs by {transporterName}
        </h2>
      )}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map(blog => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow hover:shadow-md transition flex flex-col"
          >
            <img
              src={blog.img}
              alt={blog.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
              <p className="text-sm text-gray-600 flex-grow">{blog.desc}</p>
              <div className="mt-3">
                <Link
                  to={`/blogs/${blog.id}`}
                  className="text-blue-600 text-sm font-semibold hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerBlogs;
