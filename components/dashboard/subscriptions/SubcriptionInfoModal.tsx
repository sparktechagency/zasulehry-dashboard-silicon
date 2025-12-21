import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Your Radix Dialog wrapper components

export default function SubscriptionInfoModal({
  header,
  trigger,
  description,
}: {
  header?: string;
  trigger: React.ReactNode;
  description: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-scroll bg-white rounded-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold mb-3">
            {header ? "Add Subscriber" : "Subscription Information  "}
          </DialogTitle>
        </DialogHeader>

        <div>
          <p className="text-justify text-[12px] 2xl:text-[16px] text-gray-600">
            {description}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
