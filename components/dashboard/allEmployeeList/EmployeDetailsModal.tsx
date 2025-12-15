"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Swal from "sweetalert2";

export default function GivePackage({
  trigger,
}: {
  trigger?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false); // 1. Control Dialog open state

  const handleDelete = (plan: string) => {
    setOpen(false); // Close your modal first
    setTimeout(() => {
      Swal.fire({
        html: `
        <div class="title-box">${plan}</div>
        <p class="swal-text">
          Are You Sure You Want To Activate This Subscription Plan
        </p>
      `,
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonText: "Yes",
        customClass: {
          confirmButton: "btn-confirm",
          cancelButton: "btn-cancel",
          popup: "swal-popup",
          htmlContainer: "swal-html-container",
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Activated!",
            text: `"${plan}" has been activated.`,
            icon: "success",
          });
        }
      });
    }, 100);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="w-[360px] bg-transparent shadow-none border-none flex justify-center"
      >
        <div className="flex flex-col items-center justify-center bg-gray-300 p-6 w-[360px] rounded-md">
          {["Basic", "Standard", "Extended"].map((plan) => (
            <div
              key={plan}
              className="w-full bg-white text-center py-3 my-2 pt-2 rounded-md font-semibold text-[#0288A6] cursor-pointer hover:bg-gray-100 transition"
              onClick={() => handleDelete(plan)}
            >
              {plan}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
