// HomePage.tsx
"use client";
// HomePage.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "../../Components/task/Task";
import CreateTaskForm from "../../Components/task/CreateTaskForm";
import { PlusIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { RootState } from "../../Redux/store";
import {
  addTask,
  deleteTask,
  sortTasks,
  TaskData,
} from "../../Redux/task/taskSlice";
import SearchBar from "../../Components/searchBar/SearchBar";
import Sidebar from "../../Components/sideBar/SideBar";

const HomePage: React.FC = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleAddTask = (newTask: TaskData) => {
    dispatch(addTask(newTask));
    setShowCreateForm(false);
  };

  const handleDeleteTask = (taskId: number) => {
    dispatch(deleteTask(taskId));
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortBy = event.target.value;
    dispatch(sortTasks(sortBy as "byDate" | "byPriority"));
  };

  const handleOpenModal = () => {
    setShowCreateForm(true);
  };

  const handleCloseModal = () => {
    setShowCreateForm(false);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Filter tasks based on the search term and selected option
  const filteredTasks = tasks.filter((task) => {
    const titleMatch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (selectedOption === "completed") {
      return task.completed && titleMatch;
    } else if (selectedOption === "pending") {
      return !task.completed && titleMatch;
    } else {
      return titleMatch;
    }
  });

  return (
    <div className="container mx-auto px-4 mt-8">
      {/* Sidebar */}
      <div className="lg:hidden flex justify-end mt-4 mb-2">
        <button
          className="p-2 rounded-md bg-gray-200"
          onClick={handleSidebarToggle}
        >
          {isSidebarOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      <div className="flex flex-wrap md:flex-nowrap">
        {/* Sidebar */}
        <div
          className={`transform delay-100  border w-full   ${
            isSidebarOpen ? "block" : "hidden lg:block"
          } lg:w-auto lg:block lg:flex-shrink-0 lg:mr-8`}
        >
          <Sidebar onSelectOption={handleOptionSelect} />
        </div>

        {/* Main Content */}
        <div className="w-full">
          <div className="w-full flex mt-3 mb-4 border border-b justify-between rounded p-2">
            <div className="flex border">
              <label htmlFor="sort" className="mx-1 p-1">
                Sort
              </label>
              <select
                name="sort"
                className="text-black rounded-md p-1 mx-1"
                onChange={handleSortChange}
              >
                <option className="text-black" value="byDate">
                  Date
                </option>
                <option className="text-black" value="byPriority">
                  Priority
                </option>
              </select>
            </div>
            {/* search */}
            <div className="relative">
              <SearchBar value={searchTerm} onChange={handleSearch} />
            </div>
            <button
              onClick={handleOpenModal}
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
          <div className="w-full mx-2 p-3 flex flex-wrap md:flex-nowrap gap-3 border">
            {filteredTasks.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                dueDate={task.dueDate}
                priority={task.priority}
                completed={task.completed}
                tags={task.tags}
                onDelete={() => handleDeleteTask(task.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
