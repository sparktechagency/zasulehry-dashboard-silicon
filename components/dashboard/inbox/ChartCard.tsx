import Image from "next/image";
import image from "../../../public/user.png";
import Chart from "../../../public/chart.png";
import Link from "next/link";

interface cardPros {
  name: string;
  message: string;
  updatedAt: string;
  unread: string;
}

export const ChatCard = ({ card }: { card: any }) => {
  const { name, message } = card?.participants[0];
  return (
    <Link href={`/inbox?id=${card?._id}`}>
      <div className="flex flex-row justify-between p-4 bg-white rounded-lg shadow mb-3">
        <div className="flex items-center gap-2 ">
          <div>
            <Image
              className="w-9 h-9 xl:h-11 xl:w-11 rounded-full object-cover"
              src={image}
              alt="User avatar"
            />
          </div>
          <div>
            <h4 className="text-gray-800 text-xs 2xl:text-[15px] font-medium">
              {name}
            </h4>
            <div className="flex items-center gap-1">
              <div>
                <Image
                  src={Chart}
                  width={10}
                  height={10}
                  className="size-2 xl:size-3"
                  alt="User avatar"
                />
              </div>
              <h4 className="text-gray-600 text-[9px] 2xl:text-sm">
                {message}
              </h4>
            </div>
          </div>
        </div>
        <div className="flex-col justify-end">
          <p className="text-[#B0B0B0] text-[9px] 2xl:text-sm text-end">
            {/* {dayjs(card?.updatedAt).format("YYYY-MM-DD")} */}
          </p>
          <div className="flex justify-end">
            <span className="bg-[#0288A6] rounded-full h-4 w-4 xl:h-8 xl:w-8 flex justify-center items-center font-medium text-white text-[8px] 2xl:text-sm">
              {card?.unreadCount}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
