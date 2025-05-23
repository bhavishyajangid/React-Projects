import React from 'react'

const Status = ({task , isAdmin , type}) => {
  return (
<>
    {type === "card" && (
        <>
          {/* {(task.isCompleted && !isAdmin) || task.status === "accepted" ? (
            <span className="text-xs px-3 py-1 font-semibold rounded-lg capitalize bg-red-500 text-white">
              {task.status === "accepted" ? "Approved" : "Pending for approval"}
            </span>
          ) : null} */}

          {!task.isCompleted && isAdmin && task.userAction === 'accepted' && !task.status == 'rejected' ? (
            <span className="text-xs px-3 py-1 rounded-lg capitalize bg-blue-500 font-semibold text-white">
              Accepted
            </span>
          ) : null}
        </>
      )}
               <span
className={`text-xs px-3 py-1  font-semibold flex justify-center items-center rounded  
    ${
      task.status === 'rejected'
    ? 'bg-red-400'
    : task.status == "accepted"
    ? 'bg-green-500' 
    : task.status == "pending" && !isAdmin && task.isCompleted 
    ? "bg-red-400"
    : task.status == 'new' && isAdmin 
    ? "bg-blue-500" 
    : !task.isCompleted 
    ? "text-orange-400" 
    :"hidden"
      }
  `}>
  {task.status === 'rejected'
    ? 'Rejected'
    : task.status == "accepted"
    ? 'Approved' 
    : task.status == "pending" && !isAdmin && task.isCompleted 
    ? "Pending For approval"
    : task.status == 'new' && isAdmin 
    ? "Not Accepted" 
    : !task.isCompleted 
    ? "Uncompleted" 
    :""
    }
</span>
</>
  )
}

export default Status