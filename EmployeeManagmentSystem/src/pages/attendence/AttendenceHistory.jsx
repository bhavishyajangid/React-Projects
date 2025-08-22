import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import attendenceServices from "../../Appwrite/Attendence";
import LeaveServices from "../../Appwrite/Leave";
import { setLoader, setStoredAttendence } from "../../Store/attendenceSlice";
import AttendenceSkeleton from "../../components/skeleton/AttendenceSkeleton";
import {
  mergeAttendanceAndLeave,
  selectCLR,
} from "../../utlity/AttendenceShowClr";
import { LegendItem, TotalSummary } from "../../export";
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
  const { loader, storedAttendence } = useSelector(
    (state) => state.attendenceSlice
  );
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth() + 1);
  const dispatch = useDispatch();
  const total = useRef({
    halfDay: 0,
    overtime: 0,
    forgetToMark: 0,
    totalLeave: 0,
    totalAttendance: 0,
  });

  const getDaysInMonth = (month) => {
    return new Date(2025, month, 0).getDate();
  };

  useEffect(() => {
    const fetchAttendence = async () => {


      if (storedAttendence[monthIndex]) {
        return;
      }

      total.current = {
        halfDay: 0,
        overtime: 0,
        forgetToMark: 0,
        totalLeave: 0,
        totalAttendance: 0,
      };

      dispatch(setLoader(true));

      const monthUpdated =
        monthIndex <= 9 ? String(monthIndex).padStart(2, "0") : monthIndex;

      let days = getDaysInMonth(monthIndex);

      try {
        const attendence = await attendenceServices.allAttendence(
          currentUserDetails.userId,
          monthUpdated,
          days
        );

        const leave = await LeaveServices.fetchApprovedLeaves(
          currentUserDetails.userId,
          monthUpdated,
          days
        );
        console.log(leave, "leaves");

        const mergeObj = mergeAttendanceAndLeave(
          attendence,
          leave,
          days,
          monthIndex
        );

        dispatch(setStoredAttendence({ month: monthIndex, result: mergeObj }));
      } catch (error) {
        toast.error(error)
        console.log(error);
      }
    };

    fetchAttendence();
  }, [monthIndex]);



  if (loader) return <AttendenceSkeleton />;

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
            const { color, reason } = selectCLR(
              index + 1,
              monthIndex,
              storedAttendence?.[monthIndex] || {},
              total.current
            );

            return (
              <div key={index} className="relative group">
                <div
                  className={`relative w-8 sm:w-10 h-8 sm:h-10 rounded-lg transition-all transform hover:scale-105 cursor-pointer shadow-sm border flex items-center justify-center text-xs sm:text-sm font-semibold text-white ${color}`}
                >
                  {index + 1}

                  {reason && (
                    <div
                      className="absolute -top-14 left-1/2 -translate-x-1/2 w-max max-w-[150px] bg-white text-gray-700 text-xs rounded-lg shadow-md p-2 
                 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50"
                    >
                      {reason}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-6 mt-6 text-sm sm:text-base border-t border-gray-200 pt-4">
          <LegendItem
            color="bg-green-400 border border-green-600"
            label="Present"
          />
          <LegendItem color="bg-red-400 border border-red-600" label="Absent" />
          <LegendItem
            color="bg-yellow-400 border border-yellow-400"
            label="Half Day"
          />
          <LegendItem
            color="bg-blue-400 border border-blue-500"
            label="Overtime"
          />
          <LegendItem
            color="bg-gray-400 border border-gray-500"
            label="No Record"
          />
        </div>
      </div>
      <TotalSummary totals={total.current} />
    </div>
  );
};

export default memo(AttendenceHistory);
