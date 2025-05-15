import React from 'react';
import { FaCheckCircle, FaTrashAlt, FaEdit, FaCommentAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';




const AdminTask = ({ item, onComplete, onEdit, onDelete, onChat }) => {
console.log(item , 'item');

  const ControleDescriptionText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
 
  const {currentUserDetails} = useSelector(state => state.authSlice)

  
  return (
    <div className='bg-gray-800 text-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all relative min-w-[280px] min-h-[200px] flex flex-col '>
      {/* Urgency & Status */}
      <div className='flex justify-between items-center mb-2'>
        <span
          className={`text-sm px-2 py-1 rounded-full ${
            item.Urgent ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
          }`}
        >
          {item.Urgent ? 'Urgent' : 'Normal'}
        </span>
        <span
          className={`text-xs ${
            item.isCompleted ? 'text-green-400' : 'text-yellow-400'
          }`}
        >
          {item.isCompleted ? 'Completed' : 'Incomplete'}
        </span>
      </div>

 <div className='mb-3'>
        <span className='text-xs text-gray-400'>{item.Date}</span>
      </div>
      {/* Title */}
      <h2 className='text-xl font-semibold mb-1'>{item.Tittle}</h2>

      {/* Description */}
      <p className='text-sm text-gray-300 mb-3'>{ControleDescriptionText(item.Description, 150)}</p>

      {/* Assigned To */}
      <div className='mb-3'>
        <span className='text-xs bg-indigo-600 px-2 py-1 rounded-full'>
          Assigned To: {item.AssignTo}
        </span>
      </div>

      {/* Date */}
     

      {/* Action Buttons */}
      {
        currentUserDetails.admin && 
     
      <div className='flex items-center gap-3'>
        {!item.isCompleted && (
          <button
            onClick={() => onComplete(item.$id)}
            className='text-green-400 hover:text-green-300'
            title='Complete Task'
          >
            <FaCheckCircle size={20} />
          </button>
        )}
        <button
          onClick={() => onEdit(item)}
          className='text-blue-400 hover:text-blue-300'
          title='Edit Task'
        >
          <FaEdit size={20} />
        </button>
        <button
          onClick={() => onDelete(item.$id)}
          className='text-red-400 hover:text-red-300'
          title='Delete Task'
        >
          <FaTrashAlt size={20} />
        </button>
        <button
          onClick={() => onChat(item)}
          className='ml-auto text-gray-400 hover:text-gray-200'
          title='Chat'
        >
          <FaCommentAlt size={20} />
        </button>
      </div>
       }
    </div>
  );
};

export default AdminTask;
