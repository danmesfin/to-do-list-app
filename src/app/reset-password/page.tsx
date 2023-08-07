"use client";
import { useState, FormEvent } from "react";
import { auth } from "../../../firebaseConfig";
import { LockClosedIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import Loading from "../../Components/Loading/Spinner";
import { sendPasswordResetEmail } from "firebase/auth";

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage(
        "A password reset link has been sent to your email address."
      );
    } catch (error: any) {
      console.error("Error sending password reset email:", error.message);
      setErrorMessage("Failed to send password reset email. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center
    bg-gradient-to-br from-purple-500 to-blue-500"
    >
      <div className="px-4 py-2 bg-white rounded-lg flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4 text-blue-500 text-center">
          Reset Password
        </h1>

        <form
          className="flex flex-col w-72 rounded p-4 items-center"
          onSubmit={handleResetPassword}
        >
          <div className="relative">
            <LockClosedIcon className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="text-black pl-10 mb-2 px-3 py-2 rounded-full border border-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
          >
            {isLoading ? <Loading /> : "Reset Password"}
          </button>
          {successMessage && (
            <p className="text-green-500 mt-2">{successMessage}</p>
          )}
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
          <a
            href="/login"
            className="mt-4 text-blue-500 hover:underline cursor-pointer flex items-center"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            Back to Sign In
          </a>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
