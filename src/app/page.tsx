"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";
import LoginPage from "./login/page";
import Loading from "@/Components/Loading/Spinner";

const LandingPage: React.FC = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!loading) {
      // If the user is authenticated, redirect to the dashboard
      if (user) {
        router.replace("/dashboard");
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <Loading />;
  }

  // Show the login page if the user is not authenticated
  return <LoginPage />;
};

export default LandingPage;
