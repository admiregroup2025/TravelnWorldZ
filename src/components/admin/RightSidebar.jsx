import React, { useState } from "react";
import destinations from "../admin/MyItineraries/data.json"

const RightSidebar = ({filters,filterChange}) => {
 
  return (
    <div className="p-4 overflow-y-hidden bg-white  h-[91vh] border-gray-200
">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <label className="flex items-center gap-2 mb-2">
        <input type="checkbox"
        checked={filters.includes("domestic")}
        onChange={()=>filterChange("domestic")} /> Domestic
      </label>
      <label className="flex items-center gap-2 mb-2">
        <input type="checkbox"
        checked={filters.includes("international")}
        onChange={()=>filterChange("international")} /> International
      </label>
      <label className="flex items-center gap-2 mb-2">
        <input type="checkbox"
           checked={filters.includes("inbound")}
        onChange={()=>filterChange("inbound")} /> Inbound
      </label>
    </div>
  );
};

export default RightSidebar;