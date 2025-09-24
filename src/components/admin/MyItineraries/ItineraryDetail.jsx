import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { FaMapMarkerAlt, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import Modal from "./Modal";
import axios from "axios";
import EditItineraryModal from "./EditItineraryModal";

export default function ItineraryDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const outlet = useOutletContext() || {};
  const { destinations = [], updateItinerary } = outlet;

  // find original itinerary
  const original = destinations.find((d) => d.slug === slug) || null;

  // modal
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // local state
  const [itinerary, setItinerary] = useState(original);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]); 
  const [newImagesFiles, setNewImagesFiles] = useState([]); 
  const [view, setView] = useState("private");

  // Razorpay
  const openRazorpay = async () => {
    try {
      const { data: order } = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/payment/process`,
        {
          amount: 100, // in paise
          email: "farhinbashira@gmail.com",
          phone: "8448899181",
        }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Your App Name",
        description: "Order Payment",
        order_id: order.id,
        handler: async function (response) {
          console.log("Payment success", response);
          const res = await axios.post(
            `${import.meta.env.VITE_BACKEND_API}/api/payment/callback`,
            response
          );
          console.log("Response", res);
        },
        prefill: {
          name: "Bashira Farhin",
          email: "farhinbashira@gmail.com",
          phone: "8448899181",
        },
      };

      const loadScript = (src) =>
        new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });

      await loadScript("https://checkout.razorpay.com/v1/checkout.js");

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed", error);
    }
  };


  const handleSaveItinerary = async (updated) => {
  // optionally: call API to persist updated itinerary
  // await axios.put(`/api/itineraries/${itinerary.id}`, updated);
  // update local state:
  setItinerary(updated);

  // if your parent outlet has updateItinerary, call it
  if (typeof updateItinerary === "function") updateItinerary(updated);
};

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
          <h1 className="text-3xl font-bold">{itinerary.name}</h1>
          <div className="flex items-center text-gray-600 mt-2">
            <FaMapMarkerAlt className="mr-2 text-orange-400" />
            <span className="text-sm">
              {itinerary.type === "international"
                ? "International"
                : "Domestic"}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setIsConfirmOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Make it {view === "public" ? "private" : "public"}
          </button>
           <button
    type="button"
    onClick={() => setIsEditing(true)}
    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded"
  >
    <FaEdit /> Edit
  </button>
        </div>

        <EditItineraryModal
  isOpen={isEditing}
  onClose={() => setIsEditing(false)}
  itinerary={itinerary}
  onSave={handleSaveItinerary}
/>
      </div>

      {/* Hero */}
      <div className="relative rounded-lg overflow-hidden shadow h-64 mb-6">
        <img
          src={
            imagePreviews?.[0]?.url ||
            itinerary.images?.[0] ||
            "/path-to-default-image.jpg"
          }
          alt={itinerary.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* TODO: keep your rest of JSX (editing form & read-only mode) same as before */}

      {/* Back button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Back
        </button>
      </div>

      {/* Confirm Modal */}
      <Modal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} maxWidth="max-w-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
          <p className="text-gray-600 mb-6">
            Do you really want to make this itinerary{" "}
            <strong>{view === "public" ? "private" : "public"}</strong>?
          </p>
          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => setIsConfirmOpen(false)}
            >
              No
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => {
                setIsConfirmOpen(false);
                setView(view === "public" ? "private" : "public");
                openRazorpay();
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
