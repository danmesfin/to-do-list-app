import { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../Redux/user/userSlice";
import {
  createUserWithEmailAndPassword,
  Auth,
  UserCredential,
} from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loading/Spinner"; // Custom loading spinner component

const SignupForm: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch(setCurrentUser(user));

      setIsLoading(false);
      toast.success("Sign up successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Redirect to the dashboard after successful sign-up
      router.push("/dashboard");
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4 text-blue-500">Sign Up</h1>
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
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
        >
          {isLoading ? <Loading /> : "Sign Up"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignupForm;
