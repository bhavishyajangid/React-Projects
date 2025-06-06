// src/utility/getCorrectTaskList.js
export const getCorrectTaskList = (heading, taskSlice) => {
  switch (heading?.toLowerCase()) {
    case "new task":
      return taskSlice.newTask.task;
    case "accepted task":
      return taskSlice.acceptedTask.task;
    case "rejected task":
      return taskSlice.rejectedTask.task;
    case "completed task":
      return taskSlice.completedTask.task;
    case "pending task":
    default:
      return taskSlice.allTask;
  }
};
