import React, { useState, useCallback } from "react";
import { AlertCircle, Check, Camera } from "lucide-react";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    photo: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Validation
  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // if (formData.phone && !/^\+?[0-9\s\-()]{7,15}$/.test(formData.phone)) {
    //   newErrors.phone = "Please enter a valid phone number";
    // }
    if (!formData.phone.trim()) {
  newErrors.phone = "Phone number is required";
} else if (!/^\+?[0-9\s\-()]{7,15}$/.test(formData.phone)) {
  newErrors.phone = "Please enter a valid phone number";
}

    if (!formData.address.trim()) {
  newErrors.address = "Address number is required";
} 
    else if (formData.address.length > 200) {
      newErrors.address = "Address must be less than 200 characters";
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

  const handleInputChange = useCallback(
    (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    },
    [errors]
  );

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    handleInputChange("photo", file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // fake API
      setSubmitSuccess(true);
    } catch (err) {
      console.error("Error saving profile:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitForm = () => {
    if(validateForm()) {
      submitForm();
    }
  }

  // Initials if no photo
  const getInitials = () => {
    const { firstName, lastName } = formData;
    if (firstName || lastName) {
      return (
        (firstName ? firstName[0].toUpperCase() : "") +
        (lastName ? lastName[0].toUpperCase() : "")
      );
    }
    return "U";
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
          {formData.photo ? (
            <img
              src={URL.createObjectURL(formData.photo)}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            getInitials()
          )}
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

      {/* Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* First Name */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-0.5">
            First Name *
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            placeholder="John"
            disabled={isSubmitting}
            className={`w-full px-3 py-1.5 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.firstName
                ? "border-red-300"
                : "border-gray-300 hover:border-gray-400"
            }`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1" role="alert">
              {errors.firstName}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-0.5">
            Last Name *
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            placeholder="Doe"
            disabled={isSubmitting}
            className={`w-full px-3 py-1.5 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.lastName
                ? "border-red-300"
                : "border-gray-300 hover:border-gray-400"
            }`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1" role="alert">
              {errors.lastName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-0.5">
            Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="john@company.com"
            disabled={isSubmitting}
            className={`w-full px-3 py-1.5 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.email
                ? "border-red-300"
                : "border-gray-300 hover:border-gray-400"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
         <div>
          <label className="block text-xs font-medium text-gray-700 mb-0.5">
            Phone *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="+91 0123456789"
            disabled={isSubmitting}
            className={`w-full px-3 py-1.5 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.phone
                ? "border-red-300"
                : "border-gray-300 hover:border-gray-400"
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1" role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Department */}
        {/* <div>
          <label className="block text-xs font-medium text-gray-700 mb-0.5">
            Department *
          </label>
          <select
            value={formData.department}
            onChange={(e) => handleInputChange("department", e.target.value)}
            disabled={isSubmitting}
            className={`w-full px-3 py-1.5 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.department
                ? "border-red-300 bg-red-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <option value="">Select department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>
          {errors.department && (
            <p className="text-red-500 text-xs mt-1" role="alert">
              {errors.department}
            </p>
          )}
        </div> */}

        {/* Role */}
        {/* <div>
          <label className="block text-xs font-medium text-gray-700 mb-0.5">
            Role *
          </label>
          <select
            value={formData.role}
            onChange={(e) => handleInputChange("role", e.target.value)}
            disabled={isSubmitting}
            className={`w-full px-3 py-1.5 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.role
                ? "border-red-300 bg-red-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <option value="">Select role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Manager">Manager</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-xs mt-1" role="alert">
              {errors.role}
            </p>
          )}
        </div> */}

         {/* Address */}
         <div>
          <label className="block text-xs font-medium text-gray-700 mb-0.5">
            Address *
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            placeholder="Street address, City, State, ZIP"
            disabled={isSubmitting}
            className={`w-full px-3 py-1.5 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.address
                ? "border-red-300"
                : "border-gray-300 hover:border-gray-400"
            }`}
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1" role="alert">
              {errors.address}
            </p>
          )}
        </div>

      </div>

      {/* Bio */}
      {/* <div>
        <label className="block text-xs font-medium text-gray-700 mb-0.5">
          Bio
        </label>
        <textarea
          rows={3}
          value={formData.bio}
          onChange={(e) => handleInputChange("bio", e.target.value)}
          maxLength={200}
          placeholder="Tell us about yourself..."
          disabled={isSubmitting}
          className={`w-full px-3 py-1.5 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500 ${
            errors.bio
              ? "border-red-300 bg-red-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
        />
        {errors.bio && (
          <p className="text-red-500 text-xs mt-1" role="alert">
            {errors.bio}
          </p>
        )}
      </div> */}

      {/* Submit */}
      <button
        type="submit"
        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
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
