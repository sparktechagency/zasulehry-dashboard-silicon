"use client";
import Button from "@/components/share/Button";

import Image from "next/image";
import PersonalInformation from "./PersonalInformation";
import WorkInformation from "./WorkInformation";
import ImageDetailsShow from "./ImageDetailsShow";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { revalidate } from "@/utils/revalidateTags";
import { useRouter } from "next/navigation";

export default function JobDetails({ data }: any) {
  const router = useRouter();
  const user = {
    name: data?.user?.name,
    email: data?.user?.email,
    contact: data?.user?.phone,
    location: data?.user?.address,
    image: data?.user?.image,
  };
  const work = {
    category: data?.experiences?.category || "No Data",
    experience: data?.experiences?.experience || "No Data",
  };

  const handleUpdateStatus = async (id: string) => {
    try {
      const res = await myFetch(`/users/status/${id}`, {
        method: "PATCH",
      });

      if (res.success) {
        toast.success(res.message);

        await revalidate("job-seeker");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err?.message : "Something went wrong");
    }
  };

  const handleInbox = async (appointmentId: string) => {
    try {
      const res = await myFetch(`/chats/create`, {
        method: "POST",
        body: {
          participants: [appointmentId],
        },
      });

      console.log("res", res);

      // if (res.success) {
      //   router.push(`/dashboard/inbox`);
      // } else {
      //   toast.error((res as any)?.error[0]?.message);
      // }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "something went wrong",
      );
    }
  };
  return (
    <section className="sm:max-w-[1000px] mx-auto">
      <Link href="/all-job-seeker">
        <div className="flex items-center gap-2 mb-2 text-black">
          <ArrowLeft className="w-5 h-5" />
          <h2 className="text-lg font-semibold">View Details</h2>
        </div>
      </Link>
      <div className=" overflow-y-auto h-[75%] bg-white rounded-xl">
        <div className="p-6">
          {/* Card */}
          <div className="bg-white p-3 flex flex-col md:flex-row gap-6">
            <Image
              src={
                user?.image
                  ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${user.image}`
                  : "/default.png"
              }
              alt={user.name}
              width={200}
              height={60}
              className="w-48 h-48 rounded-full object-cover"
            />

            {/* Wrap personal + work info in a flex container */}
            <div className="flex flex-col md:flex-row gap-6 flex-1">
              <div className="border border-[#0288A6] rounded-xl p-3 flex-1">
                <PersonalInformation user={user} />
              </div>
              <div className="border border-[#0288A6] rounded-xl p-3 flex-1">
                <WorkInformation
                  user={work}
                  resume={data?.resume}
                  url={data?.resumeUrl}
                />
              </div>
            </div>
          </div>

          {/* image section */}
          <ImageDetailsShow images={data?.attachments} data={data} />

          {/* footer section */}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between gap-3 bg-white p-3 rounded-xl">
        <p className="text-sm ">
          If you feel the user is fake in any way, you can block or delete the
          user from here.
        </p>
        <div className="flex gap-3">
          <Button
            onClick={() => handleInbox(data?._id)}
            className="bg-[#0288A6] text-white  px-6 rounded-full"
          >
            Message
          </Button>

          <Button
            onClick={() => handleUpdateStatus(data?.user?._id)}
            className="bg-[#D21D1D]  text-white  px-6 rounded-full"
          >
            Block
          </Button>
        </div>
      </div>
    </section>
  );
}
