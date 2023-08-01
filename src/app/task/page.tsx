import React from "react";
import Link from "next/link";
import Task from "../../Components/task/Task";

const HomePage: React.FC = () => {
  // Dummy tasks data for testing purposes
  const tasks = [
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
  ];

  return (
    <div className="container mx-auto px-4 mt-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to the To-Do List App</h1>
      <p className="mb-4">Please log in or sign up to get started!</p>
      <div className="flex">
        <a className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600">
          Login
        </a>

        <a className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Sign Up
        </a>
      </div>

      <h2 className="text-xl font-bold mt-8 mb-4">Tasks</h2>
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
  );
};

export default HomePage;
