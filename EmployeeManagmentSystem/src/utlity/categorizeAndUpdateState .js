export const categorizeAndUpdateState = (task, state , update = false ) => {

  if(update){
    const categories = [state.newTask, state.acceptedTask, state.rejectedTask, state.completedTask];

  categories.forEach(category => {
        const index = category.task.findIndex(t => t.$id === task.$id);
        if (index !== -1) {
         console.log(category , 'this is category tas');
         
          category.task.splice(index, 1);
          category.value = Math.max(0, category.value - 1);
    
   }
  });

  }
  
  if (task.status === "new") {
    state.newTask.task.push(task);
    state.newTask.value++;
  } else if (task.status === "accepted") {
    state.acceptedTask.task.push(task);
    state.acceptedTask.value++;
  } else if (task.status === "rejected") {
    state.rejectedTask.task.push(task);
    state.rejectedTask.value++;
  } else if (task.isCompleted) {
    state.completedTask.task.push(task)
    state.completedTask.value += 1
  } else {
    state.allTask.push(task);
  }
}
