import Button from "@/components/share/Button";

import { Info } from "lucide-react";
import SubscriptionInfoModal from "./SubcriptionInfoModal";

import Link from "next/link";
import { myFetch } from "@/utils/myFetch";

export default async function SubscriptionCard() {
  const res = await myFetch("/packages");
  return (
    <>
      <div className="grid grid-cols-3 gap-6 ">
        {res?.data?.map((item: any) => (
          <div key={item._id} className="">
            <div>
              <h2 className="text-xl font-semibold text-center btn-design mb-5 py-1 rounded-md">
                {item?.name}
              </h2>
            </div>
            <div className="bg-white h-[90%] p-4 shadow-md rounded-sm  flex flex-col">
              <div>
                <div className="relative text-3xl text-[#083E4B] font-bold flex items-center justify-center">
                  <div>
                    {item?.dailyPrice} $
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
                {item?.benefits?.map((content: any, index: number) => (
                  <div key={index} className="flex items-center">
                    <p className="text-[14px] 2xl:text-lg text-gray-700">
                      {content}
                    </p>
                  </div>
                ))}
              </div>

              <Link href={`/subscription-form/${item?._id}`}>
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
