"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";

type FormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const toggleVisibility = (field: keyof FormValues) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const onSubmit = async (data: FormValues) => {
    console.log(data);

    try {
      const res = await myFetch("/auth/change-password", {
        method: "POST",
        body: data,
      });
      if (res.success) {
        toast.success(res.message);
        reset();
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#F6F6F6] px-4 my-5 text-gray-700">
      <div className="w-[40%] bg-white p-8 rounded-md shadow-md space-y-6">
        <h2 className="text-center text-2xl font-semibold">Change Password</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Current Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Current Password
            </label>

            <div className="relative">
              <input
                type={showPassword.currentPassword ? "text" : "password"}
                placeholder="Enter current password"
                autoComplete="current-password"
                className="w-full px-4 py-2 rounded border"
                {...register("currentPassword", {
                  required: "Current password is required",
                })}
              />

              <button
                type="button"
                onClick={() => toggleVisibility("currentPassword")}
                aria-label="Toggle current password visibility"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword.currentPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>

            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              New Password
            </label>

            <div className="relative">
              <input
                type={showPassword.newPassword ? "text" : "password"}
                placeholder="Enter new password"
                autoComplete="new-password"
                className="w-full px-4 py-2 rounded border"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />

              <button
                type="button"
                onClick={() => toggleVisibility("newPassword")}
                aria-label="Toggle new password visibility"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword.newPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>

            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                className="w-full px-4 py-2 rounded border"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value, formValues) =>
                    value === formValues.newPassword ||
                    "Passwords do not match",
                })}
              />

              <button
                type="button"
                onClick={() => toggleVisibility("confirmPassword")}
                aria-label="Toggle confirm password visibility"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword.confirmPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button className="w-full btn-design font-semibold py-2 rounded">
            Confirm
          </button>
          {/* <AdminOtp
          trigger={
            <button className="w-full btn-design font-semibold py-2 rounded cursor-pointer 2xl:text-lg">
              Confirm
            </button>
          }
        /> */}
        </form>
      </div>
    </div>
  );
}
