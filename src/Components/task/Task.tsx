"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask, TaskData } from "../../Redux/task/taskSlice";
import { ExclamationCircleIcon, TrashIcon } from "@heroicons/react/24/outline"; // Import the TrashIcon

interface TaskProps extends TaskData {
  onDelete: () => void;
}

const Task: React.FC<TaskProps> = ({
  id,
  title,
  description,
  dueDate,
  priority,
  completed,
  tags,
  onDelete,
}) => {
  const dispatch = useDispatch();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleMarkAsComplete = () => {
    dispatch(
      updateTask({
        id,
        title,
        description,
        dueDate,
        priority,
        completed: true,
        tags,
      })
    );
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTask(id));
    onDelete();
    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="bg-white shadow rounded-lg p-2 md:p-4 mb-4 w-full md:w-72">
      <h3 className="text-lg font-bold mb-2 text-gray-700">{title}</h3>
      <p className="text-gray-600 text-sm mb-2">{description}</p>
      <p className="text-gray-600 text-sm mb-2">Due Date: {dueDate}</p>
      <p
        className={`text-sm font-bold ${
          completed ? "text-green-600" : "text-yellow-600"
        }`}
      >
        Priority: {priority}
      </p>
      {/* Display tags */}
      {tags.length > 0 && (
        <div className="mb-2 flex items-start justify-start flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600 rounded-full mr-1"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {completed ? (
        <div className="flex">
          <p className="text-sm text-green-600 font-bold">Completed</p>
          <button
            onClick={() => setShowDeleteConfirmation(true)}
            className="bg-red-500 text-white px-2 py-1 rounded-md ml-2 hover:bg-red-600 focus:outline-none focus:ring focus:ring-opacity-50"
          >
            <TrashIcon className="h-4 w-4" /> {/* Use the TrashIcon */}
          </button>
        </div>
      ) : (
        <div className="flex align-middle">
          <button
            onClick={handleMarkAsComplete}
            className="bg-blue-500 text-white text-sm px-2 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-opacity-50"
          >
            Mark as Complete
          </button>
          <button
            onClick={() => setShowDeleteConfirmation(true)}
            className="bg-red-500 text-white px-2 py-1 rounded-md ml-2 hover:bg-red-600 focus:outline-none focus:ring focus:ring-opacity-50"
          >
            <TrashIcon className="h-4 w-4" /> {/* Use the TrashIcon */}
          </button>
        </div>
      )}

      {/* Show delete confirmation dialog */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-3">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between">
              <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
              <h2 className="text-xl font-bold text-red-500">Delete Task</h2>
              <button
                onClick={handleCancelDelete}
                className="text-gray-500 hover:text-red-500 focus:outline-none focus:ring focus:ring-opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="text-gray-700 text-sm mt-4">
              Are you sure you want to delete this task?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => handleDelete(id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600 focus:outline-none focus:ring focus:ring-opacity-50"
              >
                Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
