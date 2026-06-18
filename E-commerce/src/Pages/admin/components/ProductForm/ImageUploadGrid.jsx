import React, { useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

const ImageUploadGrid = ({ value = [null, null, null, null], onChange, error }) => {
  const inputRefs = useRef([]);

  const handleFileChange = (index, file) => {
    const updated = [...value];
    updated[index] = file || null;
    onChange(updated);
  };

  const handleRemove = (index) => {
    const updated = [...value];
    updated[index] = null;
    onChange(updated);
    if (inputRefs.current[index]) {
      inputRefs.current[index].value = "";
    }
  };

  return (
    <div>
      <div className="flex gap-2 items-center mb-3">
        <label className="text-sm font-medium text-[#414753] capitalize">Upload Image</label>
        {error && <p className="text-red-600 text-xs font-medium">{error}</p>}
      </div>
      <div className="flex flex-wrap gap-3">
        {value.map((image, index) => (
          <div key={index} className="relative w-20 h-20">
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
              className="flex flex-col items-center justify-center w-full h-full border border-dashed border-gray-300 rounded cursor-pointer overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              {image ? (
                <img
                  src={image instanceof Blob || image instanceof File ? URL.createObjectURL(image) : image}
                  alt={`Upload preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <FiUploadCloud className="text-xl mb-1" />
                  <span className="text-[10px] font-medium uppercase tracking-wide">Upload</span>
                </div>
              )}
            </label>
            {image && (
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute -top-1.5 -right-1.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-full p-1 shadow transition-colors z-10"
              >
                <RxCross2 className="text-xs" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploadGrid;
