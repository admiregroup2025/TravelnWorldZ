import React from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCart, List, FileText, BarChart, Star, User, Users } from "lucide-react";

const LeftSidebar = () => {
  const menuItems = [
    { path: "buy-leads", label: "Buy Leads", icon: <ShoppingCart size={18} /> },
    { path: "my-leads", label: "My Leads", icon: <List size={18} /> },
    { path: "itineraries", label: "My Itineraries", icon: <FileText size={18} /> },
    { path: "report", label: "My Report", icon: <BarChart size={18} /> },
    { path: "reviews", label: "My Reviews", icon: <Star size={18} /> },
    { path: "account", label: "My Account", icon: <User size={18} /> },
    { path: "team", label: "My Team", icon: <Users size={18} /> },
  ];

  return (
    <nav className="flex flex-col mt-6 space-y-1">
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
        //   className={({ isActive }) =>
        //     `flex items-center gap-3 px-6 py-2 text-sm font-medium transition 
        //      ${isActive ? "bg-white text-indigo-900" : "hover:bg-indigo-800"}`
        //   }
        // >
className={({ isActive }) =>
  ` text-white flex items-center gap-3 px-6 py-2 text-sm font-medium rounded-md transition-colors duration-200
   ${
     isActive
       ? "bg-indigo-500 text-indigo-900"   // selected (lighter shade)
       : "hover:bg-indigo-700 hover:bg-opacity-80 text-white" // hover (lighter opaque)
   }`
}
        >
          {item.icon}
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default LeftSidebar;