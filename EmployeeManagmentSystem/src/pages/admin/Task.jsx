import { useSelector } from "react-redux";
import { FaCirclePlus } from "react-icons/fa6";
import { GridCards, AllTask } from "../../export";

const Task = () => {
  const { allTask } = useSelector((state) => state.taskSlice);

  return (
    <div className="space-y-8 px-4 md:px-8 ">
    
      <GridCards />

   
    

      {/* Task List Section */}
      <AllTask tasks={allTask} heading="All Tasks" />
    </div>
  );
};

export default Task;
