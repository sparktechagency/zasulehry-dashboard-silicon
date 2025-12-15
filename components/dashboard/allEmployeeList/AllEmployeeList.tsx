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
import Image from "next/image";
import google from "../../../public/share/google.png";
import Block from "@/components/share/Block";
import TablePagination from "@/components/share/Pagination";

const employers = [
  {
    id: 2,
    name: "kamran",
    email: "Admin@instantlabour.Com",
    contact: "01333327633",
    location: "Dhaka Bangladesh",
    status: "Active",
    avatar: "/avatar.jpg", // Replace with your actual path
  },
  {
    id: 3,
    name: "kamran",
    email: "Admin@instantlabour.Com",
    contact: "01333327633",
    location: "Dhaka Bangladesh",
    status: "Blocked",
    avatar: "/avatar.jpg", // Replace with your actual path
  },
  {
    id: 4,
    name: "kamran",
    email: "Admin@instantlabour.Com",
    contact: "01333327633",
    location: "Dhaka Bangladesh",
    status: "Active",
    avatar: "/avatar.jpg", // Replace with your actual path
  },
  {
    id: 5,
    name: "kamran",
    email: "Admin@instantlabour.Com",
    contact: "01333327633",
    location: "Dhaka Bangladesh",
    status: "Active",
    avatar: "/avatar.jpg", // Replace with your actual path
  },
  {
    id: 6,
    name: "kamran",
    email: "Admin@instantlabour.Com",
    contact: "01333327633",
    location: "Dhaka Bangladesh",
    status: "Active",
    avatar: "/avatar.jpg", // Replace with your actual path
  },
  {
    id: 7,
    name: "kamran",
    email: "Admin@instantlabour.Com",
    contact: "01333327633",
    location: "Dhaka Bangladesh",
    status: "Active",
    avatar: "/avatar.jpg", // Replace with your actual path
  },
];

export default function AllEmployeeList() {
  return (
    <>
      <div className="bg-[#f9f9f9] p-6 rounded-lg">
        <SearchBar
          title="All Employee List"
          options={["All", "Active", "Blocked"]}
        />

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
            {employers.map((employer) => (
              <TableRow key={employer.id}>
                <TableCell className="font-medium">#E6F0F3</TableCell>

                <TableCell className="flex items-center gap-2">
                  <Image src={google} alt="avatar" width={32} height={32} />
                  <Link href={`/employee-details/${employer.id}`}>
                    {employer.name}
                  </Link>
                </TableCell>

                <TableCell>{employer.email}</TableCell>
                <TableCell>{employer.contact}</TableCell>
                <TableCell>{employer.location}</TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      employer.status === "Blocked"
                        ? "bg-red-600"
                        : "bg-green-600"
                    } text-white w-20 h-7 2xl:h-9`}
                  >
                    {employer.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-4 pl-3">
                    <Link href={`/employee-details/${employer.id}`}>
                      <div className="bg-[#0288A6] p-1 rounded cursor-pointer">
                        <Eye className="text-white size-5 2xl:size-7" />
                      </div>
                    </Link>

                    <Block />
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
