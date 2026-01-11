"use client";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import Swal from "sweetalert2";
export function SwitchDemo({ data }: any) {
  const [airplaneMode, setAirplaneMode] = useState(false);

  const onChange = () => {
    Swal.fire({
      html: `
          <div class="title-box">Standard</div>
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
    });
  };

  return (
    <>
      <div className="space-y-2">
        <div className="">
          <div className="flex justify-end">
            <Switch
              // onClick={onChange}
              className=""
              id="airplane-mode"
              checked={data?.status}
              onCheckedChange={setAirplaneMode}
            />
          </div>

          <p className="text-[#343434] flex justify-end">
            {data?.status ? "Activated" : "Inactivated"}
          </p>

          {data?.subscription?.package?.name && (
            <p className="flex justify-end">
              <span className="font-semibold">
                {data?.subscription?.package?.name}
              </span>
            </p>
          )}
        </div>
      </div>
    </>
  );
}
