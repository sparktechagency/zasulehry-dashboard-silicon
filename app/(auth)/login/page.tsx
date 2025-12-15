"use client";

import LoginForm from "@/components/authPages/Login";
import Image from "next/image";

export default function Page() {
  return (
    <div className=" min-h-screen flex items-center justify-center bg-linear-to-r from-[#083E4B] to-[#0288A6]">
      {/* Background shapes */}

      {/* Login card */}
      <div className="bg-[#1D7A8F] p-8 rounded-lg shadow-md w-full max-w-lg  border border-[#E6E6E6] text-white">
        <div className="flex items-center justify-center">
          <Image
            src="/auth-logo.png"
            alt="Zasulehry"
            width={24}
            height={24}
            className="w-24"
            sizes="100vh"
          />
        </div>
        <h3 className="text-center font-medium text-3xl my-5">Log In</h3>

        <LoginForm />
      </div>
    </div>
  );
}
