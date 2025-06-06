import { useSelector } from "react-redux";
import AcceptOrReject from "./AcceptOrReject";
import Status from "./Status";
import AdminOption from "./AdminOption";
import { Link } from "react-router";

const TaskCard = ({ item }) => {
  const { currentUserDetails } = useSelector((state) => state.authSlice);

  
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 flex flex-col justify-between min-h-[180px] min-w-[320px]">
      <Link to={`/id/${item.$id}`} className="flex flex-col gap-3 h-full">

        {/* Header: Urgent Badge + Status */}
        <div className="flex justify-between items-center">
          <span
            className={`text-xs font-medium px-2.5 py-0.5 rounded-full shadow-sm ${
              item.Urgent ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
            }`}
          >
            {item.Urgent ? "Urgent" : "Normal"}
          </span>
          <Status task={item} isAdmin={currentUserDetails.admin} type="card" />
        </div>

        {/* Title */}
  
          <p className="text-sm font-semibold text-gray-500 mt-2">Title :  <span className="text-base font-bold text-gray-600 capitalize">{item.Tittle}</span></p>
         

        

        {/* Date */}
          <p className="text-sm font-semibold text-gray-500">Date:  <span className="text-sm text-gray-600">{item.Date}</span></p>
         
       

        {/* Assigned To (for Admin) */}
        {currentUserDetails.admin && (
            <p className=" w-fit px-2 py-[1px] rounded-xl text-xs font-semibold text-white bg-purple-500  ">Assigned To: <span className="text-sm  ">{item.AssignTo}</span></p> 
        )}

        {/* Rejected Info */}
        {item.status === "rejected" && (
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm font-semibold text-gray-500">Rejected By:</p>
            <span className="text-xs bg-red-200 text-red-700 px-2 py-1 rounded-full shadow-sm">
              {(item.rejectedBy === "user" && !currentUserDetails.admin || item.rejectedBy === "admin" && currentUserDetails.admin)
                ? "You"
                : currentUserDetails.admin ? "User" : "Admin"}
            </span>
          </div>
        )}
      </Link>

      {/* Accept/Reject (Conditional) */}
      {(item.status === "new" && !currentUserDetails.admin) ||
      (item.status === "pending" && item.isCompleted && currentUserDetails.admin) ? (
        <div className="mt-3">
          <AcceptOrReject task={item} isAdmin={currentUserDetails.admin} />
        </div>
      ) : null}

      {/* Admin Options */}
      <div className="mt-3 self-end">
        <AdminOption task={item} />
      </div>
    </div>
  );
};

export default TaskCard;
