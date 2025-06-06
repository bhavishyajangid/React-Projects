import React, { memo, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { handleUserTaskAction } from '../Store/thunks/taskThunk';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Input, Button } from '../export';
import { showError, showSuccess } from '../utlity/Error&Sucess';

const AcceptOrReject = ({ task, isAdmin }) => {
  const [reject, setReject] = useState(false);
  const [sendBack , setSendBack] = useState(false)
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  
  const handleAccept = useCallback(
    async (e) => {
      e.preventDefault();

      const payload = {
        taskId: task.$id,
        userAction: isAdmin ? task.userAction : "accepted" ,
        adminAction: isAdmin ? 'accepted' : 'pending',
      };
      try {
        const result = await dispatch(handleUserTaskAction(payload)).unwrap();
        if (result) {
          showSuccess('Task accepted successfully');
          isAdmin ? navigate('/task') : navigate('/employee');
        }
      } catch (error) {
        showError(error);
      }
    },
    [dispatch, task, isAdmin, navigate]
  );

  

  const onSubmit = useCallback(
    
    async (data) => {
      console.log(data);
      
      const payload = {
        taskId: task.$id,
        userAction: isAdmin ? task.userAction : "rejected" ,
        adminAction: sendBack ? "pending" : isAdmin ? 'rejected' : task.adminAction,
        message: data.reasonForReject || 'none',
        sendBack : sendBack,
        isCompleted : sendBack ? false : true
      };

      try {
        const result = await dispatch(handleUserTaskAction(payload)).unwrap();
        if (result) {
          if(result.status == "rejected"){
            showSuccess('Task rejected successfully');
            navigate('/rejectedTask');
          }else{
            showSuccess("Task SendBack To User")
            navigate("/task")
          }
        }
      } catch (error) {
        showError(error);
      }
    },
    [dispatch, task, isAdmin, navigate , sendBack]
  );


  return (
    <div className="flex flex-col gap-5  mt-3">
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={handleAccept}
          className="bg-green-500 px-3 py-1 rounded-lg text-sm capitalize"
          type="button"
          title="Complete Task"
        >
          Accept
        </button>
      
        <button
          type="button"
          onClick={() => setReject((prev) => !prev)}
          className="bg-red-500 px-3 py-1 rounded-lg text-sm capitalize"
          title="Reject Task"
        >
          Reject
        </button>
        {
          ( isAdmin && task.isCompleted) && <button
          onClick={() => setSendBack((prev) => !prev)}
          className="bg-teal-500 px-3 py-1 rounded-lg text-sm capitalize"
          type="button"
          title="Complete Task"
        >
          Send Back
        </button>
        }
          
      </div>

      {( reject || sendBack) && (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Reason for Reject"
              className="border border-gray-500"
              type="text"
              {...register('reasonForReject', { required: true })}
            />
            <Button
              type="submit"
              className="mt-5 w-full h-9 bg-green-500 text-white font-medium rounded-md hover:bg-green-600"
              btn="Submit"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default memo(AcceptOrReject);
