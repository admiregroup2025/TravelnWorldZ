import { useState, useCallback, useEffect } from "react";
import { AlertCircle, Check, Camera, Plus, Minus } from "lucide-react";
import { country_and_states } from "./country-states";
import axios from "axios";
import userImage from "../../../assets/images/user.jpg";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const token =
 localStorage.getItem("accessToken")

const AddressField = ({ address, onChange, onRemove, label, errors, isBranch }) => {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  return (
    <div className="border border-gray-200 mb-4 p-2">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-xs font-medium text-gray-700">{label}</label>
        {isBranch && (
          <button
            type="button"
            onClick={onRemove}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-50"
            aria-label="Remove Address"
          >
            <Minus className="w-4 h-4 text-gray-600" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { key: "house", placeholder: "House / Apartment / Flat Number" },
          { key: "street", placeholder: "Street / Road / Locality" },
          { key: "area", placeholder: "Area / Colony / Neighborhood" },
          { key: "city", placeholder: "City / Town" },
          { key: "state", placeholder: "State / Province / Region" },
          { key: "zip", placeholder: "ZIP / Postal Code" },
          { key: "country", placeholder: "Country" }
        ].map(({ key, placeholder }) => (
          <div key={key}>
            {key === "country" ? (
              <select
                value={address.country}
                onChange={(e) => {
                  handleChange("country", e.target.value);
                  handleChange("state", ""); // reset state when country changes
                }}
                className="w-full px-3 py-1.5 border rounded-lg text-sm"
              >
                <option value="">Select Country</option>
                {Object.keys(country_and_states.country).map((code) => (
                  <option key={code} value={code}>
                    {country_and_states.country[code]}
                  </option>
                ))}
              </select>
            ) : key === "state" ? (
              <select
                value={address.state}
                onChange={(e) => handleChange("state", e.target.value)}
                className="w-full px-3 py-1.5 border rounded-lg text-sm"
                disabled={!address.country} // disable until country is selected
              >
                <option value="">Select State</option>
                {address.country &&
                  country_and_states.states[address.country]?.map((state) => (
                    <option key={state.code} value={state.name}>
                      {state.name}
                    </option>
                  ))}
              </select>
            ) : (
              <input
                type="text"
                placeholder={placeholder}
                value={address[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full px-3 py-1.5 border rounded-lg text-sm"
              />
            )}
            {errors?.[key] && (
              <p className="text-red-500 text-xs mt-1" role="alert">
                {errors[key]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Profile = () => {
  const [formData, setFormData] = useState({
    company: "",
    first_name: "",
    last_name: "",
    email: "", // disabled field
    phone: "",
    photo: null,
    secondaryEmails: [],
    companyAddress: {
      house: "",
      street: "",
      area: "",
      city: "",
      state: "",
      zip: "",
      country: ""
    },
    branchAddresses: [
      {
        house: "",
        street: "",
        area: "",
        city: "",
        state: "",
        zip: "",
        country: ""
      }
    ]
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

 useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/auth/profile`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include", // same as axios withCredentials: true
        }
      );
      console.log("res",res);

      // if (!res.ok) {
      //   throw new Error(`HTTP error! status: ${res.status}`);
      // }

      const result = await res.json();
      const data = result?.user;
      console.log(result);

      if (data) {
        setFormData((prev) => ({
          ...prev,
          company: data.company || "",
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          phone: data.phone || "",
          photo: data.photo || null,
          secondaryEmails: data.secondaryEmails || [],
          companyAddress: {
            house: data.companyAddress?.house || "",
            street: data.companyAddress?.street || "",
            area: data.companyAddress?.area || "",
            city: data.companyAddress?.city || "",
            state: data.companyAddress?.state || "",
            zip: data.companyAddress?.zip || "",
            country: data.companyAddress?.country || "",
          },
          branchAddresses:
            data.branchAddresses?.length > 0
              ? data.branchAddresses.map((b) => ({
                  house: b.house || "",
                  street: b.street || "",
                  area: b.area || "",
                  city: b.city || "",
                  state: b.state || "",
                  zip: b.zip || "",
                  country: b.country || "",
                }))
              : [
                  {
                    house: "",
                    street: "",
                    area: "",
                    city: "",
                    state: "",
                    zip: "",
                    country: "",
                  },
                ],
        }));
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  };

  fetchProfile();
}, []);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    } else if (formData.company.length < 2) {
      newErrors.company = "Company name must be at least 2 characters";
    }

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    } else if (formData.first_name.length < 2) {
      newErrors.first_name = "First name must be at least 2 characters";
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate all secondary emails if any are present
    formData.secondaryEmails.forEach((secEmail, i) => {
      if (!secEmail.trim()) {
        newErrors[`secondaryEmails_${i}`] = "Secondary email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(secEmail)) {
        newErrors[`secondaryEmails_${i}`] = "Please enter a valid email address";
      }
    });

    // Validate company address
    const companyErrors = {};
    if (!formData.companyAddress.house.trim()) companyErrors.house = "House Number is required";
    if (!formData.companyAddress.street.trim()) companyErrors.street = "Street is required";
    if (!formData.companyAddress.area.trim()) companyErrors.area = "Area is required";
    if (!formData.companyAddress.city.trim()) companyErrors.city = "City is required";
    if (!formData.companyAddress.zip.trim()) companyErrors.zip = "ZIP code is required";
    if (!formData.companyAddress.state.trim()) companyErrors.state = "State is required";
    if (!formData.companyAddress.country.trim()) companyErrors.country = "Country is required";
    if (Object.keys(companyErrors).length > 0) newErrors.companyAddress = companyErrors;

    // Validate branch addresses
    formData.branchAddresses.forEach((branch, idx) => {
      const branchErrors = {};
      if (!branch.house.trim()) branchErrors.house = "House Number is required";
      if (!branch.street.trim()) branchErrors.street = "Street  is required";
      if (!branch.area.trim()) branchErrors.area = "Area is required";
      if (!branch.city.trim()) branchErrors.city = "City is required";
      if (!branch.zip.trim()) branchErrors.zip = "ZIP code is required";
      if (!branch.state.trim()) branchErrors.state = "State is required";
      if (!branch.country.trim()) branchErrors.country = "Country is required";

      if (Object.keys(branchErrors).length > 0) newErrors[`branch_${idx}`] = branchErrors;
    });

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s\-()]{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (formData.photo) {
      if (formData.photo.size > MAX_FILE_SIZE) {
        newErrors.photo = "File size must be less than 2 MB";
      } else if (!formData.photo.type.startsWith("image/")) {
        newErrors.photo = "Only image files are allowed";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleAddBranch = () => {
    setFormData((prev) => ({
      ...prev,
      branchAddresses: [
        ...prev.branchAddresses,
        { house: "", street: "", area: "", city: "", state: "", zip: "", country: "" }
      ]
    }));
  };

  const handleRemoveBranch = (index) => {
    setFormData((prev) => {
      const updated = [...prev.branchAddresses];
      updated.splice(index, 1);
      return { ...prev, branchAddresses: updated };
    });
  };

  const handleBranchChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.branchAddresses];
      updated[index][field] = value;
      return { ...prev, branchAddresses: updated };
    });
    const key = `branch_${index}_${field}`;
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleInputChange = useCallback(
    (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    },
    [errors]
  );

  const handleCompanyAddressChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      companyAddress: {
        ...prev.companyAddress,
        [field]: value
      }
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    handleInputChange("photo", file);
  };

  const handleAddEmail = () => {
    setFormData((prev) => ({
      ...prev,
      secondaryEmails: [...prev.secondaryEmails, ""]
    }));
  };

  const handleRemoveEmail = (index) => {
    setFormData((prev) => {
      const updated = [...prev.secondaryEmails];
      updated.splice(index, 1);
      return { ...prev, secondaryEmails: updated };
    });
  };

  const handleSecondaryEmailChange = (index, value) => {
    setFormData((prev) => {
      const updated = [...prev.secondaryEmails];
      updated[index] = value;
      return { ...prev, secondaryEmails: updated };
    });

    // Remove individual error if present
    const key = `secondaryEmails_${index}`;
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND_API}/api/auth/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        withCredentials: true // send cookies if required
      });
      setSubmitSuccess(true);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error saving profile:", err);
      if (err.response) {
        alert(`Failed to save profile: ${err.response.data.message || err.response.statusText}`);
      } else if (err.request) {
        alert("No response from server. Please try again later.");
      } else {
        alert(`Error: ${err.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-full mx-auto p-6 space-y-4 rounded-lg border border-gray-200 bg-white shadow-sm"
      noValidate
    >
      <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>

      {submitSuccess && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-sm text-green-700">
          <Check className="w-4 h-4" />
          Profile updated successfully
        </div>
      )}

      {/* Photo upload */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-lg font-medium text-gray-600">
          <img
            src={
              formData.photo instanceof File ? URL.createObjectURL(formData.photo) : formData.photo || userImage
            }
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>

        <div>
          <label
            htmlFor="photo"
            className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium bg-white hover:bg-gray-50"
          >
            <Camera className="w-4 h-4" />
            Change Photo
          </label>
          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/png, image/jpeg, image/gif"
            className="hidden"
            onChange={handleFileChange}
          />
          {errors.photo && (
            <p className="text-red-500 text-xs mt-1" role="alert">
              {errors.photo}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">JPG, GIF or PNG. Max size 2MB.</p>
        </div>
      </div>

      {/* Other fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* First Name */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-0.5">First Name *</label>
          <input
            type="text"
            value={formData.first_name}
            onChange={(e) => handleInputChange("first_name", e.target.value)}
            placeholder="John"
            disabled={isSubmitting}
            className="w-full px-3 py-1.5 border rounded-lg text-sm"
          />
          {errors.first_name && (
            <p className="text-red-500 text-xs mt-1" role="alert">
              {errors.first_name}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-0.5">Last Name *</label>
          <input
            type="text"
            value={formData.last_name}
            onChange={(e) => handleInputChange("last_name", e.target.value)}
            placeholder="Doe"
            disabled={isSubmitting}
            className="w-full px-3 py-1.5 border rounded-lg text-sm"
          />
          {errors.last_name && (
            <p className="text-red-500 text-xs mt-1" role="alert">
              {errors.last_name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-0.5">Phone *</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="+91 0123456789"
            disabled={isSubmitting}
            className="w-full px-3 py-1.5 border rounded-lg text-sm"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1" role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Company */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-0.5">Company *</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => handleInputChange("company", e.target.value)}
            placeholder="Travel Company"
            disabled={isSubmitting}
            className="w-full px-3 py-1.5 border rounded-lg text-sm"
          />
          {errors.company && (
            <p className="text-red-500 text-xs mt-1" role="alert">
              {errors.company}
            </p>
          )}
        </div>
      </div>

      {/* Registered Email with Add button */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleAddEmail}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-50"
          aria-label="Add Secondary Email"
        >
          <Plus className="w-4 h-4 text-gray-600" />
        </button>
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-700 mb-0.5">Registered Email *</label>
          <input
            type="email"
            value={formData.email}
            disabled
            className="w-full px-3 py-1.5 border border-gray-300 bg-gray-100 rounded-lg text-sm"
          />
        </div>
      </div>

      {/* Secondary Emails */}
      {formData.secondaryEmails.map((email, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleRemoveEmail(idx)}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-50"
            aria-label="Remove Secondary Email"
          >
            <Minus className="w-4 h-4 text-gray-600" />
          </button>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-0.5">Secondary Email {idx + 1}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => handleSecondaryEmailChange(idx, e.target.value)}
              placeholder="secondary@email.com"
              disabled={isSubmitting}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
            />
            {errors[`secondaryEmails_${idx}`] && (
              <p className="text-red-500 text-xs mt-1" role="alert">
                {errors[`secondaryEmails_${idx}`]}
              </p>
            )}
          </div>
        </div>
      ))}

      <div>
        <AddressField
          address={formData.companyAddress}
          onChange={handleCompanyAddressChange}
          label="Company Address *"
          errors={errors.companyAddress || {}}
        />

        {/* Branch Addresses */}
        {formData.branchAddresses.map((branch, idx) => (
          <AddressField
            key={idx}
            address={branch}
            onChange={(field, value) => handleBranchChange(idx, field, value)}
            onRemove={() => handleRemoveBranch(idx)}
            label={`Branch Address ${idx + 1}`}
            errors={errors[`branch_${idx}`] || {}}
            isBranch
          />
        ))}

        {/* Add Branch Button */}
        <button
          type="button"
          onClick={handleAddBranch}
          className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded"
        >
          <Plus className="w-4 h-4" /> Add Branch Address
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Saving...
          </>
        ) : (
          "Save changes"
        )}
      </button>
    </form>
  );
};

export default Profile;
