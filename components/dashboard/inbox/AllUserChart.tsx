import React from "react";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ChatCard } from "./ChartCard";

const AllUserChart = ({ chatList }: any) => {
  return (
    <div
      className="max-w-md mx-auto  bg-gray-100 pr-2 flex flex-col"
      style={{ height: "calc(100vh - 88px)" }}
    >
      <div className="mb-4 mr-3">
        <div className="">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search Here"
              className="w-full  bg-white pl-12 placeholder:text-black h-10
              "
            />
            <Search className="-mt-8 ml-4" />
          </div>
        </div>
      </div>

      {chatList.length > 0 ? (
        <div className="flex-1 overflow-y-auto space-y-2 hide-scrollbar">
          <div className="mr-4">
            {chatList?.map((chat: any, index: number) => (
              <ChatCard key={index} card={chat} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-400 mt-20"> No Chats Found </div>
      )}
    </div>
  );
};

export default AllUserChart;
