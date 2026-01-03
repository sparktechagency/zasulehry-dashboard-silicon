import { ArrowDownToLine, Eye } from "lucide-react";
import Image from "next/image";
import React from "react";
import pdf from "../../../public/pdf.png";

export default function WorkInformation({
  user,
  resume,
  url,
}: {
  user: any;
  resume?: string;
  url?: string;
}) {
  return (
    <div className="flex-1 space-y-2 text-gray-800 ">
      <h1 className="text-[#0288A6]  font-medium capitalize underline underline-offset-4">
        work information
      </h1>
      <p>
        <span className="font-semibold text-sm">Category</span> :{" "}
        {user.category}
      </p>
      <p>
        <span className="font-semibold text-sm">Experience</span> :{" "}
        {user.experience}
      </p>
      <div className="flex justify-between items-center">
        <div className="font-semibold flex gap-2">
          <Image src={pdf} alt="pdf" />
          {resume ? (
            <p className="text-sm text-blue-600 hover:underline cursor-pointer">
              {resume.split("/").pop()}
            </p>
          ) : (
            "No Resume"
          )}
        </div>
        <p className="flex gap-2 text-[#0288A6] cursor-pointer">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <button className="text-[#0288A6] cursor-pointer">
              <Eye />
            </button>
          </a>
          <ArrowDownToLine />
        </p>
      </div>
      {/* <p>
        <span className="font-semibold">Location</span> : {user.location}
      </p>
      <p>
        <span className="font-semibold">Role.</span> : {user.role}
      </p> */}
    </div>
  );
}
