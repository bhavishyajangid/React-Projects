import React from "react";

const LeaveDetailsShimmer = () => {
  return (
    <div className="bg-gray-100 flex justify-center py-5 px-2">
      <div className="bg-white shadow-md rounded-lg w-full max-w-4xl p-6 animate-pulse space-y-4">
        <div className="h-6 bg-gray-300 rounded w-1/3 mx-auto" />
        
        {/* Simulated Detail Rows */}
        {[...Array(7)].map((_, i) => (
          <div key={i} className="flex justify-between items-center py-2 border-b">
            <div className="h-4 bg-gray-300 rounded w-32" />
            <div className="h-4 bg-gray-300 rounded w-2/3" />
          </div>
        ))}

        {/* Simulated Button Actions */}
        <div className="flex justify-end gap-4 mt-6">
          <div className="h-8 w-24 bg-gray-300 rounded" />
          <div className="h-8 w-24 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
};

export default LeaveDetailsShimmer;
