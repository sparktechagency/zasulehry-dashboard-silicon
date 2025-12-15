"use client";

import Button from "@/components/share/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function page() {
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
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

        <form className="space-y-5 mt-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email" className="block text-md mb-1 text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter Your Email"
              className="w-full rounded-md px-3 h-11  "
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

          <Link href="/verify-otp">
            <Button type="submit" className="bg-white text-[#0288A6]">
              Continue
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
}
