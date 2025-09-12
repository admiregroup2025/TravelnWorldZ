import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo/logo.jpeg';

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-red-600 font-semibold border-b-2 border-red-600 pb-1'
      : 'text-gray-700 hover:text-red-600 transition';

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Left: Logo */}
          <NavLink to="/" onClick={() => setOpen(false)} className="flex-shrink-0">
            <img src={logo} alt="Logo" className="h-9" />
          </NavLink>

          {/* Center: Nav Links */}
          <div className="hidden md:flex space-x-6 items-center justify-center flex-1 ml-10">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/aboutUs" className={navLinkClass}>About us</NavLink>
            <NavLink to="/packages" className={navLinkClass}>Packages</NavLink>
            <NavLink to="/destination" className={navLinkClass}>Destination</NavLink>
            <NavLink to="/b2blogin" className={navLinkClass}>B2B login</NavLink>
            <NavLink to="/blogs" className={navLinkClass}>Blogs</NavLink>
            <NavLink to="/testimonials" className={navLinkClass}>Testimonials</NavLink>
          </div>

          {/* Right: Contact Us Button */}
          <div className="hidden md:flex items-center">
            <NavLink to="/contactUs">
              <button className="bg-blue-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-800 transition">
                Contact Us
              </button>
            </NavLink>
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} className="text-gray-700 hover:text-blue-900 focus:outline-none">
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
        <div className="md:hidden bg-white px-4 pt-4 pb-6 shadow space-y-3">
          <NavLink to="/" onClick={() => setOpen(false)} className={navLinkClass}>Home</NavLink>
          <NavLink to="/aboutUs" onClick={() => setOpen(false)} className={navLinkClass}>About us</NavLink>
          <NavLink to="/packages" onClick={() => setOpen(false)} className={navLinkClass}>Packages</NavLink>
          <NavLink to="/destination" onClick={() => setOpen(false)} className={navLinkClass}>Destination</NavLink>
          <NavLink to="/b2b" onClick={() => setOpen(false)} className={navLinkClass}>B2B login</NavLink>
          <NavLink to="/blogs" onClick={() => setOpen(false)} className={navLinkClass}>Blogs</NavLink>
          <NavLink to="/testimonials" onClick={() => setOpen(false)} className={navLinkClass}>Testimonials</NavLink>

          <div className="pt-3 border-t">
            <NavLink to="/contactUs" onClick={() => setOpen(false)}>
              <button className="w-full bg-blue-900 text-white mt-2 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-800 transition">
                Contact Us
              </button>
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
