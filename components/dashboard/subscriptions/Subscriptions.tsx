import SubscriptionCard from "./SubscriptionCard";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import Button from "@/components/share/Button";

export default function Subscriptions() {
  return (
    <div className="px-8">
      <div className=" flex justify-between items-center text-gray-700 cursor-pointer my-1">
        <h1 className="text-2xl font-semibold">Subscription Plan</h1>
        <Link href={`/subscription-add-form`}>
          <Button className="px-3 py-2 btn-design flex items-center gap-2 rounded-3xl cursor-pointer text-white 2xl:text-lg xl:p-4">
            <PlusCircle size={20} />
            <span>Add New</span>
          </Button>
        </Link>
      </div>

      <div className="my-4">
        <SubscriptionCard />
      </div>
    </div>
  );
}
