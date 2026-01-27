"use client";

import CustomImage from "@/share/CustomImage";
import { Input } from "../ui/input";

export default function Profile({
  setProfile,
  data,
}: {
  setProfile: (value: string) => void;
  data: any;
}) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md border w-[40%] mx-auto">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <div className="w-28 h-28 xl:w-32 xl:h-32 mb-4 relative">
          <CustomImage
            src={data?.image}
            title="Profile"
            className="object-cover rounded-full w-40 h-32"
          />
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
