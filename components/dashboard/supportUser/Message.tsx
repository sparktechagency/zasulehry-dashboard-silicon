"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export function Message({ title }: { title?: string }) {
  const imageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(URL.createObjectURL(file!));
  };

  const handleImageUpload = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  return (
    <Dialog>
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
              <p className="text-sm font-medium text-gray-700">From :</p>
              <p className=" text-gray-900">Ebrahim</p>
            </div>
            <div className="flex items-center gap-5">
              <p className="text-sm font-medium text-gray-700">Date :</p>
              <p className=" text-gray-900">2024-01-15</p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <p className="text-sm font-medium text-gray-700">Status :</p>
            <p className="font-semibold text-red-600">Pending</p>
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700">Message :</p>
            <textarea
              readOnly
              value="Im Having Issue With The Log In System.It Keeps Showing An Error."
              className="w-full h-20 p-2 mt-1 text-gray-900 bg-white border border-gray-300 rounded resize-none"
            />
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700">Your Reply :</p>
            <textarea
              placeholder="Type Your Response Here."
              className="w-full h-20 p-2 mt-1 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="flex justify-end items-center mb-3">
            {image ? (
              <Image src={image} width={100} height={100} alt="image" />
            ) : (
              <span
                onClick={handleImageUpload}
                className="flex justify-center items-center bg-white rounded-full h-12 w-12 text-[#074E5E] cursor-pointer"
              >
                <ImageIcon />
              </span>
            )}

            <input
              ref={imageRef}
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <button className="px-4 py-2 border border-[#D21D1D] text-[#D21D1D] rounded font-semibold  cursor-pointer">
                Cancel
              </button>
            </DialogClose>
            <button className="btn-design px-4 py-2  font-semibold rounded  cursor-pointer">
              Send Reply
            </button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
