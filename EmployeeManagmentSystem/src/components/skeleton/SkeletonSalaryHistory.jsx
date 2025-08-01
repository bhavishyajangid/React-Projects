import React from 'react';

const SkeletonSalaryHistory = () => {
  const skeletonRows = Array.from({ length: 8 }); // 6 rows for loading

  return (
    <div className=" bg-gray-100 flex flex-col animate-pulse">
      <div className="w-full max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-10 mt-5">
          <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
          <div className="w-1/6 h-8 bg-gray-400 rounded"></div>
        </div>

        {/* Filter placeholder */}
        <div className="w-full h-12 bg-gray-300 mb-4 rounded"></div>

        {/* Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-md text-sm">
            <thead className="bg-gray-100 text-gray-600 font-semibold">
              <tr>
                {Array.from({ length: 7 }).map((_, i) => (
                  <th key={i} className="py-2 px-4 border">
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {skeletonRows.map((_, index) => (
                <tr key={index} className="text-center border-t hover:bg-gray-50">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <td key={i} className="py-2 px-4 border">
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SkeletonSalaryHistory;
