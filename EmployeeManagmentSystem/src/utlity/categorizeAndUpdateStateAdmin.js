export const categorizeAndUpdateState = (task, state) => {
  if (task.status === "new") {
    state.newTask.task.push(task);
    state.newTask.value++;
  } else if (task.status === "accepted") {
    state.acceptedTask.task.push(task);
    state.acceptedTask.value++;
  } else if (task.status === "rejected") {
    state.rejectedTask.task.push(task);
    state.rejectedTask.value++;
  } else if (task.isCompleted && task.pending === "Accepted") {
    state.completedTask.task = [...state.completedTask.task , task]
    state.completedTask.value += 1
  } else {
    state.allTask.push(task);
  }
};
