import Image from "next/image";
import React from "react";
import user from "../../../public/job-seekar.png";

export default function ImageDetailsShow() {
  return (
    <>
      <h1 className="text-xl font-medium mb-2 mt-5">Attachments</h1>
      <div className="grid grid-cols-[40%_40%_auto] gap-3">
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 6 })
            .fill(user)
            .map((user, index) => (
              <Image
                key={index}
                src={user as string}
                alt="job"
                width={220}
                height={220}
                className="rounded-md object-cover"
              />
            ))}
        </div>
        <div>
          <h1 className=" font-medium">Work Overview</h1>
          <p className="text-[#555555] text-[15px]">
            Lorem ipsum dolor sit amet consectetur. Ultrices eu vitae bibendum
            id at. Mattis tortor cursus viverra eget augue condimentum. Facilisi
            eu vel non scelerisque neque. Massa massa egestas morbi odio nunc
            sollicitudin. Vitae in r .
          </p>
        </div>
        <div>
          <h1 className="text-xl font-medium">Salary/Monthly</h1>
          <p className="font-semibold text-[#0288A6]">$200</p>
        </div>
      </div>
    </>
  );
}
