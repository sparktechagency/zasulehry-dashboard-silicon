import VerifyRequest from "@/components/dashboard/verify-request/VerifyRequest";
import { myFetch } from "@/utils/myFetch";

type Props = {
  searchParams: { status: string };
};

export default async function VRequest({ searchParams }: Props) {
  const status = (await searchParams)?.status || "";
  const res = await myFetch(`/verifications?status=${status}`, {
    method: "GET",
    tags: ["verification"],
  });
  return (
    <>
      <VerifyRequest res={res?.data} />
    </>
  );
}
