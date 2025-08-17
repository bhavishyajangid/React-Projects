import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import attendenceServices from "../../Appwrite/Attendence";
import { setAllAttendence, setLoader, setStoredAttendence } from "../../Store/attendenceSlice";
import AttendenceSkeleton from "../../components/skeleton/AttendenceSkeleton";
import { selectCLR, storedInObj } from "../../utlity/AttendenceShowClr";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const AttendenceHistory = () => {
  const { currentUserDetails } = useSelector((state) => state.authSlice);
  const {loader , allAttendence ,storedAttendence } = useSelector(state => state.attendenceSlice)
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth() + 1);
  const dispatch = useDispatch()
  

  const getDaysInMonth = (month) => {
    return new Date(2025, month, 0).getDate();
  };

  useEffect(() => {
    const fetchAttendence = async () => {
console.log(storedAttendence , monthIndex);

      if(storedAttendence[monthIndex]){
           return
      }

      dispatch(setLoader(true))
      
      const monthUpdated =
        monthIndex <= 9 ? String(monthIndex).padStart(2, "0") : monthIndex;

      let days = getDaysInMonth(monthIndex);

      try {
        const result = await attendenceServices.allAttendence(
          currentUserDetails.userId,
          monthUpdated,
          days
        );
       
        const obj = storedInObj(result)
        dispatch(setStoredAttendence({month: monthIndex, result: obj }))
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAttendence();
  }, [monthIndex]);

 

console.log(storedAttendence , monthIndex);
  if(loader) return <AttendenceSkeleton/>


  return (
    <div className="sm:p-8 py-2  mx-auto  rounded-3xl">
      {/* Header */}
      <div className="flex  sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
          Attendance History
        </h1>
      </div>

      {/* Month Card */}
      <div className="bg-gradient-to-br from-red-50 to-white p-3 sm:p-6 rounded-2xl border border-red-100 shadow-md">
        <div className="flex justify-between items-center border-b border-gray-200 pb-3 ">
          <h2 className="font-bold text-lg sm:text-xl   text-gray-800  ">
            {months[monthIndex - 1]}
          </h2>
          <select
            value={monthIndex}
            onChange={(e) => setMonthIndex(e.target.value)}
            className="border border-gray-300 rounded-full px-4 py-1.5 text-gray-700 bg-gradient-to-r from-gray-50 to-white shadow focus:outline-none focus:ring-2 focus:ring-red-400 transition hover:shadow-md text-sm sm:text-base"
          >
            {months.map((month, index) => (
              <option key={month} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 flex-wrap mt-10">
          {Array.from({ length: getDaysInMonth(monthIndex) }, (_, index) => {
            const colorClass = selectCLR(index+ 1 , monthIndex , storedAttendence?.[monthIndex]  || {})
            
            return (
            <div
              key={index}
              className={`w-8 sm:w-10 h-8 sm:h-10 rounded-lg transition-all transform hover:scale-105 cursor-pointer shadow-sm border flex items-center  justify-center text-xs sm:text-sm font-semibold text-white ${colorClass}`}
            >
              {index + 1}
            </div>
            )
})}
        </div>
        <div className="flex flex-wrap gap-6 mt-6 text-sm sm:text-base border-t border-gray-200 pt-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 sm:w-4 sm:h-4 sm:rounded-md  rounded-sm bg-green-400 border border-green-600"></span>{" "}
            Present
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 sm:w-4 sm:h-4 sm:rounded-md  rounded-sm bg-red-400 border border-red-600"></span>{" "}
            Absent
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 sm:w-4 sm:h-4 sm:rounded-md  rounded-sm bg-yellow-400 border border-yellow-400"></span>{" "}
            Half Day
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 sm:w-4 sm:h-4 sm:rounded-md  rounded-sm bg-blue-400 border border-blue-500"></span>{" "}
            OverTime 
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 sm:w-4 sm:h-4 sm:rounded-md  rounded-sm bg-gray-400 border border-gray-500"></span>{" "}
            No Record
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendenceHistory;
