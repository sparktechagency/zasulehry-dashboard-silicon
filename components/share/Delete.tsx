"use client";

import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";

export default function Delete() {
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want be  delete this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <button
      onClick={handleDelete}
      className="cursor-pointer m-1 p-1 rounded-sm bg-[#D21D1D]"
    >
      <RiDeleteBinLine className="text-white size-5 xl:size-6" />
    </button>
  );
}
