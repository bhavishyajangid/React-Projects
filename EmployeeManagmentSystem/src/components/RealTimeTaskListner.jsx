import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import TaskServices from '../Appwrite/Task';
import conf from '../config/config';
import { addNewTask , deleteTaskRealtime , updateTaskRealtime } from '../Store/TaskSlice';
import { useNavigate } from 'react-router';


const RealTimeTaskListner = () => {
  const dispatch = useDispatch();
  const subscriptionRef = useRef(null);
  const navigate = useNavigate()
  const {currentUserDetails} = useSelector(state => state.authSlice)

  useEffect(() => {
    subscriptionRef.current = TaskServices.client.subscribe(
      `databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteAllTaskCollectionId}.documents`,
      (res) => {
        const payload = res.payload;

        if (res.events.includes("databases.*.collections.*.documents.*.create")) {
         

          dispatch(addNewTask(payload))
          
        } else if (res.events.includes("databases.*.collections.*.documents.*.update")) {
          dispatch(updateTaskRealtime(payload));
         
         
        } else if (res.events.includes("databases.*.collections.*.documents.*.delete")) {

          dispatch(deleteTaskRealtime(payload.$id)); // make sure to use $id
         
        } else {
          console.warn("Unhandled real-time event", res.events);
        }
      }
    );

    return () => {
      if (subscriptionRef.current) subscriptionRef.current(); // unsubscribe
    };
  }, [dispatch , currentUserDetails]); // ✅ Removed navigate

  return null;
};

export default RealTimeTaskListner;
