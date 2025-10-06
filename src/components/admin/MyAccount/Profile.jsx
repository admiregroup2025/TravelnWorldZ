import { useState, useEffect, useCallback } from "react";
import { AlertCircle, Check, Camera, Plus, Minus } from "lucide-react";
import axios from "axios";
import userImage from "../../../assets/images/user.jpg";
import { country_and_states } from "./country-states";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const token = localStorage.getItem("accessToken");

const emptyAddress = {
  house: "",
  street: "",
  area: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};

// ✅ Reusable Input with Label & Error
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
    { key: "house", placeholder: "House / Flat Number" },
    { key: "street", placeholder: "Street / Locality" },
    { key: "area", placeholder: "Area / Colony" },
    { key: "city", placeholder: "City / Town" },
    { key: "state", type: "select" },
    { key: "zip", placeholder: "ZIP / Postal Code" },
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
                value={address.country}
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
                value={address.state}
                onChange={(e) => handleChange("state", e.target.value)}
                disabled={!address.country}
                className="w-full px-3 py-1.5 border rounded-lg text-sm"
              >
                <option value="">Select State</option>
                {address.country &&
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
              value={address[key]}
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

// ✅ Profile Component
const Profile = () => {
  const [formData, setFormData] = useState({
    company: "",
    first_name: "",
    last_name: "",
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

  // Fetch profile
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_API}/api/auth/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const result = await res.json();
        if (result?.user) setFormData((prev) => ({ ...prev, ...result.user }));
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    })();
  }, []);

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleAddressChange = (isBranch, idx, field, value) => {
    setFormData((prev) => {
      const addresses = [
        ...prev[isBranch ? "branchAddresses" : "companyAddress"],
      ];
      if (isBranch) addresses[idx][field] = value;
      else addresses[field] = value;
      return {
        ...prev,
        [isBranch ? "branchAddresses" : "companyAddress"]: addresses,
      };
    });
  };

  const handleFileChange = (e) =>
    handleChange("photo", e.target.files?.[0] || null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_API}/api/auth/profile`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubmitSuccess(true);
    } catch (err) {
      alert("Error saving profile");
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
          value={formData.first_name}
          onChange={(e) => handleChange("first_name", e.target.value)}
        />
        <InputField
          label="Last Name *"
          value={formData.last_name}
          onChange={(e) => handleChange("last_name", e.target.value)}
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
      {formData.secondaryEmails.map((email, idx) => (
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

      {formData.branchAddresses.map((branch, idx) => (
        <AddressField
          key={idx}
          address={branch}
          onChange={(field, value) =>
            handleAddressChange(true, idx, field, value)
          }
          onRemove={() =>
            setFormData((prev) => ({
              ...prev,
              branchAddresses: prev.branchAddresses.filter((_, i) => i !== idx),
            }))
          }
          label={`Branch Address ${idx + 1}`}
          errors={errors[`branch_${idx}`] || {}}
          isBranch
        />
      ))}

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
