// Sidebar.tsx
import React from "react";

interface SidebarProps {
  onSelectOption: (option: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectOption }) => {
  const handleOptionClick = (option: string) => {
    onSelectOption(option);
  };

  return (
    <div className="w-full bg-gradient-to-b from-gray-200 via-blue-300 rounded-md shadow-md to-blue-700 h-full md:w-48 p-4">
      <ul>
        <li
          className="cursor-pointer p-2 hover:bg-gray-300"
          onClick={() => handleOptionClick("all")}
        >
          All Tasks
        </li>
        <li
          className="cursor-pointer p-2 hover:bg-gray-300"
          onClick={() => handleOptionClick("completed")}
        >
          Completed Tasks
        </li>
        <li
          className="cursor-pointer p-2 hover:bg-gray-300"
          onClick={() => handleOptionClick("pending")}
        >
          Pending Tasks
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
