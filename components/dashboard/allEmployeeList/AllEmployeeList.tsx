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
import Link from "next/link";
import SearchBar from "@/components/share/SearchBar";
import Block from "@/components/share/Block";
import TablePagination from "@/components/share/Pagination";

const statusOption = [
  { label: "All", value: "All" },
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

export default function AllEmployeeList({ res }: { res?: any }) {
  return (
    <>
      <div className="bg-[#f9f9f9] p-6 rounded-lg">
        <SearchBar title="All Employee List" options={statusOption} />

        <Table>
          <TableHeader>
            <TableRow className="bg-blue-100 text-gray-600 ">
              <TableHead>Unique ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="pl-16">Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pl-8">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {res?.map((employer: any) => (
              <TableRow key={employer?._id}>
                <TableCell className="font-medium">
                  #{employer?._id.slice(0, 6)}
                </TableCell>

                <TableCell className="">
                  {/* <Image src={google} alt="avatar" width={32} height={32} /> */}
                  <Link href={`/employee-details/${employer._id}`}>
                    {employer.name}
                  </Link>
                </TableCell>

                <TableCell>{employer.email}</TableCell>
                <TableCell>{employer.address || "No"}</TableCell>
                <TableCell>{employer.location[0] || "No"}</TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      employer.status === "Inactive"
                        ? "bg-red-600"
                        : "bg-green-600"
                    } text-white w-20 h-7 2xl:h-9`}
                  >
                    {employer?.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-4 pl-3">
                    <Link href={`/employee-details/${employer?._id}`}>
                      <div className="bg-[#0288A6] p-1 rounded cursor-pointer">
                        <Eye className="text-white size-5 2xl:size-7" />
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
      <TablePagination />
    </>
  );
}
