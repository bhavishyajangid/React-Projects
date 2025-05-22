export const resetTaskCategory = (state) => {
  const categories = ['acceptedTask', 'completedTask', 'newTask', 'rejectedTask'];

  // Reset each category's task array and value counter
  categories.forEach(cat => {
    state[cat].task = [];
    state[cat].value = 0;
  });

  // Reset other state properties individually if needed
  state.allTask = [];
  state.loaderForSkeleton = false;
  state.loading = false;
  state.error = null;
};
