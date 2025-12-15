import { Dialog, DialogTrigger } from "@/components/ui/dialog";

export default function AddOfferModal({
  trigger,
}: {
  trigger: React.ReactNode;
}) {
  //   const handleSubmit = (e: any) => {
  //     e.preventDefault();
  //     if (offer.trim() == "") return;
  //     onAddOffer(offer.trim());
  //     setOffer("");
  //     onClose();
  //   };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <div className="fixed inset-0  flex items-center justify-center z-50">
          <div className="bg-[#212526] text-white rounded-lg  w-full max-w-sm p-6 relative">
            <button
              //   onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
            >
              &times;
            </button>

            {/* Modal Title */}
            <h2 className="text-lg font-semibold mb-4">Add New Offer</h2>

            {/* Input Form */}
            <form>
              <input
                type="text"
                placeholder="Enter offer name"
                // value={offer}
                // onChange={(e) => setOffer(e.target.value)}
                className="w-full bg-[#212526] border border-gray-600 rounded-md p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                autoFocus
              />

              {/* Buttons */}
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  //   onClick={onClose}
                  className="px-4 py-1.5 rounded-md border border-white text-white hover:bg-white hover:text-gray-900 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </form>
    </Dialog>
  );
}
