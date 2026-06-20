import React from "react";

const LoaderOverlay = ({ message = "Please wait..." }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/40 backdrop-blur-[3px]">
      <div className="flex flex-col items-center gap-5 bg-white/95 px-10 py-8 rounded-2xl shadow-2xl border border-gray-100 animate-fade-in">
        {/* Spinner */}
        <div className="relative w-14 h-14">
          <div
            className="absolute inset-0 rounded-full border-[3.5px] border-gray-200"
          />
          <div
            className="absolute inset-0 rounded-full border-[3.5px] border-transparent border-t-gray-900 animate-spin"
          />
        </div>
        {/* Message */}
        <p className="text-sm font-medium text-gray-700 tracking-wide">{message}</p>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LoaderOverlay;
