import { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../Redux/user/userSlice";
import {
  createUserWithEmailAndPassword,
  Auth,
  UserCredential,
} from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/solid"; // Import the required HeroIcons

const SignupForm: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch(setCurrentUser(user));
    } catch (error: any) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
      <form
        className="flex flex-col w-72 rounded p-4 items-center"
        onSubmit={handleSignup}
      >
        <div className="relative">
          <UserIcon className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            className="text-black pl-10 mb-2 px-3 py-2 rounded-full border border-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="relative">
          <LockClosedIcon className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            className="text-black pl-10 mb-2 px-3 py-2 rounded-full border border-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
