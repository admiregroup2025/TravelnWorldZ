import React from "react";
 
const tags = [
  "Great service",
  "Quick service",
  "Unprofessional agent",
  "Inefficient service",
  "Hassle-free process",
  "Great recommendations",
];
 
const ReviewForm = ({ isOpen, onClose, rating }) => {
  if (!isOpen) return null;
 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 text-xl"
        >
          &times;
        </button>
 
        <div className="grid md:grid-cols-2 gap-6">
          {/* LEFT SIDE */}
          <div className="border rounded p-4 text-center">
            <img
              src="https://via.placeholder.com/60"
              alt="business"
              className="w-16 h-16 mx-auto rounded-md mb-2"
            />
            <h3 className="font-semibold">Sitaaram Travels Pvt Ltd</h3>
            <p className="text-sm text-gray-500">Sadhubela Bhupatwala</p>
 
            <p className="mt-4 text-sm text-gray-600">How would you rate your experience?</p>
            <div className="flex justify-center mt-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <span
                  key={n}
                  className={`text-2xl ${
                    n <= rating ? "text-orange-500" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="mt-2 text-sm bg-gray-100 inline-block px-3 py-1 rounded-full">
              {rating === 3 ? "Average 😐" : rating > 3 ? "Good 😊" : "Poor 😞"}
            </p>
          </div>
 
          {/* RIGHT SIDE */}
          <div>
            <p className="text-sm font-medium mb-2">What did you like and dislike?</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>
 
            <p className="text-sm font-medium mb-1 flex items-center justify-between">
              Tell us about your experience
              <span className="text-blue-500 text-xs cursor-pointer">💡 Tips</span>
            </p>
            <textarea
              rows="4"
              placeholder="Please share your experience..."
              className="w-full border rounded p-2 text-sm focus:ring-2 focus:ring-blue-400"
            />
 
            {/* <button className="mt-2 text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded hover:bg-purple-200">
              ✍️ Let AI write
            </button> */}
 
            <p className="mt-4 text-sm font-medium">Upload Photos</p>
            <div className="mt-2 border-2 border-dashed border-blue-300 rounded-md p-4 flex items-center justify-center cursor-pointer text-blue-500">
              📷 Upload Photo
            </div>
 
            <button className="w-full bg-blue-600 text-white mt-4 py-2 rounded hover:bg-blue-700 transition text-sm">
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default ReviewForm;
 
 