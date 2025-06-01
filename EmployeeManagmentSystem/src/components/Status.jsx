import React from 'react'

const Status = ({task , isAdmin}) => {
  return (
<>
    
        <>
          {!task.isCompleted &&  task.userAction === 'accepted' && task.status == 'pending' ? (
            <span className={`text-xs font-medium px-3 py-1 rounded-full text-white ${task.sendBack ? "bg-red-500" : "bg-blue-500"}`}>
             {task.sendBack ? "send Back" : isAdmin ? "Accepted" : null}
            </span>
          ) : null}
        </>
  
               <span
className={`text-xs px-3 py-1  font-semibold flex justify-center items-center rounded  
    ${
      task.status === 'rejected'
    ? 'bg-red-400'
    : task.status == "accepted"
    ? 'bg-green-500 text-white' 
    : task.status == "pending" && !isAdmin && task.isCompleted 
    ? "bg-red-400"
    : task.status == 'new' && isAdmin 
    ? "bg-blue-500" 
    : !task.isCompleted && !isAdmin && task.status == 'pending'
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
    : !task.isCompleted && !isAdmin && task.status == 'pending'
    ? "Uncompleted" 
    :""
    }
</span>
</>
  )
}

export default Status