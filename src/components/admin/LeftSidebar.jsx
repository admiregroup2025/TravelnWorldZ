// import React from "react";
// import { NavLink } from "react-router-dom";
// import { ShoppingCart, List, FileText, BarChart, Star, User, Users } from "lucide-react";

// const LeftSidebar = () => {
//   const menuItems = [
//     { path: "buy-leads", label: "Buy Leads", icon: <ShoppingCart size={18} /> },
//     { path: "my-leads", label: "My Leads", icon: <List size={18} /> },
//     { path: "itineraries", label: "My Itineraries", icon: <FileText size={18} /> },
//     { path: "report", label: "My Report", icon: <BarChart size={18} /> },
//     { path: "reviews", label: "My Reviews", icon: <Star size={18} /> },
//     { path: "my-account", label: "My Account", icon: <User size={18} /> },
//     { path: "team", label: "My Team", icon: <Users size={18} /> },
//   ];

//   return (
//     <nav className="flex flex-col mt-6 space-y-1">
//       {menuItems.map((item) => (
//         <NavLink
//           key={item.path}
//           to={item.path}
// className={({ isActive }) =>
//   ` text-white flex items-center gap-3 px-6 py-2 text-sm font-medium rounded-md transition-colors duration-200
//    ${
//      isActive
//        ? "bg-indigo-500 text-indigo-900"
//        : "hover:bg-indigo-700 hover:bg-opacity-80 text-white"
//    }`
// }
//         >
//           {item.icon}
//           {item.label}
//         </NavLink>
//       ))}
//     </nav>
//   );
// };

// export default LeftSidebar;
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ShoppingCart,
  List,
  FileText,
  BarChart,
  Star,
  User,
  Users,
  ChevronDown,
} from "lucide-react";

const LeftSidebar = () => {
  const [accountOpen, setAccountOpen] = useState(false);
  const [itinerariesOpen,setItinerariesOpen]=useState(false)

  const menuItems = [
    { path: "buy-leads", label: "Buy Leads", icon: <ShoppingCart size={18} /> },
    { path: "my-leads", label: "My Leads", icon: <List size={18} /> },
  
    { path: "report", label: "My Report", icon: <BarChart size={18} /> },
    { path: "reviews", label: "My Reviews", icon: <Star size={18} /> },
    // My Account will be handled separately
    { path: "team", label: "My Team", icon: <Users size={18} /> },
  ];

  const accountSubItems = [
    { path: "profile", label: "Profile" },
    { path: "reset-password", label: "Reset Password" },
    // { path: "my-account/security", label: "Security" },
  ];
  const myItianarySubItems =[
      { path: "Create-Itinary", label: "Create Itinerary" },
    { path: "Manage-Itianary", label: "Manage Itinerary" },
        { path: "Add-Gallary", label: "Add Gallary" },
  ]

  return (
    <nav className="flex  overflow-y-hidden flex-col mt-6 ">
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-2 text-sm font-medium rounded-md transition-colors duration-200
             ${
               isActive
                 ? "bg-indigo-500 text-indigo-900"
                 : "hover:bg-indigo-700 hover:bg-opacity-80 text-white"
             }`
          }
        >
          {item.icon}
          {item.label}
        </NavLink>
      ))}

      {/* My Itinary with Dropdown */}
      <div>
        <button
          onClick={() => setItinerariesOpen((prev) => !prev)}
          className="flex items-center justify-between w-full px-6 py-2 text-sm font-medium rounded-md text-white hover:bg-indigo-700 transition-colors duration-200"
        >
          <span className="flex items-center gap-3">
            <FileText size={18} />
            My Itineraries
          </span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${
              itinerariesOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {itinerariesOpen && (
          <div className="ml-10 mt-1 flex flex-col space-y-1">
            {myItianarySubItems .map((sub) => (
              <NavLink
                key={sub.path}
                to={sub.path}
                className={({ isActive }) =>
                  `px-4 py-1 text-sm rounded-md transition-colors duration-200
                   ${
                     isActive
                       ? "bg-indigo-500 text-indigo-900"
                       : "hover:bg-indigo-700 hover:bg-opacity-80 text-white"
                   }`
                }
              >
                {sub.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>

      {/* My Account with Dropdown */}
      <div>
        <button
          onClick={() => setAccountOpen((prev) => !prev)}
          className="flex items-center justify-between w-full px-6 py-2 text-sm font-medium rounded-md text-white hover:bg-indigo-700 transition-colors duration-200"
        >
          <span className="flex items-center gap-3">
            <User size={18} />
            My Account
          </span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${
              accountOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {accountOpen && (
          <div className="ml-10 mt-1 flex flex-col space-y-1">
            {accountSubItems.map((sub) => (
              <NavLink
                key={sub.path}
                to={sub.path}
                className={({ isActive }) =>
                  `px-4 py-1 text-sm rounded-md transition-colors duration-200
                   ${
                     isActive
                       ? "bg-indigo-500 text-indigo-900"
                       : "hover:bg-indigo-700 hover:bg-opacity-80 text-white"
                   }`
                }
              >
                {sub.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default LeftSidebar;
