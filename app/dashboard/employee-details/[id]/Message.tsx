"use client";
import { Button } from "@/components/ui/button";
import { myFetch } from "@/utils/myFetch";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Message({ id }: { id: string }) {
  const router = useRouter();
  const handleInbox = async () => {
    try {
      const res = await myFetch(`/chats/create`, {
        method: "POST",
        body: {
          participants: [id],
        },
      });

      console.log("res", res);

      if (res.success) {
        router.push(`/dashboard/inbox`);
      } else {
        toast.error((res as any)?.error[0]?.message);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "something went wrong",
      );
    }
  };
  return (
    <Button
      onClick={handleInbox}
      className="bg-[#0288A6] text-white  px-6 rounded-full"
    >
      Message
    </Button>
  );
}
