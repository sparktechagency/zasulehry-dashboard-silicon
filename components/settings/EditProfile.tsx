"use client";
import React, { useState, ChangeEvent, useRef, useEffect } from "react";

import { Edit2Icon } from "lucide-react";
import Image from "next/image";
import kamran from "../../public/profile.png";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { myFetch } from "@/utils/myFetch";
import { revalidate } from "@/utils/revalidateTags";

type Inputs = {
  name: string;
  email: string;
  phone: string;
};

export default function EditProfile({
  data,
}: {
  setProfile: (value: string) => void;
  data: any;
}) {
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | null>("");
  const [file, setFile] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setImage(url);
        setFile(file);
      }
    }
  };

  const openFileDialog = () => {
    inputFileRef.current?.click();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // ✅ Reset form when data comes (API / parent state)
  useEffect(() => {
    if (data) {
      reset({
        name: data?.name || "",
        email: data?.email || "",
        phone: data?.phone || "",
      });
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      const payload = new FormData();

      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);

      if (file) {
        payload.append("image", file);
      }

      const res = await myFetch("/users/profile", {
        method: "PATCH",
        body: payload,
      });

      if (res.success) {
        toast.success("Profile updated successfully!");
        await revalidate("profile");
        // setProfile("profile");
      } else {
        toast.success(res?.message || "Failed to update profile.");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      toast.error(`Error updating profile: ${errorMessage}`);
    }
  };

  return (
    <div className=" bg-white p-8 rounded-xl shadow-md border w-[40%] mx-auto mt-6">
      {/* Image Preview + Upload */}
      <div className="flex flex-col items-center ">
        <div className="w-28 h-28 xl:w-32 xl:h-32 mb-4 relative">
          {data?.image ? (
            <Image
              src={
                image || `${process.env.NEXT_PUBLIC_IMAGE_URL}${data?.image}`
              }
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

          {/* Edit icon (click করলে ফাইল ইনপুট খুলবে) */}
          <div
            className="absolute bottom-0 right-1 bg-white rounded-full p-1 shadow-md cursor-pointer hover:bg-gray-100"
            onClick={openFileDialog}
            title="Change Profile Image"
          >
            <Edit2Icon className="w-5 h-5 text-gray-600" />
          </div>
        </div>

        <input
          ref={inputFileRef}
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1 font-medium">Name</label>
          <Input
            {...register("name", { required: "Name is required" })}
            placeholder="Your name"
            className="w-full rounded-md border border-gray-300 bg-white"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1 font-medium">
            Email Address
          </label>
          <Input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Your email"
            className="w-full rounded-md border border-gray-300 bg-white"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Contact */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1 font-medium">
            Contact Number
          </label>
          <Input
            type="number"
            {...register("phone", {
              required: "Contact number is required",
            })}
            placeholder="Your contact number"
            className="w-full rounded-md border border-gray-300 bg-white"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Edit Button */}
        <button
          type="submit"
          // onClick={() => setProfile("edit")}
          className="w-full btn-design rounded-3xl py-2 font-semibold cursor-pointer mt-4 2xl:text-lg"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
