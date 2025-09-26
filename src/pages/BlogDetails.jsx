import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import blogs from '../data/blogs';
import ShareButton from '../components/blogs/ShareButton';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import logo from '../assets/images/logo/logo.jpeg';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find((b) => b.id === parseInt(id));

  if (!blog) {
    return <p className="text-center py-10 text-red-500">Blog not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 font-sans text-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-600 hover:text-gray-900 font-medium transition"
        >
          ← Back
        </button>

        <img src={logo} alt="Logo" className="h-10" />

        <ShareButton
          title={blog.title}
          text={
            // For share text, use first paragraph or first item of list if first is a list
            typeof blog.content[0] === 'string' 
              ? blog.content[0] 
              : blog.content[0].items?.join(', ') || ''
          }
          url={window.location.href}
        />
      </div>

      {/* Blog Image */}
      <img
        src={blog.img}
        alt={blog.title}
        className="w-full rounded-lg mb-8 shadow-md"
      />

      {/* Title */}
      <h1 className="text-4xl font-semibold tracking-wide mb-6">{blog.title}</h1>

      {/* Content */}
      <div className="space-y-6 text-gray-700 leading-relaxed">
        {blog.content.map((block, i) => {
          if (typeof block === 'string') {
            return (
              <p key={i} className="text-lg">
                {block}
              </p>
            );
          } else if (block.type === 'list' && Array.isArray(block.items)) {
            return (
              <ul key={i} className="list-disc list-inside ml-5 space-y-1 text-lg">
                {block.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            );
          }
          return null;
        })}
      </div>

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-sm text-gray-600 mb-4 font-medium">Share this post:</p>
          <div className="flex justify-center gap-5 text-white text-xl">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                window.location.href
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition"
              aria-label="Share on Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                window.location.href
              )}&text=${encodeURIComponent(blog.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-500 p-3 rounded-full hover:bg-sky-600 transition"
              aria-label="Share on Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                window.location.href
              )}&title=${encodeURIComponent(blog.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-800 p-3 rounded-full hover:bg-blue-900 transition"
              aria-label="Share on LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
    </div>
  );
};

export default BlogDetails;
