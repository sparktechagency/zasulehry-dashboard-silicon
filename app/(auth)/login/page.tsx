"use client";
import AdminOtp2 from "@/components/dashboard/admin-otp/AdminOtp2";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Page() {
  const [password, setPassword] = useState(false);
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

        <form className="space-y-5">
          <div>
            <Label htmlFor="email" className="block text-md mb-1 text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter Your Email"
              className="w-full rounded-md px-3 h-11 "
            />
          </div>

          <div>
            <Label htmlFor="number" className="block text-md mb-1 text-white">
              Contact Number
            </Label>
            <Input
              id="number"
              type="number"
              placeholder="Enter Your Contact Number"
              className="w-full rounded-md px-3 h-11  "
            />
          </div>

          <Label htmlFor="password" className="block text-md mb-1 text-white">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={password ? "password" : "text"}
              placeholder="Enter Your Password"
              className="w-full rounded-md px-3 h-11  "
            />
            <span
              className="absolute top-3 right-4 cursor-pointer"
              onClick={() => setPassword(!password)}
            >
              {password ? <EyeOff /> : <Eye />}
            </span>
          </div>
          <div className="text-right mt-1">
            <Link
              href="/forgot-password"
              className="text-sm hover:underline font-semibold"
            >
              Forgot Password
            </Link>
          </div>

          <AdminOtp2
            title="Log In"
            trigger={
              <button className="bg-white text-[#0288A6] w-full py-2 cursor-pointer">
                Log In
              </button>
            }
          />
        </form>
      </div>
    </div>
  );
}
