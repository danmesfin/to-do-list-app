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
    <div
      className="min-h-screen flex items-center justify-center p-4
     bg-gradient-to-br from-purple-500 to-blue-500"
    >
      <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-600">
          Welcome to To~do
        </h2>
        <Login /> {/* Render the Login component */}
        {/* Sign in with Google button/icon */}
        <button
          className="flex items-center justify-center bg-red-500
           text-white px-4 py-2 rounded-md mt-4 w-full"
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
              fill="currentColor"
              fillOpacity="0.0"
              d="m0 0l20.0 0l0 20.0l-20.0 0z"
              fillRule="evenodd"
            />{" "}
            <path
              fill="currentColor"
              d="m19.850197 8.270351c0.8574047 4.880001 -1.987587 
              9.65214 -6.6881847 11.218641c-4.700598 1.5665016 -9.83958 
              -0.5449295 -12.08104 -4.963685c-2.2414603 -4.4187555 -0.909603
               -9.81259 3.1310139 -12.6801605c4.040616 -2.867571 9.571754 
               -2.3443127 13.002944 1.2301085l-2.8127813 2.7000687l0 
               0c-2.0935059 -2.1808972 -5.468274 -2.500158 -7.933616 
               -0.75053835c-2.4653416 1.74962 -3.277961 5.040613
           -1.9103565 7.7366734c1.3676047 2.6960592 4.5031037 3.9843292 
           7.3711267 3.0285425c2.868022 -0.95578575 4.6038647 -3.8674583 
           4.0807285 -6.844941z"
              fillRule="evenodd"
            />
            <path
              fill="currentColor"
              d="m10.000263 8.268785l9.847767 0l0 3.496233l-9.847767 0z"
              fillRule="evenodd"
            />
          </svg>
        </button>
        {/* Sign up option for users who have not registered */}
        <p className="text-center mt-4 text-sm  text-black">
          Don&apos;t have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
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
