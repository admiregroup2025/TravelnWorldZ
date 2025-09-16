import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import backgroundImage from "../assets/images/planmytrip.jpg";

// Dropdown options
const cityOptions = [
  "New Delhi", "Mumbai", "Bengaluru", "Chennai", "Kolkata",
  "Pune", "Hyderabad", "Ahmedabad", "Jaipur", "Goa",
];

const destinationTypeOptions = ["Domestic", "International"];

const destinationOptions = [
  "Kashmir", "Kerala", "Himachal Pradesh", "Goa",
  "Andaman Islands", "Dubai", "Thailand", "Singapore",
];

const budgetOptions = [
  { value: "below5000", label: "Under ₹5,000" },
  { value: "below10000", label: "Under ₹10,000" },
  { value: "below15000", label: "Under ₹15,000" },
  { value: "below20000", label: "Under ₹20,000" },
  { value: "below45000", label: "Under ₹45,000" },
  { value: "above50000", label: "Above ₹50,000" },
];

const daysOptions = [
  "1N/2D", "2N/3D", "3N/4D", "4N/5D", "5N/6D", "6N/7D", "7N/8D", "10N/11D",
];

const purposeOptions = [
  "Family Vacation", "Backpacking", "Honeymoon Trip", "Adventure Trip",
  "Pilgrimage", "Educational Tour", "Corporate Travel", "MICE Travel",
];

const PlanMyTripForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_no: "",
    expectedTravelDate: "",
    destinationType: "",
    departureCity: "",
    destination: "",
    days: "",
    adults: "",
    kids: "",
    budget: "",
    purpose: "",
    consultation: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{7,15}$/.test(phone);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required.";
        break;
      case "email":
        if (!validateEmail(value.trim())) error = "Invalid email format.";
        break;
      case "phone_no":
        if (!value.trim()) {
          error = "Phone number is required.";
        } else if (!validatePhone(value)) {
          error = "Phone number must be 7 to 15 digits.";
        }
        break;
      case "expectedTravelDate":
        if (!value) error = "Expected travel date is required.";
        break;
      case "destinationType":
        if (!value) error = "Travel Type is required.";
        break;
      case "departureCity":
        if (!value) error = "Departure city is required.";
        break;
      case "destination":
        if (!value) error = "Destination is required.";
        break;
      case "days":
        if (!value) error = "Number of days is required.";
        break;
      case "adults":
        if (value === "") {
          error = "Number of adults is required.";
        } else if (isNaN(value) || Number(value) < 0) {
          error = "Adults must be a non-negative number.";
        }
        break;
      case "kids":
        if (value === "") {
          error = "Number of kids is required.";
        } else if (isNaN(value) || Number(value) < 0) {
          error = "Kids must be a non-negative number.";
        }
        break;
      case "budget":
        if (!value) error = "Budget Range is required.";
        break;
      case "purpose":
        if (!value) error = "Trip Purpose is required.";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === "checkbox" ? checked : value;

    if (name === "phone_no") {
      newValue = value.replace(/\D/g, "");
      if (newValue.length > 15) return;
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    validateField(name, newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    Object.entries(formData).forEach(([key, value]) => {
      validateField(key, value);
    });

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!validateEmail(formData.email.trim()))
      newErrors.email = "Invalid email format.";
    if (!formData.phone_no.trim()) {
      newErrors.phone_no = "Phone number is required.";
    } else if (!validatePhone(formData.phone_no.trim())) {
      newErrors.phone_no = "Phone number must be 7 to 15 digits.";
    }
    if (!formData.days) newErrors.days = "Number of days is required.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      const submissionData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone_no: formData.phone_no.trim(),
        expectedTravelDate: formData.expectedTravelDate,
        destinationType: formData.destinationType,
        departureCity: formData.departureCity,
        destination: formData.destination,
        NumberodDays: formData.days,
        adults: parseInt(formData.adults) || 0,
        kids: parseInt(formData.kids) || 0,
        budget: formData.budget,
        purpose: formData.purpose,
        consultation: formData.consultation,
      };

      const response = await axios.post(
        "https://api.admireholidays.com/api/v1/planYourTrip",
        submissionData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Submitted!",
          text: "TravelnWorld will contact you soon.",
          timer: 1800,
          showConfirmButton: false,
        }).then(() => onClose());
      } else {
        throw new Error(response.data.message || "Submission failed.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "There was an error submitting your form";

      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-2"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="relative w-full max-w-[500px] rounded-lg shadow-lg"
        style={{
          maxHeight: "85vh",
          overflowY: "auto",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white/60 backdrop-blur-md p-4 rounded-lg relative">
          <button
            onClick={onClose}
            type="button"
            className="absolute top-4 right-4 text-black hover:text-red-600 text-2xl"
            aria-label="Close form"
          >
            &times;
          </button>

          <h2 className="text-2xl font-bold text-center mb-4 text-black">
            Plan My Trip
          </h2>

          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InputField label="Name*" name="name" value={formData.name} onChange={handleChange} error={errors.name} placeholder="Enter full name" />
            <InputField label="Email*" name="email" value={formData.email} onChange={handleChange} error={errors.email} placeholder="Enter full name" />
            <InputField label="Phone*" name="phone_no" value={formData.phone_no} onChange={handleChange} error={errors.phone_no} placeholder="Enter phone number" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <InputField type="date" label="Expected Travel Date*" name="expectedTravelDate" value={formData.expectedTravelDate} onChange={handleChange} error={errors.expectedTravelDate} />
            <SelectField label="Travel Type*" name="destinationType" options={destinationTypeOptions} value={formData.destinationType} onChange={handleChange} error={errors.destinationType} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <SelectField label="Departure City*" name="departureCity" options={cityOptions} value={formData.departureCity} onChange={handleChange} error={errors.departureCity} />
            <SelectField label="Destination*" name="destination" options={destinationOptions} value={formData.destination} onChange={handleChange} error={errors.destination} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
            <SelectField label="Number of Days*" name="days" options={daysOptions} value={formData.days} onChange={handleChange} error={errors.days} />
            <InputField label="Adults*" name="adults" type="number" min="0" value={formData.adults} onChange={handleChange} error={errors.adults}  placeholder="Eg: 1" />
            <InputField label="Kids*" name="kids" type="number" min="0" value={formData.kids} onChange={handleChange} error={errors.kids} placeholder="Eg: 1" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <SelectField label="Budget Range*" name="budget" options={budgetOptions} value={formData.budget} onChange={handleChange} error={errors.budget} />
            <SelectField label="Trip Purpose*" name="purpose" options={purposeOptions} value={formData.purpose} onChange={handleChange} error={errors.purpose} />
          </div>

          <div className="mt-4">
            <label className="block mb-2 font-medium text-[12px] text-black">Need Free Consultation?</label>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input type="radio" name="consultation" value="yes" checked={formData.consultation === true} onChange={() => setFormData((prev) => ({ ...prev, consultation: true }))} />
                <span className="ml-2 text-gray-700">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="consultation" value="no" checked={formData.consultation === false} onChange={() => setFormData((prev) => ({ ...prev, consultation: false }))} />
                <span className="ml-2 text-gray-700">No</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg font-semibold text-white mt-6 transition-colors duration-300 ${isSubmitting ? "bg-orange-600 opacity-70" : "bg-orange-600 hover:bg-orange-700"}`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

// Input Field Component
const InputField = ({ label, name, value, onChange, type = "text", placeholder = "", maxLength, min, error }) => (
  <div className="mb-1">
    <label className="block text-[14px] text-black mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      min={min}
      className={`w-full border rounded px-4 py-2 text-sm text-gray-800 focus:outline-none shadow-sm ${error ? "border-red-500" : "focus:ring-orange-600"}`}
    />
    {error && <span className="text-red-600 text-xs">{error}</span>}
  </div>
);

// Select Field Component
const SelectField = ({ label, name, value, onChange, options, error }) => (
  <div className="mb-1">
    <label className="block text-[14px] text-black mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full border rounded px-4 py-2 text-sm text-gray-800 focus:outline-none shadow-sm ${error ? "border-red-500" : "focus:ring-orange-600"}`}
    >
      <option value="">Select {label.toLowerCase()}</option>
      {options.map((opt, i) =>
        typeof opt === "object" ? (
          <option key={i} value={opt.value}>{opt.label}</option>
        ) : (
          <option key={i} value={opt}>{opt}</option>
        )
      )}
    </select>
    {error && <span className="text-red-600 text-xs">{error}</span>}
  </div>
);

export default PlanMyTripForm;
