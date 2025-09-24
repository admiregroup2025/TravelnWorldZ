// import React, { useState } from "react";
// import destinations from "../admin/MyItineraries/data.json"

// const RightSidebar = ({filters,filterChange}) => {
 
//   return (
//     <div className="p-4 overflow-y-hidden bg-white  h-[91vh] border-gray-200
// ">
//       <h2 className="text-lg font-semibold mb-4">Filters</h2>
//       <label className="flex items-center gap-2 mb-2">
//         <input type="checkbox"
//         checked={filters.includes("domestic")}
//         onChange={()=>filterChange("domestic")} /> Domestic
//       </label>
//       <label className="flex items-center gap-2 mb-2">
//         <input type="checkbox"
//         checked={filters.includes("international")}
//         onChange={()=>filterChange("international")} /> International
//       </label>
//       <label className="flex items-center gap-2 mb-2">
//         <input type="checkbox"
//            checked={filters.includes("inbound")}
//         onChange={()=>filterChange("inbound")} /> Inbound
//       </label>
//     </div>
//   );
// };

// export default RightSidebar;
import React from 'react'

import { useReducer, useCallback } from "react";

const initialState = {
  leadTypes: [],
  city: "",
  travelers: "",
  duration: "",
  travelDate: { from: null, to: null },
  hotelCategories: [],       // ["5 Star", "4 Star"]
  budget: { min: 0, max: 1000000 }
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_LEAD_TYPE":
      return {
        ...state,
        leadTypes: state.leadTypes.includes(action.value)
          ? state.leadTypes.filter((t) => t !== action.value)
          : [...state.leadTypes, action.value]
      };
    case "SET_CITY":
      return { ...state, city: action.value };
    case "SET_TRAVELERS":
      return { ...state, travelers: action.value };
    case "SET_DURATION":
      return { ...state, duration: action.value };
    case "SET_DATE":
      return {
        ...state,
        travelDate: { ...state.travelDate, [action.field]: action.value }
      };
      case "TOGGLE_HOTEL":
  return {
    ...state,
    hotelCategories: state.hotelCategories.includes(action.value)
      ? state.hotelCategories.filter((h) => h !== action.value)
      : [...state.hotelCategories, action.value]
  };
case "SET_BUDGET":
  return {
    ...state,
    budget: { ...state.budget, [action.field]: action.value }
  };


    default:
      return state;
  }
}

export default function RightSidebar() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Handlers with useCallback to avoid re-renders
  const toggleLeadType = useCallback(
    (value) => dispatch({ type: "TOGGLE_LEAD_TYPE", value }),
    []
  );
  const setCity = useCallback(
    (e) => dispatch({ type: "SET_CITY", value: e.target.value }),
    []
  );
  const setTravelers = useCallback(
    (value) => dispatch({ type: "SET_TRAVELERS", value }),
    []
  );
  const setDuration = useCallback(
    (value) => dispatch({ type: "SET_DURATION", value }),
    []
  );
  const setDate = useCallback(
    (field, value) => dispatch({ type: "SET_DATE", field, value }),
    []
  
  );

  return (
    <div className="p-2 space-y-6">
      {/* Lead Type */}
      <fieldset aria-label="Lead Type">
        <legend className="font-semibold">Lead Type</legend>
        {["Domestic", "Outbound", "Inbound", "International"].map((type) => (
          <label key={type} className="block">
            <input
              type="checkbox"
              aria-label={type}
              checked={state.leadTypes.includes(type)}
              onChange={() => toggleLeadType(type)}
              className="border border-gray-100 mr-2"
            />
            <span className='text-[#979696]'>{type}</span>
          </label>
        ))}
      </fieldset>
      

      {/* City Search */}
      <div>
        <label htmlFor="city" className="font-semibold block">
          To Cities
        </label>
        <input
          id="city"
          type="text"
          aria-label="Search for cities"
          placeholder="Search 3 letters for cities..."
          value={state.city}
          onChange={setCity}
          className="border border-[#979696] bg-transparent rounded p-2 w-full focus:outline-none focus:ring-0"
        />
      </div>

      {/* Travelers */}
      <fieldset aria-label="Travelers">
        <legend className="font-semibold">Travelers</legend>
        {["10+ People", "6 - 10 People", "4 - 5 People", "2 - 3 People", "1 Person"].map((opt) => (
          <label key={opt} className="block">
            <input
              type="radio"
              name="travelers"
              aria-label={opt}
              checked={state.travelers === opt}
              onChange={() => setTravelers(opt)}
              className="border border-gray-100 mr-2"
            />
             <span className='text-[#979696]'>{opt}</span>
          </label>
        ))}
      </fieldset>

      {/* Duration */}
      <fieldset aria-label="Duration">
        <legend className="font-semibold">Duration</legend>
        {["14+ Days", "8 - 14 Days", "4 - 7 Days", "1 - 3 Days"].map((opt) => (
          <label key={opt} className="block">
            <input
              type="radio"
              name="duration"
              aria-label={opt}
              checked={state.duration === opt}
              onChange={() => setDuration(opt)}
              className="border border-gray-100 mr-2"
            />
            <span className='text-[#979696]'>{opt}</span>
          </label>
        ))}
      </fieldset>

      {/* Travel Date */}
      <fieldset aria-label="Travel Date">
        <legend className="font-semibold">Travel Date</legend>
        <input
          type="date"
          aria-label="From Date"
          value={state.travelDate.from || ""}
          placeholder="From Date"
          onChange={(e) => setDate("from", e.target.value)}
          className='text-[#979696] bg-transparent border border-gray-100'
        />
        
        <input
          type="date"
          aria-label="To Date"
          value={state.travelDate.to || ""}
          placeholder="To Date"
          onChange={(e) => setDate("to", e.target.value)}
          className='text-[#979696] bg-transparent border border-gray-100'
        />
      </fieldset>

{/* Hotel */}
<fieldset aria-label="Hotel Category">
  <legend className="font-semibold">Hotel</legend>
  {["5+ Star", "5 Star", "4 Star", "3 Star", "2 Star", "1 Star"].map((opt) => (
    <label key={opt} className="block">
      <input
        type="checkbox"
        aria-label={opt}
        checked={state.hotelCategories.includes(opt)}
        onChange={() => dispatch({ type: "TOGGLE_HOTEL", value: opt })}
        className="border border-gray-100 mr-2"
      />
       <span className='text-[#979696]'>{opt}</span>
    </label>
  ))}
  {/* <button
    type="button"
    className="text-sm text-blue-600"
    aria-label="Show more hotel categories"
    onClick={() => alert("Expand to show 6 more hotels")}
  >
    + 6 More
  </button> */}
</fieldset>

<fieldset aria-label="Total Budget">
  <legend className="font-semibold">Total Budget</legend>
  <div className="flex items-center gap-4">
    {/* <input
      type="range"
      min="0"
      max="1000000"
      value={state.budget.min}
      aria-label="Minimum Budget"
      onChange={(e) =>
        dispatch({ type: "SET_BUDGET", field: "min", value: Number(e.target.value) })
      }
      className="flex-1"
    /> */}
    <input
      type="range"
      min="0"
      max="1000000"
      value={state.budget.max}
      aria-label="Maximum Budget"
      onChange={(e) =>
        dispatch({ type: "SET_BUDGET", field: "max", value: Number(e.target.value) })
      }
      className="flex-1"
    />
  </div>
  {/* <div className="flex justify-between text-sm mt-1"> */}
    {/* <span>Min: ₹{state.budget.min}</span> */}
     <span className='text-[#979696]'>₹{state.budget.max}</span>
  {/* </div> */}
</fieldset>


      {/* Debug (remove later) */}
      {/* <pre className="bg-gray-100 p-2 text-xs">{JSON.stringify(state, null, 2)}</pre> */}
    </div>
  );
}