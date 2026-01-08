import VerifyRequest from "@/components/dashboard/verify-request/VerifyRequest";
import { myFetch } from "@/utils/myFetch";

type Props = {
  searchParams: {
    status?: string;
  };
};

export default async function VRequest({ searchParams }: Props) {
  const status = (await searchParams)?.status || "";

  const params = new URLSearchParams();
  if (status) params.append("status", status);

  // let data: any[] = [];

  // try {
  //   const res = await myFetch(`/verifications?${params.toString()}`, {
  //     tags: ["verification"],
  //   });

  //   if (res?.success) {
  //     data = res.data || [];
  //   } else {
  //     console.error("Verification fetch failed:", res?.message);
  //   }
  // } catch (error) {
  //   console.error("Error fetching verifications:", error);
  // }

  const res = await myFetch(`/verifications?${params.toString()}`, {
    tags: ["verification"],
  });

  return (
    <div className="w-full">
      <VerifyRequest res={res} />
    </div>
  );
}
