"use client";
import React from "react";

const LoginPage: React.FC = () => {
  const handleLogin = () => {
    // Handle login logic here
  };

  return (
    <div className="container mx-auto px-4 mt-8">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form className="max-w-sm">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-opacity-50"
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
