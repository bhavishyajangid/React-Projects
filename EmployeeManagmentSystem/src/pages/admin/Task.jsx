import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AllTask, CardSkeleton, GridCards } from "../../export";
import { fetchTask } from "../../Store/thunks/taskThunk";
import TaskShimmer from "../../components/skeleton/TaskShimmer";
const Task = () => {
  const { currentUserDetails } = useSelector(state => state.authSlice)
  const { allTask , loaderForSkeleton} = useSelector((state) => state.taskSlice);
  const dispatch = useDispatch()

  useEffect(() => {
    const taskFetch = async () => {
      if(allTask.length > 0) return  
      try {
        const res = await dispatch(fetchTask(currentUserDetails)).unwrap()
        console.log(res);
      } catch (error) {
        toast.error(error)
      }
    }

    taskFetch()
  }, [dispatch])

if(loaderForSkeleton) return <TaskShimmer/>

  return (
    <div>

      <GridCards />
      {/* Task List Section */}
      <AllTask tasks={allTask} heading="Pending Task" />
    </div>
  );
};

export default Task;
