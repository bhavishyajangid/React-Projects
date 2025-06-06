export const categorizeAndUpdateState = (task, state, update = false) => {


  const removeTaskFromCategory = (category, task) => {
    if (Array.isArray(category)) {
      
      const index = category.findIndex((t) => t.$id === task.$id);
      if (index !== -1) {
        category.splice(index, 1);
      }
    } else if (category && Array.isArray(category.task)) {
      // named task categories: object with task/value
      const index = category.task.findIndex((t) => t.$id === task.$id);
      if (index !== -1) {
        category.task.splice(index, 1);
        category.value = Math.max(0, category.value - 1);
      }
    }
  };

  if (task.status === "new") {
    if (update) {
      let index = state.newTask.task.findIndex((ind) => ind.$id == task.$id);
      if (index !== -1) {
        state.newTask.task[index] = task;
      } else {
        state.newTask.task.push(task);
        state.newTask.value++;
      }
    } else {
      state.newTask.task.push(task);
      state.newTask.value++;
    }
  } else if (task.status === "accepted") {
    state.acceptedTask.task.push(task);
    state.acceptedTask.value++;
    if (update) removeTaskFromCategory(state.completedTask, task);
  } else if (task.status === "rejected") {
    state.rejectedTask.task.push(task);
    state.rejectedTask.value++;
    if (update) {
      if (task.rejectedBy == "admin") {
        removeTaskFromCategory(state.completedTask, task);
      } else {
        removeTaskFromCategory(state.newTask, task);
      }
    }
  } else if (task.isCompleted && task.status == "pending") {
    state.completedTask.task.push(task);
    state.completedTask.value += 1;
    if (update) removeTaskFromCategory(state.allTask, task);
    console.log("penfding ");
    
  } else {
  // Reclassify and remove from wrong category if needed
  let index = state.allTask.findIndex((ind) => ind.$id == task.$id);
  if (index !== -1) {
    state.allTask[index] = task;
  } else {
    state.allTask.push(task);
     if (update){
      console.log("else");
      
       removeTaskFromCategory(
         task.sendBack ? state.completedTask : state.newTask,
         task
       );
     }
    }
  }
  
  }


