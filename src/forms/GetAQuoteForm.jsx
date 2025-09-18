import React, { useState } from "react";
import Swal from "sweetalert2";

// Section heading with icon
const SectionHeading = ({ icon, title }) => (
  <div className="flex items-center gap-2 mb-3">
    <span className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
      {icon}
    </span>
    <h2 className="text-sm font-semibold text-blue-600">{title}</h2>
  </div>
);

const GetAQuoteForm = ({ agencyName, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    travelType: "",
    destination: "",
    expectedDate: "",
    days: "",
    adults: "",
    children: "",
    budget: "",
    services: [],
    requirements: "",
    source: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target || {};

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        services: checked
          ? [...prev.services, value]
          : prev.services.filter((s) => s !== value),
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation check
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.travelType ||
      !formData.adults ||
      !formData.expectedDate
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill all required fields before submitting.",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Form Submitted",
      text: "Your travel quote request has been sent successfully!",
    });

    console.log("Submitted Data:", formData);
    if (onSubmit) onSubmit(agencyName);

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      travelType: "",
      destination: "",
      expectedDate: "",
      days: "",
      adults: "",
      children: "",
      budget: "",
      services: [],
      requirements: "",
      source: "",
    });
  };

  return (
    <div className="bg-white flex items-start justify-start px-1 md:px-8 py-5">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-3">Get a Quote</h1>

        {/* Personal Information */}
        <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
          <SectionHeading
            title="Personal Information"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.121 17.804A9 9 0 1118.88 6.196 9 9 0 015.12 17.804z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full text-sm rounded-md bg-gray-100 px-3 py-2 placeholder-gray-400 focus:outline-none"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Email Address 
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full text-sm rounded-md bg-gray-100 px-3 py-2 placeholder-gray-400 focus:outline-none"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                className="w-full text-sm rounded-md bg-gray-100 px-3 py-2 placeholder-gray-400 focus:outline-none"
                placeholder="Enter phone number"
              />
            </div>
          </div>
        </div>

        {/* Travel Preferences */}
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <SectionHeading
            title="Travel Preferences"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10.5 6L3 9l7.5 3L21 9l-10.5-3zM3 9v6l7.5 3V9L3 6z"
                />
              </svg>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 ">
                Travel Type 
              </label>
              <select
                name="travelType"
                value={formData.travelType}
                onChange={handleChange}
                className="w-full text-sm rounded-md bg-gray-100 px-3  py-2 pr-10    focus:outline-none border-b border-gray-300 "
              >
                <option value="">Select travel type</option>
                <option value="Himalayan Treks">Himalayan Treks</option>
                <option value="Spiritual Journeys">Spiritual Journeys</option>
                <option value="Adventure Hub">Adventure Hub</option>
                <option value="Nature Explorers">Nature Explorers</option>
                <option value="Cultural Tours">Cultural Tours</option>
                <option value="Beach Getaways">Beach Getaways</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Preferred Destination
              </label>
              <input
                name="destination"
                type="text"
                value={formData.destination}
                onChange={handleChange}
                className="w-full text-sm rounded-md bg-gray-100 px-3 py-2 focus:outline-none border-b border-gray-300"
                placeholder="e.g., Nepal, Bali, Switzerland"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Expected Travel Date 
              </label>
              <input
                name="expectedDate"
                type="date"
                value={formData.expectedDate}
                onChange={handleChange}
                className="w-full text-sm rounded-md bg-gray-100 px-3 pr-6 py-2 focus:outline-none border-b border-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Number of Travelers */}
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <SectionHeading
            title="Number of Travelers"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M12 12a4 4 0 100-8 4 4 0 000 8z"
                />
              </svg>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                No. of Days
              </label>
              <select
                name="days"
                value={formData.days}
                onChange={handleChange}
                className="w-full text-sm rounded-md bg-gray-100 px-3 pr-6 py-2 focus:outline-none border-b border-gray-300"
              >
                <option value="">Select days</option>
                <option value="2D 1N">2D 1N</option>
                <option value="3D 2N">3D 2N</option>
                <option value="4D 3N">4D 3N</option>
                <option value="5D 4N">5D 4N</option>
                <option value="6D 5N">6D 5N</option>
                <option value="7D 6N">7D 6N</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Adults (18+) 
              </label>
              <input
                name="adults"
                type="number"
                value={formData.adults}
                onChange={handleChange}
                className="w-full text-sm rounded-md bg-gray-100 px-3 py-2 text-center focus:outline-none border-b border-gray-300"
                placeholder="0"
                min={1}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Children (2–17)
              </label>
              <input
                name="children"
                type="number"
                value={formData.children}
                onChange={handleChange}
                className="w-full text-sm rounded-md bg-gray-100 px-3 py-2 text-center focus:outline-none border-b border-gray-300"
                placeholder="0"
                min={0}
              />
            </div>
          </div>
        </div>

        {/* Budget & Services */}
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <SectionHeading
            title="Budget & Services"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 1.119-3 2.5S10.343 13 12 13s3 1.119 3 2.5S13.657 18 12 18"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v2M12 19v2"
                />
              </svg>
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1 md:col-span-3">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Budget Range (per person)
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full text-sm rounded-md bg-gray-100 px-3 pr-6 py-2 focus:outline-none border-b border-gray-300"
              >
                <option value="">Select budget range</option>
                <option value="100-500">$100 - $500</option>
                <option value="500-1000">$500 - $1000</option>
                <option value="1000-2000">$1000 - $2000</option>
                <option value="2000+">$2000+</option>
              </select>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <SectionHeading
            title="Additional Information"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 110-16 8 8 0 010 16z"
                />
              </svg>
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1 md:col-span-3">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Special Requirements or Notes
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows="3"
                className="w-full text-sm rounded-md bg-gray-100 px-3 py-2 placeholder-gray-400 focus:outline-none border-b border-gray-300"
                placeholder="Any special requests?"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                How did you hear about us?
              </label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full text-sm rounded-md bg-gray-100 px-3 pr-6 py-2 focus:outline-none border-b border-gray-300"
              >
                <option value="">Select</option>
                <option value="Google">Google</option>
                <option value="Social Media">Social Media</option>
                <option value="Friend">Friend</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-orange-500 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-orange-600 transition text-sm"
          >
            Request Quote
          </button>
        </div>
      </form>
    </div>
  );
};

export default GetAQuoteForm;
