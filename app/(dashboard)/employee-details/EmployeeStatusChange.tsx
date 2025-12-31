"use client";
import { Button } from "@/components/ui/button";
import { myFetch } from "@/utils/myFetch";
import { revalidate } from "@/utils/revalidateTags";
import React from "react";
import { toast } from "sonner";

export default function EmployeeStatusChange({ id }: { id: string }) {
  const handleUpdateStatus = async () => {
    try {
      const res = await myFetch(`/users/status/${id}`, {
        method: "PATCH",
      });

      console.log("res", res);
      if (res.success) {
        toast.success(res.message);

        await revalidate("employee-list");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err?.message : "Something went wrong");
    }
  };
  return (
    <Button
      onClick={handleUpdateStatus}
      className="bg-[#D21D1D]  text-white  px-6 rounded-full cursor-pointer"
    >
      Block
    </Button>
  );
}
