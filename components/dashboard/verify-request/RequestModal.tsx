import Button from "@/components/share/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import Image from "next/image";
import card1 from "../../../public/card1.png";
import card2 from "../../../public/card2.png";

const user = {
  name: "Karman Khan",
  email: "Admin@Instantlabour.Co.Uk",
  contact: "01333327633",
  location: "Dhaka Bangladesh",
  role: "Employer",
  image: "https://i.ibb.co.com/xNXnsd1/Ellipse-7.png", // Replace with actual image path
};

export default function RequestModal({ name }: any) {
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
                <span className="font-semibold">Name</span> : {user.name}
              </p>
              <p className="text-xs 2xl:text-lg">
                <span className="font-semibold">Email</span> : {user.email}
              </p>
              <p className="text-xs 2xl:text-lg">
                <span className="font-semibold">Contact</span> : {user.contact}
              </p>
              <p className="text-xs 2xl:text-lg">
                <span className="font-semibold">Location</span> :{" "}
                {user.location}
              </p>
              <p className="text-xs 2xl:text-lg">
                <span className="font-semibold">Role.</span> : {user.role}
              </p>

              {/* Warning note */}
            </div>
          </div>

          {/* id card */}
          {/* Avatar */}
          <div className="flex gap-4">
            <a
              href="http://localhost:3000/card1.png"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <Image
                src={card1}
                alt={user.name}
                width={300}
                height={300}
                className="object-cover"
              />
            </a>
            <a
              href="http://localhost:3000/card2.png"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={card2}
                alt={user.name}
                width={300}
                height={300}
                className="object-cover"
              />
            </a>
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
