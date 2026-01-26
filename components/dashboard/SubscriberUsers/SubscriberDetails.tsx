import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CustomImage from "@/share/CustomImage";

export default function SunscriberDetails({
  item,
  trigger,
}: {
  item?: any;
  trigger: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px] 2xl:sm:max-w-[990px]">
        <div className="p-3">
          <div className="flex items-center gap-2 mb-4 text-black">
            {/* <ArrowLeft className="w-5 h-5" /> */}
            <h2 className="text-lg font-semibold">View Details</h2>
          </div>

          {/* Card */}
          <div className="bg-white p-5 flex  md:flex-row gap-6 items-start">
            {/* Avatar */}
            <CustomImage
              src={item?.image}
              title={item.name}
              width={200}
              height={200}
              className="rounded-full h-56 w-56 object-cover"
            />

            {/* Info */}
            <div className="flex flex-row gap-4 flex-1">
              <div className="flex-1 space-y-2 text-gray-800 border border-[#0B5162] rounded-md p-4 w-auto">
                <h1 className="text-[#0B5162] text-lg 2xl:text-xl font-medium capitalize underline underline-offset-4">
                  personal information
                </h1>
                <p className="text-xs 2xl:text-lg">
                  <span className="font-semibold">Name</span> : {item?.name}
                </p>
                <p className="text-xs 2xl:text-lg">
                  <span className="font-semibold">Email</span> : {item?.email}
                </p>
                <p className="text-xs 2xl:text-lg">
                  <span className="font-semibold">Contact</span> : {item?.phone}
                </p>
                <p className="text-xs 2xl:text-lg">
                  <span className="font-semibold">Location</span> :{" "}
                  {item?.address}
                </p>
                <p className="text-xs 2xl:text-lg">
                  <span className="font-semibold">Role.</span> : {item?.role}
                </p>
              </div>

              {/* subscriber details */}
              <div className=" border border-[#0B5162] rounded-md p-4 text-center ">
                <div className="text-xl 2xl:text-2xl font-bold text-[#0B5162]">
                  ${item?.subscription.price}/
                  <span className="text-sm font-normal">Perday</span>
                </div>
                <div className="text-sm 2xl:text-lg xl:font-medium text-[#0B5162]/80 font-light mb-4">
                  {item?.subscription?.package?.intervalCount} Days
                </div>
                <ul className="text-left text-gray-700 space-y-2 list-disc list-inside">
                  {item?.subscription?.package?.benefits?.map(
                    (feature: any, index: number) => (
                      <li key={index} className="text-xs 2xl:text-lg">
                        {feature}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
