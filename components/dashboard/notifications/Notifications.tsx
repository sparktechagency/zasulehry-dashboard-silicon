import { BellIcon } from "lucide-react";

const data = [
  {
    id: 1,
    title:
      "Your car rental starts tomorrow! Don't forget to bring your documents.",
  },
  {
    id: 2,
    title:
      "Your car rental starts tomorrow! Don't forget to bring your documents.",
  },
];
export default async function Notifications() {
  return (
    <>
      <h1 className="text-xl font-medium p-4 capitalize">Notifications</h1>

      <section className=" p-5">
        {data?.map((item: any) => (
          <div
            className={`p-4 my-4 ${
              item.isRead === true ? "bg-green-200" : "bg-white"
            } rounded-lg shadow-sm`}
            key={item?._id}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-md">
                  <BellIcon className="h-5 w-5 text-blue-500" />
                </div>

                <div>
                  <p className="text-sm text-gray-800 font-medium">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">02-4-25</p>
                </div>
              </div>

              {/* <div className="space-x-4">
                <Delete />
              </div> */}
            </div>
          </div>
        ))}
      </section>

      {/* <div className="w-32 mx-auto ">
        <button
          className="bg-green-600 p-1.5 rounded text-white cursor-pointer"
          // increament one by one
          onClick={() => handleLoadData(currentPage + 1)}
        >
          Show More
        </button>
      </div> */}
      {/* <TablePagination meta={res?.data?.unreadCount} /> */}

      {/* pagination */}
      {/* <TablePagination /> */}
    </>
  );
}
