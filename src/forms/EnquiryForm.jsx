import React, { useState } from "react";
import Swal from "sweetalert2";

const countryCodes = [
  { code: "+91", label: "IND" },
  { code: "+1", label: "USA" },
  { code: "+44", label: "UK" },
  { code: "+61", label: "AUS" },
  { code: "+81", label: "JPN" },
  { code: "+971", label: "UAE" },
  { code: "+49", label: "GER" },
  { code: "+33", label: "FRA" },
  { code: "+39", label: "ITA" },
  { code: "+86", label: "CHN" },
  { code: "+7", label: "RUS" },
  { code: "+82", label: "KOR" },
  { code: "+65", label: "SGP" },
  { code: "+60", label: "MYS" },
  { code: "+66", label: "THA" },
  { code: "+880", label: "BGD" },
  { code: "+92", label: "PAK" },
  { code: "+20", label: "EGY" },
  { code: "+27", label: "ZAF" },
  { code: "+234", label: "NGA" },
  { code: "+351", label: "PRT" },
  { code: "+34", label: "ESP" },
  { code: "+41", label: "CHE" },
  { code: "+46", label: "SWE" },
  { code: "+358", label: "FIN" },
  { code: "+47", label: "NOR" },
  { code: "+90", label: "TUR" },
  { code: "+55", label: "BRA" },
  { code: "+52", label: "MEX" },
  { code: "+62", label: "IDN" },
];

const EnquiryForm = ({ variant = "transparent" }) => {
  const [formData, setFormData] = useState({
    name: "",
    company_name: "",
    phone: "",
    countryCode: "+91",
    email: "",
    location: "",
    your_requirements: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 12); // allow only digits max 12
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    Swal.fire({
      icon: "success",
      title: "Submitted!",
      text: "Your request has been submitted.",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-lg shadow-md p-4 md:p-5 w-full max-w-md mx-auto ${
        variant === "transparent"
          ? "bg-gray-200/40 backdrop-blur-md text-white"
          : "bg-white text-gray-900"
      }`}
    >
      {/* Heading */}
      <h2
        className={`font-semibold text-base sm:text-lg mb-2 truncate ${
          variant === "transparent" ? "text-white" : "text-gray-900"
        }`}
      >
        Tell us what you're looking for!
      </h2>

      {/* Fields */}
      <div className="flex flex-col gap-2.5">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className={`w-full border rounded-md px-3 h-9 text-sm focus:outline-none focus:ring-1 ${
            variant === "transparent"
              ? "bg-transparent border-gray-300 text-white placeholder-gray-200 focus:ring-blue-300"
              : "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500"
          }`}
        />

        <input
          type="text"
          name="company_name"
          placeholder="Company Name"
          value={formData.company_name}
          onChange={handleChange}
          required
          className={`w-full border rounded-md px-3 h-9 text-sm focus:outline-none focus:ring-1 ${
            variant === "transparent"
              ? "bg-transparent border-gray-300 text-white placeholder-gray-200 focus:ring-blue-300"
              : "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500"
          }`}
        />

        {/* Phone + Country Code */}
        <div className="flex gap-2">
          <select
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            className={`w-20 border rounded-md h-9 text-sm px-2 focus:outline-none ${
              variant === "transparent"
                ? "bg-transparent text-white border-gray-300 focus:ring-blue-300"
                : "bg-white text-gray-800 border-gray-300 focus:ring-blue-500"
            }`}
          >
            {countryCodes.map((c) => (
              <option key={c.code} value={c.code} className="text-black">
                {c.code}
              </option>
            ))}
          </select>

<input
    type="tel"
    name="phone"
    placeholder="Mobile Number"
    value={formData.phone}
    onChange={handlePhoneChange}
    required
    inputMode="numeric"
    maxLength={12}
    className={`flex-1 max-w-[calc(100%-5.5rem)] border rounded-md px-3 h-9 text-sm focus:outline-none focus:ring-1 ${
      variant === "transparent"
        ? "bg-transparent border-gray-300 text-white placeholder-gray-200 focus:ring-blue-300"
        : "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500"
    }`}
  />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className={`w-full border rounded-md px-3 h-9 text-sm focus:outline-none focus:ring-1 ${
            variant === "transparent"
              ? "bg-transparent border-gray-300 text-white placeholder-gray-200 focus:ring-blue-300"
              : "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500"
          }`}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className={`w-full border rounded-md px-3 h-9 text-sm focus:outline-none focus:ring-1 ${
            variant === "transparent"
              ? "bg-transparent border-gray-300 text-white placeholder-gray-200 focus:ring-blue-300"
              : "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500"
          }`}
        />

        <textarea
          name="your_requirements"
          placeholder="Your Requirements"
          value={formData.your_requirements}
          onChange={handleChange}
          rows={2}
          className={`w-full border rounded-md px-3 py-1.5 text-sm resize-none focus:outline-none focus:ring-1 ${
            variant === "transparent"
              ? "bg-transparent border-gray-300 text-white placeholder-gray-200 focus:ring-blue-300"
              : "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500"
          }`}
        />

        <label
          className={`flex items-center text-xs gap-2 ${
            variant === "transparent" ? "text-gray-200" : "text-gray-700"
          }`}
        >
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            className="w-4 h-4"
            required
          />
          <span>I agree to get all Email/SMS from you.</span>
        </label>

        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-md py-1.5 text-sm font-medium mt-1"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default EnquiryForm;


