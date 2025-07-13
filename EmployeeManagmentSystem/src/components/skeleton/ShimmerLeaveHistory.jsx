import React from "react";

const ShimmerLeaveRowDesktop = () => {
  return (
    <tr className="animate-pulse border-t">
      {Array.from({ length: 7 }).map((_, index) => (
        <td key={index} className="py-4 px-4">
          <div className="h-4 bg-gray-300 rounded w-full" />
        </td>
      ))}
    </tr>
  );
};

const ShimmerLeaveHistory = () => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-10 px-4">
      {/* Table with shimmer rows */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-md text-sm">
          {/* Table Header */}
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="py-2 px-4 border">SNO</th>
              <th className="py-2 px-4 border">LEAVE TYPE</th>
              <th className="py-2 px-4 border">FROM</th>
              <th className="py-2 px-4 border">TO</th>
              <th className="py-2 px-4 border">DESCRIPTION</th>
              <th className="py-2 px-4 border">APPLIED DATE</th>
              <th className="py-2 px-4 border">STATUS</th>
            </tr>
          </thead>

          {/* Shimmer Body */}
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <ShimmerLeaveRowDesktop key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShimmerLeaveHistory;
