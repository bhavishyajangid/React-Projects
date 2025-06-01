import React from 'react';
import { FaEdit, FaTrashAlt, FaCommentAlt, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { showError , showSuccess } from '../utlity/Error&Sucess';
import { deleteTaskThunk } from '../Store/thunks/taskThunk';
import { setChatOpen } from '../Store/chatBoxSlice';
import { Icons } from 'react-toastify';
const AdminOption = ({ task,type = "card" }) => {
  const {currentUserDetails} = useSelector(state => state.authSlice)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isCompleted = task.isCompleted;
  const isRejected = task.status === 'rejected';
  const isNew = task.status === 'new';

  const showOnlyMessage = !isCompleted && isNew;
  const showAllOptions = !isCompleted && !isRejected &&currentUserDetails.admin ;

  if (!showOnlyMessage && !showAllOptions) return null;


   const handleDeleteTask = async (id) => {
    try {
      const confirmToDelete = confirm("Do you want to delete this task?");
      if (!confirmToDelete) return;

      const deletedTask = await dispatch(deleteTaskThunk(id)).unwrap();
      console.log(deletedTask);
      
      if(deletedTask){
        showSuccess("Task deleted Sucessfully");
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
      
      showError(error);
    }
  };

 

  return (
    <div className="flex items-center gap-3">
      {showAllOptions && (
        <>
          {type === "card" ? (
            <>
            <Link to={`/editTask/${task.$id}`}>
              <button
                className="text-blue-500 hover:text-blue-300 text-2xl mt-1"
                title="Edit Task"
              >
                <FaEdit />
              </button>
            </Link>
              <button
                onClick={() => {handleDeleteTask(task.$id)}}
                className="text-red-500 hover:text-red-300"
                title="Delete Task"
              >
                <FaTrashAlt size={20} />
              </button>
            </>
          ) : (
            <>
              <Link to={`/editTask/${task.$id}`}>
                <FaRegEdit className='text-2xl text-gray-600 hover:text-gray-900' />
              </Link>
              <button
               onClick={() => {handleDeleteTask(task.$id)}}
                className='text-2xl text-gray-600 hover:text-red-500'
                title="Delete Task"
              >
                <FaRegTrashAlt size={20} />
              </button>
            </>
          )}
        </>
      )}

      {(showOnlyMessage || showAllOptions) && (
        <button
          onClick={() => dispatch(setChatOpen({isOpen : true , user : currentUserDetails}))}
          className={`${type === "card" ? "ml-auto" : "" } text-gray-600 hover:text-gray-900 text-5xl`}
          title="Chat"
        >
          <FaCommentAlt size={20} />
        </button>
      )}
    </div>
  );
};

export default AdminOption;
