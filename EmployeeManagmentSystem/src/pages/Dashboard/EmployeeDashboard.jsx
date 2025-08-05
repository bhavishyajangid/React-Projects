import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getDistanceInMeters } from '../../utlity/locationCordinates';
import conf from '../../config/config';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import { useAttendence } from '../../utlity/hook/useAttendence';
import { useSelector } from 'react-redux';
const EmployeeDashboard = () => {

const {currentUserDetails} = useSelector(state => state.authSlice)
const {isLoading, error, data, getData} = useVisitorData(
    {extendedResult: true},
    {immediate: false}
  )

  
const {markAttendence} = useAttendence()

  const handleAttendenceClick= async(status) => {
    try {
      const visitor = await getData({ignoreCache : true})

      alert(visitor.visitorId)
           if(!visitor?.visitorId){
            toast.error('Fingerprint not recornisezed Try Again')
            return
           }

           await markAttendence(status , visitor.visitorId , currentUserDetails)
    } catch (error) {
      alert(error)
        console.error("❌ Error getting fingerprint:", error);
    toast.error("❌ Failed to get fingerprint. Try again.");
    }
           
  }





  

  if(isLoading) return <p>...loading</p>

  return (
    <div className="sm:px-4 py-8">
      {/* Header top-left */}
      <div className="">
        <h2 className="text-2xl max-sm:text-center sm:text-3xl font-bold text-gray-800 mb-12">
          Attendance Tracker
        </h2>

        {/* Button container centered */}
        <div className="flex justify-center items-center">
          <div className="flex flex-col sm:flex-row gap-10 w-full sm:w-auto">
            {/* Track In Button */}
            <button
              onClick={() => {handleAttendenceClick('in')}}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white font-semibold px-6 py-3 sm:py-6 rounded-3xl shadow-lg hover:brightness-110 text-xl sm:text-2xl transition-all duration-300 w-full sm:w-48"
            >
              <FaSignInAlt className="text-lg" />
              <span> In</span>
            </button>

            {/* Track Out Button */}
            <button
              onClick={() => {handleAttendenceClick('out')}}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white font-semibold px-6 py-3 sm:py-6 rounded-3xl shadow-lg hover:brightness-110 text-xl sm:text-2xl transition-all duration-300 w-full sm:w-48"
            >
              <FaSignOutAlt className="text-lg" />
              <span>Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
