import { ArrowDownToLine, Eye } from "lucide-react";
import React from "react";
import ViewDetails from "./ViewDetails";

export default function Invoices() {
  const data = [
    { id: "436252536", date: "05.01.2022" },
    { id: "436252536", date: "05.01.2022" },
  ];

  return (
    <div className="max-w-sm mt-6">
      {/* Header */}
      <div className="flex justify-between px-4 pb-2 ">
        <span className="text-gray-700 font-semibold text-xl">ID</span>
        <span className="text-gray-700 font-semibold text-xl">Employer</span>
      </div>

      {/* Cards */}
      <div className="space-y-3 mt-3">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-md shadow p-4 flex justify-between items-center"
          >
            <div>
              <div className="text-gray-900 font-medium">{item.id}</div>
              <div className="text-gray-400 text-xs mt-1">{item.date}</div>
            </div>
            <div className="flex space-x-4 text-[#0288A6]">
              <ViewDetails
                trigger={
                  <button aria-label="View" className=" cursor-pointer">
                    {/* Eye icon */}
                    <Eye />
                  </button>
                }
              />

              <button aria-label="Download" className=" cursor-pointer">
                {/* Download icon */}
                <ArrowDownToLine />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
