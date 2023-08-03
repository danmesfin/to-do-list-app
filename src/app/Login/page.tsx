"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "@/Redux/user/userSlice";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, googleAuthProvider } from "../../../firebaseConfig";
import Login from "../../Components/Login"; // Import the Login component
import { signInWithPopup } from "firebase/auth";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  const dispatch = useDispatch();

  // Redirect to dashboard if user is already logged in
  React.useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  const handleSignInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleAuthProvider);
      const user = userCredential.user;
      dispatch(setCurrentUser(user));
    } catch (error: any) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-500 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-4 text-black">
          Welcome to ToDo
        </h2>
        <Login /> {/* Render the Login component */}
        {/* Sign in with Google button/icon */}
        <button
          className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-md mt-4 w-full"
          onClick={handleSignInWithGoogle}
        >
          <span className="mr-2 ">Sign In with Google</span>
          {/* Replace the following placeholder with your Google icon */}
          {/* You can use any icon library like 'react-icons' or 'heroicons' */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path
              fillRule="evenodd"
              d="M10 2C5.589 2 2 5.589 2 10c0 4.411 3.589 8 8 8 4.411 0 8-3.589 8-8 0-4.411-3.589-8-8-8zm-1 2v2H6v2h3v2h2v-2h2V8h-2V6h-2z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {/* Sign up option for users who have not registered */}
        <p className="text-center mt-4 text-sm  text-black">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
