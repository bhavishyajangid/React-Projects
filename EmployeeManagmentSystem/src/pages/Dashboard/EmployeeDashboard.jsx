import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";
import { useEffect, useState } from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import attendenceServices from "../../Appwrite/Attendence";
import { setAttendence } from "../../Store/attendenceSlice";
import { useAttendence } from "../../utlity/hook/useAttendence";
import LeaveServices from "../../Appwrite/Leave";
import { setStoreLeaves } from "../../Store/leaveSlice";
const EmployeeDashboard = () => {
  const { attendenceMarkedIn , attendenceMarkedOut , firstRender , storedAttendence } = useSelector((state) => state.attendenceSlice);
  const [loader, setLoader] = useState(false);
  const { currentUserDetails } = useSelector((state) => state.authSlice);
  const { getData, error } = useVisitorData(
    { extendedResult: true },
    { immediate: false }
  );
  const { markAttendence } = useAttendence();
  const dispatch = useDispatch()

  useEffect(() => {
   const todayMarkedAttendence = async() => {
    console.log(firstRender);
    
    if(!firstRender) return 
    alert('Use Mobile For Mark Attendece SomeTime Laptop Cannot Recornosize Location ')
         try {
            const result = await attendenceServices.checkAttendence(currentUserDetails.userId)

             dispatch(setAttendence(result))
         } catch (error) {
             console.log(error);
             toast.error('error while fetch the attendence')
         }
    }
    
    todayMarkedAttendence()
  }, [])


  const handleAttendenceClick = async (status) => {
    try {
      

      if (attendenceMarkedIn && status == "in" ||  attendenceMarkedIn && attendenceMarkedOut) {
        toast.error( attendenceMarkedIn && attendenceMarkedOut ? "Today Attendence Already Marked  " : "User Already Marked In" );
        return;
      }

      if(attendenceMarkedOut && status == 'out' || !attendenceMarkedIn && status == 'out' ){
         toast.error(attendenceMarkedOut ? "You Have Already Marked Out" : "Cannot Mark Out Before In")
         return
      }

      setLoader(true);
      const visitor = await getData({ ignoreCache: true });

      if (!visitor?.visitorId || error) {
        toast.error("Fingerprint not recornisezed Try Again");
        return;
      }

      await markAttendence(status, visitor.visitorId, currentUserDetails);
    } catch (error) {
      toast.error(error); 
      console.error(error);
    } finally {
      setLoader(false);
    }
  };


  if (loader) return (
    <div class="sm:px-4 py-8 animate-pulse">
  <div>
    <div class="h-6 bg-gray-200 rounded w-3/4 mb-12"></div>
    <div class="flex justify-center items-center">
      <div class="flex flex-col sm:flex-row gap-10 w-full sm:w-auto">
        <div class="h-16 sm:h-24 bg-gray-200 rounded-3xl w-full sm:w-48"></div>
        <div class="h-16 sm:h-24 bg-gray-200 rounded-3xl w-full sm:w-48"></div>
      </div>
    </div>
  </div>
</div>
  )

  return (
    <div className="sm:px-4 py-8">
      <>
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
              onClick={() => {
                handleAttendenceClick("in");
              }}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white font-semibold px-6 py-3 sm:py-6 rounded-3xl shadow-lg hover:brightness-110 text-xl sm:text-2xl transition-all duration-300 w-full sm:w-48"
            >
              <FaSignInAlt className="text-lg" />
              <span> In</span>
            </button>

            {/* Track Out Button */}
            <button
              onClick={() => {
                handleAttendenceClick("out");
              }}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white font-semibold px-6 py-3 sm:py-6 rounded-3xl shadow-lg hover:brightness-110 text-xl sm:text-2xl transition-all duration-300 w-full sm:w-48"
            >
              <FaSignOutAlt className="text-lg" />
              <span>Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
    </div>
  );
};

export default EmployeeDashboard;
