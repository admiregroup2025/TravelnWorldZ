import React from "react";
import { Home, Headphones, Menu as MenuIcon, ListFilterPlus, X } from "lucide-react"; 
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/logo.jpeg";
import profilImg from "../../assets/images/profile.png";

export default function AdminHeader({ onOpenLeft, onOpenRight }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/b2blogin"); // redirect to login page
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-30 bg-white border shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-[64px] flex items-center justify-between">
      {/* Left: Logo */}
      <div className="flex items-center gap-2 min-w-0">
        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Open navigation"
          onClick={onOpenLeft}
          className="inline-flex md:hidden items-center justify-center rounded p-2 mr-1 text-gray-700 hover:bg-gray-100"
        >
          <MenuIcon size={20} />
        </button>
        <img
          src={logo}
          alt="Hello Travel"
          className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
        />
        <span className="hidden sm:block font-semibold truncate">Admin Panel</span>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3 sm:gap-6">
        {/* Recharge Button */}
        <button className="hidden sm:inline-flex hover:bg-[#9A3412] bg-orange-600 text-white px-3 sm:px-4 py-1 rounded-full text-sm font-medium">
          Recharge Now
        </button>

        {/* Icons */}
        <div className="flex items-center gap-3 sm:gap-4 text-gray-600">
          {/* Mobile filter button */}
          <button
            type="button"
            aria-label="Open filters"
            onClick={onOpenRight}
            className="inline-flex lg:hidden items-center justify-center rounded p-2 text-gray-700 hover:bg-gray-100"
          >
            <ListFilterPlus size={20} />
          </button>
          <Home size={20} className="cursor-pointer hover:text-black" />
          <Headphones size={20} className="cursor-pointer hover:text-black" />
        </div>

        {/* Profile + Login */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <img
              src={profilImg}
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
          <button
            onClick={handleLogout}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm px-3 sm:px-4 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>
      </div>
    </header>
    </>
  );
}
