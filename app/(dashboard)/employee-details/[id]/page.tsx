import GivePackage from "@/components/dashboard/allEmployeeList/GivePackage";
import { SwitchDemo } from "@/components/dashboard/allEmployeeList/Switch";
import Button from "@/components/share/Button";
import { getImageSrc } from "@/components/share/getImage";
import { myFetch } from "@/utils/myFetch";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import EmployeeStatusChange from "../EmployeeStatusChange";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const res = await myFetch(`/employers/single/${id}`);
  const packages = await myFetch("/packages");
  const giftSubscription = await myFetch("/subscriptions/subscribers");

  const user = {
    name: res?.data?.user?.name,
    email: res?.data?.user?.email,
    contact: res?.data?.user?.phone || "No",
    location: res?.data?.user?.address || "No",
    image: res?.data?.user?.image,
    role: res?.data?.user?.role || "No",
  };

  console.log("res?.data?._id", res?.data?._id);

  return (
    <div>
      <div className="p-6">
        <div className="flex items-center  justify-between gap-2 mb-4">
          <Link href="/all-employee-list">
            <div className="flex items-center gap-2 mb-4 text-black">
              <ArrowLeft className="w-5 h-5" />
              <h2 className="text-lg font-semibold">View Details</h2>
            </div>
          </Link>
          <div>
            <GivePackage
              userId={res?.data?._id}
              pack={packages?.data}
              trigger={
                <button className="capitalize btn-design px-5 py-2 cursor-pointer">
                  give package
                </button>
              }
            />
          </div>
        </div>
        {/* Card */}
        <div className="bg-white p-5 flex flex-col md:flex-row gap-6 items-start rounded-md">
          {/* Avatar */}
          <Image
            src={getImageSrc(user?.image)}
            alt={user.name}
            width={200}
            height={200}
            className=" rounded-full object-cover"
          />

          {/* Info */}
          <div className="flex-1 space-y-2 text-gray-800">
            <h1 className="text-[#0288A6] text-xl font-medium capitalize  underline underline-offset-4">
              personal information
            </h1>
            <p>
              <span className="font-semibold">Name</span> : {user.name}
            </p>
            <p>
              <span className="font-semibold">Email</span> : {user.email}
            </p>
            <p>
              <span className="font-semibold">Contact</span> : {user.contact}
            </p>
            <p>
              <span className="font-semibold">Location</span> : {user.location}
            </p>
            <p>
              <span className="font-semibold">Role</span> : {user.role}
            </p>
            {/* <p>
              <span className="font-semibold">subscription</span> :{" "}
              {user.subscription}
            </p> */}

            {/* Warning note */}
          </div>

          {/* switch */}
          <div>
            <SwitchDemo data={giftSubscription?.data[0]} />
          </div>
        </div>

        {/* footer section */}

        <div className="mt-6 flex items-center justify-between gap-3 bg-white p-2 rounded-md">
          <p className="text-md ">
            If you feel the user is fake in any way, you can block or delete the
            user from here.
          </p>
          <div className="flex gap-3">
            <Link href="/inbox">
              <Button className="btn-design text-white  px-6 rounded-full">
                Message
              </Button>
            </Link>
            <EmployeeStatusChange id={res?.data?.user?._id} />
          </div>
        </div>
      </div>
    </div>
  );
}
