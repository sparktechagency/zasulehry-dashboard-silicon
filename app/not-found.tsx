"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 via-red-200 to-red-300 p-6 text-center">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-700 mb-4">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-700 mb-6">
          An unexpected error occurred. Please try again or contact support if
          the problem persists.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
