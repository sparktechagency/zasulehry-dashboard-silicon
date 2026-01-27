import { Info } from "lucide-react";
import SubscriptionInfoModal from "./SubcriptionInfoModal";

import Link from "next/link";
import { myFetch } from "@/utils/myFetch";
import { Button } from "@/components/ui/button";
import DeletePackage from "./DeletePackage";

export default async function SubscriptionCard() {
  const res = await myFetch("/packages", {
    tags: ["package"],
  });
  return (
    <>
      <div className="grid grid-cols-3 gap-16 ">
        {res?.data?.map((item: any) => (
          <div key={item._id} className="my-5">
            <div>
              <h2 className="text-xl font-semibold text-center btn-design mb-5 py-1 rounded-md">
                {item?.name}
              </h2>
            </div>
            <div className="bg-white h-[90%] p-4 shadow-md rounded-sm  flex flex-col">
              <div>
                <div className="relative text-3xl text-[#083E4B] font-bold flex items-center justify-center">
                  <div>
                    ${item?.dailyPrice}
                    <span className="text-[16px] mt-3 text-[#083E4B]/80">
                      {" "}
                      / Perday
                    </span>
                  </div>

                  <div className="absolute -bottom-4 right-0 flex mt-2 ">
                    <SubscriptionInfoModal
                      description={item.description}
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
              <div className="text-center flex justify-center items-center text-[#0288A6] font-medium gap-1 text-lg">
                {/* <p>{item?.intervalCount ? item?.intervalCount * 30 : 0}</p> */}
                <p>{item?.intervalCount ? item?.intervalCount : 0}</p>
                <p>Month</p>
              </div>
              <div className="mt-6 space-y-3 ">
                {item?.benefits?.map((content: any, index: number) => (
                  <ul key={index} className="flex items-center list-disc px-9">
                    <li className="text-[14px] 2xl:text-lg text-gray-700">
                      {content}
                    </li>
                  </ul>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-5 flex-1 items-end">
                <Link href={`/dashboard/subscription-form-update/${item?._id}`}>
                  <Button
                    variant={"outline"}
                    className="text-lg mt-10 xl:h-10 w-full"
                  >
                    Edit
                  </Button>
                </Link>
                <DeletePackage id={item?._id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
