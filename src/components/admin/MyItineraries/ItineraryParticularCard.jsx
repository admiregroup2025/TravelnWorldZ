import React, { useEffect, useState } from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';

import { useNavigate, useParams } from "react-router-dom";

import { useOutletContext } from "react-router-dom";
import EditItineraryModal from "./EditItineraryModal";
import PublicToggleButton from './PublicToggleButton';

// Tailwind-based React component converted from the provided HTML/CSS.
// Drop this file into a React app that has Tailwind configured (e.g. create-react-app + Tailwind or Next.js + Tailwind).

function encodeSVG(svg) {
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

export default function ItineraryParticularCard() {
  const { slug } = useParams();
  // expect these from parent via useOutletContext()
  const {
    destinations,
    updateDestinationItinerary,
    removeDestinationItinerary,
    toggleDestinationItineraryPublic,
  } = useOutletContext() || {};

  const destination = Array.isArray(destinations) ? destinations.find(d => d.slug === slug) : null;

  const navigate = useNavigate();

  useEffect(() => {
    // small mount animation using Tailwind classes - we add a tiny delay per card
    const cardsEl = document.querySelectorAll('.it-card');
    cardsEl.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'all 0.6s ease';
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, i * 150);
    });
    // hover small scale handled in JSX with Tailwind
  }, []);

  const [editingItinerary, setEditingItinerary] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  function goBack() {
    navigate("/admin/Manage-Itianary");
  }

  // wrapper: use provided toggle if available, otherwise update via updateDestinationItinerary
  function toggleItineraryPublicWrapper(slugParam, itineraryId, newValue) {
    if (typeof toggleDestinationItineraryPublic === 'function') {
      toggleDestinationItineraryPublic(slugParam, itineraryId, newValue);
    } else if (typeof updateDestinationItinerary === 'function') {
      // fallback: use updateDestinationItinerary to set public field
      updateDestinationItinerary(slugParam, itineraryId, { public: newValue });
    } else {
      console.warn('No toggle or update function available to change itinerary visibility.');
    }
  }

  // ripple effect helper
  function handleButtonClick(e, action) {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.style.cssText = `position:absolute; width:${size}px; height:${size}px; left:${x}px; top:${y}px; background:rgba(255,255,255,0.35); border-radius:9999px; transform:scale(0); animation:ripple 0.6s ease-out; pointer-events:none;`;
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    // call action
    action();
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={goBack}
            className="inline-flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-full mb-6 hover:bg-gray-700 transition-all"
          >
            ← Back to Destinations
          </button>

          <p className="text-center text-gray-600">Loading destination...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-[1400px] mx-auto">
        <button
          onClick={goBack}
          className="inline-flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-full mb-6 hover:bg-gray-700 transition-all"
        >
          ← Back to Destinations
        </button>

        <h1 className="text-center text-4xl md:text-5xl font-extrabold text-blue-600 tracking-wider uppercase mb-12">
          {`Itineraries for ${destination.name}`}
        </h1>

         <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {destination.itineraries?.map((c) => (
            <div
              key={c.id}
              className="group it-card bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              
            >
              <div className="relative">
                <div
                  className="w-full h-56 bg-center bg-cover"
                  style={{ backgroundImage: `url(${c.image})` }}
                  aria-hidden
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                {typeof c.days === 'number' && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800 shadow">
                    {c.days} Days
                  </div>
                )}
                {c.public && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-600 text-white shadow">
                    Public
                  </div>
                )}
              </div>

              <div className="p-5 h-72">
                <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">{c.title}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{c.subtitle}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/admin/destination/${slug}/destinations/${c.id}`); }}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-600 text-blue-600 px-3 py-2 text-sm font-medium hover:bg-blue-600 hover:text-white transition-colors"
                    title="View itinerary"
                  >
                    <Eye size={20} />
                  </button>

                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/admin/Create-Itinary`, { state: { destinationSlug: slug, itineraryId: c.id } }); }}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 text-white px-3 py-2 text-sm font-medium hover:bg-orange-700 transition-colors"
                    title="Edit itinerary"
                  >
                    <Pencil size={20} />
                  </button>

                  <button
                    onClick={(e) => { e.stopPropagation(); removeDestinationItinerary(slug, c.id); }}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 text-white px-3 py-2 text-sm font-medium hover:bg-red-700 transition-colors"
                    title="Delete itinerary"
                  >
                    <Trash2 size={20} />
                  </button>

                  <PublicToggleButton
                    c={c}
                    slug={slug}
                    // pass wrapper so button triggers state update even if context toggle missing
                    toggleDestinationItineraryPublic={toggleItineraryPublicWrapper}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ripple keyframes */}
      <style>{`
        @keyframes ripple { to { transform: scale(2); opacity: 0; } }
      `}</style>

      {/* Edit modal reuse */}
      <EditItineraryModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        itinerary={editingItinerary ? {
          id: editingItinerary.id,
          name: editingItinerary.title,
          subtitle: editingItinerary.subtitle,
          type: destination.type,
          images: editingItinerary.images && editingItinerary.images.length ? editingItinerary.images : (editingItinerary.image ? [editingItinerary.image] : []),
          price: editingItinerary.price,
          discount: editingItinerary.discount,
          days: editingItinerary.days,
          destinations: editingItinerary.destinations,
          inclusions: editingItinerary.inclusions,
          exclusions: editingItinerary.exclusions,
          terms: editingItinerary.terms,
          paymentPolicy: editingItinerary.paymentPolicy,
        } : null}
        onSave={(updated) => {
          const payload = {
            ...updated,
            title: updated.name,
            image: Array.isArray(updated.images) && updated.images.length ? updated.images[0] : editingItinerary?.image,
          };
          updateDestinationItinerary(slug, editingItinerary.id, payload);
        }}
      />
    </div>
  );
}
