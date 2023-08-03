"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";
import LoginPage from "./login/page";

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
    // Show a loading spinner or a message if you want
    return null;
  }

  // Show the login page if the user is not authenticated
  return <LoginPage />;
};

export default LandingPage;
