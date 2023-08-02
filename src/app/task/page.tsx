"use client";
import React, { useState } from "react";
import Task from "../../Components/task/Task";
import CreateTaskForm from "../../Components/task/CreateTaskForm";
import { PlusIcon } from "@heroicons/react/24/solid"; // Import the PlusIcon from the Heroicons library

const HomePage: React.FC = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [tasks, setTasks] = useState<TaskData[]>([
    {
      id: 1,
      title: "Task 1",
      description: "Description for Task 1",
      dueDate: "2023-08-15",
      priority: "High",
      completed: false,
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description for Task 2",
      dueDate: "2023-08-20",
      priority: "Medium",
      completed: true,
    },
    // Add more tasks here
  ]);

  const handleAddTask = (newTask: TaskData) => {
    // Generate a unique ID for the new task
    const newTaskWithId = { ...newTask, id: tasks.length + 1 };
    setTasks((prevTasks) => [...prevTasks, newTaskWithId]);
    setShowCreateForm(false);
  };

  const handleOpenModal = () => {
    setShowCreateForm(true);
  };

  const handleCloseModal = () => {
    setShowCreateForm(false);
  };

  return (
    <div className="container mx-auto px-4 mt-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to the To-Do List App</h1>

      <div className="flex mb-4 border border-b justify-between rounded p-2">
        <div className="flex ">
          <label htmlFor="sort" className="mx-1 p-1">
            Sort
          </label>
          <select name="sort" className="text-black rounded-md p-1 mx-1">
            <option className="text-black" value="byDate">
              Date
            </option>
            <option className="text-black" value="byPriority">
              Priority
            </option>
          </select>
        </div>

        <button
          onClick={handleOpenModal} // Open the modal when the button is clicked
          className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-green-600 focus:outline-none focus:ring focus:ring-opacity-50"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Create New Task</span>
        </button>
      </div>

      {/* Render the modal conditionally based on the showCreateForm state */}
      {showCreateForm && (
        <CreateTaskForm
          onAddTask={handleAddTask}
          onCloseModal={handleCloseModal}
        />
      )}

      <h2 className="text-xl font-bold mt-8 mb-4">Tasks</h2>
      <div className="w-full mx-2 p-3 flex flex-wrap md:flex-nowrap gap-3">
        {tasks.map((task) => (
          <Task
            key={task.id}
            title={task.title}
            description={task.description}
            dueDate={task.dueDate}
            priority={task.priority}
            completed={task.completed}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
