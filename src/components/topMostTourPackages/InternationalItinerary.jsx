import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJson, USE_BACKEND } from "../../utils/api";
import internationalItineraryData from "../../data/internationalItineraryData";

const InternationalItineraryPage = () => {
  const { destinationId } = useParams();
  const navigate = useNavigate();
  const [itineraries, setItineraries] = useState(
    internationalItineraryData[destinationId] || []
  );

  useEffect(() => {
    if (!destinationId) return;
    if (!USE_BACKEND) return; // use local data if backend is off

    getJson(`/api/itineraries/international/${destinationId}`)
      .then((items) => {
        const mapped = items.map((it, idx) => ({
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
    <div className="p-6 sm:p-8 max-w-7xl mx-auto">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center text-blue-900 uppercase tracking-wide">
        Itineraries for {destinationId.replace("-", " ")}
      </h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {itineraries.length > 0 ? (
          itineraries.map(({ id, name, title, image, slug }) => (
            <div
              key={id}
              className="bg-white border rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col"
            >
              {/* Image */}
              <img
                src={image}
                alt={name}
                className="w-full h-48 md:h-56 lg:h-60 object-cover rounded-t-xl"
              />

              {/* Content */}
              <div className="flex flex-col flex-1 p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center line-clamp-2">
                  {name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 text-center flex-1 line-clamp-3">
                  {title}
                </p>

                {/* Buttons */}
                <div className="flex flex-col gap-2 mt-auto">
                  <button
                    onClick={() =>
                      navigate(`/get-a-quote/international/${destinationId}/${id}`)
                    }
                    className="bg-blue-700 hover:bg-blue-900 text-white px-4 py-2 rounded-lg w-full transition"
                  >
                    Get a Quote
                  </button>
                  <button
                    onClick={() =>
                      navigate(
                        `/international-itinerary-detail/${destinationId}/${slug || id}`
                      )
                    }
                    className="border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white px-4 py-2 rounded-lg w-full transition"
                  >
                    More
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600 text-lg">
            No itineraries found for this destination.
          </p>
        )}
      </div>
    </div>
  );
};

export default InternationalItineraryPage;
