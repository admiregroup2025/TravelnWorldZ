import React, { useState } from "react";
import agenlogin from "../assets/images/agentlogin.jpg";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineCheckCircle, AiOutlineWarning } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

import { Eye, EyeOff } from "lucide-react"; // 👈 add this import

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const B2BSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone_no: "",
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (key, value) => {
    setFormData((s) => ({ ...s, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    setFormError("");
  };

  const validateForm = () => {
    const e = {};

    if (!formData.firstName.trim()) e.firstName = "First name is required";
    if (!formData.lastName.trim()) e.lastName = "Last name is required";

    if (!formData.email.trim()) e.email = "Email is required";
    else if (!emailRegex.test(formData.email.trim()))
      e.email = "Enter a valid email";

    if (!formData.password) e.password = "Password is required";
    else if (formData.password.length < 6)
      e.password = "Password must be at least 6 characters";

    if (!formData.confirmPassword)
      e.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword)
      e.confirmPassword = "Passwords do not match";

    if (!formData.phone_no) e.phone_no = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone_no))
      e.phone_no = "Phone number must be 10 digits";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const signup = async ({
    firstName,
    lastName,
    email,
    
    phone_no,
    password,
  }) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        phone_no,
      }),
    });

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      throw new Error(json.message || "Signup failed");
    }
    return res.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSubmitSuccess(false);

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await signup({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
       
        phone_no: formData.phone_no,
         password: formData.password,
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        navigate("/b2blogin");
      }, 1200);
    } catch (err) {
      setFormError(err.message || "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side */}
      <div className="hidden md:flex w-1/2 bg-white flex-col justify-center items-center p-10">
        <img
          src={agenlogin}
          alt="Agents illustration"
          className="mb-6 rounded-md object-cover max-h-[70vh] w-full"
        />
        <div className="text-center max-w-sm">
          <h2 className="text-2xl font-semibold text-gray-800">
            Join HelloTravel B2B
          </h2>
          <p className="mt-2 text-gray-500 text-sm">
            Create itineraries, manage leads and grow your travel business.
          </p>
        </div>
      </div>

      {/* Right side - Signup Form */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg"
          aria-label="B2B signup form"
          noValidate
        >
          <h1 className="text-3xl font-bold text-center text-gray-900">
            Sign up
          </h1>
          <p className="text-center text-gray-600">
            Create your agent account on HelloTravel
          </p>

          {/* success message */}
          {submitSuccess && (
            <div
              role="status"
              className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-sm text-green-700"
            >
              <AiOutlineCheckCircle size={18} />
              <span>Signup successful — redirecting to login...</span>
            </div>
          )}

          {/* global form error */}
          {formError && (
            <div
              role="alert"
              className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-sm text-red-700"
            >
              <AiOutlineWarning size={18} />
              <span>{formError}</span>
            </div>
          )}


          {/* First + Last name */}
          <div className="grid grid-cols-2 gap-3">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                First name *
              </label>
              <input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  handleInputChange("firstName", e.target.value)
                }
                className={`w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-1 ${
                  errors.firstName
                    ? "border-red-300 bg-red-50 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                Last name *
              </label>
              <input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-1 ${
                  errors.lastName
                    ? "border-red-300 bg-red-50 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="you@example.com"
              className={`w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-1 ${
                errors.email
                  ? "border-red-300 bg-red-50 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone_no"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Phone Number *
            </label>
            <input
              id="phone_no"
              type="tel"
              value={formData.phone_no}
              onChange={(e) => handleInputChange("phone_no", e.target.value)}
              placeholder="10-digit phone number"
              className={`w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-1 ${
                errors.phone_no
                  ? "border-red-300 bg-red-50 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
            />
            {errors.phone_no && (
              <p className="text-red-500 text-xs mt-1">{errors.phone_no}</p>
            )}
          </div>

          {/* Password */}
          {/* <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Password *
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Minimum 6 characters"
              className={`w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-1 ${
                errors.password
                  ? "border-red-300 bg-red-50 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div> */}

          {/* Confirm Password */}
          {/* <div>
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Confirm password *
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              placeholder="Re-enter password"
              className={`w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-1 ${
                errors.confirmPassword
                  ? "border-red-300 bg-red-50 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div> */}


            {/* Password */}
      <div className="relative">
        <label
          htmlFor="password"
          className="block text-xs font-medium text-gray-700 mb-1"
        >
          Password *
        </label>
        <input
          id="password"
          type={showPassword ? "text" : "password"} // 👁️ Toggle type
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          placeholder="Minimum 6 characters"
          className={`w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-1 ${
            errors.password
              ? "border-red-300 bg-red-50 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200"
          }`}
        />
        {/* 👁️ Eye Icon */}
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-8 text-gray-500"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>

        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <label
          htmlFor="confirmPassword"
          className="block text-xs font-medium text-gray-700 mb-1"
        >
          Confirm password *
        </label>
        <input
          id="confirmPassword"
          type={showConfirmPassword ? "text" : "password"} // 👁️ Toggle type
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
          placeholder="Re-enter password"
          className={`w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-1 ${
            errors.confirmPassword
              ? "border-red-300 bg-red-50 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200"
          }`}
        />
        {/* 👁️ Eye Icon */}
        <button
          type="button"
          onClick={() => setShowConfirmPassword((prev) => !prev)}
          className="absolute right-3 top-8 text-gray-500"
          aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
        >
          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>

        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
        )}
      </div>
















      


          {/* Submit */}
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
            <Link to="/b2bLogin" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default B2BSignup;
