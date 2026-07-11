import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaStar } from "react-icons/fa6";
import { Button, Textarea } from "../../export";

const ReviewForm = ({ onSubmit, userData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { rating: 0, comment: "" } });

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      reset({ rating: 0, comment: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full border border-gray-200 rounded-lg p-6 flex flex-col gap-4"
    >
      <h2 className="text-lg font-semibold text-gray-800">Write a Review</h2>

      {userData && (
        <p className="text-sm text-gray-500">
          Reviewing as <span className="font-medium text-gray-700">{userData.name}</span>
        </p>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Rating</label>
        <Controller
          name="rating"
          control={control}
          rules={{
            validate: (value) => value > 0 || "Please select a rating",
          }}
          render={({ field }) => (
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => field.onChange(star)}
                  className="text-2xl transition-colors"
                >
                  <FaStar
                    className={
                      star <= field.value
                        ? "text-yellow-400"
                        : "text-gray-300 hover:text-yellow-200"
                    }
                  />
                </button>
              ))}
            </div>
          )}
        />
        {errors.rating && (
          <p className="text-red-600 text-xs">{errors.rating.message}</p>
        )}
      </div>

      <Textarea
        label="Your review"
        placeholder="Share your experience with this product..."
        rows={4}
        className="w-full border border-gray-300 p-3 outline-none resize-none"
        error={errors.comment?.message}
        {...register("comment", { required: "Review comment is required" })}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-40 h-10 bg-black text-white text-sm font-medium rounded-md disabled:opacity-60"
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
};

export default ReviewForm;
