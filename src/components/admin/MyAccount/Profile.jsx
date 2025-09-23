import React, { useState, useCallback } from "react";
import { AlertCircle, Check, Camera, Plus, Minus } from "lucide-react";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const Profile = () => {
  const [formData, setFormData] = useState({
    company: "",
    firstName: "",
    lastName: "",
    email: "registered@email.com", // disabled field
    phone: "",
    // address: "",
    photo: null,
    secondaryEmail: [],
    companyAddress: "",
    branchAddresses: [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Validation
  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    } else if (formData.company.length < 2) {
      newErrors.company = "Company name must be at least 2 characters";
    }

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

    // Validate all secondary emails if any are present
    formData.secondaryEmail.forEach((secEmail, i) => {
  if (!secEmail.trim()) {
    newErrors[`secondaryEmail_${i}`] = "Secondary email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(secEmail)) {
    newErrors[`secondaryEmail_${i}`] = "Please enter a valid email address";
  }
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

    if (!formData.companyAddress.trim()) {
      newErrors.companyAddress = "Company address is required";
    }

    formData.branchAddresses.forEach((branch, i) => {
      if (!branch.trim()) {
        newErrors[`branch_${i}`] = "Branch address cannot be empty";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);


  const handleAddBranch = () => {
    setFormData((prev) => ({
      ...prev,
      branchAddresses: [...prev.branchAddresses, ""],
    }));
  };
  const handleRemoveBranch = (index) => {
    setFormData((prev) => {
      const updated = [...prev.branchAddresses];
      updated.splice(index, 1);
      return { ...prev, branchAddresses: updated };
    });
  };
  const handleBranchChange = (index, value) => {
    setFormData((prev) => {
      const updated = [...prev.branchAddresses];
      updated[index] = value;
      return { ...prev, branchAddresses: updated };
    });
    const key = `branch_${index}`;
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
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

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    handleInputChange("photo", file);
  };

  const handleAddEmail = () => {
    setFormData((prev) => ({
      ...prev,
      secondaryEmail: [...prev.secondaryEmail, ""],
    }));
  };

  const handleRemoveEmail = (index) => {
    setFormData((prev) => {
      const updated = [...prev.secondaryEmail];
      updated.splice(index, 1);
      return { ...prev, secondaryEmail: updated };
    });
  };

  const handleSecondaryEmailChange = (index, value) => {
    setFormData((prev) => {
      const updated = [...prev.secondaryEmail];
      updated[index] = value;
      return { ...prev, secondaryEmail: updated };
    });

    // Remove individual error if present
    const key = `secondaryEmail_${index}`;
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
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
      <h2 className="text-lg font-semibold text-gray-900">
        Profile Information
      </h2>

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
          <p className="text-xs text-gray-500 mt-1">
            JPG, GIF or PNG. Max size 2MB.
          </p>
        </div>
      </div>


      {/* Other fields */}
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
            className="w-full px-3 py-1.5 border rounded-lg text-sm"
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
            className="w-full px-3 py-1.5 border rounded-lg text-sm"
          />
            {errors.lastName && (
            <p className="text-red-500 text-xs mt-1" role="alert">
              {errors.lastName}
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
          <label className="block text-xs font-medium text-gray-700 mb-0.5">
            Company *
          </label>
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
          <label className="block text-xs font-medium text-gray-700 mb-0.5">
            Registered Email *
          </label>
          <input
            type="email"
            value={formData.email}
            disabled
            className="w-full px-3 py-1.5 border border-gray-300 bg-gray-100 rounded-lg text-sm"
          />
        </div>
      </div>

      {/* Secondary Emails */}
      {formData.secondaryEmail.map((email, idx) => (
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
            <label className="block text-xs font-medium text-gray-700 mb-0.5">
              Secondary Email {idx + 1}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) =>
                handleSecondaryEmailChange(idx, e.target.value)
              }
              placeholder="secondary@email.com"
              disabled={isSubmitting}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
            />
            {errors[`secondaryEmail_${idx}`] && (
              <p className="text-red-500 text-xs mt-1" role="alert">
                {errors[`secondaryEmail_${idx}`]}
              </p>
            )}
          </div>
        </div>
      ))}
      
      {/* Company Address with Add Branch button */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleAddBranch}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-50"
          aria-label="Add Branch Address"
        >
          <Plus className="w-4 h-4 text-gray-600" />
        </button>
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-700 mb-0.5">
            Company Address *
          </label>
          <input
            type="text"
            value={formData.companyAddress}
            onChange={(e) =>
              handleInputChange("companyAddress", e.target.value)
            }
            placeholder="Main Office Address"
            disabled={isSubmitting}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
          />
          {errors.companyAddress && (
            <p className="text-red-500 text-xs mt-1" role="alert">
              {errors.companyAddress}
            </p>
          )}
        </div>
      </div>

      {/* Branch Addresses */}
      {formData.branchAddresses.map((branch, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleRemoveBranch(idx)}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-50"
            aria-label="Remove Branch Address"
          >
            <Minus className="w-4 h-4 text-gray-600" />
          </button>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-0.5">
              Branch Address {idx + 1}
            </label>
            <input
              type="text"
              value={branch}
              onChange={(e) => handleBranchChange(idx, e.target.value)}
              placeholder="Branch Office Address"
              disabled={isSubmitting}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
            />
            {errors[`branch_${idx}`] && (
              <p className="text-red-500 text-xs mt-1" role="alert">
                {errors[`branch_${idx}`]}
              </p>
            )}
          </div>
        </div>
      ))}

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

