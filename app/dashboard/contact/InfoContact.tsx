"use client";

import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { myFetch } from "@/utils/myFetch";
import { revalidate } from "@/utils/revalidateTags";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Inputs = {
  phone: string;
  email: string;
  whatsApp: string;
};

export default function InfoContact({ data }: any) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      phone: "",
      email: "",
      whatsApp: "",
    },
  });

  //   ✅ Reset form when data comes (API / parent state)
  useEffect(() => {
    if (data) {
      reset({
        phone: data?.phone || "",
        email: data?.email || "",
        whatsApp: data?.whatsApp || "",
      });
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    setLoading(true);
    try {
      const res = await myFetch("/contact", {
        method: "POST",
        body: formData,
      });

      if (res.success) {
        toast.success("admin information updated successfully!");
        await revalidate("profile");
      } else {
        toast.success(
          (res as any)?.error[0].message || "Failed to update profile.",
        );
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      toast.error(`Error updating profile: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-white p-8 rounded-xl shadow-md border w-[40%] mx-auto mt-6">
      {/* Image Preview + Upload */}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1 font-medium">Phone</label>
          <Input
            {...register("phone", { required: "phone is required" })}
            placeholder="Your name"
            className="w-full rounded-md border border-gray-300 bg-white"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
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
            WhatsApp Number
          </label>
          <Input
            type="whatsApp"
            {...register("whatsApp")}
            placeholder="Your whatsApp number"
            className="w-full rounded-md border border-gray-300 bg-white"
          />
          {errors.whatsApp && (
            <p className="text-red-500 text-sm mt-1">
              {errors.whatsApp.message}
            </p>
          )}
        </div>

        {/* Edit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full btn-design rounded-3xl py-2 font-semibold cursor-pointer mt-4 2xl:text-lg"
        >
          Save Change
        </Button>
      </form>
    </div>
  );
}
