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
    <div className="flex flex-col min-h-screen w-full pb-8 pt-2 md:px-4 bg-slate-100">
      {/* Sidebar */}
      <div className="lg:hidden flex justify-end mb-1 ml-4 left-4">
        <button
          className="p-2 rounded-md bg-gray-400"
          onClick={handleSidebarToggle}
        >
          {isSidebarOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>
      <Header />
      <div className="flex flex-wrap md:flex-nowrap">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? "block" : "hidden lg:block"
          } w-full lg:w-56 lg:flex-shrink-0 mt-5 lg:mr-8`}
        >
          <Sidebar onSelectOption={handleOptionSelect} selectedOption={""} />
        </div>

        {/* Main Content */}
        <div className="w-full mt-8">
          <div className="w-full flex flex-col mt-3 mb-4 md:flex-row md:justify-between md:rounded md:p-2">
            <div className="flex mb-2 md:mb-0 md:justify-center md:items-center md:rounded-tl md:rounded-bl md:py-2">
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
            <div className="relative py-2 md:mb-0 z-0">
              <SearchBar value={searchTerm} onChange={handleSearch} />
            </div>

            <button
              onClick={handleOpenModal}
              className=" w-40 h-8 bg-green-500 text-white px-4 rounded-md font-bold md:h-10
               flex items-center space-x-2 hover:bg-green-600 focus:outline-none
                focus:ring focus:ring-opacity-50"
            >
              <PlusIcon className="h-5 w-5" />
              <span>New Task</span>
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
          <div className="w-full mt-2 md:mx-2 py-2 flex flex-wrap gap-1 md:gap-3 px-4">
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
