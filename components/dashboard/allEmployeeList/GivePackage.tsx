/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Swal from "sweetalert2";
import { myFetch } from "@/utils/myFetch";

type Plan = {
  _id: string;
  name: string;
  subscription: any;
};

interface GivePackageProps {
  packages: any;
  trigger?: React.ReactNode;
}

export default function GivePackage({ packages, trigger }: GivePackageProps) {
  const [open, setOpen] = useState(false);

  const handleActivate = async (plan: Plan) => {
    setOpen(false);

    const result = await Swal.fire({
      html: `
        <div class="title-box">${plan?.subscription?.package?.name}</div>
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
          user: plan?._id,
          package: plan?.subscription?.package?._id,
        },
      });

      Swal.fire({
        title: "Activated!",
        text: `${plan?.subscription?.package?.name} has been activated.`,
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
          {packages?.map((plan: any) => (
            <button
              key={plan._id}
              type="button"
              onClick={() => handleActivate(plan)}
              className="w-full bg-white text-center py-3 my-2 rounded-md font-semibold text-[#0288A6] hover:bg-gray-100 transition"
            >
              {plan?.subscription?.package?.name}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
