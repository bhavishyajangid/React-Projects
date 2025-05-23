import React, { memo, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { handleUserTaskAction } from '../Store/thunks/taskThunk';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Input, Button } from '../export';
import { showError, showSuccess } from '../utlity/Error&Sucess';

const AcceptOrReject = ({ task, isAdmin }) => {
  const [reject, setReject] = useState(false);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAccept = useCallback(
    async (e) => {
      e.preventDefault();

      const payload = {
        taskId: task.$id,
        userAction: 'accepted',
        adminAction: isAdmin ? 'accepted' : 'pending',
      };
      try {
        const result = await dispatch(handleUserTaskAction(payload)).unwrap();
        if (result) {
          showSuccess('Task accepted successfully');
          isAdmin ? navigate('/admin') : navigate('/employee');
        }
      } catch (error) {
        showError(error);
      }
    },
    [dispatch, task, isAdmin, navigate]
  );

  const handleReject = useCallback(
    async (data) => {
      const payload = {
        taskId: task.$id,
        userAction: 'rejected',
        adminAction: isAdmin ? task.adminAction : 'rejected',
        message: data.reasonForReject || 'none',
      };
      try {
        const result = await dispatch(handleUserTaskAction(payload)).unwrap();
        if (result) {
          showSuccess('Task rejected successfully');
          navigate('/rejectedTask');
        }
      } catch (error) {
        showError(error);
      }
    },
    [dispatch, task, isAdmin, navigate]
  );

  return (
    <div className="flex flex-col gap-5 mb-5">
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
      </div>

      {reject && (
        <div>
          <form onSubmit={handleSubmit(handleReject)}>
            <Input
              label="Reason for Reject"
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
