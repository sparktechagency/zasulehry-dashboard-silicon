"use client";

import { Input } from "../ui/input";
import Image from "next/image";

export default function Profile({
  setProfile,
  data,
}: {
  setProfile: (value: string) => void;
  data: any;
}) {
  console.log("data", data);

  return (
    <div className="bg-white p-5 rounded-xl shadow-md border w-[40%] mx-auto">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <div className="w-28 h-28 xl:w-32 xl:h-32 mb-4 relative">
          {data?.image ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data?.image}`}
              alt="Profile"
              fill
              className="object-cover rounded-full"
              unoptimized
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-400 text-xl rounded-full">
              No Image
            </div>
          )}
        </div>
      </div>

      {/* Form */}
      <form>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1 font-medium">Name</label>
          <Input
            placeholder="Your name"
            value={data?.name}
            className="w-full rounded-md border border-gray-300 bg-white"
            disabled
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1 font-medium">
            Email Address
          </label>
          <Input
            type="email"
            value={data?.email}
            placeholder="Your email"
            className="w-full rounded-md border border-gray-300 bg-white"
            disabled
          />
        </div>

        {/* Contact */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1 font-medium">
            Contact Number
          </label>
          <Input
            type="number"
            value={data?.phone}
            placeholder="Your contact number"
            className="w-full rounded-md border border-gray-300 bg-white"
            disabled
          />
        </div>

        {/* Edit Button */}
        <button
          type="button"
          onClick={() => setProfile("edit")}
          className="w-full btn-design rounded-3xl py-2 font-semibold cursor-pointer mt-4 2xl:text-lg"
        >
          Edit Profile
        </button>
      </form>
    </div>
  );
}
