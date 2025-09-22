// src/components/AdminHeader.jsx
import React from "react";
import { Home, Headphones } from "lucide-react"; // lucide-react icons
import logo from "../../assets/images/logo/logo.jpeg"
import profilImg from "../../assets/images/profile.png"

export default function AdminHeader() {
  return (
    <header className="flex fixed w-full z-30 my-0 px-10 items-center justify-between border  shadow-md bg-white">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <img
          src={logo} // replace with your logo path
          alt="Hello Travel"
          className="h-[7rem] w-[7rem] object-contain"
        />
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-6">
        {/* Recharge Button */}
        <button className=" hover:bg-[#9A3412] bg-orange-600 text-white px-4 py-1 rounded-full font-medium">
          Recharge Now
        </button>

        {/* Icons */}
        <div className="flex items-center space-x-4 text-gray-600">
          <Home size={20} className="cursor-pointer hover:text-black" />
          <Headphones size={20} className="cursor-pointer hover:text-black" />
        </div>

        {/* Profile Section */}
        <div className="flex items-center space-x-2">
          <img
            src={ profilImg} // replace with your profile image
            alt="Profile"
            className="h-8 w-8 rounded-full border"
          />
          <div className="text-sm leading-tight">
            <p className="font-medium">ADMIRE HOLIDAYS</p>
            <p className="text-green-600 text-xs flex items-center">
              <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
              Active
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
