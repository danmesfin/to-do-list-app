// SearchBar.tsx
import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-md p-1 pl-8 pr-3 
        focus:outline-none focus:ring focus:ring-opacity-50 text-black"
      />
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M9 3a6 6 0 100 12 6 6 0 000-12zM1 9a8 8 0 1116 0 8 8 0 01-16 0z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M13.293 13.293a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </div>
  );
};

export default SearchBar;
