// src/components/Footer.jsx

import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
        
        {/* Left Column - Policy + Support */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Policy</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-of-use">Terms Of Use</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/contactUs">Contact Us</Link></li>
              <li><Link to="/aboutUs">About Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Center Column - Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick links</h3>
          <ul className="space-y-2">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/trending">Trending Destination</Link></li>
            <li><Link to="/popular">Popular Destination</Link></li>
            <li><Link to="/domestic">Domestic Destination</Link></li>
            <li><Link to="/international">International Destination</Link></li>
          </ul>
        </div>

        {/* Right Column - Social & Signup */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us on</h3>
          <div className="flex space-x-4 mb-4 text-xl">
            <a href="http://facebook.com/profile.php?id=61551720045200" target="_blank" rel="noreferrer">
              <FaFacebookF className="hover:text-pink-400 transition cursor-pointer" />
            </a>
            <a href="https://instagram.com/triptohoneymoon_official" target="_blank" rel="noreferrer">
              <FaInstagram className="hover:text-pink-400 transition cursor-pointer" />
            </a>
            <a href="https://youtube.com/@trip2honeymoon_official?si=AJEgM_rEtIDQa0Hk" target="_blank" rel="noreferrer">
              <FaYoutube className="hover:text-pink-400 transition cursor-pointer" />
            </a>
          </div>

          <h4 className="text-base font-semibold mb-2">Sign Up</h4>
          <p className="text-sm mb-3 text-gray-200">
            Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Email id"
              className="w-full px-3 py-2 rounded-l-full text-black focus:outline-none"
            />
            <button className="bg-white text-blue-900 px-4 py-2 rounded-r-full font-medium hover:bg-gray-200 transition">
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 mt-10 pt-6 text-center text-sm text-gray-300">
        © TravelInworld {new Date().getFullYear()}, All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
