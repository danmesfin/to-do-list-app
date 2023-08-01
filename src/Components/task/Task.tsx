import React from "react";

interface TaskProps {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  completed: boolean;
}

const Task: React.FC<TaskProps> = ({
  title,
  description,
  dueDate,
  priority,
  completed,
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-2">{description}</p>
      <p className="text-gray-600 text-sm mb-2">Due Date: {dueDate}</p>
      <p
        className={`text-sm font-bold ${
          completed ? "text-green-600" : "text-yellow-600"
        }`}
      >
        Priority: {priority}
      </p>
      {completed ? (
        <p className="text-sm text-green-600 font-bold">Completed</p>
      ) : (
        <button className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-opacity-50">
          Mark as Complete
        </button>
      )}
    </div>
  );
};

export default Task;
