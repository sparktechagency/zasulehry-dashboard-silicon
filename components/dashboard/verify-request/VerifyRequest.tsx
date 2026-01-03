import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import RequestModal from "./RequestModal";
import TablePagination from "@/components/share/Pagination";
import CustomImage from "@/share/CustomImage";
import SelectBar from "@/app/(dashboard)/verify-request/SelectBar";

const statusOption = [
  { label: "All", value: "All" },
  { label: "Approved", value: "Approved" },
  { label: "Rejected", value: "Rejected" },
  { label: "Pending", value: "Pending" },
];

export default function VerifyRequest({ res }: any) {
  console.log(
    "res?.data?.pagination?.totalPage",
    res?.data?.pagination?.totalPage
  );

  return (
    <>
      <div className="flex justify-end">
        <SelectBar options={statusOption} />
      </div>
      {res?.data?.length > 0 ? (
        <div className="bg-[#f9f9f9] p- rounded-lg">
          <div className="flex items-center justify-between mb-4"></div>

          <Table>
            <TableHeader>
              <TableRow className="bg-blue-100 text-gray-600 ">
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pl-8">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {res?.data?.map((employer: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    #{employer._id.slice(0, 5)}
                  </TableCell>

                  <TableCell className="flex items-center gap-2">
                    <CustomImage
                      src={employer?.user?.image}
                      title="avatar"
                      width={40}
                      height={40}
                    />
                    <RequestModal item={employer} name={employer?.user?.name} />
                  </TableCell>

                  <TableCell>{employer?.user?.email}</TableCell>
                  <TableCell>{employer?.user?.phone || "No"}</TableCell>
                  <TableCell>{employer?.user?.address || "No"}</TableCell>
                  <TableCell>
                    <Badge
                      className={`w-20 ${
                        employer.status === "Pending"
                          ? "bg-yellow-200"
                          : employer.status === "Approved"
                          ? "bg-green-500"
                          : "bg-red-500"
                      } text-white text-sm  2xl:h-10`}
                    >
                      {employer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center mr-3">
                      <RequestModal item={employer} />
                      {/* <Delete /> */}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No verification requests found.
        </p>
      )}

      {/* <TablePagination /> */}
      <TablePagination totalPages={res?.pagination?.totalPage} />
    </>
  );
}
