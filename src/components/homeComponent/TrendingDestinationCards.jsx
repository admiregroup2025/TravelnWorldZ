import React from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import travelAgenciesData from '../../data/travelAgenciesData.js'

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
                onClick={() =>  navigate(`/get-a-quote/${destinationId}/${id}`)}
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