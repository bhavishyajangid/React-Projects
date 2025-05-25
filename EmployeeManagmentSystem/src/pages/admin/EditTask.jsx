import React, { useState, useEffect } from 'react';
import { AddTask, Loader } from '../../export';
import { useParams } from 'react-router';
import TaskServices from '../../Appwrite/Task';
import { toast } from 'react-toastify';

const EditTask = () => {
  console.log('running edit task');
  
  const [task, setTask] = useState(null);
  const { taskId } = useParams();

  
  useEffect(() => {
    const editTask = async () => {
      try {
        let res = await TaskServices.getSingleTask(taskId);
        setTask(res);
      } catch (error) {
        console.log(error);
        toast.error("Task not found");
      }
    };

    editTask();
  }, [taskId]);

  if (!task) {
    return <Loader />;
  }

  return <AddTask task={task} />;
};

export default EditTask;
