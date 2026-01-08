"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Swal from "sweetalert2";
import { myFetch } from "@/utils/myFetch";

type Plan = {
  _id: string;
  name: string;
};

interface GivePackageProps {
  userId: string;
  pack: Plan[];
  trigger?: React.ReactNode;
}

export default function GivePackage({
  userId,
  pack,
  trigger,
}: GivePackageProps) {
  const [open, setOpen] = useState(false);
  console.log("package", pack);
  console.log("user id", userId);

  const handleActivate = async (plan: Plan) => {
    console.log("");

    setOpen(false);

    const result = await Swal.fire({
      html: `
        <div class="title-box">${plan.name}</div>
        <p class="swal-text">
          Are you sure you want to activate this subscription plan?
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
    });

    if (!result.isConfirmed) return;

    try {
      const res = await myFetch("/subscriptions/gift", {
        method: "POST",
        body: {
          user: userId,
          package: plan._id,
        },
      });
      console.log("res", res);

      Swal.fire({
        title: "Activated!",
        text: `"${plan.name}" has been activated.`,
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Something went wrong while activating the plan.",
        icon: "error",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="w-[360px] bg-transparent shadow-none border-none flex justify-center"
      >
        <div className="flex flex-col items-center bg-gray-300 p-6 w-[360px] rounded-md">
          {pack.map((plan) => (
            <button
              key={plan._id}
              type="button"
              onClick={() => handleActivate(plan)}
              className="w-full bg-white text-center py-3 my-2 rounded-md font-semibold text-[#0288A6] hover:bg-gray-100 transition"
            >
              {plan.name}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
