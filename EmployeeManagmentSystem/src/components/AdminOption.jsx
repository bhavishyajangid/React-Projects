import React from 'react';
import { FaEdit, FaTrashAlt, FaCommentAlt, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminOption = ({ task, onEdit, onDelete, onChat, type = "card" }) => {
  const isCompleted = task.isCompleted;
  const isRejected = task.status === 'rejected';
  const isNew = task.status === 'new';

  const showOnlyMessage = !isCompleted && isNew;
  const showAllOptions = !isCompleted && !isRejected && !isNew;

  if (!showOnlyMessage && !showAllOptions) return null;

  return (
    <div className="flex items-center gap-3">
      {showAllOptions && (
        <>
          {type === "card" ? (
            <>
              <button
                onClick={() => onEdit(task)}
                className="text-blue-400 hover:text-blue-300"
                title="Edit Task"
              >
                <FaEdit size={20} />
              </button>
              <button
                onClick={() => onDelete(task.$id)}
                className="text-red-400 hover:text-red-300"
                title="Delete Task"
              >
                <FaTrashAlt size={20} />
              </button>
            </>
          ) : (
            <>
              <Link to={`/editTask/${task.$id}`}>
                <FaRegEdit className="w-10 h-10 p-2 rounded-lg text-white bg-blue-600 hover:bg-blue-500 transition duration-200" />
              </Link>
              <button
                onClick={() => onDelete(task.$id)}
                className="w-10 h-10 p-2 rounded-lg text-white bg-red-600 hover:bg-red-500 transition duration-200"
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
          onClick={() => onChat(task)}
          className={`${type === "card" ? "ml-auto text-gray-400 hover:text-gray-200" : ""}`}
          title="Chat"
        >
          <FaCommentAlt size={20} />
        </button>
      )}
    </div>
  );
};

export default AdminOption;
