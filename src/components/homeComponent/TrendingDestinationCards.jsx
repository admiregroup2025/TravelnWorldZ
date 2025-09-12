import React from 'react';
import { useParams, useNavigate  } from 'react-router-dom';

const travelAgenciesData = {
  "uttarakhand": [
    {
      id: "agency1",
      agentId: "agent1",
      name: "Himalayan Treks",
      title: "Expert mountain trekking agency",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&auto=format&fit=crop"
    },
    {
      id: "agency2",
      agentId: "agent2",
      name: "Spiritual Journeys",
      title: "Guided spiritual tours & retreats",
      image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=400&auto=format&fit=crop"
    },
    {
      id: "agency3",
      agentId: "agent3",
      name: "Adventure Hub",
      title: "Adventure sports & exploration",
      image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=400&auto=format&fit=crop"
    },
    {
      id: "agency4",
      agentId: "agent4",
      name: "Nature Explorers",
      title: "Eco-friendly nature tours",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&auto=format&fit=crop"
    },
  ],
  "uttar-pradesh": [
    {
      id: "agency5",
      agentId: "agent5",
      name: "Heritage Tours",
      title: "Cultural and heritage experiences",
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&auto=format&fit=crop"
    },
    {
      id: "agency6",
      agentId: "agent6",
      name: "Cultural Walks",
      title: "Walking tours of historic sites",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&auto=format&fit=crop"
    },
    {
      id: "agency7",
      agentId: "agent7",
      name: "Royal Travels",
      title: "Luxury and royal palace tours",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&auto=format&fit=crop"
    },
    {
      id: "agency8",
      agentId: "agent8",
      name: "Pilgrimage Tours",
      title: "Spiritual pilgrimage packages",
      image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=400&auto=format&fit=crop"
    },
  ],
  // Add other destinations similarly
};

const TrendingDestinationCards = () => {
  const { destinationId } = useParams();
  const navigate = useNavigate();
  const agencies = travelAgenciesData[destinationId] || [];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-900 uppercase">
        {/* Travel Agencies for {destinationId.replace("-", " ").toUpperCase()} */}
        Top Most Tour Iterneries
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {agencies.length > 0 ? (
          agencies.map(({ id, name, title, image }) => (
            <div
              key={id}
              className="border rounded shadow hover:shadow-lg transition p-4 flex flex-col items-center"
            >
              <img
                src={image}
                alt={name}
                className="w-full h-48 object-cover rounded mb-4"
                loading="lazy"
              />
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="text-sm text-gray-600 mb-4 text-center">{title}</p>

              <button
                className="bg-blue-700 hover:bg-blue-900 text-white px-4 py-2 rounded mb-2 w-full"
                onClick={() => alert(`Request sent to ${name}!`)}
              >
                Get a Quote
              </button>
              <button
                className="border border-blue-700 hover:bg-blue-700 hover:text-white text-blue-700 px-4 py-2 rounded w-full"
                onClick={() =>
                  navigate(`/trending-destinations/${destinationId}/${id}`)
                }
              >
                More
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">
            No travel agencies found for this destination.
          </p>
        )}
      </div>
    </div>
  );
};

export default TrendingDestinationCards;