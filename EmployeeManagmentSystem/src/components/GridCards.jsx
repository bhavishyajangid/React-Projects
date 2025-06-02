
import { useSelector } from 'react-redux';
import MiniCard from './MiniCard';
import { MdOutlineFreeCancellation } from "react-icons/md";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { FaTasks } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { Link } from 'react-router';


const GridCards = ({option}) => {
  
       const {currentUserDetails} = useSelector(state => state.authSlice)
    const { newTask , completedTask , acceptedTask , rejectedTask} = useSelector(state => state.taskSlice)

    console.log(currentUserDetails , 'user');
    

   const taskInfo = [
         {
            color : "blue-400",
            value : newTask.value,
            label: 'New Task',
            link : "/newTask",
            icon : < VscGitPullRequestNewChanges/>
         }, 
         {
          color : "yellow-400",
          value : completedTask.value,
          label : currentUserDetails?.admin ? 'Pending Task' : 'Completed Task',
          link : '/completedTask',
          icon : currentUserDetails?.admin ? <MdOutlinePendingActions /> : <FaTasks />
         },
         {
            color : "green-400",
            value :  acceptedTask.value,
            label : currentUserDetails?.admin ? "Approved Task" : "Accepted Task",
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

     let finalOption = option ? option : taskInfo
     
  return (
    <div className="flex-1 px-1 md:p-5">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">Task Overview</h1>
     <div className="grid sm:grid-cols-1 md:grid-cols-2  md:grid-rows-2  gap-6  xl:grid-cols-4">
           
           {

              finalOption?.map((item , index) => (
                 <Link to={item.link} key={index}>
                 <MiniCard  item={item}/>
                 </Link>
              ))
           }
           
        </div>
        </div>
  )
}

export default GridCards