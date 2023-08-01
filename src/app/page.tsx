import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto px-4 mt-8">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to the To-Do List App
        </h1>
        <p className="mb-4">Please log in or sign up to get started!</p>
        <div className="flex">
          <a
            href="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
          >
            Login
          </a>

          <a
            href="/signup"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Sign Up
          </a>
        </div>
      </div>
    </main>
  );
}
