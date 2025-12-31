import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import Image from "next/image";
import PdfViewer from "@/share/ViewerPdf";
import { formatUrl } from "@/utils/formatUrl";
import { Button } from "@/components/ui/button";

export default function RequestModal({ name, item }: any) {
  const userItem = item.user;
  const users = {
    name: userItem.name,
    email: userItem.email,
    contact: userItem.phone,
    location: userItem.address,
    image: userItem?.image,
  };

  return (
    <Dialog>
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
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${users.image}`}
              alt={users.name}
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
            <PdfViewer fileUrl={formatUrl(item?.documents[0])} />
            <PdfViewer fileUrl={formatUrl(item?.documents[1])} />
          </div>
          {/* footer section */}
          <div className="mt- flex justify-end">
            {item.status === "Pending" && (
              <div>
                <Button className="bg-[#0288A6] text-white h-10 rounded-full cursor-pointer  shadow-md">
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
