/**
 * InternationalItinerary
 *
 * Lists all international itineraries for a specific destination.
 *
 * Route:  /international-itinerary/:destinationId
 * Params: destinationId — URL slug (e.g. "dubai", "paris", "bali")
 *
 * API:  GET /api/itineraries?type=international&destination=<name>
 */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJson } from "../../utils/api";

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

/** Convert a URL slug to a display title ("goa-beach" → "Goa Beach"). */
function slugToTitle(slug) {
  return (slug || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/* ─── Skeleton Card ──────────────────────────────────────────────────────── */
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
    <div className="h-52 bg-gray-200" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-2/3" />
      <div className="flex gap-2 mt-4">
        <div className="h-9 bg-gray-200 rounded-lg flex-1" />
        <div className="h-9 bg-gray-200 rounded-lg flex-1" />
      </div>
    </div>
  </div>
);

/* ─── Itinerary Card ─────────────────────────────────────────────────────── */
const ItineraryCard = ({ itinerary, destinationId }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Cover image */}
      <div className="relative h-52 overflow-hidden">
        {(itinerary.coverImageUrl || itinerary.gallery?.[0]) ? (
          <img
            src={itinerary.coverImageUrl || itinerary.gallery?.[0]}
            alt={itinerary.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
            <span className="text-5xl">✈️</span>
          </div>
        )}

        {/* Classification badges */}
        {itinerary.classification?.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {itinerary.classification.map((tag) => (
              <span
                key={tag}
                className="bg-amber-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Duration badge */}
        {itinerary.duration && (
          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            {itinerary.duration}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-base font-bold text-gray-900 line-clamp-2 mb-1">
          {itinerary.title}
        </h3>

        {itinerary.shortDescription && (
          <p className="text-sm text-gray-500 line-clamp-2 mb-3 flex-1">
            {itinerary.shortDescription}
          </p>
        )}

        {/* Price */}
        {!itinerary.asBestQuote && itinerary.priceFrom > 0 && (
          <p className="text-sm font-semibold text-amber-700 mb-3">
            Starting ₹{itinerary.priceFrom.toLocaleString("en-IN")}
          </p>
        )}
        {itinerary.asBestQuote && (
          <p className="text-sm font-semibold text-orange-500 mb-3">
            Price on Request
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() =>
              navigate(`/get-a-quote/international/${destinationId}/${itinerary._id}`)
            }
            className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
          >
            Get a Quote
          </button>
          <button
            onClick={() =>
              navigate(
                `/international-itinerary-detail/${destinationId}/${itinerary.slug}`
              )
            }
            className="flex-1 border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white text-sm font-semibold py-2 rounded-lg transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Component ─────────────────────────────────────────────────────── */
const InternationalItinerary = () => {
  const { destinationId } = useParams();
  const navigate = useNavigate();

  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState("");

  const destinationName = slugToTitle(destinationId);

  useEffect(() => {
    if (!destinationId) return;

    setLoading(true);
    setError("");

    /**
     * Fetch all international itineraries for this destination.
     * API: GET /api/itineraries?type=international&destination=<name>
     */
    getJson(
      `/api/itineraries?type=international&destination=${encodeURIComponent(destinationId)}`
    )
      .then((res) => {
        setItineraries(res?.data || []);
      })
      .catch((err) => {
        console.error("Failed to load international itineraries:", err);
        setError("Unable to load itineraries. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [destinationId]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div
        className="relative py-14 px-6 text-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg,#6a3d00 0%,#b8690a 50%,#e67e22 100%)",
        }}
      >
        <div
          className="absolute -top-10 -right-10 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(255,255,255,.06),transparent)" }}
        />
        <div
          className="absolute bottom-0 left-8 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(255,255,255,.04),transparent)" }}
        />

        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-5 left-5 flex items-center gap-1.5 text-amber-200 hover:text-white text-sm font-semibold transition-colors"
        >
          ← Back
        </button>

        <p className="text-amber-200 text-xs font-bold uppercase tracking-widest mb-2">
          ✈️ International
        </p>
        <h1 className="text-white text-3xl sm:text-4xl font-extrabold">
          {destinationName}
        </h1>
        <p className="text-amber-200/70 mt-2 text-sm">
          Explore all international tour packages for this destination
        </p>
      </div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Error */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm text-center">
            {error}
          </div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Results */}
        {!loading && !error && itineraries.length > 0 && (
          <>
            <p className="text-sm text-gray-400 mb-5">
              {itineraries.length}{" "}
              {itineraries.length === 1 ? "itinerary" : "itineraries"} available
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {itineraries.map((it) => (
                <ItineraryCard
                  key={it._id}
                  itinerary={it}
                  destinationId={destinationId}
                />
              ))}
            </div>
          </>
        )}

        {/* Empty state */}
        {!loading && !error && itineraries.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-6xl mb-4">✈️</div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">
              No Itineraries Yet
            </h2>
            <p className="text-gray-500 text-sm max-w-md">
              There are no international itineraries for{" "}
              <span className="font-semibold text-gray-700">{destinationName}</span>{" "}
              at the moment. Check back soon!
            </p>
            <button
              onClick={() => navigate("/international")}
              className="mt-6 px-6 py-2.5 bg-amber-600 text-white text-sm font-semibold rounded-xl hover:bg-amber-700 transition"
            >
              Browse All International
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternationalItinerary;
