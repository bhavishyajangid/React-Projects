import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import dataBaseServices from "../../../Appwrite/Database";
import { LeaveDetailsShimmer } from "../../../export";

const LeaveDetails = () => {
  const { leaveId } = useParams();
  const { currentUserDetails } = useSelector((state) => state.authSlice);
  const isAdmin = currentUserDetails?.admin;
  const navigate = useNavigate();

  const [leave, setLeave] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaveUser = async () => {
      try {
        const singleLeave = await dataBaseServices.fetchSingleLeave(leaveId);

        if (isAdmin) {
          const user = await dataBaseServices.getUser(singleLeave.employeeId);
          setLeave([{ ...singleLeave, user }]);
        } else {
          setLeave([{ ...singleLeave }]);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveUser();
  }, [leaveId, isAdmin]);

  const handleStatusChange = async (status) => {
    try {
      await dataBaseServices.updateLeaveStatus(leaveId, status);
      toast.success(`Leave ${status}`);
      navigate(-1);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (loading || leave.length === 0) return <LeaveDetailsShimmer />;

  return (
    <div className="bg-gray-100 flex justify-center py-5 px-2 scrollbar-hide">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-teal-600">Leave Details</h2>

        {leave.map((item, index) => {
          const leaveFields = [
            { label: "Leave Type", value: item.leaveType, className: "text-blue-500 font-semibold" },
            { label: "From Date", value: item.fromDate },
            { label: "To Date", value: item.toDate },
            { label: "Total Days", value: item.totalDays },
            { label: "Applied Date", value: item.appliedDate },
            { label: "Description", value: item.description, className: "whitespace-pre-wrap break-all max-w-full" },
            {
              label: "Status",
              value: (
                <span className={`px-3 py-1 rounded-full text-white font-medium capitalize ${
                  item.status === "approved"
                    ? "bg-green-500"
                    : item.status === "pending"
                    ? "bg-blue-500"
                    : "bg-red-400"
                }`}>
                  {item.status}
                </span>
              )
            },
            item.attachmentUrl && {
              label: "Attachment",
              value: (
                <a
                  href={item.attachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Attachment
                </a>
              )
            }
          ].filter(Boolean);

          return (
            <div key={index} className="mb-10">
              {isAdmin && item.user && (
                <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Employee Information</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={item.user.profileImage || "/user-avatar.png"}
                      alt="Profile"
                      className="w-16 h-16 rounded-full object-cover border"
                    />
                    <div>
                      <div className="text-md font-semibold text-gray-700">{item.user.name}</div>
                      <div className="text-sm text-gray-500">{item.user.email}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                    {[
                      { label: "Phone", value: item.user.phone },
                      { label: "Gender", value: item.user.gender },
                      { label: "Marital Status", value: item.user.maritalStatus },
                      { label: "DOB", value: item.user.dob },
                      { label: "Department", value: item.user.department },
                      { label: "Employee ID", value: item.user.employeeId },
                      { label: "Joining Date", value: item.user.joiningDate },
                      { label: "Designation", value: item.user.designation },
                      { label: "Location", value: item.user.location },
                    ].map((field, idx) => (
                      <DetailRow key={idx} label={field.label} value={field.value || "-"} />
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4 text-sm">
                {leaveFields.map((field, i) => (
                  <DetailRow
                    key={i}
                    label={field.label}
                    value={field.value}
                    className={field.className}
                  />
                ))}
              </div>

              {isAdmin && item.status === "pending" && (
                <div className="flex items-center justify-between mt-6">
                  <span className="font-semibold text-gray-600 text-sm">Action:</span>
                  <div className="flex gap-4">
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
          );
        })}
      </div>
    </div>
  );
};

const DetailRow = ({ label, value, className = "text-gray-800" }) => (
  <div className={`border-b py-2 flex  flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 w-full`}>
    <div className="text-sm font-semibold text-gray-600 whitespace-nowrap">{label}:</div>
    <div className={`text-sm ${className} w-full break-all`}>{value}</div>
  </div>
);

export default LeaveDetails;
