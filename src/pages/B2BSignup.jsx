import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle, AiOutlineWarning } from "react-icons/ai";
import { Eye, EyeOff } from "lucide-react";
import agenlogin from "../assets/images/agentlogin.jpg";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const B2BSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone_no: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setFormError("");
  };

  const validateForm = () => {
    const e = {};
    const { firstName, lastName, email, phone_no, password, confirmPassword } = formData;

    if (!firstName.trim()) e.firstName = "First name is required";
    if (!lastName.trim()) e.lastName = "Last name is required";

    if (!email.trim()) e.email = "Email is required";
    else if (!emailRegex.test(email.trim())) e.email = "Enter a valid email";

    if (!phone_no) e.phone_no = "Phone number is required";
    else if (!/^\d{10}$/.test(phone_no)) e.phone_no = "Phone number must be 10 digits";

    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Password must be at least 6 characters";

    if (!confirmPassword) e.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword) e.confirmPassword = "Passwords do not match";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const signup = async (data) => {
 const payload = {
  first_Name: data.firstName,
  last_Name: data.lastName,
  email: data.email,
  phone_no: data.phone_no,
  password: data.password,
};


  try {
    const res = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(payload), 
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.message || `Signup failed with status ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("Signup error:", err.message);
    throw err;
  }
};




  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSubmitSuccess(false);

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await signup(formData);
      setSubmitSuccess(true);
        navigate("/admin/profile");

    } catch (err) {
      setFormError(err.message || "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Image / Info panel */}
      <div className="hidden md:flex w-1/2 bg-white flex-col justify-center items-center p-10">
        <img
          src={agenlogin}
          alt="Agent illustration"
          className="mb-6 rounded-md object-cover max-h-[70vh] w-full"
        />
        <div className="text-center max-w-sm">
          <h2 className="text-2xl font-semibold text-gray-800">Join HelloTravel B2B</h2>
          <p className="mt-2 text-gray-500 text-sm">
            Create itineraries, manage leads and grow your travel business.
          </p>
        </div>
      </div>

      {/* Signup form */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg"
          noValidate
        >
          <h1 className="text-3xl font-bold text-center text-gray-900">Sign up</h1>
          <p className="text-center text-gray-600">Create your agent account on HelloTravel</p>

          {/* Success message */}
          {submitSuccess && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-sm text-green-700">
              <AiOutlineCheckCircle size={18} />
              Signup successful — redirecting to login...
            </div>
          )}

          {/* Global form error */}
          {formError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-sm text-red-700">
              <AiOutlineWarning size={18} />
              {formError}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">First name *</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg text-sm ${
                  errors.firstName ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Last name *</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg text-sm ${
                  errors.lastName ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg text-sm ${
                errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Phone number *</label>
            <input
              type="tel"
              value={formData.phone_no}
              onChange={(e) => handleInputChange("phone_no", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg text-sm ${
                errors.phone_no ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
              placeholder="10-digit phone number"
            />
            {errors.phone_no && <p className="text-red-500 text-xs mt-1">{errors.phone_no}</p>}
          </div>

          <div className="relative">
            <label className="block text-xs font-medium text-gray-700 mb-1">Password *</label>
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg text-sm ${
                errors.password ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
              placeholder="Minimum 6 characters"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-8 text-gray-500"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="relative">
            <label className="block text-xs font-medium text-gray-700 mb-1">Confirm password *</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg text-sm ${
                errors.confirmPassword ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
              placeholder="Re-enter password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-8 text-gray-500"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing up...
              </>
            ) : (
              "Create account"
            )}
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/admin/profile" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default B2BSignup;
