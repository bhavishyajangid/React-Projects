import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTask, deleteTaskRealtime, updateTaskRealtime } from '../Store/TaskSlice';
import TaskServices from '../Appwrite/Task';
import conf from '../config/config';

const RealTimeTaskListner = () => {
  const dispatch = useDispatch();
  const { currentUserDetails } = useSelector(state => state.authSlice);
  const subscriptionRef = useRef(null);

  useEffect(() => {
    if (!currentUserDetails) return;
    
    subscriptionRef.current = TaskServices.client.subscribe(
      `databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteAllTaskCollectionId}.documents`,
      (res) => {
        const payload = res.payload;
        const isAdmin = currentUserDetails.admin;
        const isAssignedToUser = payload.AssignTo === currentUserDetails.userName;

        // Admin sees all, employee sees only own assigned tasks
        if (res.events.includes("databases.*.collections.*.documents.*.create")) {
          if (isAdmin || isAssignedToUser){
             dispatch(addNewTask(payload));
          } 
        }

        if (res.events.includes("databases.*.collections.*.documents.*.update")) {
          if (isAdmin || isAssignedToUser) dispatch(updateTaskRealtime(payload));
        }

        if (res.events.includes("databases.*.collections.*.documents.*.delete")) {
          if (isAdmin || isAssignedToUser) dispatch(deleteTaskRealtime(payload.$id));
        }
      }
    );

    return () => {
      if (subscriptionRef.current) subscriptionRef.current(); // unsubscribe on unmount
    };
  }, [currentUserDetails, dispatch]);

  return null;
};

export default RealTimeTaskListner;
