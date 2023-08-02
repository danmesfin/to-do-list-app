// SearchBar.tsx

import React from "react";
import { useDispatch } from "react-redux";
import { searchTasks } from "../../Redux/task/taskSlice";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    dispatch(searchTasks(searchTerm));
  };

  return (
    <div className="w-full mb-4">
      <label
        htmlFor="search"
        className="block text-sm font-medium text-gray-700"
      >
        Search Tasks
      </label>
      <input
        type="text"
        id="search"
        name="search"
        onChange={handleSearch}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 text-black"
      />
    </div>
  );
};

export default SearchBar;
