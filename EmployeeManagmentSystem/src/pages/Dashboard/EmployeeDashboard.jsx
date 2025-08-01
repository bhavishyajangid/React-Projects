import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const EmployeeDashboard = () => {
  const handleTrackIn = () => {
    console.log('Track In clicked');
    // Add your attendance tracking logic here
  };

  const handleTrackOut = () => {
    console.log('Track Out clicked');
    // Add your attendance tracking logic here
  };

  return (
    <div className="p-4 max-w-3xl mx-auto ">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-800">
        Attendance Tracker
      </h2>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
        <button
          onClick={handleTrackIn}
          className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 w-full sm:w-48"
        >
          <FaSignInAlt className="text-lg" />
          <span className="font-semibold">Track In</span>
        </button>

        <button
          onClick={handleTrackOut}
          className="flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 w-full sm:w-48"
        >
          <FaSignOutAlt className="text-lg" />
          <span className="font-semibold">Track Out</span>
        </button>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
