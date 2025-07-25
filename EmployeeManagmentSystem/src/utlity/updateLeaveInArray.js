export default function updateLeaveInArray(array, updatedLeave) {
  const index = array.findIndex((l) => l.$id === updatedLeave.$id);
  if (index !== -1) {
    array[index] = updatedLeave;
  }
}