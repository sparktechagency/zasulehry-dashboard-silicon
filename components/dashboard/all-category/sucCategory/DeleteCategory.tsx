"use client";
import { myFetch } from "@/utils/myFetch";
import { revalidate } from "@/utils/revalidateTags";
import { Trash2 } from "lucide-react";
import React from "react";
import Swal from "sweetalert2";

export default function DeleteCategory({ id }: { id: string }) {
  const handleClick = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to be delete this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await myFetch(`/categories/delete/${id}`, {
          method: "DELETE",
        });

        if (res?.success) {
          Swal.fire({
            title: "Delete",
            text: "Your User has been Delete",
            icon: "success",
          });
          revalidate("categories");
        }
      }
    });
  };
  return (
    <div>
      <Trash2
        onClick={() => handleClick(id)}
        className="cursor-pointer text-red-400"
      />
    </div>
  );
}
