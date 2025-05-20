import { toast } from "react-toastify";

export const showError = (message) => {
  if (!message) return;
  toast.error(message);
};

export const showSuccess = (message) => {
  if (!message) return;
  toast.success(message);
};