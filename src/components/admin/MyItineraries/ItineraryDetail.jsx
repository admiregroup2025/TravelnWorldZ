import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { FaMapMarkerAlt, FaEdit, FaSave, FaTimes } from "react-icons/fa";

/**
 * ItineraryDetail with inline edit mode.
 *
 * Expects Outlet context to provide:
 *  - destinations: array of itinerary objects
 *  - updateItinerary: function(updatedItinerary) => void  (optional)
 *
 * If updateItinerary isn't provided, the component will still update local state
 * so you can test immediately. For production wire updateItinerary to update server / parent state.
 */

export default function ItineraryDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const outlet = useOutletContext() || {};
  const { destinations = [], updateItinerary } = outlet;

  // find original itinerary
  const original = destinations.find((d) => d.slug === slug) || null;

  // local state for display/edit
  const [itinerary, setItinerary] = useState(original);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]); // [{ id, url, name, isNew }]
  const [newImagesFiles, setNewImagesFiles] = useState([]); // File objects

  // load initial previews from existing images (URLs)
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
    // reset new images/files when switching itinerary
    setNewImagesFiles([]);
    setErrors({});
  }, [original]);

  // handle field changes
  const handleChange = (key, value) => {
    setItinerary((prev) => ({ ...prev, [key]: value }));
  };

  // Days handlers
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
      const next = (prev.days || []).filter((_, i) => i !== index).map((d, i) => ({ ...d, dayNumber: i + 1 }));
      return { ...prev, days: next };
    });
  };

  // Destinations handlers
  const addDestination = () => {
    setItinerary((prev) => ({ ...prev, destinations: [...(prev.destinations || []), ""] }));
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

  // Image upload handlers (add new files)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    // create previews for new files
    const newPreviews = files.map((f, i) => ({
      id: `new-${Date.now()}-${i}`,
      url: URL.createObjectURL(f),
      name: f.name,
      isNew: true,
    }));

    setNewImagesFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);

    // reset input so same files can be chosen again
    e.target.value = null;
  };

  // remove preview & file (works for existing URLs and new files)
  const removeImagePreview = (id) => {
    setImagePreviews((prev) => {
      const removed = prev.find((p) => p.id === id);
      if (removed?.isNew && removed.url) URL.revokeObjectURL(removed.url);
      return prev.filter((p) => p.id !== id);
    });

    // if it was a newly added file, remove it from newImagesFiles (match by name)
    setNewImagesFiles((prev) => {
      // best-effort: remove first file with same name as preview
      const copy = [...prev];
      const idx = copy.findIndex((f) => `${f.name}` === id.split("-").slice(2).join("-") || false);
      // fallback: remove by matching preview url filename
      return copy.filter((_, i) => i !== idx);
    });

    // also remove from itinerary.images if it was an existing url
    setItinerary((prev) => {
      if (!prev) return prev;
      const nextImages = (prev.images || []).filter((imgUrl, i) => `existing-${i}` !== id);
      return { ...prev, images: nextImages };
    });
  };

  // cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      imagePreviews.forEach((p) => {
        if (p.isNew && p.url) URL.revokeObjectURL(p.url);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // validation
  const validate = () => {
    const e = {};
    if (!itinerary?.name?.trim()) e.name = "Title is required";
    if (!itinerary?.price || Number(itinerary.price) <= 0) e.price = "Price must be > 0";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Save handler - calls parent update if available, otherwise updates local state (test)
  const handleSave = (evt) => {
    evt?.preventDefault?.();
    if (!validate()) return;

    // Build updated itinerary object
    const updated = {
      ...itinerary,
      // build images array: keep existing URL images from imagePreviews + create object URLs for new files (demo)
      images: imagePreviews.map((p) => p.url),
      // finalPrice logic (same as your form)
      finalPrice: (() => {
        const p = Number(itinerary.price || 0);
        const d = Number(itinerary.discount || 0);
        if (d > 0 && d <= 100) return Math.max(0, p - (p * d) / 100).toFixed(2);
        return Math.max(0, p - d).toFixed(2);
      })(),
    };

    // If parent provided updateItinerary, call it
    if (typeof updateItinerary === "function") {
      updateItinerary(updated);
    } else {
      // fallback: update local copy (so the displayed page reflects changes)
      // In real app, you should call API and then update parent state
      setItinerary(updated);
      // Also replace original in outlet.destinations if available (best-effort)
      if (Array.isArray(destinations)) {
        const idx = destinations.findIndex((d) => d.slug === slug);
        if (idx !== -1) {
          destinations[idx] = updated;
        }
      }
    }

    setIsEditing(false);
  };

  if (!itinerary) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">Itinerary not found</h2>
        <button onClick={() => navigate(-1)} className="mt-3 px-3 py-2 bg-orange-500 text-white rounded">
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold">{itinerary.name}</h1>
          <div className="flex items-center text-gray-600 mt-2">
            <FaMapMarkerAlt className="mr-2 text-orange-400" />
            <span className="text-sm">{itinerary.type === "international" ? "International" : "Domestic"}</span>
          </div>
        </div>

        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded">
                <FaSave /> Save
              </button>
              <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded">
                <FaTimes /> Cancel
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded">
              <FaEdit /> Edit
            </button>
          )}
        </div>
      </div>

      {/* HERO / Banner */}
      <div className="relative rounded-lg overflow-hidden shadow h-64 mb-6">
        <img src={imagePreviews?.[0]?.url || itinerary.images?.[0] || "/path-to-default-image.jpg"} alt={itinerary.name} className="w-full h-full object-cover" />
      </div>

      {/* If editing show form inputs, otherwise show read-only details */}
      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Basic fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Itinerary Title</label>
              <input className="mt-1 w-full border rounded p-2" value={itinerary.name || ""} onChange={(e) => handleChange("name", e.target.value)} />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Type</label>
              <select className="mt-1 w-full border rounded p-2" value={itinerary.type || "domestic"} onChange={(e) => handleChange("type", e.target.value)}>
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
              </select>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <label className="block text-sm font-medium mb-2">Destinations</label>
            <div className="space-y-2">
              {(itinerary.destinations || []).map((d, i) => (
                <div key={i} className="flex gap-2">
                  <input value={d} onChange={(e) => updateDestination(i, e.target.value)} className="flex-1 border rounded p-2" />
                  <button type="button" onClick={() => removeDestination(i)} className="px-3 py-1 bg-red-100 text-red-700 rounded">Remove</button>
                </div>
              ))}
              <button type="button" onClick={addDestination} className="mt-2 px-3 py-2 bg-orange-500 text-white rounded">+ Add Destination</button>
            </div>
          </div>

          {/* Day-wise */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium">Day-wise Itinerary</h2>
              <button type="button" onClick={addDay} className="px-3 py-1 bg-blue-600 text-white rounded">+ Add Day</button>
            </div>
            <div className="space-y-4">
              {(itinerary.days || []).map((day, idx) => (
                <div key={idx} className="border rounded p-4">
                  <div className="flex justify-between items-center mb-2">
                    <strong>Day {day.dayNumber}</strong>
                    <button type="button" onClick={() => removeDay(idx)} className="text-sm text-red-600">Remove</button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <input placeholder="Title" value={day.title || ""} onChange={(e) => updateDay(idx, "title", e.target.value)} className="border rounded p-2" />
                    <input placeholder="Stay" value={day.stay || ""} onChange={(e) => updateDay(idx, "stay", e.target.value)} className="border rounded p-2" />
                  </div>

                  <textarea placeholder="Details" value={day.details || ""} onChange={(e) => updateDay(idx, "details", e.target.value)} className="mt-3 w-full border rounded p-2" />
                  <input placeholder="Activities" value={day.activities || ""} onChange={(e) => updateDay(idx, "activities", e.target.value)} className="mt-2 w-full border rounded p-2" />
                  <input placeholder="Meals" value={day.meals || ""} onChange={(e) => updateDay(idx, "meals", e.target.value)} className="mt-2 w-full border rounded p-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions / Exclusions / Terms / Payment */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Inclusions</label>
              <textarea value={itinerary.inclusions || ""} onChange={(e) => handleChange("inclusions", e.target.value)} className="mt-1 w-full border rounded p-2" />
              <label className="block text-sm font-medium mt-3">Additional Inclusions</label>
              <textarea value={itinerary.additionalInclusions || ""} onChange={(e) => handleChange("additionalInclusions", e.target.value)} className="mt-1 w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Exclusions</label>
              <textarea value={itinerary.exclusions || ""} onChange={(e) => handleChange("exclusions", e.target.value)} className="mt-1 w-full border rounded p-2" />
              <label className="block text-sm font-medium mt-3">Terms & Conditions</label>
              <textarea value={itinerary.terms || ""} onChange={(e) => handleChange("terms", e.target.value)} className="mt-1 w-full border rounded p-2" />
              <label className="block text-sm font-medium mt-3">Payment Policy</label>
              <textarea value={itinerary.paymentPolicy || ""} onChange={(e) => handleChange("paymentPolicy", e.target.value)} className="mt-1 w-full border rounded p-2" />
            </div>
          </div>

          {/* Pricing */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">Price</label>
              <input type="number" min={0} value={itinerary.price || 0} onChange={(e) => handleChange("price", e.target.value)} className="mt-1 w-full border rounded p-2" />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Discount (percent 0-100 or absolute)</label>
              <input type="number" min={0} value={itinerary.discount || 0} onChange={(e) => handleChange("discount", e.target.value)} className="mt-1 w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Final Price</label>
              <div className="mt-1 p-2 border rounded">{(() => {
                const p = Number(itinerary.price || 0);
                const d = Number(itinerary.discount || 0);
                if (d > 0 && d <= 100) return Math.max(0, p - (p * d) / 100).toFixed(2);
                return Math.max(0, p - d).toFixed(2);
              })()}</div>
            </div>
          </div>

          {/* Image gallery */}
          <div>
            <label className="block text-sm font-medium">Image Gallery (multiple)</label>
            <input type="file" multiple accept="image/*" onChange={handleImageChange} className="mt-2" />

            <div className="mt-3 grid grid-cols-3 md:grid-cols-6 gap-3">
              {imagePreviews.map((p) => (
                <div key={p.id} className="relative border rounded overflow-hidden">
                  <img src={p.url} alt={p.name} className="w-full h-24 object-cover" />
                  <div className="p-1 text-xs text-center truncate">{p.name}</div>
                  <button type="button" onClick={() => removeImagePreview(p.id)} className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full px-1 text-sm">✕</button>
                </div>
              ))}
              {imagePreviews.length === 0 && <div className="col-span-3 text-sm text-gray-500">No images selected</div>}
            </div>
          </div>

          {/* Agent notes */}
          <div>
            <label className="block text-sm font-medium">Agent Notes (internal)</label>
            <textarea value={itinerary.agentNotes || ""} onChange={(e) => handleChange("agentNotes", e.target.value)} className="mt-1 w-full border rounded p-2" />
          </div>
        </form>
      ) : (
        <>
          {/* Read-only display */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-3">Overview</h2>
              <p className="text-gray-700 whitespace-pre-line">{itinerary.description || "No description"}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-3">Quick Info</h2>
              <p><strong>Price:</strong> ₹{itinerary.price || 0}</p>
              <p><strong>Discount:</strong> {itinerary.discount || 0}</p>
              <p><strong>Final Price:</strong> ₹{itinerary.finalPrice ?? itinerary.price ?? 0}</p>
            </div>
          </div>

          {/* Days */}
          {itinerary.days?.length > 0 && (
            <div className="bg-white rounded-xl shadow p-6 mb-6">
              <h2 className="text-lg font-semibold mb-3">Day-wise Plan</h2>
              <div className="space-y-4">
                {itinerary.days.map((d) => (
                  <div key={d.dayNumber} className="border-b pb-3 last:border-b-0">
                    <h3 className="font-semibold">Day {d.dayNumber}: {d.title}</h3>
                    <p className="text-gray-700">{d.details}</p>
                    <p className="text-sm text-gray-600"><strong>Stay:</strong> {d.stay || "—"}</p>
                    <p className="text-sm text-gray-600"><strong>Meals:</strong> {d.meals || "—"}</p>
                    <p className="text-sm text-gray-600"><strong>Activities:</strong> {d.activities || "—"}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inclusions / Exclusions */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-3">Inclusions</h2>
              <p className="text-gray-700 whitespace-pre-line">{itinerary.inclusions || "Not specified."}</p>
              {itinerary.additionalInclusions && (
                <>
                  <h3 className="font-medium mt-3 mb-1">Additional Inclusions</h3>
                  <p className="text-gray-700 whitespace-pre-line">{itinerary.additionalInclusions}</p>
                </>
              )}
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-3">Exclusions</h2>
              <p className="text-gray-700 whitespace-pre-line">{itinerary.exclusions || "Not specified."}</p>
            </div>
          </div>

          {/* Policies */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-3">Terms & Conditions</h2>
              <p className="text-gray-700 whitespace-pre-line">{itinerary.terms || "Not specified."}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-3">Payment Policy</h2>
              <p className="text-gray-700 whitespace-pre-line">{itinerary.paymentPolicy || "Not specified."}</p>
            </div>
          </div>

          {/* Image gallery */}
          {itinerary.images?.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {imagePreviews.map((p) => (
                  <img key={p.id} src={p.url} alt={p.name} className="w-full h-40 object-cover rounded" />
                ))}
              </div>
            </div>
          )}

          {/* Agent notes */}
          {itinerary.agentNotes && (
            <div className="bg-white rounded-xl shadow p-6 mb-6">
              <h2 className="text-lg font-semibold mb-3">Agent Notes</h2>
              <p className="text-gray-700 whitespace-pre-line">{itinerary.agentNotes}</p>
            </div>
          )}
        </>
      )}

      {/* Back button */}
      <div className="flex justify-end mt-4">
        <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-200 rounded">
          Back
        </button>
      </div>
    </div>
  );
}
