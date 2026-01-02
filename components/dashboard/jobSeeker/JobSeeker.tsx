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
import { Eye } from "lucide-react";
import SearchBar from "@/components/share/SearchBar";
import Block from "@/components/share/Block";
import TablePagination from "@/components/share/Pagination";
import Link from "next/link";

const statusOption = [
  { label: "All", value: "All" },
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

export default function AllJobSeeker({ data }: any) {
  return (
    <>
      <div className="bg-[#f9f9f9] p-6 rounded-lg">
        <SearchBar
          title="All Job Seeker List"
          options={statusOption}
          palaceholder="Search by name"
        />

        {/* table data */}
        <Table>
          <TableHeader>
            <TableRow className="bg-[#E6F0F3] text-gray-600">
              <TableHead>Unique ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="pl-16">Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="pl-4">Status</TableHead>
              <TableHead className="pl-8">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((employer: any) => (
              <TableRow key={employer._id} className="bg-white">
                <TableCell className="font-medium">
                  #{employer._id.slice(0, 6)}
                </TableCell>

                <TableCell className="flex items-center gap-2">
                  {/* <CustomImage src={employer.} alt="avatar" width={40} height={40} /> */}
                  {/* <JobDetailsModal
                    trigger={
                      <span className="cursor-pointer"> {employer.name}</span>
                    }
                  /> */}
                  <Link href={`/job-seeker-details`}>
                    <span className="cursor-pointer"> {employer.name}</span>
                  </Link>
                </TableCell>

                <TableCell>{employer.email}</TableCell>
                <TableCell>{employer.contact || "No Contact"}</TableCell>
                <TableCell>{employer?.address || "No Location"}</TableCell>
                <TableCell>
                  <Badge
                    className={`bg-${
                      employer?.status === "Active" ? "green-600" : "red-500"
                    } text-white w-20 h-8 2xl:h-9`}
                  >
                    {employer.status}
                  </Badge>
                </TableCell>
                <TableCell className="">
                  <div className="flex gap-4 items-center">
                    {/* <JobDetailsModal
                      trigger={
                        <span className="bg-[#0288A6] p-1 rounded cursor-pointer">
                          <Eye size={18} className=" text-white" />
                        </span>
                      }
                    /> */}

                    <Link href={`/job-seeker-details?id=${employer?._id}`}>
                      <div className="bg-[#0288A6] p-1 rounded cursor-pointer">
                        <Eye className=" text-white size-5 2xl:size-7" />
                      </div>
                    </Link>
                    <Block item={employer} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* pagination */}
      <TablePagination totalPages={240} />
    </>
  );
}
