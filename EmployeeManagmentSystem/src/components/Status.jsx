import React from 'react'

const Status = ({task , isAdmin , type}) => {
  return (
<>
    {type === "card" && (
        <>
          {(task.isCompleted && !isAdmin) || task.status === "accepted" ? (
            <span className="text-xs px-3 py-1 font-semibold rounded-lg capitalize bg-red-500 text-white">
              {task.status === "accepted" ? "Approved" : "Pending for approval"}
            </span>
          ) : null}

          {!task.isCompleted && isAdmin && task.userAction === 'accepted' ? (
            <span className="text-xs px-3 py-1 rounded-lg capitalize bg-blue-500 font-semibold text-white">
              Accepted
            </span>
          ) : null}
        </>
      )}
               <span
className={`text-sm px-6 py-1  font-semibold flex justify-center items-center rounded text-white 
    ${task.status === 'rejected'  
      ? 'bg-red-500' 
      : task.isCompleted 
      ? 'bg-green-500' 
      : task.status == 'new' && isAdmin 
      ? "bg-blue-500" 
      : "text-orange-500"
      
      }
  `}>
  {task.status === 'rejected'
    ? 'Rejected'
    : task.isCompleted 
    ? 'Completed'
    : task.status == 'new' && isAdmin 
    ? "Not Accepted" 
    : 'Uncompleted'}
</span>
</>
  )
}

export default Status