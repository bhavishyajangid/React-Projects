import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Button, CardSkeleton, FilterBar, TaskCard } from "../../export";

import { FiFilter } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation } from "react-router";
import { handleFilterTask } from "../../Store/thunks/taskThunk";
import { showError } from "../../utlity/Error&Sucess";
import { getCorrectTaskList } from "../../utlity/getCorrectTaskList";

const AllTask = ({ tasks, heading }) => {
  const taskSlice = useSelector((state) => state.taskSlice);
  const { currentUserDetails, allEmployee } = useSelector(
    (state) => state.authSlice
  );
  const location = useLocation();
  const currentPath = location.pathname;
  const [showFilters, setShowFilters] = useState(false);
  const { loading } = useSelector((state) => state.taskSlice);
  const [allFilterTask, setAllFilterTask] = useState(tasks);
  const dispatch = useDispatch();
  let you = currentUserDetails.admin ? "admin" : "user";
  let other = currentUserDetails.admin ? "user" : "admin";
  const fieldData = useRef({});
  useEffect(() => {
    setAllFilterTask(tasks);
  }, [tasks]);

  const filterTask = useCallback(
    async (data) => {
      if (data.employeeId == "" && data.startDate == "" && data.endDate == "") {
        toast.info("Please select at least one filter.");
        return;
      }

      fieldData.current = data;

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
    fieldData.current = {};
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
      <div className="flex justify-between items-center  max-md:mt-10">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-700 ">
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
       
          <div className="flex gap-5 max-md:gap-3">
            {
              currentPath == "/task"  &&
            <button
              onClick={() => setShowFilters(!showFilters)}
              className=" text-white font-medium bg-sky-500 hover:bg-sky-300 hover:text-gray-800 px-4 py-1.5 max-sm:px-2 max-sm:py-1  rounded-md flex items-center gap-2 "
            >
              <FiFilter />
              <span className="max-sm:hidden">Filter</span>
            </button>
            }
            
  {currentPath == "/task" && currentUserDetails.admin &&( 
            <div className="flex justify-end items-center">
              <Link to="/addTask">
                <Button label="Add Task" plus={true} type="" />
              </Link>
            </div>
        )}
          </div>
      </div>

      {showFilters && (
        <FilterBar
          filterTask={filterTask}
          resetTask={resetTask}
          dropDownOption={currentUserDetails.admin ? allEmployee : null }
          dropDownName={currentUserDetails.admin ? "Employee" : null}
          fieldData={fieldData.current}
        />
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
