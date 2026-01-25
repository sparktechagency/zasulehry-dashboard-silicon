"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import Image from "next/image";
import PdfViewer from "@/share/ViewerPdf";
import { Button } from "@/components/ui/button";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { revalidate } from "@/utils/revalidateTags";
import { useState } from "react";
import CustomImage from "@/share/CustomImage";

export default function RequestModal({ name, item }: any) {
  const [open, setOpen] = useState(false);
  const userItem = item.user;
  const users = {
    name: userItem.name,
    email: userItem.email,
    contact: userItem.phone,
    location: userItem.address,
    image: userItem?.image,
  };

  const handleUpdateStatus = async (value: string) => {
    try {
      const res = await myFetch(`/verifications/update/${item?._id}`, {
        method: "PATCH",
        body: { status: value },
      });

      if (res.success) {
        toast.success(res.message || "Support marked as resolved!");
        await revalidate("verification");
      } else {
        toast.error((res as any)?.error?.[0]?.message || "Failed to update");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={`${
            name ? "" : "bg-[#0288A6]"
          } m-1 p-1 rounded cursor-pointer`}
        >
          {name ? name : <Eye className=" text-white size-5 2xl:size-7" />}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[540px] xl:max-w-[740px]">
        <div className="">
          {/* Card */}
          <div className="bg-white p-5 flex flex-col md:flex-row gap-4 items-start">
            {/* Avatar */}
            <CustomImage
              src={`${users.image}`}
              title={users.name}
              width={200}
              height={200}
              className=" rounded-full w-[150px] h-[150px] object-cover"
            />

            {/* Info */}
            <div className="flex-1 space-y-0.5 text-gray-800">
              <h1 className="text-[#0288A6] text-xl 2xl:text-2xl font-medium">
                Personal Information
              </h1>
              <p className="text-xs 2xl:text-lg">
                <span className="font-semibold">Name</span> : {users?.name}
              </p>
              <p className="text-xs 2xl:text-lg">
                <span className="font-semibold">Email</span> : {users?.email}
              </p>
              <p className="text-xs 2xl:text-lg">
                <span className="font-semibold">Contact</span> :{" "}
                {users?.contact || "No"}
              </p>
              <p className="text-xs 2xl:text-lg">
                <span className="font-semibold">Location</span> :{" "}
                {users?.location || "No Address"}
              </p>
            </div>
          </div>

          {/* id card */}
          {/* Avatar */}
          <div className="flex gap-4">
            <PdfViewer fileUrl={item?.documents} />
          </div>
          {/* footer section */}
          <div className="mt- flex justify-end gap-4">
            {item.status === "Pending" && (
              <div className="mt- flex justify-end gap-2">
                <Button
                  type="submit"
                  onClick={() => handleUpdateStatus("Rejected")}
                  className="bg-red-600 text-white h-10 rounded-full cursor-pointer  shadow-md"
                >
                  Decline
                </Button>

                <Button
                  type="submit"
                  onClick={() => handleUpdateStatus("Approved")}
                  className="bg-[#0288A6] text-white h-10 rounded-full cursor-pointer  shadow-md"
                >
                  Approve
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
