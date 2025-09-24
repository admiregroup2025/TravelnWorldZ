import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJson, USE_BACKEND } from "../../utils/api";
import itineraryData from "../../data/domesticItineraryData";

const DomesticItinerary = () => {
  const { destinationId } = useParams();
  const navigate = useNavigate();
  const [itineraries, setItineraries] = useState(itineraryData[destinationId] || []);

  useEffect(() => {
    if (!destinationId) return;
    if (!USE_BACKEND) return; // keep using local data
    getJson(`/api/itineraries/cards?type=domestic`)
      .then((items) => {
        const filtered = items.filter((it) => (it.city || it.country || "").toLowerCase().replace(/\s+/g, "-") === destinationId);
        const mapped = filtered.map((it, idx) => ({
          id: it._id || idx,
          name: it.title,
          title: it.shortDescription || "",
          image: it.coverImageUrl,
          slug: it.slug,
        }));
        if (mapped.length > 0) setItineraries(mapped);
      })
      .catch(() => {});
  }, [destinationId]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-900 uppercase">
        Itineraries for {destinationId.replace("-", " ")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {itineraries.length > 0 ? (
          itineraries.map(({ id, name, title, image, slug }) => (
            <div
              key={id}
              className="border rounded shadow hover:shadow-lg transition p-4 flex flex-col items-center"
            >
              <img
                src={image}
                alt={name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="text-sm text-gray-600 mb-4 text-center">{title}</p>
              <button 
                onClick={() => navigate(`/get-a-quote/domestic/${destinationId}/${id}`)}
                className="bg-blue-700 hover:bg-blue-900 text-white px-4 py-2 rounded w-full">
                Get a Quote
              </button>
               <button 
                onClick={() => navigate(`/domestic-itinerary/${destinationId}/${slug || id}`)}
                className="border border-blue-700 mt-1 hover:bg-blue-700 hover:text-white text-blue-700 px-4 py-2 rounded w-full"
                >
                More
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">
            No itineraries found for this destination.
          </p>
        )}
      </div>
    </div>
  );
};

export default DomesticItinerary;