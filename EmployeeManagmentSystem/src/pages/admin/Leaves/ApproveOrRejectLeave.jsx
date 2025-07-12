import React from 'react'
import { GridCards } from '../../../export'

const ApproveOrRejectLeave = () => {
    const taskInfo = [
             {
                color : "blue-400",
                value : 0,
                label: '',
                link : "/newTask",
                icon : < VscGitPullRequestNewChanges/>
             }, 
             {
              color : "yellow-400",
              value : completedTask.value,
              label : currentUserDetails?.admin ? 'Unapproved Task' : 'Completed Task',
              link : '/completedTask',
              icon : currentUserDetails?.admin ? <MdOutlinePendingActions /> : <FaTasks />
             },
             {
                color : "green-400",
                value :  acceptedTask.value,
                label : "Approved Task",
                link : "/acceptedTask",
                icon : <HiOutlineClipboardDocumentCheck />
             },
             {
               color : "red-400",
               value : rejectedTask.value,
               label : "Rejected Task",
               link : "/rejectedTask",
               icon : <MdOutlineFreeCancellation/>
             }
         ];
  return (
    <GridCards/>
    
  )
}

export default ApproveOrRejectLeave