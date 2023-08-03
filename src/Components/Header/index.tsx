"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logoutUser } from "../../Redux/user/userSlice";
import { UserIcon } from "@heroicons/react/24/outline";
import { signOut, getAuth } from "firebase/auth";
const Header: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const currentUser = useSelector((state: any) => state.user.currentUser);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      dispatch(logoutUser());
      router.push("/login");
    } catch (error: any) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <header
      className="flex justify-between items-center
     bg-blue-500 text-white px-4 py-2"
    >
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="relative">
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="p-1 rounded-full bg-white text-blue-500"
        >
          <UserIcon className="h-6 w-6" />
        </button>
        {isProfileOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow">
            <p className="px-4 py-2 text-gray-800">
              {currentUser?.displayName}
            </p>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
