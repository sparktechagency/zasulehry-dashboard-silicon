"use client";

import Button from "@/components/share/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function Page() {
  const [password, setPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  return (
    <div className=" min-h-screen flex items-center justify-center bg-linear-to-r from-[#083E4B] to-[#0288A6]">
      {/* Background shapes */}

      {/* Login card */}
      <div className="bg-[#1D7A8F] p-8 rounded-lg shadow-md w-full max-w-lg  border border-[#E6E6E6] text-white">
        <h3 className="text-center font-medium text-3xl mb-6">New Password</h3>

        <form className="space-y-5">
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
          <Label
            htmlFor="newPassword"
            className="block text-md mb- text-white1"
          >
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={confirmPassword ? "password" : "text"}
              placeholder="Enter Your Password"
              className="w-full rounded-md px-3 h-11  "
            />
            <span
              className="absolute top-3 right-4 cursor-pointer"
              onClick={() => setConfirmPassword(!confirmPassword)}
            >
              {confirmPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>

          <Link href="/login">
            <Button type="submit" className="bg-white text-[#0288A6]">
              Confirm
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
}
