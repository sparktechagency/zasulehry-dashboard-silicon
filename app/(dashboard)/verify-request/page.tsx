import VerifyRequest from "@/components/dashboard/verify-request/VerifyRequest";
import { myFetch } from "@/utils/myFetch";

export default async function VRequest() {
  const res = await myFetch("/verifications");
  return (
    <>
      <VerifyRequest res={res?.data} />
    </>
  );
}
