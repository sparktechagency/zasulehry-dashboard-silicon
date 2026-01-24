/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { myFetch } from "@/utils/myFetch";
import dayjs from "dayjs";
import { Eye } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export function Message({ title, item }: { title?: string; item?: any }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  // const imageRef = useRef<HTMLInputElement>(null);
  // const [image, setImage] = useState("");

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   setImage(URL.createObjectURL(file!));
  // };

  // const handleImageUpload = () => {
  //   if (imageRef.current) {
  //     imageRef.current.click();
  //   }
  // };

  const handleReplyMessage = async (id: string) => {
    if (!value) {
      toast.error("Please type your reply");
      return;
    }

    setLoading(true);
    try {
      const res = await myFetch(`/supports/update/${id}`, {
        method: "PATCH",

        body: {
          status: item?.status,
          reply: value,
        },
      });

      if (res.success) {
        toast.success(res.message || "Reply sent successfully");
        setValue(""); // clear textarea
        setOpen(false); // optionally close dialog
      } else {
        const errorMessage = Array.isArray(res.error)
          ? res.error[0]?.message
          : res.error || res.message || "Something went wrong";
        toast.error(errorMessage);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {title ? (
          <span className="cursor-pointer">{title}</span>
        ) : (
          <span className="bg-[#0288A6] m-1 p-1 rounded cursor-pointer flex justify-center items-center">
            <Eye className="text-white size-6 2xl:size-7" />
          </span>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg w-full bg-gray-100 rounded-lg p-6 shadow-lg">
        <DialogTitle className="text-lg font-semibold mb-4">
          Support Request Details
        </DialogTitle>
        <DialogDescription>
          <div className="grid grid-cols-2 gap-x-6 mb-4">
            <div className="flex items-center gap-5">
              <p className="text-sm font-medium text-gray-700">
                From : {item?.name}
              </p>
            </div>
            <div className="flex items-center gap-5">
              <p className="text-sm font-medium text-gray-700">Date :</p>
              <p className=" text-gray-900">
                {dayjs(item?.createdAt).format("YYYY-MM-DD  ")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <p className="text-sm font-medium text-gray-700">Status :</p>
            <p className="font-semibold text-red-600">{item?.status}</p>
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700">Message :</p>
            <textarea
              readOnly
              value={item?.message}
              className="w-full h-20 p-2 mt-1 text-gray-900 bg-white border border-gray-300 rounded resize-none"
            />
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700">Your Reply :</p>
            <textarea
              onChange={(e) => setValue(e.target.value)}
              placeholder="Type Your Response Here."
              className="w-full h-20 p-2 mt-1 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="flex justify items-center mb-3">
            {item?.attachment ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item?.attachment}`}
                width={100}
                height={100}
                alt="image"
              />
            ) : (
              <span
                // onClick={handleImageUpload}
                className="flex justify-center items-center   text-[#074E5E] cursor-pointer"
              >
                No Image
              </span>
            )}

            {/* <input
              ref={imageRef}
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            /> */}
          </div>

          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <button className="px-4 py-2 border border-[#D21D1D] text-[#D21D1D] rounded font-semibold  cursor-pointer">
                Cancel
              </button>
            </DialogClose>
            <button
              type="submit"
              disabled={loading}
              className={`btn-design px-4 py-2  font-semibold rounded   ${
                loading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={() => handleReplyMessage(item?._id)}
            >
              {loading ? "Submiting..." : " Send Reply"}
            </button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
