import React from "react";

const AllemployeeShimmer = () => {
  return (
    <div class="p-4 bg-gray-100 max-sm:p-2 max-sm:hidden animate-pulse">
      <div class="flex justify-between mb-10 max-sm:flex-col max-sm:justify-start max-sm:gap-5">
        <div class="flex justify-between items-center">
          <div class="bg-gray-200 h-10 w-1/2 rounded-sm"></div>
          <div class="h-8 w-1/4 bg-gray-200 rounded-lg"></div>
        </div>
        <div class="gap-3 flex">
          <div>
            <div class="px-4 py-1.5 bg-gray-200 rounded-lg w-32"></div>
          </div>
          <div class="w-64 px-4 py-1.5 bg-gray-200 rounded-md"></div>
        </div>
      </div>

      <div class="overflow-x-auto shadow-md rounded-lg bg-white">
        <table class="min-w-full table-auto text-sm text-left text-gray-700">
          <thead class="bg-gray-300 text-gray-700 font-semibold">
            <tr>
              <th class="px-4 py-3">
                <div class="bg-gray-300 h-4 w-8 rounded-sm"></div>
              </th>
              <th class="px-4 py-3">
                <div class="bg-gray-200 h-4 w-10 rounded-sm"></div>
              </th>
              <th class="px-4 py-3">
                <div class="bg-gray-200 h-4 w-16 rounded-sm"></div>
              </th>
              <th class="px-4 py-3">
                <div class="bg-gray-200 h-4 w-8 rounded-sm"></div>
              </th>
              <th class="px-4 py-3">
                <div class="bg-gray-200 h-4 w-24 rounded-sm"></div>
              </th>
              <th class="px-4 py-3">
                <div class="bg-gray-200 h-4 w-16 rounded-sm"></div>
              </th>
            </tr>
          </thead>
          {[...Array(4)].map((_, i) => 
          <tbody>
            <tr>
              <td class="px-4 py-3">
                <div class="bg-gray-200 h-4 w-4 rounded-sm"></div>
              </td>
              <td class="px-4 py-3">
                <div class="bg-gray-200 rounded-full h-10 w-10"></div>
              </td>
              <td class="px-4 py-3">
                <div class="bg-gray-200 h-4 w-24 rounded-sm"></div>
              </td>
              <td class="px-4 py-3">
                <div class="bg-gray-200 h-4 w-16 rounded-sm"></div>
              </td>
              <td class="px-4 py-3">
                <div class="bg-gray-200 h-4 w-24 rounded-sm"></div>
              </td>
              <td class="px-4 py-3">
                <div class="bg-gray-200 h-6 w-24 rounded-lg"></div>
              </td>
            </tr>
          </tbody>
    )}
        </table>
      </div>
    </div>
  );
};

export default AllemployeeShimmer;
