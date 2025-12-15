"use client";

import ForgotPasswordForm from "@/components/authPages/ForgotPasswordForm";

export default function page() {
  return (
    <div className=" min-h-screen flex items-center justify-center bg-linear-to-r from-[#083E4B] to-[#0288A6]">
      {/* Login card */}
      <div className="bg-[#1D7A8F] p-8 rounded-lg shadow-md w-full max-w-lg  border border-[#E6E6E6] text-white">
        <h3 className="text-center font-medium text-3xl mb-4">
          Forgot Password
        </h3>
        <p className="">
          Enter your registered email address, and we’ll send you a secure link
          to reset your password.
        </p>

        <ForgotPasswordForm />
      </div>
    </div>
  );
}
