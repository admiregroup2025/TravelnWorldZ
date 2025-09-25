import ItineraryCard from "./ItineraryCard"; // adjust path as needed
// import destinations from "./data.json"; // import the JSON dataset
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import RightSidebar from "../RightSidebar";

const MyItineraries = () => {
    const state = useSelector((state)=>state.filter);
    const { destinations } = useOutletContext();
    const list = (state?.itineraries && state.itineraries.length) ? state.itineraries : destinations;
  return (
    
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">My Itineraries</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {list.map((destination) => (
          <ItineraryCard key={destination.id} destination={destination} />
        ))}
      </div>

       {/* Right Sidebar (fixed) */}
         <aside className="w-72 fixed h-[91vh] right-0 bottom-0 bg-gray-100 border-l overflow-auto">
           <RightSidebar />
         </aside>

    </div>
  );
};

export default MyItineraries;
