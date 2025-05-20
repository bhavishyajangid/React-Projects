export const getTaskStatus = (userAction, adminAction) => {
  if (userAction === "rejected") {
    return { status: "rejected", rejectedBy: "user" };
  }
  if (adminAction === "rejected") {
    return { status: "rejected", rejectedBy: "admin" };
  }
  if (userAction === "accepted" && adminAction === "accepted") {
    return { status: "accepted", rejectedBy: null };
  }

  return { status: "pending", rejectedBy: null };
};
