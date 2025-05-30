
import AllTask from '../Task/AllTask'
import { PastTaskInfo } from '../../export';
import { useSelector } from 'react-redux'
import { MdOutlineFreeCancellation } from "react-icons/md";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { FaTasks } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";

const Task = () => {
      const {currentUserDetails} = useSelector(state => state.authSlice)
    const {allTask , newTask , completedTask , acceptedTask , rejectedTask} = useSelector(state => state.taskSlice)

      const taskInfo = [
         {
            color : "sky-400",
            value : newTask.value,
            label: 'New Task',
            link : "/newTask",
            icon : < VscGitPullRequestNewChanges/>
         }, 
         {
          color : "yellow-400",
          value : completedTask.value,
          label : currentUserDetails.admin ? 'Pending Task' : 'Completed Task',
          link : '/completedTask',
          icon : currentUserDetails.admin ? <MdOutlinePendingActions /> : <FaTasks />
         },
         {
            color : "green-400",
            value :  acceptedTask.value,
            label : currentUserDetails.admin ? "Approved Task" : "Accepted Task",
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
    <div>
         <PastTaskInfo option={taskInfo} heading={"Task Overview"}/>
        <AllTask tasks={allTask} heading={"All Task"} />
    </div>
  )
}

export default Task