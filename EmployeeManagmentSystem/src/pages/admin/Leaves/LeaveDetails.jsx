import { useEffect, useState , useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import dataBaseServices from "../../../Appwrite/Database";
import { LeaveDetailsShimmer } from "../../../export";
import LeaveServices from "../../../Appwrite/Leave";

const LeaveDetails = () => {
  const { userId, index } = useParams();
  console.log(userId, index);

  const { currentUserDetails } = useSelector((state) => state.authSlice);
  const { leaveByEmployee , allLeave } = useSelector((state) => state.leaveSlice);
  const isAdmin = currentUserDetails?.admin;
  const navigate = useNavigate();

  const [leave, setLeave] = useState([]);
  const [loading, setLoading] = useState(true);
  let leaveId = useRef('')
  useEffect(() => {
    const handleLeaveDetails = async () => {
      try {
        if (leaveByEmployee[userId]) {
          console.log(leaveByEmployee[userId][index], "leaveInfo");
          let Leave = leaveByEmployee[userId][index];
           leaveId.current = Leave.$id
          if (isAdmin) {
            const user = await dataBaseServices.getUser(Leave.employeeId);
            if (user) {
              setLeave({ ...Leave, user });
            }
          } else {
            setLeave(leave);
          }
        }
      } catch (error) {
        toast.error(error.message || "failed to fetch ");
      } finally {
        setLoading(false);
      }
    };

    handleLeaveDetails();
  }, [userId, index]);

  const handleStatusChange = async (status) => {
    console.log(leaveByEmployee , allLeave);
    setLoading(true)
  try {
    await LeaveServices.updateLeave(leaveId.current , status)
  } catch (error) {
    toast.error(error.message)
  }finally{
    setLoading(false)
  }
  };
  

  const leaveFields = [
    {
      label: "Leave Type",
      value: leave?.leaveType,
      className: "text-blue-500 font-semibold",
    },
    { label: "From Date", value: leave?.fromDate },
    { label: "To Date", value: leave?.toDate },
    { label: "Total Days", value: leave?.totalDays },
    { label: "Applied Date", value: leave?.appliedDate },
    {
      label: "Description",
      value: leave?.description,
      className: "whitespace-pre-wrap break-words max-w-full ",
    },
    { label: "Status", value: leave.status },
    leave?.attachmentUrl && {
      label: "Attachment",
      value: leave?.attachmentUrl,
    },
  ].filter(Boolean);

  if (loading) return <LeaveDetailsShimmer />;

  return (
    <div className="bg-gray-100 flex justify-center py-5 px-2 sm:px-4 md:px-6 lg:px-10 scrollbar-hide">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-4 sm:p-6 overflow-x-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-teal-600">
          Leave Details
        </h2>

        <div className="mb-10">
          {isAdmin && leave?.user && (
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
                Employee Information
              </h3>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <img
                  src={leave.user.profileUrl || "/user-avatar.png"}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div>
                  <div className="text-sm sm:text-base font-semibold capitalize text-gray-700">
                    {leave.user.userName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {leave.user.email}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                {[
                  { label: "Phone", value: leave.user.number },
                  { label: "Gender", value: leave.user.gender },
                  { label: "Marital Status", value: leave.user.maritalStatus },
                  { label: "DOB", value: leave.user.dob },
                  { label: "Department", value: leave.user.department },
                  { label: "Employee ID", value: leave.user.userId },
                ].map((field, idx) => (
                  <div className="flex gap-3">
                    <span className="text-sm font-semibold text-gray-600 whitespace-nowrap">
                      {field.label} :
                    </span>
                    <span className={`text-sm  break-words`}>
                      {field.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4 text-sm">
            {leaveFields.map((item, index) => (
              <DetailRow
                key={index}
                label={item.label}
                value={item.value}
                className={item.className}
              />
            ))}
          </div>

          {isAdmin && leave.status === "pending" && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 gap-3">
              <span className="font-semibold text-gray-600 text-sm">
                Action:
              </span>
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => handleStatusChange("approved")}
                  className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-1.5 rounded-md"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange("rejected")}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-1.5 rounded-md"
                >
                  Reject
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value, className = "text-gray-800" }) => {
  const isLong = label === "Description" && value?.length > 20;

  return (
    <div
      className={`${
        isLong ? "flex flex-col" : "flex justify-between"
      } gap-1 sm:gap-2 border-b py-2`}
    >
      <span className="text-sm font-semibold text-gray-600 whitespace-nowrap">
        {label} :
      </span>

      {label === "Status" ? (
        <span
          className={`px-3 py-1 rounded-full text-white font-medium capitalize ${
            value === "approved"
              ? "bg-green-500"
              : value === "pending"
              ? "bg-blue-500"
              : "bg-red-400"
          }`}
        >
          {value}
        </span>
      ) : label === "Attachment" ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline break-words"
        >
          View Attachment
        </a>
      ) : (
        <span className={`text-sm ${className} break-words`}>{value}</span>
      )}
    </div>
  );
};

export default LeaveDetails;
