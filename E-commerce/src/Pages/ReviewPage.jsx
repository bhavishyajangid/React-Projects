import React from "react";
import { Review } from "../export";
import ReviewForm from "../components/Reviews/ReviewForm";

const ReviewPage = ({ reviews = [], onAddReview, userData }) => {
  return (
    <div className="w-4/5 m-auto max-lg:w-11/12 flex flex-col gap-8 mt-20 mb-16">
      <h1 className="text-3xl text-gray-700 text-center">Ratings & Reviews</h1>

      {userData ? (
        <ReviewForm onSubmit={onAddReview} userData={userData} />
      ) : (
        <p className="text-center text-sm text-gray-500">
          Please log in to write a review.
        </p>
      )}

      {reviews.length > 0 ? (
        reviews.map((item, index) => <Review key={index} item={item} />)
      ) : (
        <p className="text-center text-gray-400 text-sm">
          No reviews yet. Be the first to review this product!
        </p>
      )}
    </div>
  );
};

export default ReviewPage;
