import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom"; // at the top
import ReviewForm from "../../forms/ReviewForm.jsx";
import ShareButton from '../blogs/ShareButton.jsx';

function VerifiedReview() {
  const navigate = useNavigate();
  const { id } = useParams();


  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [submittedReviews, setSubmittedReviews] = useState([]);

  const handleReviewSubmit = (review) => {
    setSubmittedReviews((prev) => [...prev, review]);
    setShowReviewForm(false);
  };

  return (
    <section id="reviews">
      <div className="flex items-center justify-between mb-4">
        <h2 
          onClick={() => navigate(`/verified-transport-details/${id}/reviews`)}
          className="font-semibold text-2xl text-gray-800 cursor-pointer">Reviews & Ratings
        </h2>
        <button
          onClick={() => navigate(`/verified-transport-details/${id}/reviews`)}
          className="text-xl text-blue-600 underline hover:text-blue-800"
        >
          View All
        </button>
      </div>


      {/* Top Summary */}
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-green-600 text-white text-2xl font-bold px-4 py-2 rounded-md">
          4.9
        </div>
        <div>
          <p className="font-semibold text-gray-800">599 Ratings</p>
          <p className="text-sm text-gray-500">JD rating index based on 599 ratings across the web</p>
        </div>
      </div>

      {/* Start Your Review */}
      <div className="mb-6">
        <p className="font-medium text-gray-800 mb-2">Start your Review</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              onClick={() => {
                setSelectedRating(n);
                setShowReviewForm(true);
              }}
              className="text-gray-400 text-6xl cursor-pointer hover:text-yellow-400 transition"
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <ReviewForm
          isOpen={showReviewForm}
          onClose={() => setShowReviewForm(false)}
          rating={selectedRating}
          onSubmit={handleReviewSubmit}
        />
      )}

      {/* Recent rating trend */}
      <div className="mb-6">
        <p className="font-medium text-gray-800 mb-2">Recent rating trend</p>
        <div className="flex flex-wrap gap-2">
          {Array(10).fill().map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-1 border px-3 py-1 rounded-full text-sm"
            >
              <span className="text-black font-semibold">5.0</span>
              <span className="text-yellow-500">★</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        <button className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full">Relevant</button>
        <button className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">Latest</button>
        <button className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">High to Low</button>
      </div>

      {/* Review Highlights */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          "Good offers (17)", "Great service (16)", "Reasonably priced (16)", "Great recommendations (15)",
          "Quick service (14)", "Multilingual assistance (12)", "Hassle-free process (11)", "Efficient (10)",
          "Food restrictions considered (8)", "Timely reservations (7)",
        ].map((tag, i) => (
          <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>

      {/* Existing Static Review */}
      <div className="border-t pt-6 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <img
            src="https://via.placeholder.com/40"
            alt="user"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-sm">Isha Rajput</p>
            <p className="text-xs text-gray-500">1 review</p>
          </div>
          <span className="ml-auto text-xs text-gray-400">31 Dec 2024</span>
        </div>

        <div className="text-red-500 text-lg mb-2">★★★★★</div>

        <div className="flex flex-wrap gap-2 mb-3">
          {["Timely reservations", "Fast response", "Reasonably priced", "Good offers"].map((tag, i) => (
            <span key={i} className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
              ✅ {tag}
            </span>
          ))}
        </div>

        <p className="text-sm text-gray-700 italic mb-4">
          "Sitaaram Travels Pvt Ltd is an excellent choice for travel needs..."
        </p>

        <div className="flex gap-6 text-sm text-gray-500">
          <button className="flex items-center gap-1 hover:text-gray-800">👍 Helpful (1)</button>
          <button className="flex items-center gap-1 hover:text-gray-800">💬 Comment</button>
          <button className="flex items-center gap-1 hover:text-gray-800">🔗 Share</button>
        </div>
      </div>

      {/* New Submitted Reviews */}
      {submittedReviews.map((review, i) => (
        <div key={i} className="border-t pt-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <img
              src="https://via.placeholder.com/40"
              alt="user"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-sm">You</p>
              <p className="text-xs text-gray-500">Just now</p>
            </div>
          </div>

          <div className="text-orange-500 text-lg mb-2">
            {'★'.repeat(review.rating)}{'★'.repeat(5 - review.rating).replace(/★/g, '☆')}
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {review.tags.map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                ✅ {tag}
              </span>
            ))}
          </div>

          <p className="text-sm text-gray-700 italic mb-4">
            "{review.text}"
          </p>

          {review.images.length > 0 && (
            <div className="flex gap-2 mb-4 flex-wrap">
              {review.images.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt={`uploaded-${index}`}
                  className="w-16 h-16 rounded object-cover border"
                />
              ))}
            </div>
          )}

          <div className="flex gap-6 text-sm text-gray-500">
            <button className="flex items-center gap-1 hover:text-gray-800">👍 Helpful</button>
            <button className="flex items-center gap-1 hover:text-gray-800">💬 Comment</button>
            {/* Share Button Component */}
            <div className="flex items-center gap-1 hover:text-gray-800 cursor-pointer">
                <ShareButton
                title="Check out this review on Sitaaram Travels"
                text="Here's a great travel service I found on JD!"
                url={window.location.href} 
                />
                <span className="hidden sm:inline">Share</span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default VerifiedReview;
