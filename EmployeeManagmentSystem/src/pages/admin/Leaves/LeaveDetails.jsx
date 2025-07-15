import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import dataBaseServices from "../../../Appwrite/Database";
import { Loader } from "../../../export";

const LeaveDetails = () => {
  const {  leaveId } = useParams();
  const {allLeave} = useSelector(state => state.leaveSlice)
  const { currentUserDetails } = useSelector((state) => state.authSlice);
  const isAdmin = currentUserDetails?.admin
  const navigate = useNavigate();

  let index = allLeave.findIndex((item) => item.$id == leaveId)
  let leave = index >= 0 ? allLeave[index] : {}
  console.log(leave);
  
  
  

//   useEffect(() => {
//     const fetchLeave = async () => {
//       try {
//         const result = await dataBaseServices.getLeaveById(leaveId);
//         setLeave(result);
//       } catch (error) {
//         toast.error("Unable to fetch leave details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (leaveId) fetchLeave();
//   }, [leaveId]);

//   const handleStatusChange = async (newStatus) => {
//     try {
//       await dataBaseServices.updateLeaveStatus(leaveId, newStatus);
//       toast.success(`Leave ${newStatus}`);
//       navigate(`/leavehistory/${empId}`);
//     } catch (error) {
//       toast.error("Failed to update status.");
//     }
//   };

//   if (loading) return <Loader />;

  if (!leave) return <div className="text-center text-gray-500 mt-10">Leave not found</div>;

  return (
    <div className=" bg-gray-100 flex justify-center py-5 ">
      <div className="bg-white shadow-md rounded-lg w-full max-w-4xl max-sm:w-full p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-teal-600">Leave Details</h2>

        <div className="space-y-4 text-sm">
          <DetailRow label="Leave Type" value={leave.leaveType} className="text-blue-400 font-semibold" />
          <DetailRow label="From Date" value={leave.fromDate} />
          <DetailRow label="To Date" value={leave.toDate} />
          <DetailRow label="Total Days" value={leave.totalDays} />
          <DetailRow label="Applied Date" value={leave.appliedDate} className = "font-semibold" />
          <DetailRow label="Description" value={leave.description} className="break-words whitespace-pre-wrap" />
          <DetailRow label="Status" value={
            <span className={`px-3 py-1 rounded-full text-white font-medium capitalize
              ${leave.status === 'approved' ? 'bg-green-500' :
                leave.status === 'pending' ? 'bg-blue-500' : 'bg-red-400'}`}>
              {leave.status}
            </span>
          } />
          {leave.attachmentUrl && (
            <DetailRow
              label="Attachment"
              value={
                <a
                  href={leave.attachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Attachment
                </a>
              }
            />
          )}
        </div>

        {isAdmin && leave.status === "pending" && (
            <div className="flex items-center justify-between mt-3">
            <span className="font-semibold text-gray-600 mt-2 text-sm">Action :</span>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleStatusChange("approved")}
              className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-3  rounded-md"
            >
              Approve
            </button>
            <button
              onClick={() => handleStatusChange("rejected")}
              className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-3 py-2  rounded-md"
            >
              Reject
            </button>
          </div>
            </div>
        )}
      </div>
    </div>
  );
};

const DetailRow = ({ label, value , className = "text-gray-800"}) => (
    <div className={`border-b py-2 ${value?.length > 20 ? "" : "flex justify-between" }`}>
    <div className="text-sm font-semibold text-gray-600">{label} :</div>
     <div className={` text-sm  mt-1 ${className}`}>
      {value}
    </div> 
    
    
  </div>
);

export default LeaveDetails;
