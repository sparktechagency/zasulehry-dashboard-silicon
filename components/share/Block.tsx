"use client";

import { myFetch } from "@/utils/myFetch";
import { Lock, Unlock } from "lucide-react";
import React from "react";
import Swal from "sweetalert2";

export default function Block({ item }: { item?: string | any }) {
  const handleClick = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to be Block this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await myFetch(`/users/status/${id}`);
        console.log("res", res);

        Swal.fire({
          title: "Blocked!",
          text: "Your User has been Blocked",
          icon: "success",
        });
      }
    });
  };
  return (
    <span
      className="bg-[#E6E6E6] p-1 rounded cursor-pointer"
      onClick={() => handleClick(item._id)}
    >
      {item?.status === "Active" ? (
        <Unlock />
      ) : (
        <Lock className=" text-red-600 size-5 2xl:size-7" />
      )}
    </span>
  );
}
