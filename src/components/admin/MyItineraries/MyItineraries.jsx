import ItineraryCard from "./ItineraryCard"; // adjust path as needed
// import destinations from "./data.json"; // import the JSON dataset
import { useOutletContext } from "react-router-dom";

const MyItineraries = () => {
    const { destinations } = useOutletContext();
    console.log(destinations,"nawlesh")
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">My Itineraries</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {destinations.map((destination) => (
          <ItineraryCard key={destination.id} destination={destination} />
        ))}
      </div>
    </div>
  );
};

export default MyItineraries;
