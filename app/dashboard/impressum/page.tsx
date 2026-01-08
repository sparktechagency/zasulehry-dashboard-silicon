import Impressum from "@/components/settings/Impressum";
import { myFetch } from "@/utils/myFetch";

export default async function page() {
  const res = await myFetch("/disclaimers/impressum");
  return (
    <div>
      <h1 className="text-lg 2xl:text-2xl font-medium px-4">Impressum</h1>
      <Impressum data={res?.data?.content} />
    </div>
  );
}
