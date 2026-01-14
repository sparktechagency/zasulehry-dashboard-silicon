"use client";
import { useSocket } from "@/lib/SocketContext";
// import Link from "next/link";
import CustomImage from "@/share/CustomImage";
import { useRouter, useSearchParams } from "next/navigation";

export const ChatCard = ({ card }: { card: any }) => {
  const { socket } = useSocket();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentChatId = searchParams.get("id");

  const selectChatId = () => {
    if (!socket) return;
    console.log("Selected chat ID:", card?._id);
    socket.emit("joinChat", card?._id);
    router.push(`/dashboard/inbox?id=${card?._id}`);
  };

  const active = card?._id === currentChatId;

  return (
    <div onClick={selectChatId}>
      <div
        className={`flex flex-row justify-between p-4  rounded-lg shadow mb-3 cursor-pointer ${
          active ? "bg-gray-200" : "bg-white"
        }`}
      >
        <div className="flex items-center gap-2 ">
          <div>
            {card?.participants?.map((item: any, index: number) => (
              <CustomImage
                key={index}
                className="w-9 h-9 xl:h-11 xl:w-11 rounded-full object-cover"
                src={item?.image}
                title={item?.name}
              />
            ))}
          </div>
          <div>
            {card?.participants?.map((item: any, index: number) => (
              <h4
                key={index}
                className="text-gray-800 text-xs 2xl:text-[15px] font-medium"
              >
                {item?.name}
              </h4>
            ))}

            {/* last message */}
            <div>
              <h4>{card?.lastMessage?.text}</h4>
            </div>
          </div>
        </div>
        {/* <div className="flex-col justify-end">
          <p className="text-[#B0B0B0] text-[9px] 2xl:text-sm text-end">
            {dayjs(card?.updatedAt).format("YYYY-MM-DD")}
          </p>
          <div className="flex justify-end">
            <span className="bg-[#0288A6] rounded-full h-4 w-4 xl:h-8 xl:w-8 flex justify-center items-center font-medium text-white text-[8px] 2xl:text-sm">
              {card?.unreadCount}
            </span>
          </div>
        </div> */}
      </div>
    </div>
  );
};
