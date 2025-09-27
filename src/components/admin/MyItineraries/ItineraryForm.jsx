import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import ItineraryCard from "./ItineraryCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postJson, putJson } from "../../../utils/api";

// ItineraryForm.jsx
// Single-file React component for creating an itinerary form for agents.
// Tailwind CSS classes are used for styling. Default export is the component.

export default function ItineraryForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { destinations: filteredDestinations = [], rawDestinations = [], upsertDestinationAndAddItinerary } = useOutletContext() || {};
  const routeState = location.state || {};

  const [destinationName, setDestinationName] = useState("");
  const [itineraryType, setItineraryType] = useState("domestic");
  const [title, setTitle] = useState("");
  const [numDays, setNumDays] = useState(1);
  const [destinations, setDestinations] = useState([""]);




  const [days, setDays] = useState([
    {
      dayNumber: 1,
      title: "",
      details: "",
      activities: "",
      meals: "",
      stay: "",
    },
  ]);

  const [inclusions, setInclusions] = useState("");
  const [additionalInclusions, setAdditionalInclusions] = useState("");
  const [exclusions, setExclusions] = useState("");
  const [terms, setTerms] = useState("");
  const [paymentPolicy, setPaymentPolicy] = useState("");

  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [agentNotes, setAgentNotes] = useState("");

  // Basic validation / status
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);




  const [itineraries, setItineraries] = useState([]); // store submitted itineraries
  // Prefill when navigated with destinationSlug + itineraryId
  useEffect(() => {
    const { destinationSlug, itineraryId } = routeState || {};
    if (!destinationSlug || !itineraryId) return;

    const source = Array.isArray(rawDestinations) && rawDestinations.length ? rawDestinations : filteredDestinations;
    const dest = Array.isArray(source) ? source.find((d) => d.slug === destinationSlug) : null;
    const existing = dest?.itineraries?.find((i) => `${i.id}` === `${itineraryId}`);
    if (!existing) return;

    // Basic fields
    setDestinationName(dest?.name || "");
    setItineraryType(dest?.type || "domestic");
    setTitle(existing.title || "");
    // Destinations list
    if (Array.isArray(existing.destinations) && existing.destinations.length) {
      setDestinations(existing.destinations);
    } else if (dest?.name) {
      setDestinations([dest.name]);
    }

    // Days
    if (Array.isArray(existing.days) && existing.days.length) {
      // ensure dayNumber sequence
      const normalized = existing.days.map((d, idx) => ({
        dayNumber: d.dayNumber || idx + 1,
        title: d.title || "",
        details: d.details || "",
        activities: d.activities || "",
        meals: d.meals || "",
        stay: d.stay || "",
      }));
      setDays(normalized);
      setNumDays(normalized.length);
    } else if (typeof existing.days === "number" && existing.days > 0) {
      const gen = Array.from({ length: existing.days }).map((_, idx) => ({
        dayNumber: idx + 1,
        title: "",
        details: "",
        activities: "",
        meals: "",
        stay: "",
      }));
      setDays(gen);
      setNumDays(existing.days);
    }

    // Pricing & policies
    if (existing.price != null) setPrice(existing.price);
    if (existing.discount != null) setDiscount(existing.discount);
    setInclusions(existing.inclusions || "");
    setAdditionalInclusions(existing.additionalInclusions || "");
    setExclusions(existing.exclusions || "");
    setTerms(existing.terms || "");
    setPaymentPolicy(existing.paymentPolicy || "");

    // Images
    const imgs = Array.isArray(existing.images) ? existing.images : (existing.image ? [existing.image] : []);
    if (imgs.length) {
      setImagePreviews(imgs.map((url, i) => ({ name: `image-${i + 1}`, url })));
    }
  }, [routeState, rawDestinations, filteredDestinations]);





  // Helpers
  const updateDay = (index, key, value) => {
    setDays((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next;
    });
  };

  const addDay = () => {
    setDays((prev) => [
      ...prev,
      {
        dayNumber: prev.length + 1,
        title: "",
        details: "",
        activities: "",
        meals: "",
        stay: "",
      },
    ]);
    setNumDays((n) => n + 1);
  };

  const removeDay = (index) => {
    setDays((prev) => {
      const next = prev.filter((_, i) => i !== index).map((d, i) => ({ ...d, dayNumber: i + 1 }));
      setNumDays(next.length);
      return next;
    });
  };

  const updateDestination = (index, value) => {
    setDestinations((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const addDestination = () => setDestinations((prev) => [...prev, ""]);
  const removeDestination = (index) => setDestinations((prev) => prev.filter((_, i) => i !== index));

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    setImages(files);

    const previews = files.map((f) => ({ name: f.name, url: URL.createObjectURL(f) }));
    setImagePreviews(previews);
  };

  const finalPrice = () => {
    const p = Number(price || 0);
    const d = Number(discount || 0);
    // treat discount as percent if between 0 and 100, otherwise absolute
    if (d > 0 && d <= 100) {
      return Math.max(0, p - (p * d) / 100).toFixed(2);
    }
    return Math.max(0, p - d).toFixed(2);
  };

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = "Itinerary title is required";
    if (days.length === 0) e.days = "At least one day is required";
    if (!price || Number(price) <= 0) e.price = "Price should be more than 0";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        title,
        destinationName,
        itineraryType,
        destinations: destinations.filter((d) => d.trim()),
        days,
        inclusions,
        additionalInclusions,
        exclusions,
        terms,
        paymentPolicy,
        price: Number(price),
        discount: Number(discount),
        images: imagePreviews.map((p) => p.url),
        agentNotes,
        published: false
      };

      let response;
      if (routeState.itineraryId) {
        // Update existing itinerary
        response = await putJson(`/api/itineraries/${routeState.itineraryId}`, payload);
      } else {
        // Create new itinerary
        response = await postJson('/api/itineraries', payload);
      }

      toast.success(response.message || "Itinerary saved successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      // Navigate to Manage Itineraries
      navigate('/admin/Manage-Itianary');
    } catch (error) {
      console.error('Error saving itinerary:', error);
      toast.error(error.message || "Failed to save itinerary", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Itinerary Creation Form</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl shadow">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Destination Name</label>
            <input value={destinationName} onChange={(e) => setDestinationName(e.target.value)} className="mt-2 block w-full rounded-lg border p-2" placeholder="e.g. Dubai, UAE" />
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium">Itinerary Type</label>
            <div className="mt-2 flex gap-4 items-center">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="domestic"
                  checked={itineraryType === "domestic"}
                  onChange={() => setItineraryType("domestic")}
                  className="mr-2"
                />
                Domestic
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="international"
                  checked={itineraryType === "international"}
                  onChange={() => setItineraryType("international")}
                  className="mr-2"
                />
                International
              </label>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Itinerary Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 block w-full rounded-lg border p-2"
              placeholder="e.g. 7-Day Golden Triangle Tour"
            />
            {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium">Number of Days</label>
            <input
              type="number"
              min={1}
              value={numDays}
              onChange={(e) => {
                const val = Math.max(1, Number(e.target.value || 1));
                setNumDays(val);
                // adjust days array length
                setDays((prev) => {
                  const next = [...prev];
                  while (next.length < val) {
                    next.push({ dayNumber: next.length + 1, title: "", details: "", activities: "", meals: "", stay: "" });
                  }
                  while (next.length > val) {
                    next.pop();
                  }
                  return next.map((d, i) => ({ ...d, dayNumber: i + 1 }));
                });
              }}
              className="mt-2 block w-full rounded-lg border p-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Destinations (add multiple)</label>
            <div className="mt-2 space-y-2">
              {destinations.map((d, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={d}
                    onChange={(e) => updateDestination(i, e.target.value)}
                    placeholder={`Destination ${i + 1}`}
                    className="flex-1 rounded-lg border p-2"
                  />
                  <button type="button" onClick={() => removeDestination(i)} className="px-3 py-2 rounded bg-red-50 text-red-700">
                    Remove
                  </button>
                </div>
              ))}
              <div>
                <button type="button" onClick={addDestination} className="px-4 py-2 rounded bg-orange-500 text-white">
                  + Add Destination
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Day-wise Itinerary</h2>
            <div className="flex gap-2">
              <button type="button" onClick={addDay} className="px-3 py-2 rounded bg-blue-700 text-white">
                + Add Day
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {days.map((day, idx) => (
              <div key={idx} className="border rounded p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">Day {day.dayNumber}</h3>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => removeDay(idx)} className="px-2 py-1 rounded bg-red-100 text-red-700">
                      Remove
                    </button>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    value={day.title}
                    onChange={(e) => updateDay(idx, "title", e.target.value)}
                    placeholder="Title (e.g. Arrival in City)"
                    className="rounded border p-2"
                  />

                  <input
                    value={day.stay}
                    onChange={(e) => updateDay(idx, "stay", e.target.value)}
                    placeholder="Stay (Hotel/Guest house)"
                    className="rounded border p-2"
                  />
                </div>

                <textarea
                  value={day.details}
                  onChange={(e) => updateDay(idx, "details", e.target.value)}
                  placeholder="Details / Overview"
                  className="mt-3 block w-full rounded border p-2"
                />

                <input
                  value={day.activities}
                  onChange={(e) => updateDay(idx, "activities", e.target.value)}
                  placeholder="Activities (comma separated)"
                  className="mt-3 block w-full rounded border p-2"
                />

                <input
                  value={day.meals}
                  onChange={(e) => updateDay(idx, "meals", e.target.value)}
                  placeholder="Meals info"
                  className="mt-3 block w-full rounded border p-2"
                />
              </div>
            ))}
          </div>

          {errors.days && <p className="text-sm text-red-500">{errors.days}</p>}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Inclusions</label>
            <textarea value={inclusions} onChange={(e) => setInclusions(e.target.value)} className="mt-2 block w-full rounded border p-2" />

            <label className="block text-sm font-medium mt-3">Additional Inclusions</label>
            <textarea value={additionalInclusions} onChange={(e) => setAdditionalInclusions(e.target.value)} className="mt-2 block w-full rounded border p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">Exclusions</label>
            <textarea value={exclusions} onChange={(e) => setExclusions(e.target.value)} className="mt-2 block w-full rounded border p-2" />

            <label className="block text-sm font-medium mt-3">Terms & Conditions</label>
            <textarea value={terms} onChange={(e) => setTerms(e.target.value)} className="mt-2 block w-full rounded border p-2" />

            <label className="block text-sm font-medium mt-3">Payment Policy</label>
            <textarea value={paymentPolicy} onChange={(e) => setPaymentPolicy(e.target.value)} className="mt-2 block w-full rounded border p-2" />
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} className="mt-2 block w-full rounded-lg border p-2" />
            {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Discount (percent 0-100 or absolute)</label>
            <input type="number" min={0} value={discount} onChange={(e) => setDiscount(e.target.value)} className="mt-2 block w-full rounded-lg border p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">Final Price</label>
            <div className="mt-2 rounded-lg border p-2">{finalPrice()}</div>
          </div>
        </section>

        <section>
          <label className="block text-sm font-medium">Image Gallery (multiple)</label>
          <input type="file" multiple accept="image/*" onChange={handleImageChange} className="mt-2" />

          <div className="mt-3 grid grid-cols-3 md:grid-cols-6 gap-3">
            {imagePreviews.map((p, i) => (
              <div key={i} className="border rounded overflow-hidden">
                <img src={p.url} alt={p.name} className="w-full h-24 object-cover" />
                <div className="p-1 text-xs text-center">{p.name}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <label className="block text-sm font-medium">Agent Notes (internal)</label>
          <textarea value={agentNotes} onChange={(e) => setAgentNotes(e.target.value)} className="mt-2 block w-full rounded border p-2" />
        </section>

        <div className="flex items-center gap-3">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-5 py-2 rounded bg-orange-500 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Save Itinerary'}
          </button>

          <button
            type="button"
            onClick={() => {
              // quick export to clipboard
              const data = {
                itineraryType,
                title,
                numDays: days.length,
                destinations: destinations.filter((d) => d.trim()),
                days,
                inclusions,
                exclusions,
                price,
                discount,
                finalPrice: finalPrice(),
              };
              navigator.clipboard?.writeText(JSON.stringify(data, null, 2));
              alert("Itinerary JSON copied to clipboard (demo)");
            }}
            className="px-4 py-2 rounded border"
          >
            Copy JSON
          </button>
        </div>
      </form>
      <ToastContainer />

      {itineraries.length > 0 && (
  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {itineraries.map((itinerary) => (
      <ItineraryCard
        key={itinerary.id}
        destination={{
          id: itinerary.id,
          name: itinerary.name,
          slug: itinerary.slug,
          images: itinerary.images,
          type: itinerary.type,
        }}
      />
    ))}
  </div>
)}

    </div>
  );
}
