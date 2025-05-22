
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import {  CompletedTask, TaskValue } from '../../export';
const PastTaskInfo = () => {
  const {currentUserDetails} = useSelector(state => state.authSlice)
  const {newTask , completedTask , rejectedTask , acceptedTask} = useSelector(state => state.taskSlice)
    const taskInfo = [
         {
            color : "bg-sky-400",
            value : newTask.value,
            name : "New Task",
            link : "/newTask"
         }, 
         {
          color : "bg-yellow-400",
          value : completedTask.value,
          name : currentUserDetails.admin ? "Submitted Task" : "Completed Task",
          link : '/completedTask'
         },
         {
            color : "bg-green-400",
            value :  acceptedTask.value,
            name : "Accepted Task",
            link : "/acceptedTask"
         },
         {
           color : "bg-red-400",
           value : rejectedTask.value,
           name : "Rejected Task",
           link : "/rejectedTask"
         }
     ];
  return (
    <div className='w-full grid grid-cols-[repeat(4,_minmax(150px,_1fr))] max-md:grid-cols-2 max-md:grid-rows-2 gap-4 max-md:px-8 px-14 mt-10 max-sm:mt-5'>
           {
              taskInfo.map((item , index) => (
               <Link to={item.link} key={index}>
                 <TaskValue item={item}/>
              </Link>
              ))
           }
        </div>
  )
}

export default PastTaskInfo