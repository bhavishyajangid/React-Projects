import { memo, useCallback, useEffect, useState } from "react";
import { Button, CardSkeleton, FilterBar, TaskCard } from "../../export";

import { FiFilter } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation } from "react-router";
import { handleFilterTask } from "../../Store/thunks/taskThunk";
import { showError } from "../../utlity/Error&Sucess";
import { getCorrectTaskList } from "../../utlity/getCorrectTaskList";

const AllTask = ({ tasks, heading }) => {
  const taskSlice = useSelector((state) => state.taskSlice);
  const { currentUserDetails , allEmployee } = useSelector((state) => state.authSlice);
  const location = useLocation();
  const currentPath = location.pathname;
  const [showFilters, setShowFilters] = useState(false);
  const { loading } = useSelector((state) => state.taskSlice);
  const [allFilterTask, setAllFilterTask] = useState(tasks);
  const dispatch = useDispatch();
  let you = currentUserDetails.admin ? "admin" : "user";
  let other = currentUserDetails.admin ? "user" : "admin";

  useEffect(() => {
    setAllFilterTask(tasks);
  }, [tasks]);

  const filterTask = useCallback(
    async (data) => {
      if (data.employeeId == "" && data.startDate == "" && data.endDate == "")
        return;

      try {
        const result = await dispatch(handleFilterTask(data)).unwrap();
        setAllFilterTask(result);
      } catch (error) {
        console.log(error);

        showError(error.message);
      }
    },
    [Navigate]
  );

  const resetTask = useCallback(() => {
    let task = getCorrectTaskList(heading, taskSlice);
    setAllFilterTask(task);
  }, [heading, taskSlice]);

  const filterRejectedTask = (value) => {
    let task = getCorrectTaskList(heading, taskSlice);

    if (value == "") {
      setAllFilterTask(task);
    } else {
      let filterTask = task.filter((item) => item.rejectedBy == value);
      setAllFilterTask(filterTask);
    }
  };

  return (
    <div className=" md:px-5 flex flex-col gap-5  ">
      <div className="flex justify-between items-center  ">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-700 max-md:mt-10 md:mb-5 ">
          {heading}
        </h1>
        {currentPath == "/rejectedTask" && (
          <div>
            <select
              onChange={(e) => filterRejectedTask(e.target.value)}
              className="w-full bg-white border border-gray-300 text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 capitalize"
            >
              <option value="">Rejected By</option>
              <option value={you}> You </option>
              <option value={other}> {other} </option>
            </select>
          </div>
        )}
        {(currentPath == "/task" && currentUserDetails.admin) && (
          <div className="flex gap-5">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className=" text-white font-medium bg-sky-500 hover:bg-sky-300 hover:text-gray-800 px-4 py-1.5  rounded-md flex items-center gap-2 "
            >
              <FiFilter />
              Filter
            </button>

         
              <div className="flex justify-end items-center">
                <Link to="/addTask">
                  <Button label="Add Task" type=""/>
                </Link>
              </div>
          
          </div>
        )}
      </div>

      {showFilters && (
        <FilterBar filterTask={filterTask} resetTask={resetTask} dropDownOption={allEmployee} dropDownName={"Employee"} />
      )}

      {loading ? (
        <CardSkeleton />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 ">
          {allFilterTask && allFilterTask.length === 0 ? (
            <p className="text-center text-lg font-medium text-gray-500 col-span-full mt-10">
              There are no tasks
            </p>
          ) : (
            allFilterTask.map((item) => <TaskCard key={item.$id} item={item} />)
          )}
        </div>
      )}
    </div>
  );
};

export default memo(AllTask);
