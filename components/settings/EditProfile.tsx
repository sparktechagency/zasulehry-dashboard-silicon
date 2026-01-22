"use client";
import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import { Edit2Icon } from "lucide-react";
import Image from "next/image";
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
  console.log("image", image);

  const [file, setFile] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Only PNG, JPG, or JPEG images are allowed");
      e.target.value = ""; // reset input
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    setImage(url);
    setFile(selectedFile);
  };

  useEffect(() => {
    return () => {
      if (image?.startsWith("blob:")) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

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
        window.location.reload();
      } else {
        toast.success(
          (res as any)?.error[0].message || "Failed to update profile.",
        );
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
          <Image
            src={image || `${process.env.NEXT_PUBLIC_IMAGE_URL}${data?.image}`}
            alt="Profile"
            fill
            className="object-cover rounded-full"
            unoptimized
          />

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
          accept=".png, .jpg, .jpeg"
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
            disabled
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
            {...register("phone")}
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
