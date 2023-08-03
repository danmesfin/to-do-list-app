import { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../Redux/user/userSlice";
import { signInWithEmailAndPassword, Auth } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/solid"; // Import the required HeroIcons

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      dispatch(setCurrentUser(user));
    } catch (error: any) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Log In</h1>
      <form
        className="flex flex-col w-72 rounded p-4 items-center"
        onSubmit={handleLogin}
      >
        <div className="relative">
          <UserIcon className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            className="pl-10 mb-2 px-3 py-2 rounded-full border border-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="relative">
          <LockClosedIcon className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            className="pl-10 mb-2 px-3 py-2 rounded-full border border-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
        >
          Log In
        </button>
        <p className="mt-2 text-blue-500 hover:underline cursor-pointer">
          Forgot Password
        </p>
      </form>
    </div>
  );
};

export default Login;
