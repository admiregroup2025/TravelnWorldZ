import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function ItineraryDetail() {
  const { slug, itineraryId } = useParams();
  const navigate = useNavigate();
  const outlet = useOutletContext() || {};
  const { destinations = [], updateItinerary } = outlet;

  // find destination and nested itinerary
  const destination = destinations.find((d) => d.slug === slug) || null;
  const original = destination?.itineraries?.find((i) => `${i.id}` === `${itineraryId}`) || null;

  // local state
  const [itinerary, setItinerary] = useState(original);
  const [errors, setErrors] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]); 
  const [newImagesFiles, setNewImagesFiles] = useState([]); 



  

  // load initial previews
  useEffect(() => {
    setItinerary(original);
    if (original?.images?.length) {
      const previews = original.images.map((url, i) => ({
        id: `existing-${i}`,
        url,
        name: url.split("/").pop(),
        isNew: false,
      }));
      setImagePreviews(previews);
    } else {
      setImagePreviews([]);
    }
    setNewImagesFiles([]);
    setErrors({});
  }, [original]);

  const handleChange = (key, value) => {
    setItinerary((prev) => ({ ...prev, [key]: value }));
  };

  // Day handlers
  const addDay = () => {
    setItinerary((prev) => {
      const nextDays = prev?.days ? [...prev.days] : [];
      nextDays.push({
        dayNumber: nextDays.length + 1,
        title: "",
        details: "",
        activities: "",
        meals: "",
        stay: "",
      });
      return { ...prev, days: nextDays };
    });
  };

  const updateDay = (index, key, value) => {
    setItinerary((prev) => {
      const next = [...(prev.days || [])];
      next[index] = { ...next[index], [key]: value };
      return { ...prev, days: next };
    });
  };

  const removeDay = (index) => {
    setItinerary((prev) => {
      const next = (prev.days || [])
        .filter((_, i) => i !== index)
        .map((d, i) => ({ ...d, dayNumber: i + 1 }));
      return { ...prev, days: next };
    });
  };

  // Destination handlers
  const addDestination = () => {
    setItinerary((prev) => ({
      ...prev,
      destinations: [...(prev.destinations || []), ""],
    }));
  };

  const updateDestination = (idx, val) => {
    setItinerary((prev) => {
      const next = [...(prev.destinations || [])];
      next[idx] = val;
      return { ...prev, destinations: next };
    });
  };

  const removeDestination = (idx) => {
    setItinerary((prev) => {
      const next = (prev.destinations || []).filter((_, i) => i !== idx);
      return { ...prev, destinations: next };
    });
  };

  // Image upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newPreviews = files.map((f, i) => ({
      id: `new-${Date.now()}-${i}`,
      url: URL.createObjectURL(f),
      name: f.name,
      isNew: true,
    }));

    setNewImagesFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
    e.target.value = null;
  };

  const removeImagePreview = (id) => {
    setImagePreviews((prev) => {
      const removed = prev.find((p) => p.id === id);
      if (removed?.isNew && removed.url) URL.revokeObjectURL(removed.url);
      return prev.filter((p) => p.id !== id);
    });

    setNewImagesFiles((prev) => {
      const copy = [...prev];
      const idx = copy.findIndex((f) => f.name === id.split("-").slice(2).join("-"));
      return copy.filter((_, i) => i !== idx);
    });

    setItinerary((prev) => {
      if (!prev) return prev;
      const nextImages = (prev.images || []).filter(
        (imgUrl, i) => `existing-${i}` !== id
      );
      return { ...prev, images: nextImages };
    });
  };

  useEffect(() => {
    return () => {
      imagePreviews.forEach((p) => {
        if (p.isNew && p.url) URL.revokeObjectURL(p.url);
      });
    };
  }, [imagePreviews]);

  const validate = () => {
    const e = {};
    if (!itinerary?.name?.trim()) e.name = "Title is required";
    if (!itinerary?.price || Number(itinerary.price) <= 0)
      e.price = "Price must be > 0";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = (evt) => {
    evt?.preventDefault?.();
    if (!validate()) return;

    const updated = {
      ...itinerary,
      images: imagePreviews.map((p) => p.url),
      finalPrice: (() => {
        const p = Number(itinerary.price || 0);
        const d = Number(itinerary.discount || 0);
        if (d > 0 && d <= 100) return Math.max(0, p - (p * d) / 100).toFixed(2);
        return Math.max(0, p - d).toFixed(2);
      })(),
    };

    if (typeof updateItinerary === "function") {
      updateItinerary(updated);
    } else {
      setItinerary(updated);
      if (Array.isArray(destinations)) {
        const idx = destinations.findIndex((d) => d.slug === slug);
        if (idx !== -1) {
          destinations[idx] = updated;
        }
      }
    }

   
  };

  if (!itinerary) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">Itinerary not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-3 px-3 py-2 bg-orange-500 text-white rounded"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold">{itinerary.name || itinerary.title}</h1>
          <div className="flex items-center text-gray-600 mt-2">
            <FaMapMarkerAlt className="mr-2 text-orange-400" />
            <span className="text-sm">
              {(itinerary.type || destination?.type) === "international"
                ? "International"
                : "Domestic"}
            </span>
          </div>
        </div>

        <div className="flex gap-3" />

      </div>

      {/* Hero */}
      <div className="relative rounded-lg overflow-hidden shadow h-64 mb-6">
        <img
          src={
            imagePreviews?.[0]?.url ||
            (Array.isArray(itinerary.images) && itinerary.images[0]) ||
            itinerary.image ||
            "/path-to-default-image.jpg"
          }
          alt={itinerary.name || itinerary.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overview */}
      <div className="mb-8">
        {itinerary.subtitle && (
          <p className="text-lg text-gray-700 mb-2">{itinerary.subtitle}</p>
        )}
        {Array.isArray(itinerary.destinations) && itinerary.destinations.length > 0 && (
          <p className="text-sm text-gray-600">Destinations: {itinerary.destinations.join(", ")}</p>
        )}
        {(itinerary.price || itinerary.discount) && (
          <div className="mt-3 flex items-center gap-3">
            {itinerary.price && (
              <span className="text-xl font-semibold text-gray-800">₹{Number(itinerary.price).toLocaleString()}</span>
            )}
            {itinerary.discount ? (
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">{itinerary.discount}% Off</span>
            ) : null}
          </div>
        )}
      </div>

      {/* Gallery */}
      {Array.isArray(itinerary.images) && itinerary.images.length > 1 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {itinerary.images.slice(0, 8).map((img, idx) => (
            <img key={idx} src={img} alt={`img-${idx}`} className="w-full h-28 object-cover rounded" />
          ))}
        </div>
      )}

      {/* Day-wise itinerary */}
      {Array.isArray(itinerary.days) && itinerary.days.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Itinerary</h2>
          <div className="space-y-4">
            {itinerary.days.map((d, i) => (
              <div key={i} className="border rounded p-4 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <strong>Day {d.dayNumber || i + 1}: {d.title}</strong>
                  {d.meals && <span className="text-xs text-gray-500">Meals: {d.meals}</span>}
                </div>
                {d.details && <p className="text-gray-700">{d.details}</p>}
                {d.activities && (
                  <p className="text-gray-600 text-sm mt-1">Activities: {d.activities}</p>
                )}
                {d.stay && (
                  <p className="text-gray-600 text-sm">Stay: {d.stay}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inclusions / Exclusions */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {itinerary.inclusions && (
          <div className="bg-white border rounded p-4">
            <h3 className="font-semibold mb-2">Inclusions</h3>
            <ul className="list-disc list-inside text-gray-700">
              {String(itinerary.inclusions)
                .split(/\n|,/) 
                .map((x) => x.trim())
                .filter(Boolean)
                .map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
            </ul>
          </div>
        )}
        {itinerary.exclusions && (
          <div className="bg-white border rounded p-4">
            <h3 className="font-semibold mb-2">Exclusions</h3>
            <ul className="list-disc list-inside text-gray-700">
              {String(itinerary.exclusions)
                .split(/\n|,/) 
                .map((x) => x.trim())
                .filter(Boolean)
                .map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
            </ul>
          </div>
        )}
      </div>

      {/* Terms & Payment Policy */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {itinerary.terms && (
          <div className="bg-white border rounded p-4">
            <h3 className="font-semibold mb-2">Terms & Conditions</h3>
            <p className="text-gray-700 whitespace-pre-line">{itinerary.terms}</p>
          </div>
        )}
        {itinerary.paymentPolicy && (
          <div className="bg-white border rounded p-4">
            <h3 className="font-semibold mb-2">Payment Policy</h3>
            <p className="text-gray-700 whitespace-pre-line">{itinerary.paymentPolicy}</p>
          </div>
        )}
      </div>

      {/* Back button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Back
        </button>
      </div>

      {/* No public/private controls on details page */}
    </div>
  );
}
