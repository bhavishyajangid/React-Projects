import React, { useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

const ImageUploadGrid = ({ value = [], onChange, error }) => {
  const inputRefs = useRef([]);

  const handleFileChange = (index, file) => {
    const updated = [...value];
    // Ensure the array is long enough for this index
    while (updated.length <= index) {
      updated.push(null);
    }
    updated[index] = file || null;
    onChange(updated);
  };

  const handleRemove = (index) => {
    const updated = [...value];
    // Ensure the array is long enough for this index
    while (updated.length <= index) {
      updated.push(null);
    }
    updated[index] = null;
    onChange(updated);
    // Reset the input field if it exists
    if (inputRefs.current[index]) {
      inputRefs.current[index].value = "";
    }
  };

  // Create a padded version for display (always show 4 slots)
  const paddedValue = [...value];
  while (paddedValue.length < 4) {
    paddedValue.push(null);
  }
  // We only show the first 4 slots (even if value is longer, we limit to 4 for UI)
  const slotsToShow = paddedValue.slice(0, 4);

  return (
    <div>
      <div className="flex gap-2 items-center mb-3">
        <label className="text-sm font-medium text-[#414753] capitalize">Product Images (Upload up to 4)</label>
        {error && <p className="text-red-600 text-xs font-medium">{error}</p>}
      </div>
      <div className="flex flex-wrap gap-4">
        {slotsToShow.map((image, index) => (
          <div key={index} className="relative w-24 h-24">
            <input
              ref={(el) => (inputRefs.current[index] = el)}
              type="file"
              accept="image/*"
              className="hidden"
              id={`image-upload-${index}`}
              onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
            />
            <label
              htmlFor={`image-upload-${index}`}
              className="flex flex-col items-center justify-center w-full h-full border-2 rounded-lg transition-all duration-200 hover:border-[#414753]/50 hover:bg-[#414753]/5 cursor-pointer"
            >
              {image ? (
                <>
                  <div className="relative w-full h-full">
                    <img
                      src={image instanceof Blob || image instanceof File ? URL.createObjectURL(image) : image}
                      alt={`Upload preview ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm opacity-0 transition-opacity duration-200 hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => handleRemove(index)}
                        className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md text-[#414753] hover:bg-[#414753]/10 hover:text-white transition-all duration-200"
                      >
                        <RxCross2 className="text-lg" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-center text-xs font-medium text-[#414753]">
                    Click to replace
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:border-gray-400 hover:bg-gray-100 transition-all duration-200">
                    <FiUploadCloud className="text-2xl mb-2 text-[#414753]/70" />
                    <div className="text-xs font-medium text-[#414753]/60">
                      Click to upload
                    </div>
                  </div>
                </>
              )}
            </label>
          </div>
        ))}
      </div>
      <div className="mt-3 text-xs text-gray-500">
        Supported formats: JPG, PNG, GIF (max 5MB each). At least one image required.
      </div>
    </div>
  );
};

export default ImageUploadGrid;