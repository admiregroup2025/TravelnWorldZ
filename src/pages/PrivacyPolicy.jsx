import React from "react";
 
const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 flex justify-center">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm">
            Last updated: September 27, 2025
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
        </div>
 
        {/* Privacy Policy Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-blue-500 pb-2 mb-4">
            Privacy Policy
          </h2>
          <p className="text-gray-700 mb-4">
            At <strong>TravelnWorld</strong>, we are committed to protecting
            your privacy and ensuring the security of your business and personal
            information. This policy outlines how we collect, use, and protect
            the data you provide through our services, including website
            development, branding, digital marketing, and technical support.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              We may collect information like your name, company name, email,
              phone number, and preferences when you contact us or request
              services.
            </li>
            <li>
              This data helps us personalize your experience, deliver quality
              services, and communicate with you effectively.
            </li>
            <li>
              All payments are securely handled by trusted third-party
              providers. We do not store payment details on our servers.
            </li>
            <li>
              We do not sell or share your information with third parties without
              consent, except when legally required or to fulfill your service
              requests.
            </li>
            <li>
              Our team follows strict access control and security protocols to
              protect your data at all stages.
            </li>
          </ul>
        </div>
 
        {/* Terms of Service Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-blue-500 pb-2 mb-4">
            Terms of Service
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              By using our services, you agree to provide accurate information
              and cooperate with us throughout the project.
            </li>
            <li>
              All designs, websites, or materials we create remain the
              intellectual property of TravelnWorld until full payment is
              received.
            </li>
            <li>
              You are responsible for keeping your login credentials (if
              provided) confidential.
            </li>
            <li>
              We reserve the right to update pricing, policies, or features with
              prior notice.
            </li>
            <li>
              Misuse of our services (e.g., illegal content, spam, etc.) may
              lead to termination without refund.
            </li>
          </ul>
        </div>
 
        {/* Contact Us Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-blue-500 pb-2 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-700">
            If you have any questions or concerns regarding this policy or your
            data, please contact us at:{" "}
            <strong className="text-gray-900">info@travelnworld.com</strong>.
            Were happy to help.
          </p>
        </div>
      </div>
    </div>
  );
};
 
export default PrivacyPolicy;
 
