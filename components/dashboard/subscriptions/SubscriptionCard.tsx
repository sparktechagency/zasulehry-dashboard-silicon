import Button from "@/components/share/Button";

import { Info } from "lucide-react";
import SubscriptionInfoModal from "./SubcriptionInfoModal";

import Link from "next/link";

const getData = [
  {
    id: 1,
    title: "Basic",

    price: "0.90",
    day: 30,
    time: "Days",
    des: "It is a long established fact that a reader will be distracted by the readable content.",
    features: [
      "120 Days permission to use",
      "Free training tutorial",
      "Free journal",
      "Free consultations",
      "20 Community post",
    ],
  },
  {
    id: 3,
    title: "Standard",
    extra: "Percenter Choice",
    price: "0.99",
    day: 90,
    time: "Days",
    des: "It is a long established fact that a reader will be distracted by the readable content.",
    features: [
      "120 Days permission to use",
      "Free training tutorial",
      "Free journal",
      "Free consultations",
      "20 Community post",
    ],
  },
  {
    id: 2,
    title: "Booster",
    price: "0.90",
    day: 180,
    time: "Days",
    des: "It is a long established fact that a reader will be distracted by the readable content.",
    features: [
      "120 Days permission to use",
      "Free training tutorial",
      "Free journal",
      "Free consultations",
      "20 Community post",
    ],
  },
];

export default function SubscriptionCard() {
  return (
    <>
      <div className="grid grid-cols-3 gap-6 ">
        {getData?.map((item: any) => (
          <div key={item.id} className="">
            <div>
              <h2 className="text-xl font-semibold text-center btn-design mb-5 py-1 rounded-md">
                {item?.title}
              </h2>
            </div>
            <div className="bg-white h-[90%] p-4 shadow-md rounded-sm  flex flex-col">
              {/* {item?.extra && (
                <h1 className="btn-design w-[50%] px-4 py-2 rounded-md">
                  {item?.extra}
                </h1>
              )} */}
              <div className="flex items-center justify-between">
                <div className="space-x-4">
                  {/* <button>
                  <FiEdit size={22} />
                </button> */}
                  {/* function here */}
                  {/* <Delete /> */}
                </div>
              </div>
              <div>
                <div className="relative text-3xl text-[#083E4B] font-bold flex items-center justify-center">
                  <div>
                    {item?.price} $
                    <span className="text-[16px] mt-3 text-[#083E4B]/80">
                      {" "}
                      / Perday
                    </span>
                  </div>
                  <div className="absolute -bottom-4 right-0 flex mt-2 ">
                    <SubscriptionInfoModal
                      trigger={
                        <span className="ml-16">
                          <Info />
                        </span>
                      }
                    />
                  </div>
                </div>
                <p className="text-md font-bold text-center mt-2  text-[#083E4B]/70">
                  {item.day} {item?.time}
                </p>
              </div>
              <div className="mt-6 space-y-3 ">
                {item?.features.map((contentItem: any, index: number) => (
                  <div key={index} className="flex items-center">
                    <span className="bg-gray-600 h-1.5 w-1.5 mr-2 rounded-full">
                      {/* <IoIosCheckmark className="text-black" /> */}
                    </span>
                    <p className="text-[14px] 2xl:text-lg text-gray-700">
                      {contentItem}
                    </p>
                  </div>
                ))}
              </div>

              <Link href={`/subscription/${item.id}?type=edit`}>
                <Button className="btn-design text-lg mt-10 xl:h-10">
                  Edit
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
