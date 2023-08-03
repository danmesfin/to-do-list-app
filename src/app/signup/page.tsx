"use client";
import SignupForm from "../../Components/signUp";

const SignupPage: React.FC = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen
     p-4 bg-gradient-to-br from-purple-500 to-blue-500"
    >
      <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full items-center">
        <h1 className="text-center text-2xl font-bold mb-4 text-gray-600">
          Welcome to To~do
        </h1>
        <SignupForm />
        <p className="text-center mt-4 text-sm  text-black">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
