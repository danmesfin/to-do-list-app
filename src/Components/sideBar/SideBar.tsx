import React from "react";
import { CheckIcon, ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface SidebarProps {
  onSelectOption: (option: string) => void;
  selectedOption: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  onSelectOption,
  selectedOption,
}) => {
  const handleOptionClick = (option: string) => {
    onSelectOption(option);
  };

  return (
    <div
      className="w-full bg-gradient-to-b from-gray-200 via-blue-300
     rounded-md shadow-md to-blue-700 h-full md:w-48 p-4 mt-3 md:h-full"
    >
      <ul>
        <li
          className={`cursor-pointer p-2 hover:bg-gray-300 flex items-center text-black ${
            selectedOption === "all" ? "bg-blue-300" : ""
          }`}
          onClick={() => handleOptionClick("all")}
        >
          <span className="mr-2">
            <CheckIcon className="h-5 w-5" />
          </span>
          All Tasks
        </li>
        <li
          className={`cursor-pointer p-2 hover:bg-gray-300 flex items-center text-black ${
            selectedOption === "completed" ? "bg-blue-300" : ""
          }`}
          onClick={() => handleOptionClick("completed")}
        >
          <span className="mr-2">
            <ClockIcon className="h-5 w-5" />
          </span>
          Completed Tasks
        </li>
        <li
          className={`cursor-pointer p-2 hover:bg-gray-300 flex items-center text-black ${
            selectedOption === "pending" ? "bg-blue-300" : ""
          }`}
          onClick={() => handleOptionClick("pending")}
        >
          <span className="mr-2">
            <XMarkIcon className="h-5 w-5" />
          </span>
          Pending Tasks
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
