"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import kamran from "../../public/profile.png";

export default function Profile({ setProfile }: { setProfile: any }) {
  const [image] = useState<string | null>(kamran.src);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className=" bg-white p-5 rounded-xl shadow-md border w-[40%] mx-auto">
      {/* <h1 className="text-3xl font-semibold mb-3 text-center text-gray-800">
        Profile
      </h1> */}

      {/* Image Preview + Upload */}
      <div className="flex flex-col items-center">
        <div className="w-28 h-28 xl:w-32 xl:h-32 mb-4 relative">
          {image ? (
            <Image
              src={image}
              width={0}
              height={0}
              alt="Profile"
              className="object-cover w-full h-full rounded-full"
              unoptimized={true}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-400 text-xl rounded-full">
              No Image
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 mb-1 font-medium"
          >
            Name
          </label>
          <Input
            id="name"
            placeholder="Your name"
            defaultValue="Zishan"
            className="w-full rounded-md border border-gray-300 bg-white font-medium"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="email"
            className="block text-gray-700 mb-1 font-medium"
          >
            Email Address
          </label>
          <Input
            id="email"
            placeholder="Your email"
            type="email"
            defaultValue="jobinApp@gmail.com"
            className="w-full rounded-md border border-gray-300 bg-white"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="block text-gray-700 mb-1 font-medium"
          >
            Contact Number
          </label>
          <Input
            id="password"
            placeholder="Your password"
            type="number"
            defaultValue="0123456789"
            className="w-full rounded-md border border-gray-300 bg-white"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="block text-gray-700 mb-1 font-medium"
          >
            Whats-App Link
          </label>
          <Input
            id="password"
            placeholder="Your password"
            type="text"
            defaultValue="zisanwhatapps.com125852"
            className="w-full rounded-md border border-gray-300 bg-white text-[#0288A6]"
          />
        </div>

        <button
          onClick={() => setProfile("edit")}
          className="w-full btn-design rounded-3xl py-2 font-semibold cursor-pointer mt-4 2xl:text-lg"
        >
          Edit Profile
        </button>
      </form>
    </div>
  );
}
