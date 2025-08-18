import { memo, useCallback, useEffect, useRef, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { IoIosAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router";
import { toast } from "react-toastify";
import dataBaseServices, { databaseServices } from "../../../Appwrite/Database";
import { Button, FilterBar, ShimmerLeaveHistory } from "../../../export";
import {
  setAllLeave,
  setStoreLeaves,
  setLoader,
} from "../../../Store/leaveSlice";
import LeaveServices from "../../../Appwrite/Leave";
import { formatDate } from "../../../utlity/formateDate";

const LeaveHistory = () => {
  const dropDownOption = [
    { userName: "approved" },
    { userName: "pending" },
    { userName: "rejected" },
  ];

  const { empId } = useParams();
  const dispatch = useDispatch();
  const { loader, allLeave, storedLeaves, prevEmpId, firstRender } =
    useSelector((state) => state.leaveSlice);
  const { currentUserDetails } = useSelector((state) => state.authSlice);
  const [showFilter, setShowFilter] = useState(false);
  const [filterLeaves, setFilterLeaves] = useState(null);
  const [leave, setLeave] = useState([]);
  let filterData = filterLeaves !== null ? filterLeaves : allLeave;

  const location = useLocation();

  const isAdminPage = location.pathname.includes("/admin/leavehistory");

  const handleFilter = useCallback(
    async (data) => {
      if (!data.startDate && !data.endDate && !data.status) {
        toast.info("Please select at least one filter.");
        return;
      }
      data.startDate = formatDate(data.startDate)
      data.endDate = formatDate(data.endDate)
      console.log(data);
      dispatch(setLoader(true));
      try {
        const res = await LeaveServices.filterLeaves(data);
        if (res) setFilterLeaves(res);
      } catch (error) {
        toast.error(error);
      } finally {
        dispatch(setLoader(false));
      }
    },
    [dispatch]
  );

  const reset = useCallback(() => {
    setFilterLeaves(null);
  }, [dispatch]);

  console.log("componetn rerender");

  useEffect(() => {
    console.log("useEffect run ");

    const isLeavesAlreadyFetched = isAdminPage
      ? Object.keys(storedLeaves).length > 0 // Admin view
      : Boolean(storedLeaves[empId]); // Employee view

    if (isLeavesAlreadyFetched && !firstRender) {
      // Avoid resetting if already the same

      const leavesToSet = isAdminPage
        ? Object.values(storedLeaves).flat()
        : storedLeaves[empId];

      dispatch(setAllLeave({ empId, leaves: leavesToSet }));
      return;
    }

    const handleLeave = async () => {
      let newEmpId = isAdminPage ? null : empId;
      dispatch(setLoader(true));
      try {
        const result = await LeaveServices.fetchLeaves(newEmpId);
        if (empId) {
          dispatch(setStoreLeaves({ empId, leaves: result, isAdminPage }));
          // firstRender.current = false;
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setLoader(false);
      }
    };

    if (empId !== prevEmpId) {
      handleLeave();
    }
  }, [empId]);

  if (loader) {
    return <ShimmerLeaveHistory />;
  }

  return (
    <div className="h-screen  bg-gray-100 flex flex-col ">
      {/* <GridCards/> */}
      <div className="w-full max-w-6xl">
        {/* 🔍 Search */}
        <div className="flex justify-between px-5 max-sm:px-2 max-sm:gap-3 mb-10 mt-5">
          <h2 className="text-2xl font-bold max-sm:text-xl">Leave History</h2>

          <div className="flex gap-5 max-sm:gap-3 ">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className=" text-white font-medium bg-sky-500 hover:bg-sky-300 hover:text-gray-800 px-4 py-1.5 max-sm:px-2 max-sm:py-1  rounded-md flex items-center gap-2 "
            >
              <FiFilter />
              <span className="max-sm:hidden">Filter</span>
            </button>

            {!currentUserDetails.admin && (
              <Link to="/addleave">
                <button className="px-4 py-2 bg-teal-500 text-white font-semibold rounded-lg text-sm flex justify-center items-center gap-2">
                  <IoIosAddCircle className="text-xl" />
                  <span className="max-sm:hidden"> Apply </span> Leave
                </button>
              </Link>
            )}
          </div>
        </div>
        {showFilter && (
          <FilterBar
            filterTask={handleFilter}
            resetTask={reset}
            dropDownName={"Status"}
            dropDownOption={dropDownOption}
          />
        )}

        {/* 🖥️ Desktop Table View */}
        <div className="hidden mt-10 sm:block overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-md text-sm">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="py-2 px-4 border">SNO</th>
                {isAdminPage && (
                  <th className="py-2 px-4 border">EmployeeName</th>
                )}

                <th className="py-2 px-4 border">LEAVE TYPE</th>
                <th className="py-2 px-4 border">FROM</th>
                <th className="py-2 px-4 border">TO</th>
                <th className="py-2 px-4 border">Days</th>
                <th className="py-2 px-4 border">STATUS</th>
                <th className="py-2 px-4 border">Show</th>
              </tr>
            </thead>
            <tbody>
              {filterData.length > 0 ? (
                filterData.map((item, index) => (
                  <tr
                    key={index}
                    className="text-center border-t hover:bg-gray-50"
                  >
                    <td className="py-2 px-4 border">
                      
                      {index + 1}</td>
                    {isAdminPage && (
                      <td className="py-2 capitalize px-4 border text-blue-600 font-medium">
                        {item.employeeName}
                      </td>
                    )}

                    <td className="py-2 px-4 border text-cyan-700 font-medium">
                     {
                       item.emergency &&  <span className="px-1.5 py-1 rounded-lg text-[20px] text-red-500 ">*</span>
                     }
                      {item.leaveType}
                    </td>
                    <td className="py-2 px-4 border">{item.fromDate}</td>
                    <td className="py-2 px-4 border">{item.toDate}</td>
                    <td className="py-2 px-4 border">{item.totalDays}</td>
                    <td className="py-2 px-4 border ">
                      
                      <span
                        className={`px-2 py-1  rounded-xl text-sm capitalize text-white font-semibold ${
                          item.status == "pending"
                            ? "bg-blue-500 "
                            : item.status == "approved"
                            ? "bg-green-500 "
                            : "bg-red-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border font-semibold">
                      
                      <Link to={`/leavedetails/${index}`}>
                        <button className="px-3 py-1 bg-teal-500 text-sm rounded-lg hover:bg-teal-600 text-white">
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>



        {/* 📱 Mobile Card View */}
        <div className="sm:hidden space-y-4 mt-5 px-3">
  {filterData.length === 0 ? (
    <div className="text-center py-4 text-gray-500">No records found.</div>
  ) : (
    filterData.map((leave, index) => (
      <div
        key={leave.$id}
        className="bg-white shadow rounded-lg p-4 border text-sm space-y-2 flex flex-col"
      >
        <div className="flex justify-between text-gray-600 font-semibold">
          <span>SNO:</span>
          <span>{index + 1}</span>
        </div>

        {isAdminPage && (
          <div className="flex justify-between">
            <span className="text-gray-600 font-semibold">Employee Name:</span>
            <span className="text-blue-600 font-medium">{leave.employeeName}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-gray-600 font-semibold">Leave Type:</span>
          <span className="text-cyan-700 font-medium">{leave.leaveType}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 font-semibold">Leave Day:</span>
          <span className="text-cyan-700 font-medium">{leave.leaveDay}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600 font-semibold">From:</span>
          <span>{leave.fromDate}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600 font-semibold">To:</span>
          <span>{leave.toDate}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600 font-semibold">Days:</span>
          <span>{leave.totalDays}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600 font-semibold">Applied Date:</span>
          <span className="font-semibold">{leave.appliedDate}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600 font-semibold">Status:</span>
          <span
            className={`px-2 py-1 rounded-xl text-sm capitalize text-white font-semibold ${
              leave.status === "pending"
                ? "bg-blue-500"
                : leave.status === "approved"
                ? "bg-green-500"
                : "bg-red-400"
            }`}
          >
            {leave.status}
          </span>
        </div>

        <div className={`flex ${leave.emergency ? "justify-between" : "justify-end"} gap-5`}>
          {
            leave.emergency && <span className="bg-red-400 rounded-lg px-2 py-1 text-xs text-white">emergency</span>
          }
          <Link to={`/leavedetails/${index}`}>
            <button className="px-3 py-1 bg-teal-500 text-sm rounded-lg hover:bg-teal-600 text-white">
              View
            </button>
          </Link>
        </div>
      </div>
    ))
  )}
</div>




      </div>
    </div>
  );
};

export default memo(LeaveHistory);
