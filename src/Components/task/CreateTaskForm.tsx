"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../Redux/task/taskSlice";
import { CheckIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface CreateTaskFormProps {
  onCloseModal: () => void;
}

interface TaskData {
  title: string;
  id: number;
  description: string;
  dueDate: string;
  priority: string;
  completed: boolean;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onCloseModal }) => {
  const initialFormData: TaskData = {
    title: "",
    id: 0,
    description: "",
    dueDate: "",
    priority: "Medium",
    completed: false,
  };

  const [formData, setFormData] = useState<TaskData>(initialFormData);
  const dispatch = useDispatch();
  const nextId = useSelector((state) => state.tasks.nextId);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate a new unique id for the task
    const newId = nextId;
    const newTask: TaskData = { ...formData, id: newId };
    // Dispatch the addTask action to add the new task to the store
    dispatch(addTask(newTask));
    // Reset the form state
    setFormData(initialFormData);
    // Close the modal
    onCloseModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-3">
      <div className="bg-white rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4 text-black">Create Task</h2>
        <form onSubmit={handleSubmit} className="max-w-sm mb-4 w-72">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 text-black"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 text-black"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700"
            >
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              required
              value={formData.dueDate}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 text-black"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700"
            >
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              required
              value={formData.priority}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 text-black"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="mb-4 flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-green-600 focus:outline-none focus:ring focus:ring-opacity-50"
            >
              <CheckIcon className="h-5 w-5" />
              <span>Create Task</span>
            </button>
            <button
              type="button"
              onClick={onCloseModal}
              className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 ml-2 hover:bg-red-600 focus:outline-none focus:ring focus:ring-opacity-50"
            >
              <XCircleIcon className="h-5 w-5" />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskForm;
