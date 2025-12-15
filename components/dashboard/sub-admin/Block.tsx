"use client";

import { Lock } from "lucide-react";
import React from "react";
import Swal from "sweetalert2";

export default function Block() {
  const handleBlock = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to be Block this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
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
      className="btn-design m-1 p-1 rounded cursor-pointer"
      onClick={handleBlock}
    >
      <Lock size={20} className=" text-white" />
    </span>
  );
}
