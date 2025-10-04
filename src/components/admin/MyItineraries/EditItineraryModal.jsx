// src/components/admin/MyItineraries/EditItineraryModal.jsx
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaPlus, FaTrash, FaTimes } from "react-icons/fa";


export default function EditItineraryModal({ isOpen, onClose, itinerary: initial, onSave }) {
  const [itinerary, setItinerary] = useState(initial || {});
  const [errors, setErrors] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]); // { id, url, name, isNew }
  const [newFiles, setNewFiles] = useState([]);

  useEffect(() => {
    setItinerary(initial || {});
    // build previews from existing images
    if (initial?.images?.length) {
      const previews = initial.images.map((url, i) => ({
        id: `existing-${i}`,
        url,
        name: url.split("/").pop(),
        isNew: false,
      }));
      setImagePreviews(previews);
    } else {
      setImagePreviews([]);
    }
    setNewFiles([]);
    setErrors({});
  }, [initial, isOpen]);

  // cleanup object URLs when modal closes
  useEffect(() => {
    return () => {
      imagePreviews.forEach((p) => {
        if (p.isNew && p.url) URL.revokeObjectURL(p.url);
      });
    };
     
  }, []);

  const handleField = (key, val) => setItinerary((s) => ({ ...s, [key]: val }));

  // Destinations (simple strings)
  const addDestination = () =>
    setItinerary((s) => ({ ...s, destinations: [...(s.destinations || []), ""] }));
  const updateDestination = (idx, val) =>
    setItinerary((s) => {
      const next = [...(s.destinations || [])];
      next[idx] = val;
      return { ...s, destinations: next };
    });
  const removeDestination = (idx) =>
    setItinerary((s) => ({
      ...s,
      destinations: (s.destinations || []).filter((_, i) => i !== idx),
    }));

  // Days handlers
  const addDay = () =>
    setItinerary((s) => {
      const next = s?.days ? [...s.days] : [];
      next.push({
        dayNumber: next.length + 1,
        title: "",
        details: "",
        activities: "",
        meals: "",
        stay: "",
      });
      return { ...s, days: next };
    });
  const updateDay = (i, key, val) =>
    setItinerary((s) => {
      const next = [...(s.days || [])];
      next[i] = { ...next[i], [key]: val };
      return { ...s, days: next };
    });
  const removeDay = (i) =>
    setItinerary((s) => {
      const next = (s.days || []).filter((_, j) => j !== i).map((d, idx) => ({ ...d, dayNumber: idx + 1 }));
      return { ...s, days: next };
    });

  // Image upload
  const handleImageFiles = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const previews = files.map((f, i) => ({
      id: `new-${Date.now()}-${i}`,
      url: URL.createObjectURL(f),
      name: f.name,
      isNew: true,
    }));
    setNewFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...previews]);
    e.target.value = null;
  };

  const removePreview = (id) => {
    setImagePreviews((prev) => {
      const removed = prev.find((p) => p.id === id);
      if (removed?.isNew && removed.url) URL.revokeObjectURL(removed.url);
      return prev.filter((p) => p.id !== id);
    });

    setNewFiles((prev) => {
      const idx = prev.findIndex((f) => `${f.name}` === id.split("-").slice(2).join("-"));
      if (idx === -1) return prev;
      const copy = [...prev];
      copy.splice(idx, 1);
      return copy;
    });

    // also remove from itinerary.images (existing)
    setItinerary((s) => {
      if (!s) return s;
      const next = (s.images || []).filter((_, i) => `existing-${i}` !== id);
      return { ...s, images: next };
    });
  };

  const validate = () => {
    const e = {};
    if (!itinerary?.name || !String(itinerary.name).trim()) e.name = "Title required";
    if (!itinerary?.price || Number(itinerary.price) <= 0) e.price = "Price must be > 0";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (evt) => {
    evt?.preventDefault?.();
    if (!validate()) return;

    // Build final images array: keep existing URLs + (optionally) upload new files on save
    // For now we just send object URLs for preview or file names. In real use, upload newFiles to server.
    const finalImages = [
      ...imagePreviews.filter((p) => !p.isNew).map((p) => p.url),
      ...imagePreviews.filter((p) => p.isNew).map((p) => p.url),
    ];

    const updated = {
      ...itinerary,
      images: finalImages,
      finalPrice: (() => {
        const p = Number(itinerary.price || 0);
        const d = Number(itinerary.discount || 0);
        if (d > 0 && d <= 100) return Math.max(0, p - (p * d) / 100).toFixed(2);
        return Math.max(0, p - d).toFixed(2);
      })(),
    };

    // Call onSave (parent should handle server upload if required)
    await onSave?.(updated);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div>
      {/* Use your Modal component around this JSX. If you don't have one, wrap this in your own Modal */}
      <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-16 px-4">
        <div className="fixed inset-0 bg-black/40 z-[9998]" onClick={onClose} />
        <div className="relative z-[10000] w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-auto max-h-[85vh]">
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">Edit Itinerary</h3>
            <button onClick={onClose} className="p-2 text-gray-600 hover:text-black"><FaTimes /></button>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
            {/* Basic row */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Itinerary Title</label>
                <input value={itinerary.name || ""} onChange={(e) => handleField("name", e.target.value)} className="mt-1 w-full border rounded p-2" placeholder="e.g. 7-Day Golden Triangle" />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium">Itinerary Type</label>
                <div className="mt-1 flex gap-4 items-center">
                  <label className="flex items-center gap-2"><input type="radio" name="type" checked={itinerary.type === "domestic"} onChange={() => handleField("type", "domestic")} /> Domestic</label>
                  <label className="flex items-center gap-2"><input type="radio" name="type" checked={itinerary.type === "international"} onChange={() => handleField("type", "international")} /> International</label>
                </div>
              </div>
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-sm font-medium">Subtitle</label>
              <input value={itinerary.subtitle || ""} onChange={(e) => handleField("subtitle", e.target.value)} className="mt-1 w-full border rounded p-2" placeholder="e.g. 5 Days - Beaches, Spa & Culture" />
            </div>

            {/* Destinations + days */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium">Destinations (add multiple)</label>
                <div className="space-y-2 mt-2">
                  {(itinerary.destinations || []).map((d, i) => (
                    <div key={i} className="flex gap-2">
                      <input value={d} onChange={(e) => updateDestination(i, e.target.value)} className="flex-1 border rounded p-2" placeholder={`Destination ${i + 1}`} />
                      <button type="button" onClick={() => removeDestination(i)} className="px-3 py-1 bg-red-100 text-red-700 rounded"><FaTrash /></button>
                    </div>
                  ))}
                  <button type="button" onClick={addDestination} className="mt-2 px-3 py-2 bg-orange-500 text-white rounded inline-flex items-center gap-2"><FaPlus /> Add Destination</button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">Number of Days</label>
                <input value={itinerary.days?.length ?? 0} readOnly className="mt-1 w-full border rounded p-2 bg-gray-50" />
                <div className="mt-3 flex gap-2">
                  <button type="button" onClick={addDay} className="px-3 py-2 bg-blue-600 text-white rounded">+ Add Day</button>
                </div>
              </div>
            </div>

            {/* Day wise fields */}
            <div>
              <h4 className="font-semibold mb-3">Day-wise Itinerary</h4>
              <div className="space-y-4">
                {(itinerary.days || []).map((day, idx) => (
                  <div key={idx} className="border rounded p-4">
                    <div className="flex justify-between items-center mb-3">
                      <strong>Day {day.dayNumber}</strong>
                      <button type="button" onClick={() => removeDay(idx)} className="text-red-600 px-2 py-1 bg-red-50 rounded"><FaTrash /></button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <input placeholder="Title (e.g. Arrival in City)" value={day.title || ""} onChange={(e) => updateDay(idx, "title", e.target.value)} className="border rounded p-2" />
                      <input placeholder="Stay (Hotel/Guest house)" value={day.stay || ""} onChange={(e) => updateDay(idx, "stay", e.target.value)} className="border rounded p-2" />
                    </div>
                    <textarea placeholder="Details / Overview" value={day.details || ""} onChange={(e) => updateDay(idx, "details", e.target.value)} className="mt-3 w-full border rounded p-2" />
                    <input placeholder="Activities (comma separated)" value={day.activities || ""} onChange={(e) => updateDay(idx, "activities", e.target.value)} className="mt-2 w-full border rounded p-2" />
                    <input placeholder="Meals info" value={day.meals || ""} onChange={(e) => updateDay(idx, "meals", e.target.value)} className="mt-2 w-full border rounded p-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions / Exclusions / Policies */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Inclusions</label>
                <textarea value={itinerary.inclusions || ""} onChange={(e) => handleField("inclusions", e.target.value)} className="mt-1 w-full border rounded p-2" />
                <label className="block text-sm font-medium mt-3">Additional Inclusions</label>
                <textarea value={itinerary.additionalInclusions || ""} onChange={(e) => handleField("additionalInclusions", e.target.value)} className="mt-1 w-full border rounded p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Exclusions</label>
                <textarea value={itinerary.exclusions || ""} onChange={(e) => handleField("exclusions", e.target.value)} className="mt-1 w-full border rounded p-2" />
                <label className="block text-sm font-medium mt-3">Terms & Conditions</label>
                <textarea value={itinerary.terms || ""} onChange={(e) => handleField("terms", e.target.value)} className="mt-1 w-full border rounded p-2" />
                <label className="block text-sm font-medium mt-3">Payment Policy</label>
                <textarea value={itinerary.paymentPolicy || ""} onChange={(e) => handleField("paymentPolicy", e.target.value)} className="mt-1 w-full border rounded p-2" />
              </div>
            </div>

            {/* Pricing */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium">Price</label>
                <input type="number" min={0} value={itinerary.price || 0} onChange={(e) => handleField("price", e.target.value)} className="mt-1 w-full border rounded p-2" />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium">Discount (percent or absolute)</label>
                <input type="number" min={0} value={itinerary.discount || 0} onChange={(e) => handleField("discount", e.target.value)} className="mt-1 w-full border rounded p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Final Price</label>
                <div className="mt-1 p-2 border rounded">
                  {(() => {
                    const p = Number(itinerary.price || 0);
                    const d = Number(itinerary.discount || 0);
                    if (d > 0 && d <= 100) return Math.max(0, p - (p * d) / 100).toFixed(2);
                    return Math.max(0, p - d).toFixed(2);
                  })()}
                </div>
              </div>
            </div>

            {/* Image gallery */}
            <div>
              <label className="block text-sm font-medium">Image Gallery (multiple)</label>
              <input type="file" multiple accept="image/*" onChange={handleImageFiles} className="mt-2" />
              <div className="mt-3 grid grid-cols-3 md:grid-cols-6 gap-3">
                {imagePreviews.map((p) => (
                  <div key={p.id} className="relative border rounded overflow-hidden">
                    <img src={p.url} alt={p.name} className="w-full h-24 object-cover" />
                    <div className="p-1 text-xs text-center truncate">{p.name}</div>
                    <button type="button" onClick={() => removePreview(p.id)} className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full px-1 text-sm">✕</button>
                  </div>
                ))}
                {imagePreviews.length === 0 && <div className="col-span-3 text-sm text-gray-500">No images selected</div>}
              </div>
            </div>

            {/* Agent notes */}
            <div>
              <label className="block text-sm font-medium">Agent Notes (internal)</label>
              <textarea value={itinerary.agentNotes || ""} onChange={(e) => handleField("agentNotes", e.target.value)} className="mt-1 w-full border rounded p-2" />
            </div>

            {/* actions */}
            <div className="flex items-center gap-3">
              <button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded">Save Itinerary</button>
              <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
              <button
                type="button"
                onClick={() => {
                  // copy JSON for quick debugging
                  navigator.clipboard.writeText(JSON.stringify(itinerary, null, 2));
                  alert("JSON copied to clipboard");
                }}
                className="ml-auto px-4 py-2 border rounded"
              >
                Copy JSON
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

EditItineraryModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  itinerary: PropTypes.object,
  onSave: PropTypes.func,
};

EditItineraryModal.defaultProps = {
  isOpen: false,
  itinerary: null,
  onSave: () => {},
};
