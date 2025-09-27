import React from "react";
 
const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex justify-center">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600">Terms of Use</h1>
          <p className="text-sm text-gray-500 mt-2">
            Last Updated: August 27, 2025
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
        </div>
 
        {/* Intro Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <p className="leading-relaxed text-gray-700">
            These Terms and Conditions govern your use of the{" "}
            <strong>TravelnWorld</strong> website and services. By accessing or
            using our services, you agree to be legally bound by the terms
            outlined below.
          </p>
        </div>
 
        {/* Services */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-blue-500 pb-2 mb-4">
           Services
          </h2>
          <p className="leading-relaxed text-gray-700">
            TravelnWorld provides B2B solutions including website design and
            development, logo and brand identity creation, website management,
            and digital marketing services such as SEO, social media strategy,
            and content marketing. All services are subject to a formal proposal
            or signed agreement.
          </p>
        </div>
 
        {/* Use of Website */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-blue-500 pb-2 mb-4">
           Use of Our Website
          </h2>
          <p className="leading-relaxed text-gray-700">
            You agree to use our website and services for lawful business
            purposes only. You must not misuse, harm, or interfere with our
            platform, servers, or networks connected to our services.
          </p>
        </div>
 
        {/* Payments */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-blue-500 pb-2 mb-4">
             Payments & Refunds
          </h2>
          <p className="leading-relaxed text-gray-700">
            All payments must be made as per the agreed terms in the project
            contract or invoice. Refunds are governed by our refund policy and
            may be issued only in exceptional cases, subject to management
            approval.
          </p>
        </div>
 
        {/* Intellectual Property */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-blue-500 pb-2 mb-4">
             Intellectual Property
          </h2>
          <p className="leading-relaxed text-gray-700">
            All content, designs, code, and strategies developed by
            TravelnWorld remain our intellectual property until full payment is
            received. Upon completion and payment, ownership will be transferred
            as stated in the service agreement.
          </p>
        </div>
 
        {/* Limitation of Liability */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-blue-500 pb-2 mb-4">
            Limitation of Liability
          </h2>
          <p className="leading-relaxed text-gray-700">
            TravelnWorld is not liable for any indirect, incidental, or
            consequential damages resulting from the use of our website or
            services. Our liability is limited to the total amount paid by you
            for the services rendered.
          </p>
        </div>
 
        {/* Modifications */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-blue-500 pb-2 mb-4">
             Modifications
          </h2>
          <p className="leading-relaxed text-gray-700">
            We reserve the right to update or modify these terms at any time.
            Any changes will be posted on this page along with a revised "Last
            Updated" date. Continued use of our services after changes implies
            your acceptance of the new terms.
          </p>
        </div>
 
        {/* Contact */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-blue-500 pb-2 mb-4">
            Contact Us
          </h2>
          <p className="leading-relaxed text-gray-700">
            If you have any questions or concerns regarding these Terms of Use,
            please contact us at:
          </p>
          <p className="mt-2 text-gray-700">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:support@travelnworld.com"
              className="text-blue-600 hover:underline"
            >
              support@travelnworld.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
 
export default TermsAndConditions;
