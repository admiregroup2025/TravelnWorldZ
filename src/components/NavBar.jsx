import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo/logo.jpeg';
import PlanMyTripForm from '../forms/PlanMyTripForm';

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [showTripForm, setShowTripForm] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-red-600 font-semibold border-b-2 border-red-600 pb-1'
      : 'text-gray-700 hover:text-red-600 transition';

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <NavLink to="/" onClick={() => setOpen(false)} className="flex-shrink-0">
            <img src={logo} alt="Logo" className="h-14" />
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center justify-center flex-1 ml-10">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/aboutUs" className={navLinkClass}>About us</NavLink>
            <NavLink to="/agents" className={navLinkClass}>Agents</NavLink>
            <NavLink to="/packages" className={navLinkClass}>Packages</NavLink>
            <NavLink to="/destination" className={navLinkClass}>Destination</NavLink>
            <NavLink to="/b2blogin" className={navLinkClass}>B2B login</NavLink>
            <NavLink to="/blogs" className={navLinkClass}>Blogs</NavLink>
            <NavLink to="/contactUs" className={navLinkClass}>ContactUs</NavLink>
          </div>

          {/* Desktop Plan My Trip Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => setShowTripForm(true)}
              className="bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-orange-800 transition"
            >
              Plan My Trip
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="text-gray-700 hover:text-blue-900 focus:outline-none"
            >
              {open ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white px-4 pt-4 pb-6 shadow flex flex-col space-y-4 transition-all duration-300 ease-in-out">
          <NavLink to="/" onClick={() => setOpen(false)} className={navLinkClass}>Home</NavLink>
          <NavLink to="/aboutUs" onClick={() => setOpen(false)} className={navLinkClass}>About us</NavLink>
          <NavLink to="/agents" onClick={() => setOpen(false)} className={navLinkClass}>Agents</NavLink>
          <NavLink to="/packages" onClick={() => setOpen(false)} className={navLinkClass}>Packages</NavLink>
          <NavLink to="/destination" onClick={() => setOpen(false)} className={navLinkClass}>Destination</NavLink>
          <NavLink to="/b2blogin" onClick={() => setOpen(false)} className={navLinkClass}>B2B login</NavLink>
          <NavLink to="/blogs" onClick={() => setOpen(false)} className={navLinkClass}>Blogs</NavLink>
          <NavLink to="/contactUs" onClick={() => setOpen(false)} className={navLinkClass}>ContactUs</NavLink>

          <div className="pt-4 border-t">
            <button
              onClick={() => {
                setShowTripForm(true);
                setOpen(false);
              }}
              className="w-full bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-800 transition"
            >
              Plan My Trip
            </button>
          </div>
        </div>
      )}

      {/* Modal Popup for Plan My Trip Form */}
      {showTripForm && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowTripForm(false)} // closes when clicking outside form
        >
          <div
            className="bg-white p-6 rounded-md w-full max-w-lg shadow-lg relative"
            onClick={e => e.stopPropagation()} // prevent closing when clicking inside modal
          >
            <button
              onClick={() => setShowTripForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
              aria-label="Close Plan My Trip Form"
            >
              &times;
            </button>
            <PlanMyTripForm onClose={() => setShowTripForm(false)}  />
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
