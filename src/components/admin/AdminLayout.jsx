// import { Outlet } from "react-router-dom";
// import AdminHeader from "./AdminHeader.jsx";
// import LeftSidebar from "./LeftSidebar";
// import RightSidebar from "./RightSidebar";
// // imported JSON data (initial seed)
// import initialDestinations from "../admin/MyItineraries/data.json";
// import { useState, useMemo } from "react";



// export default function AdminLayout() {
//   // local state holds the live list of itineraries
//   const [itineraries, setItineraries] = useState(initialDestinations);

//   // filters state (you already had this)
//   const [filters, setFilters] = useState([]);

//   const handelChange = (filterType) => {
//     setFilters((prev) =>
//       prev.includes(filterType)
//         ? prev.filter((f) => f !== filterType) // remove if already selected
//         : [...prev, filterType] // add if not selected
//     );
//   };

//   // compute filtered list (memoized)
//   const filteredItineraries = useMemo(() => {
//     if (filters.length === 0) return itineraries;
//     return itineraries.filter((d) => filters.includes(d.type));
//   }, [itineraries, filters]);

//   // add a new itinerary (call this from ItineraryForm via Outlet context)
//   const addItinerary = (newItinerary) => {
//     // ensure id exists and slug exists (you can enhance this)
//     const item = {
//       ...newItinerary,
//       id: newItinerary.id ?? Date.now().toString(),
//       slug:
//         newItinerary.slug ??
//         (newItinerary.name ? newItinerary.name.toLowerCase().replace(/\s+/g, "-") : Date.now().toString()),
//     };

//     setItineraries((prev) => [item, ...prev]);

//     // TODO: persist to backend (POST) and replace with server response id/url if needed
//   };

//   // add a nested itinerary to an existing destination by slug
//   const addDestinationItinerary = (destinationSlug, newItinerary) => {
//     setItineraries((prev) =>
//       prev.map((dest) => {
//         if (dest.slug !== destinationSlug) return dest;
//         const newItem = {
//           ...newItinerary,
//           id: newItinerary.id ?? Date.now().toString(),
//         };
//         const next = Array.isArray(dest.itineraries) ? [...dest.itineraries, newItem] : [newItem];
//         return { ...dest, itineraries: next };
//       })
//     );
//   };

//   // upsert destination and push itinerary; returns the resolved slug
//   const upsertDestinationAndAddItinerary = ({ name, type, slug: preferredSlug, images = [] }, itinerary) => {
//     const generatedSlug = (preferredSlug || name || "").toLowerCase().replace(/\s+/g, "-");
//     setItineraries((prev) => {
//       const exists = prev.find((d) => d.slug === generatedSlug);
//       if (exists) {
//         const nextItins = Array.isArray(exists.itineraries) ? [...exists.itineraries] : [];
//         nextItins.push({ ...itinerary, id: itinerary.id ?? Date.now().toString() });
//         return prev.map((d) => (d.slug === generatedSlug ? { ...d, itineraries: nextItins } : d));
//       }
//       const newDest = {
//         id: Date.now().toString(),
//         name,
//         slug: generatedSlug,
//         images,
//         type,
//         itineraries: [{ ...itinerary, id: itinerary.id ?? Date.now().toString() }],
//       };
//       return [newDest, ...prev];
//     });
//     return generatedSlug;
//   };

//   // update existing itinerary by id (call this from ItineraryDetail on save)
//   const updateItinerary = (updatedItinerary) => {
//     setItineraries((prev) =>
//       prev.map((it) => (it.id === updatedItinerary.id ? { ...it, ...updatedItinerary } : it))
//     );

//     // TODO: persist to backend (PUT/PATCH) and handle errors
//   };

//   // optional: remove itinerary
//   const removeItinerary = (id) => {
//     setItineraries((prev) => prev.filter((it) => it.id !== id));
//     // TODO: call DELETE on backend
//   };

//   // update a nested itinerary within a destination by destination slug and itinerary id
//   const updateDestinationItinerary = (destinationSlug, itineraryId, updated) => {
//     setItineraries((prev) =>
//       prev.map((dest) => {
//         if (dest.slug !== destinationSlug) return dest;
//         const nextItins = (dest.itineraries || []).map((it) =>
//           it.id === itineraryId ? { ...it, ...updated } : it
//         );
//         return { ...dest, itineraries: nextItins };
//       })
//     );
//   };

//   // remove a nested itinerary from a destination
//   const removeDestinationItinerary = (destinationSlug, itineraryId) => {
//     setItineraries((prev) =>
//       prev.map((dest) => {
//         if (dest.slug !== destinationSlug) return dest;
//         const nextItins = (dest.itineraries || []).filter((it) => it.id !== itineraryId);
//         return { ...dest, itineraries: nextItins };
//       })
//     );
//   };

//   // toggle public flag for a nested itinerary
//   const toggleDestinationItineraryPublic = (destinationSlug, itineraryId, makePublic) => {
//     setItineraries((prev) =>
//       prev.map((dest) => {
//         if (dest.slug !== destinationSlug) return dest;
//         const nextItins = (dest.itineraries || []).map((it) =>
//           it.id === itineraryId ? { ...it, public: makePublic ?? !it.public } : it
//         );
//         return { ...dest, itineraries: nextItins };
//       })
//     );
//   };

//   // debug logging (optional)
//   // console.log(filteredItineraries, "Filtered Itineraries");

//   const [showLeft, setShowLeft] = useState(false);
//   const [showRight, setShowRight] = useState(false);

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Header */}
//       <AdminHeader onOpenLeft={() => setShowLeft(true)} onOpenRight={() => setShowRight(true)} />

//       <div className="flex flex-1">
//         {/* Left Sidebar */}
//         <aside className="hidden md:block w-64 fixed h-[calc(100vh-64px)] top-16 left-0 bg-indigo-900 text-white overflow-auto">
//           <LeftSidebar />
//         </aside>
//         {/* Mobile Left Drawer */}
//         {showLeft && (
//           <div className="md:hidden fixed inset-0 z-40">
//             <div className="absolute inset-0 bg-black/40" onClick={() => setShowLeft(false)} />
//             <div className="absolute top-16 bottom-0 left-0 w-72 bg-indigo-900 text-white overflow-auto shadow-xl">
//               <div className="p-2 flex justify-end">
//                 <button className="px-2 py-1 rounded bg-white/10 flex items-center gap-1" onClick={() => setShowLeft(false)}>
//                   <span className="sr-only">Close</span>
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
//                 </button>
//               </div>
//               <LeftSidebar />
//             </div>
//           </div>
//         )}

//         {/* Main Content */}
//         <main className="flex-1 md:ml-64 md:mr-72 pt-20 p-4 bg-gray-50 min-h-screen overflow-auto">
//           {/* provide filtered items and helper functions to nested routes */}
//           <Outlet
//             context={{
//               destinations: filteredItineraries,
//               rawDestinations: itineraries, // if a child needs full unfiltered list
//               addItinerary,
//               updateItinerary,
//               removeItinerary,
//               addDestinationItinerary,
//               upsertDestinationAndAddItinerary,
//               updateDestinationItinerary,
//               removeDestinationItinerary,
//               toggleDestinationItineraryPublic,
//             }}
//           />
//         </main>

//         {/* Right Sidebar */}
//         <aside className="hidden lg:block w-72 fixed h-[calc(100vh-64px)] top-16 right-0 bg-gray-100 border-l overflow-auto">
//           <RightSidebar filters={filters} filterChange={handelChange} />
//         </aside>
//         {/* Mobile Right Drawer */}
//         {showRight && (
//           <div className="lg:hidden fixed inset-0 z-40">
//             <div className="absolute inset-0 bg-black/40" onClick={() => setShowRight(false)} />
//             <div className="absolute top-16 bottom-0 right-0 w-80 max-w-[90vw] bg-white overflow-auto shadow-xl">
//               <div className="p-2 flex justify-end border-b">
//                 <button className="px-2 py-1 rounded bg-gray-100" onClick={() => setShowRight(false)}>
//                   <span className="sr-only">Close</span>
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
//                 </button>
//               </div>
//               <RightSidebar />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }








import { Outlet, useLocation } from "react-router-dom";
import AdminHeader from "./AdminHeader.jsx";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
// imported JSON data (initial seed)
import initialDestinations from "../admin/MyItineraries/data.json";
import { useState, useMemo } from "react";

export default function AdminLayout() {
  // local state holds the live list of itineraries
  const [itineraries, setItineraries] = useState(initialDestinations);

  // filters state (you already had this)
  const [filters, setFilters] = useState([]);

  const handelChange = (filterType) => {
    setFilters((prev) =>
      prev.includes(filterType)
        ? prev.filter((f) => f !== filterType) // remove if already selected
        : [...prev, filterType] // add if not selected
    );
  };

  // compute filtered list (memoized)
  const filteredItineraries = useMemo(() => {
    if (filters.length === 0) return itineraries;
    return itineraries.filter((d) => filters.includes(d.type));
  }, [itineraries, filters]);

  // add a new itinerary (call this from ItineraryForm via Outlet context)
  const addItinerary = (newItinerary) => {
    // ensure id exists and slug exists (you can enhance this)
    const item = {
      ...newItinerary,
      id: newItinerary.id ?? Date.now().toString(),
      slug:
        newItinerary.slug ??
        (newItinerary.name ? newItinerary.name.toLowerCase().replace(/\s+/g, "-") : Date.now().toString()),
    };

    setItineraries((prev) => [item, ...prev]);

    // TODO: persist to backend (POST) and replace with server response id/url if needed
  };

  // update existing itinerary by id (call this from ItineraryDetail on save)
  const updateItinerary = (updatedItinerary) => {
    setItineraries((prev) =>
      prev.map((it) => (it.id === updatedItinerary.id ? { ...it, ...updatedItinerary } : it))
    );

    // TODO: persist to backend (PUT/PATCH) and handle errors
  };

  // optional: remove itinerary
  const removeItinerary = (id) => {
    setItineraries((prev) => prev.filter((it) => it.id !== id));
    // TODO: call DELETE on backend
  };

  // debug logging (optional)
  // console.log(filteredItineraries, "Filtered Itineraries");

  const location = useLocation();
  const showRightSidebar = location.pathname.includes("/admin/Manage-Itianary");
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const mainClass = showRightSidebar
    ? "flex-1 md:ml-64 lg:mr-72 pt-24 p-4 bg-gray-50 min-h-screen overflow-auto"
    : "flex-1 md:ml-64 pt-24 p-4 bg-gray-50 min-h-screen overflow-auto";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <AdminHeader onOpenLeft={() => setShowLeft(true)} onOpenRight={() => setShowRight(true)} />

      <div className="flex flex-1">
        {/* Left Sidebar (fixed) */}
        <aside className="hidden md:block w-64 fixed h-[91vh] left-0 bottom-0 bg-indigo-900 text-white overflow-auto">
          <LeftSidebar />
        </aside>
        {/* Mobile Left Drawer */}
        {showLeft && (
          <div className="md:hidden fixed inset-0 z-40">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowLeft(false)} />
            <div className="absolute top-16 bottom-0 left-0 w-72 max-w-[85vw] bg-indigo-900 text-white overflow-auto shadow-xl">
              <div className="p-2 flex justify-end">
                <button className="px-2 py-1 rounded bg-white/10" onClick={() => setShowLeft(false)}>Close</button>
              </div>
              <LeftSidebar />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className={mainClass}>
          {/* provide filtered items and helper functions to nested routes */}
          <Outlet
            context={{
              destinations: filteredItineraries,
              rawDestinations: itineraries, // if a child needs full unfiltered list
              addItinerary,
              updateItinerary,
              removeItinerary,
            }}
          />
        </main>

         {/* Right Sidebar only on MyItineraries */}
         {showRightSidebar && (
           <>
             <aside className="hidden lg:block w-72 fixed h-[91vh] right-0 bottom-0 bg-gray-100 border-l overflow-auto">
               <RightSidebar />
             </aside>
             {showRight && (
               <div className="lg:hidden fixed inset-0 z-40">
                 <div className="absolute inset-0 bg-black/40" onClick={() => setShowRight(false)} />
                 <div className="absolute top-16 bottom-0 right-0 w-80 max-w-[90vw] bg-white overflow-auto shadow-xl">
                   <div className="p-2 flex justify-end border-b">
                     <button className="px-2 py-1 rounded bg-gray-100" onClick={() => setShowRight(false)}>Close</button>
                   </div>
                   <RightSidebar />
                 </div>
               </div>
             )}
           </>
         )}
      </div>
    </div>
  );
}
