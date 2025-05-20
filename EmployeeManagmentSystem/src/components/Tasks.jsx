import React from 'react';
import { FaCheckCircle, FaTrashAlt, FaEdit, FaCommentAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';




const Tasks = ({ item, onComplete, onEdit, onDelete, onChat }) => {
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
  className={`text-xs px-2 py-1 rounded text-white 
    ${item.status === 'rejected' && !item.isCompleted 
      ? 'bg-red-400' 
      : item.isCompleted 
      ? 'bg-green-400' 
      : 'bg-yellow-400'}
  `}
>
  {item.status === 'rejected' && !item.isCompleted
    ? 'Rejected'
    : item.isCompleted
    ? 'Completed'
    : 'Incomplete'}
</span>

                   
        

        {
           item.status == "accepted" && 
           <span
          className={`text-sm px-2 py-1 rounded-full bg-blue-500 text-white`}
        >
          accepted
        </span>
        }
        
      </div>

 <div className='mb-3'>
        <span className='text-xs text-gray-400'>{item.Date}</span>
      </div>
      {/* Title */}
      <h2 className='text-xl font-semibold mb-1'>{item.Tittle}</h2>

      {/* Description */}
      <p className='text-sm text-gray-300 mb-3'>{ControleDescriptionText(item.Description, 150)}</p>

      {/* Assigned To */}
      {
        currentUserDetails.admin && 
         <div className='mb-3'>
        <span className='text-xs bg-indigo-600 px-2 py-1 rounded-full'>
          Assigned To: {item.AssignTo}
        </span>
      </div>
      }
      

{
   item.status == "new" &&
    <div className='flex items-center justify-end gap-3'>
    <button
            onClick={() => onComplete(item.$id)}
            className='bg-green-500 px-3 py-1 rounded-lg text-sm capitalize'
            title='Complete Task'
          >
           accept
          </button>
          <button
            onClick={() => onComplete(item.$id)}
            className='bg-red-500 px-3 py-1 rounded-lg text-sm capitalize'
            title='Complete Task'
          >
           Reject
          </button>
    </div>
}


     
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

export default Tasks
