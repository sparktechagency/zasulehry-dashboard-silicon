"use client";
import { Button } from "@/components/ui/button";
import { myFetch } from "@/utils/myFetch";
import { revalidate } from "@/utils/revalidateTags";
import React from "react";
import Swal from "sweetalert2";

export default function DeletePackage({ id }: { id: string }) {
  const handleDeletePackage = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this package!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await myFetch(`/packages/delete/${id}`, {
        method: "DELETE",
      });

      if (res?.success) {
        await Swal.fire({
          title: "Deleted!",
          text: "Your package has been deleted.",
          icon: "success",
        });
        await revalidate("package");
      } else {
        Swal.fire({
          title: "Error!",
          text: res?.message || "Failed to delete package.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire({
        title: "Error!",
        text: error instanceof Error ? error.message : "An error occurred",
        icon: "error",
      });
    }
  };
  return (
    <Button
      onClick={handleDeletePackage}
      variant={"ghost"}
      className="text-lg mt-10 xl:h-10 border border-red-500 bg-red-50 cursor-pointer"
    >
      Delete
    </Button>
  );
}
