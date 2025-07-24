import { memo, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const HomeSkeleton = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const shimmerBox = (
    <div className="bg-white p-5 rounded-lg shadow-md border-l-4 animate-pulse">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
        <div>
          <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans flex flex-col">
      {/* Navbar */}
      <div className="bg-teal-600 text-white flex justify-between items-center px-6 py-4 shadow-md animate-pulse">
        <div className="h-6 bg-gray-400 rounded w-32"></div>
        <div className="md:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <FaBars className="text-2xl" />
          </button>
        </div>
        <div className="hidden md:block h-8 w-24 bg-gray-400 rounded"></div>
      </div>

      <div className="flex flex-1 flex-col md:flex-row relative">
        {/* Sidebar */}
        <div className={`fixed md:static top-0 left-0 min-h-full w-64 bg-gray-900 text-white z-40 shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0`}>
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700 md:hidden">
            <span className="text-lg font-semibold tracking-wide">Menu</span>
            <button onClick={() => setSidebarOpen(false)}>
              <FaTimes className="text-2xl" />
            </button>
          </div>
          <div className="hidden md:block px-6 py-4 border-b border-gray-700 text-lg font-semibold tracking-wide">Menu</div>
          <div className="px-6 py-4 space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Overlay */}
        {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"></div>}

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8">
          <div className="h-8 bg-gray-300 w-40 mb-6 rounded animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {shimmerBox}
            {shimmerBox}
            {shimmerBox}
          </div>

          <div className="h-6 bg-gray-300 w-32 mb-4 rounded animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            {shimmerBox}
            {shimmerBox}
            {shimmerBox}
            {shimmerBox}
          </div>

          <div className="mt-10 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-5 bg-gray-300 rounded w-full animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(HomeSkeleton);
