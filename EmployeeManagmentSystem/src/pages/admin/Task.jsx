import { useSelector } from "react-redux";
import { FaCirclePlus } from "react-icons/fa6";
import { GridCards, AllTask } from "../../export";

const Task = () => {
  const { allTask } = useSelector((state) => state.taskSlice);

  console.log("running allTask" , allTask);
  return (
    <div>
    
      <GridCards />

   
    

      {/* Task List Section */}
      <AllTask tasks={allTask} heading="Pending Task" />
    </div>
  );
};

export default Task;
