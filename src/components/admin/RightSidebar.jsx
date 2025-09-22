import React from "react";

const RightSidebar = () => {
  return (
    <div className="p-4 h-screen bg-white border-l border-gray-200
">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <label className="flex items-center gap-2 mb-2">
        <input type="checkbox" /> Domestic
      </label>
      <label className="flex items-center gap-2 mb-2">
        <input type="checkbox" /> International
      </label>
      <label className="flex items-center gap-2 mb-2">
        <input type="checkbox" /> Inbound
      </label>
    </div>
  );
};

export default RightSidebar;