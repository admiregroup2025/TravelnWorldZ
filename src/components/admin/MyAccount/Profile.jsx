import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { AlertCircle, Check, Camera, Plus, Minus } from "lucide-react";
import axios from "axios";
import userImage from "../../../assets/images/user.jpg";
import { country_and_states } from "./country-states";
import { useNavigate } from "react-router-dom";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

import { API_BASE } from "../../../utils/api";

const emptyAddress = {
  houseNo: "",
  street: "",
  area: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
};

const normalizeBranchAddresses = (addresses, fallback) => {
  if (Array.isArray(addresses) && addresses.length > 0) {
    return addresses;
  }
  if (addresses && typeof addresses === "object") {
    return [addresses];
  }
  return fallback;
};

//  Reusable Input with Label & Error
const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  error,
  ...rest
}) => (
  <div>
    <label className="block text-xs font-medium text-gray-700 mb-0.5">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-1.5 border rounded-lg text-sm"
      {...rest}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const AddressField = ({
  address,
  onChange,
  onRemove,
  label,
  errors,
  isBranch,
}) => {
  const handleChange = (field, value) => onChange(field, value);
  

  const fields = [
    { key: "houseNo", placeholder: "House / Flat Number" },
    { key: "street", placeholder: "Street / Locality" },
    { key: "area", placeholder: "Area / Colony" },
    { key: "city", placeholder: "City / Town" },
    { key: "state", type: "select" },
    { key: "postalCode", placeholder: "ZIP / Postal Code" },
    { key: "country", type: "select" },
  ];

  return (
    <div className="border border-gray-200 mb-4 p-2 rounded">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">{label}</span>
        {isBranch && (
          <button
            type="button"
            onClick={onRemove}
            className="p-1 border rounded-full"
          >
            <Minus size={16} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {fields.map(({ key, placeholder, type }) => {
          if (key === "country") {
            return (
              <select
                key={key}
                value={address?.country}
                onChange={(e) => {
                  handleChange("country", e.target.value);
                  handleChange("state", "");
                }}
                className="w-full px-3 py-1.5 border rounded-lg text-sm"
              >
                <option value="">Select Country</option>
                {Object.keys(country_and_states.country).map((c) => (
                  <option key={c} value={c}>
                    {country_and_states.country[c]}
                  </option>
                ))}
              </select>
            );
          }

          if (key === "state") {
            return (
              <select
                key={key}
                value={address?.state}
                onChange={(e) => handleChange("state", e.target.value)}
                disabled={!address?.country}
                className="w-full px-3 py-1.5 border rounded-lg text-sm"
              >
                <option value="">Select State</option>
                {address?.country &&
                  country_and_states.states[address.country]?.map((s) => (
                    <option key={s.code} value={s.name}>
                      {s.name}
                    </option>
                  ))}
              </select>
            );
          }

          return (
            <InputField
              key={key}
              value={address?.[key]}
              placeholder={placeholder}
              onChange={(e) => handleChange(key, e.target.value)}
              error={errors?.[key]}
            />
          );
        })}
      </div>
    </div>
  );
};

//  Profile Component
const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const redirectMessage = location.state?.message;

  const [formData, setFormData] = useState({
    company: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    photo: null,
    secondaryEmails: [],
    companyAddress: { ...emptyAddress },
    branchAddresses: [{ ...emptyAddress }],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  //  profile

useEffect(() => {
  const fetchProfile = async () => {
    // 1. Get the token from storage
    const token = localStorage.getItem("token");
    //console.log("Fetched token:", token);

    //  THE AUTH GUARD: Stop here if no token exists
    if (!token || token === "undefined") {
      alert("Session expired. Please login again.");
     navigate("/b2blogin");

      return; 
    }

    try {
      const apiBase = API_BASE;
      
      // 2. Only if token exists, make the API call
  
      const res = await axios.get(`${apiBase}/api/auth/profile`, {
        headers: { 
          Authorization: `Bearer ${token}` 
        },
      });

      if (res.data?.user) {
        setFormData(res.data.user);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        // Optional: Redirect to login if token is invalid/expired
        //localStorage.removeItem("token");
      }
    }
  };

  fetchProfile();
}, []);

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleAddressChange = (isBranch, idx, field, value) => {
    setFormData((prev) => {
      if (isBranch) {
        const addresses = prev.branchAddresses.map((address, index) =>
          index === idx ? { ...address, [field]: value } : address
        );
        return { ...prev, branchAddresses: addresses };
      }

      return {
        ...prev,
        companyAddress: { ...prev.companyAddress, [field]: value },
      };
    });
  };

  const handleFileChange = (e) =>
    handleChange("photo", e.target.files?.[0] || null);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const apiBase = API_BASE;
    

    const token = localStorage.getItem("token"); //  FIXED KEY

    const res = await axios.put(`${apiBase}/api/auth/profile`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setSubmitSuccess(true);
    localStorage.setItem("isProfileComplete", "true");
    if (res.data?.user) {
      localStorage.setItem("user", JSON.stringify(res.data.user));
    }

// Redirect to dashboard after completing profile
   // navigate("/admin/panel");


 

  } catch (err) {
    alert("Error saving profile");
    console.error(err);

  } finally {
    setIsSubmitting(false);
  }
};
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-full mx-auto p-6 space-y-4 rounded-lg border bg-white shadow-sm"
    >
      <h2 className="text-lg font-semibold">Profile Information</h2>

      {redirectMessage && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2 text-sm text-yellow-900">
          <AlertCircle size={16} /> {redirectMessage}
        </div>
      )}

      {submitSuccess && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-sm text-green-700">
          <Check size={16} /> Profile updated successfully
        </div>
      )}

      {/* Photo Upload */}
      <div className="flex items-center gap-4">
        <img
          src={
            formData.photo instanceof File
              ? URL.createObjectURL(formData.photo)
              : formData.photo || userImage
          }
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <label
          htmlFor="photo"
          className="cursor-pointer flex items-center gap-2 px-4 py-2 border rounded-md"
        >
          <Camera size={16} /> Change Photo
        </label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <InputField
          label="First Name *"
          value={formData.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
        />
        <InputField
          label="Last Name *"
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
        />
        <InputField
          label="Phone *"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
        <InputField
          label="Company *"
          value={formData.company}
          onChange={(e) => handleChange("company", e.target.value)}
        />
      </div>

      {/* Emails */}
      <InputField
        label="Registered Email"
        type="email"
        value={formData.email}
        disabled
      />
      {formData.secondaryEmails?.map((email, idx) => (

        <InputField
          key={idx}
          label={`Secondary Email ${idx + 1}`}
          type="email"
          value={email}
          onChange={(e) => {
            const updated = [...formData.secondaryEmails];
            updated[idx] = e.target.value;
            handleChange("secondaryEmails", updated);
          }}
        />
      ))}
      <button
        type="button"
        onClick={() =>
          handleChange("secondaryEmails", [...formData.secondaryEmails, ""])
        }
        className="text-blue-500 flex items-center gap-1"
      >
        <Plus size={16} /> Add Secondary Email
      </button>

      {/* Addresses */}
      <AddressField
        address={formData.companyAddress}
        onChange={(field, value) =>
          handleAddressChange(false, null, field, value)
        }
        label="Company Address *"
        errors={errors.companyAddress || {}}
      />



      <button
        type="button"
        onClick={() =>
          handleChange("branchAddresses", [
            ...formData.branchAddresses,
            { ...emptyAddress },
          ])
        }
        className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded"
      >
        <Plus size={16} /> Add Branch Address
      </button>

      {/* Submit */}
      <button
        type="submit"
        className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
};

export default Profile;
