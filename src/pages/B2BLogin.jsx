import React, { useState, useCallback } from "react"; // ✅ added useCallback
import { FcGoogle } from "react-icons/fc";
import { Check, AlertCircle } from "lucide-react";
import agenlogin from "../assets/images/agentlogin.jpg";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const B2BLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ added missing states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ fixed validateForm (was written wrong with `}, [formData])`)
  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitSuccess(false);
    setErrors((prev) => ({ ...prev, form: undefined }));

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await res.json().catch(() => ({}));
      console.log("login response:", data);

      if (!res.ok) {
        const message = data?.message || `Login failed (${res.status})`;
        throw new Error(message);
      }

      const token = data?.accessToken || data?.token || data?.access_token || null;
      if (!token) {
        throw new Error("No token received from server");
      }

      localStorage.setItem("accessToken", token);

      setSubmitSuccess(true);
      setStatus("success");

      navigate("/admin");
    } catch (err) {
      console.error("Login error:", err);
      setErrors((prev) => ({ ...prev, form: err.message || "Login failed" }));
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Image Section */}
      <div className="hidden md:flex w-1/2 bg-gray-100 justify-center items-center p-10">
        <img src={agenlogin} alt="Illustration" className="rounded-md object-cover" />
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 space-y-4"
          aria-label="Login form"
          noValidate
        >
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Login</h1>
          <p className="text-center text-gray-600 mb-4">Welcome to the HelloTravel family!</p>

          {/* Success Message */}
          {status === "success" && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-sm text-green-700">
              <Check className="w-4 h-4" />
              Login successful! Redirecting...
            </div>
          )}

          {errors.form && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-sm text-red-700">
              <AlertCircle className="w-4 h-4" />
              {errors.form}
            </div>
          )}


          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="you@example.com"
              disabled={isSubmitting}
              className={`w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500 ${
                errors.email ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
              }`}
            />
            {errors.email && (
              <p id="email-error" className="text-red-500 text-xs mt-1" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">
              Password *
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="••••••••"
              disabled={isSubmitting}
              className={`w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500 pr-10
                ${errors.password ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            {errors.password && (
              <p id="password-error" className="text-red-500 text-xs mt-1" role="alert">
                {errors.password}
              </p>
            )}
          </div>

          <div className="text-right">
            <a href="#" className="text-sm text-blue-600 hover:underline" aria-label="Forgot Password">
              Forgot Password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md font-medium flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Logging in...
              </>
            ) : (
              "Login with email"
            )}
          </button>

          {/* Signup */}
          <p className="text-center text-sm text-gray-600">
            New User?{" "}
            <Link to="/b2bSignup" className="text-blue-600 hover:underline">
              Signup Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default B2BLogin;
