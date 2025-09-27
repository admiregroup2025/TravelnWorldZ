import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterActions, fetchItineraries } from "../../features/filter/filterSlice";

export default function RightSidebar() {
  const state = useSelector((s) => s.filter);
  const dispatch = useDispatch();

  // Function to trigger fetch
  const fakeSearchItenarariesAPI = () => {
    dispatch(
      fetchItineraries({
        leadTypes: state.leadTypes,
        city: state.city,
        travelers: state.travelers,
        duration: state.duration,
        travelDate: state.travelDate,
        hotelCategories: state.hotelCategories,
        budget: state.budget,
      })
    );
  };

  // ✅ Call API whenever any filter changes
  useEffect(() => {
    const handler = setTimeout(() => {
      fakeSearchItenarariesAPI();
    }, 300); // small debounce so it doesn't call on every keystroke instantly

    return () => clearTimeout(handler);
  }, [
    state.leadTypes,
    state.city,
    state.travelers,
    state.duration,
    state.travelDate.from,
    state.travelDate.to,
    state.hotelCategories,
    state.budget.max,
  ]);

  return (
    <div className="p-2 space-y-6">
      {/* Lead Type */}
      <fieldset>
        <legend className="font-semibold">Itinerary Type</legend>
        {["All", "domestic", "international","Trending destination","Outbound","Inbound"].map(
          (type) => (
            <label key={type} className="block">
              <input
                type="checkbox"
                checked={state.leadTypes.includes(type)}
                onChange={() => dispatch(filterActions.toggleLeadType(type))}
              />
              <span className="text-[#979696] capitalize">{type}</span>
            </label>
          )
        )}
      </fieldset>

      {/* City */}
      <div>
        <label className="font-semibold block">To Cities</label>
        <input
          type="text"
          value={state.city}
          onChange={(e) => dispatch(filterActions.setCity(e.target.value))}
          placeholder="Search 3 letters for cities..."
          className="border border-[#979696] bg-transparent rounded p-2 w-full"
        />
      </div>

      {/* Travelers */}
      <fieldset>
        <legend className="font-semibold">Travelers</legend>
        {["10+ People", "6 - 10 People", "4 - 5 People", "2 - 3 People", "1 Person"].map((opt) => (
          <label key={opt} className="block">
            <input
              type="radio"
              name="travelers"
              checked={state.travelers === opt}
              onChange={() => dispatch(filterActions.setTravelers(opt))}
            />
            <span className="text-[#979696]">{opt}</span>
          </label>
        ))}
      </fieldset>

      {/* Duration */}
      <fieldset>
        <legend className="font-semibold">Duration</legend>
        {["14+ Days", "8 - 14 Days", "4 - 7 Days", "1 - 3 Days"].map((opt) => (
          <label key={opt} className="block">
            <input
              type="radio"
              name="duration"
              checked={state.duration === opt}
              onChange={() => dispatch(filterActions.setDuration(opt))}
            />
            <span className="text-[#979696]">{opt}</span>
          </label>
        ))}
      </fieldset>

      {/* Travel Date */}
      <fieldset>
        <legend className="font-semibold">Travel Date</legend>
        <input
          type="date"
          value={state.travelDate.from || ""}
          onChange={(e) =>
            dispatch(filterActions.setDate({ field: "from", value: e.target.value }))
          }
        />
        <input
          type="date"
          value={state.travelDate.to || ""}
          onChange={(e) =>
            dispatch(filterActions.setDate({ field: "to", value: e.target.value }))
          }
        />
      </fieldset>

      {/* Hotel */}
      <fieldset>
        <legend className="font-semibold">Hotel</legend>
        {["5+ Star", "5 Star", "4 Star", "3 Star", "2 Star", "1 Star"].map((opt) => (
          <label key={opt} className="block">
            <input
              type="checkbox"
              checked={state.hotelCategories.includes(opt)}
              onChange={() => dispatch(filterActions.toggleHotel(opt))}
            />
            <span className="text-[#979696]">{opt}</span>
          </label>
        ))}
      </fieldset>

      {/* Budget */}
      <fieldset>
        <legend className="font-semibold">Total Budget</legend>
        <input
          type="range"
          min="0"
          max="1000000"
          value={state.budget.max}
          onChange={(e) =>
            dispatch(filterActions.setBudget({ field: "max", value: Number(e.target.value) }))
          }
        />
        <span className="text-[#979696]">₹{state.budget.max}</span>
      </fieldset>
    </div>
  );
}
