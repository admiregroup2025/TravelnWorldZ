import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import transportData from "../../data/transportData";
import Header from "../../components/verifiedTransportDetails/Header";
import RightSide from "../../components/verifiedTransportDetails/RightSide";
import TourPackages from "../../assets/images/tourPackage.jpeg";

const CustomerTourPackages = () => {
    const navigate =useNavigate ();
    const { id } = useParams();
    const travelItem = transportData.find((item) => item.id === parseInt(id));

  if (!travelItem) return <div className="p-4">Travel details not found.</div>;

  return (
    <div className="w-full px-4 py-6 bg-white min-h-screen font-sans">
      {/* Header */}
      <Header travelItem={travelItem} />

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* LEFT SIDE: Packages */}
        <div className="w-full lg:w-[80%] flex flex-col gap-6 border rounded-md p-5 shadow-sm bg-white">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-blue-700">
                    All Tour Packages by {travelItem.title}
                </h2>
                <button
                    onClick={() => navigate(`/verified-transport-details/${id}`)}
                    className="text-sm text-blue-600 underline hover:text-blue-800"
                >
                    ← Back to Details
                </button>
            </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {travelItem.tourPackages.map((pkg, i) => (
              <div key={i} className="border rounded-md p-4 shadow-sm">
                <div className="h-1/2 w-full">
                  <img
                    src={TourPackages}
                    alt={`Package for ${pkg.destination}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-base mb-1">Packages For {pkg.destination}</h3>
                <p className="text-gray-600 text-sm mb-2">{pkg.description}</p>
                <p className="font-semibold text-sm mb-2">{pkg.price} onwards</p>
                <div className="flex flex-col gap-1">
                  <button className="text-blue-600 text-sm font-medium underline w-fit">View Details</button>
                  <button className="border border-blue-600 text-blue-600 text-sm font-semibold py-1 rounded hover:bg-blue-50 w-full">
                    Enquire Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-[20%] flex flex-col gap-6">
          <RightSide travelItem={travelItem} />
        </div>
      </div>
    </div>
  );
};

export default CustomerTourPackages;
