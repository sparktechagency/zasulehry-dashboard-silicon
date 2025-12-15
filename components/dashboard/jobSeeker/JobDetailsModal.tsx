import Button from "@/components/share/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import PersonalInformation from "./PersonalInformation";
import WorkInformation from "./WorkInformation";
import ImageDetailsShow from "./ImageDetailsShow";
import Link from "next/link";

const user = {
  name: "Kamran Khan",
  email: "Admin@Instantlabour.Co.Uk",
  contact: "01333327633",
  location: "Dhaka Bangladesh",
  role: "Employer",
  image: "https://i.ibb.co.com/xNXnsd1/Ellipse-7.png", // Replace with actual image path
};
const work = {
  category: "senior business analytics",
  experience: "12 Years",
};

export default function JobDetailsModal({
  trigger,
}: {
  trigger: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[1000px] overflow-y-auto h-[75%]">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2 text-black">
            {/* <ArrowLeft className="w-5 h-5" /> */}
            <h2 className="text-lg font-semibold">View Details</h2>
          </div>

          {/* Card */}
          <div className="bg-white p-3 flex flex-col md:flex-row gap-6">
            <Image
              src={user.image}
              alt={user.name}
              width={200}
              height={60}
              className="w-48 h-48 rounded-full object-cover"
            />

            {/* Wrap personal + work info in a flex container.... */}
            <div className="flex flex-col md:flex-row gap-6 flex-1">
              <div className="border border-[#0288A6] rounded-xl p-3 flex-1">
                <PersonalInformation user={user} />
              </div>
              <div className="border border-[#0288A6] rounded-xl p-3 flex-1">
                <WorkInformation user={work} />
              </div>
            </div>
          </div>

          {/* image section */}
          <ImageDetailsShow />

          {/* footer section */}
          <div className="mt-2 flex items-center justify-between gap-3 bg-white ">
            <p className="text-sm ">
              If you feel the user is fake in any way, you can block or delete
              the user from here.
            </p>
            <div className="flex gap-3">
              <Link href="/inbox">
                <Button className="bg-[#0288A6] text-white  px-6 rounded-full">
                  Message
                </Button>
              </Link>
              <Button className="bg-[#D21D1D]  text-white  px-6 rounded-full">
                Block
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
