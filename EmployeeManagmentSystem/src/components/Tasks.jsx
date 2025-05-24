
import { useSelector } from "react-redux";
import AcceptOrReject from "./AcceptOrReject";
import Status from "./Status";
import AdminOption from "./AdminOption";
import { Link } from "react-router";

const Tasks = ({ item, onComplete, onEdit, onDelete, onChat }) => {
  const ControleDescriptionText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  
  const { currentUserDetails } = useSelector((state) => state.authSlice);

  return (
    <>
    <div className="bg-gray-800 text-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all relative min-w-[280px] min-h-[200px] flex flex-col ">
    <Link  to={`/id/${item.$id}`}>
      {/* Urgency & Status */}
      <div className="flex justify-between items-center mb-2">
        <span
          className={`text-sm px-2 py-1 rounded-full ${
            item.Urgent ? "bg-red-600 text-white" : "bg-green-600 text-white"
          }`}
        >
          {item.Urgent ? "Urgent" : "Normal"}
        </span>

        <div className="flex gap-5">
          <Status task={item} isAdmin={currentUserDetails.admin} type="card" />
        </div>
      </div>

      <div className="mb-3">
        <span className="text-xs text-gray-400">{item.Date}</span>
      </div>
      {/* Title */}
      <h2 className="text-xl font-semibold mb-1">{item.Tittle}</h2>

      {/* Description */}
      <p className="text-sm text-gray-300 mb-3">
        {ControleDescriptionText(item.Description, 150)}
      </p>

      {/* Assigned To */}
      {currentUserDetails.admin && (
        <div className="mb-3">
          <span className="text-xs bg-indigo-600 px-2 py-1 rounded-full">
            Assigned To: {item.AssignTo}
          </span>
        </div>

      )}

      {
        item.status == "rejected" && 
         <div className="mb-3">
          <span className="text-xs bg-red-500 capitalize px-2 py-1 rounded-full">
            Rejected By : {(item.rejectedBy == "user" && !currentUserDetails.admin ? "You" : (item.rejectedBy == 'admin' && currentUserDetails.admin ? "You" : currentUserDetails.admin ? "User" : "Admin") 
            )}
          </span>
        </div>
      }
</Link>
   

      {((item.status == "new" && !currentUserDetails.admin) ||
        (item.status == "pending" && item.isCompleted && currentUserDetails.admin)) && (
        <AcceptOrReject task={item} isAdmin={currentUserDetails.admin} />
      )}

        <AdminOption task={item}/>
</div>
    </>
  );
};

export default Tasks;
