import Button from "@/components/share/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import Image from "next/image";
import PdfViewer from "@/share/ViewerPdf";
import { formatUrl } from "@/utils/formatUrl";

const user = {
  name: "Karman Khan",
  email: "Admin@Instantlabour.Co.Uk",
  contact: "01333327633",
  location: "Dhaka Bangladesh",
  role: "Employer",
  image: "https://i.ibb.co.com/xNXnsd1/Ellipse-7.png", // Replace with actual image path
};

export default function RequestModal({ name, item }: any) {
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
              src={user.image}
              alt={user.name}
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
                <span className="font-semibold">Name</span> : {item?.user?.name}
              </p>
              <p className="text-xs 2xl:text-lg">
                <span className="font-semibold">Email</span> :{" "}
                {item?.user?.email}
              </p>
              <p className="text-xs 2xl:text-lg">
                <span className="font-semibold">Contact</span> :{" "}
                {item?.user?.phone || "No"}
              </p>
              <p className="text-xs 2xl:text-lg">
                <span className="font-semibold">Location</span> :{" "}
                {item?.user?.address || "No Address"}
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
          <div className="mt-4 flex items-center justify-end gap-3 bg-white ">
            <div className="flex gap-3">
              <Button className="bg-[#D21D1D]  text-white  px-6 rounded-full hover:bg-[#740909]">
                Decline
              </Button>
              <Button className="bg-[#0288A6] text-white  px-6 rounded-full hover:bg-[#0e505f]">
                Approve
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
