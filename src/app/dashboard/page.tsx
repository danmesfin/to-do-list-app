// HomePage.tsx
"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "@/Components/Header";
import Task from "../../Components/task/Task";
import CreateTaskForm from "../../Components/task/CreateTaskForm";
import { PlusIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
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
    <div className="flex flex-col min-h-screen w-full pt-2 md:px-4 bg-slate-100">
      <Header />

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
          className={`${
            isSidebarOpen ? "block" : "hidden lg:block"
          } lg:w-56 lg:flex-shrink-0 lg:mr-8`}
        >
          <Sidebar onSelectOption={handleOptionSelect} selectedOption={""} />
        </div>

        {/* Main Content */}
        <div className="w-full">
          <div className="w-full flex flex-col mt-3 mb-4 md:flex-row md:justify-between md:border md:border-b md:rounded md:p-2">
            <div className="flex mb-2 md:mb-0 md:justify-center md:items-center md:border md:border-r-0 md:rounded-tl md:rounded-bl md:py-2">
              <label
                htmlFor="sort"
                className="mx-1 py-2 text-black text-center font-semibold"
              >
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

            {/* Search */}
            <div className="relative mb-2 md:mb-0">
              <SearchBar value={searchTerm} onChange={handleSearch} />
            </div>

            <button
              onClick={handleOpenModal}
              className="bg-green-500 text-white px-4 py-2 rounded-md font-bold
               flex items-center space-x-2 hover:bg-green-600 focus:outline-none
                focus:ring focus:ring-opacity-50"
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

          <h2 className="text-xl font-bold p-1 mt-8 text-black">Tasks</h2>
          <div className="w-full mt-2 md:mx-2 py-2 flex flex-wrap md:flex-nowrap gap-1 md:gap-3">
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
