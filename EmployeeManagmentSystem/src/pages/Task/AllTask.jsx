import React, { memo, useCallback } from "react";
import { CardSkeleton, Loader, TaskCard } from "../../export";
import { FilterBar } from "../../export"; // adjust path as needed
import { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { Link, useLocation } from "react-router";
import { FiFilter } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import TaskServices from "../../Appwrite/Task";
import { showError } from "../../utlity/Error&Sucess";
import { handleFilterTask } from "../../Store/thunks/taskThunk";
const AllTask = ({ tasks, heading }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [showFilters, setShowFilters] = useState(false);
  const { loading } = useSelector((state) => state.taskSlice);
  const [alltask, setAlltask] = useState(tasks);
  const dispatch = useDispatch();

  const filterTask = useCallback(async (data) => {
    if (data.employeeId == "" && data.startDate == "" && data.endDate == "")
      return;

    try {
      const result = await dispatch(handleFilterTask(data)).unwrap();
      setAlltask(result);
    } catch (error) {
      console.log(error);

      showError(error.message);
    }
  }, []);

  const resetTask = useCallback(() => {
    setAlltask(tasks);
  }, []);

  return (
    <div className="px-5 py-5 flex flex-col gap-5  ">
      <div className="flex justify-between items-center ">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-700 mb-5 ">
          Pending Task
        </h1>

        <div className="flex gap-5">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className=" text-white font-medium bg-sky-500 hover:bg-sky-300 hover:text-gray-800 px-4 py-1.5  rounded-md flex items-center gap-2 "
          >
            <FiFilter />
            Filter
          </button>

          {currentPath == "/task" && (
            <div className="flex justify-end items-center">
              <Link to="/addTask">
                <button className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-medium px-4 py-1.5 rounded-lg shadow-sm transition duration-200 max-sm:text-sm">
                  <FaCirclePlus className="text-lg max-sm:text-sm" />
                  <span>Add Task</span>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {showFilters && (
        <FilterBar filterTask={filterTask} resetTask={resetTask} />
      )}

      {loading ? (
        <CardSkeleton />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 ">
          {alltask && alltask.length === 0 ? (
            <p className="text-center text-lg font-medium text-gray-500 col-span-full mt-10">
              There are no tasks
            </p>
          ) : (
            alltask.map((item) => <TaskCard key={item.$id} item={item} />)
          )}
        </div>
      )}
    </div>
  );
};

export default memo(AllTask);
