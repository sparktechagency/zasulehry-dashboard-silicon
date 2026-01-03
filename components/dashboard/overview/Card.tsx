import User from "../../../public/card.png";
import Image from "next/image";

export default function Card({ card }: any) {
  const statCards = [
    {
      title: "Total Job Seeker",
      value: card?.totalJobSeekers || 0,
      icon: User,
    },
    {
      title: "Total Employer",
      value: card?.totalEmployers || 0,
      icon: User,
    },
    {
      title: "Total Subscriber",
      value: card?.totalSubscribers || 0,
      icon: User,
    },
    {
      title: "Total Revenue",
      value: `$${card?.totalRevenue || 0}`,
      icon: User,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-4">
      {statCards.map((item, index) => {
        // const Icon = item.icon;
        return (
          <div
            key={index}
            className="bg-white shadow-sm rounded-md flex flex-col items-center text-center "
          >
            {/* Header with Icon and title */}
            <div className=" flex items-center justify-center gap-2 text-sm text-gray-600 mt-5">
              <Image src={item.icon} alt="icon" width={20} height={20} />
              <span className="text-[14px] 2xl:text-[20px] font-semibold">
                {item.title}
              </span>
            </div>

            {/* Value */}
            <div className="text-xl font-semibold text-gray-700 px-2 xl:my-2">
              {item.value}
            </div>

            {/* Bottom Decoration */}
            <div className="w-full h-5 bg-[#E6F0F3] rounded-t-full" />
          </div>
        );
      })}
    </div>
  );
}
