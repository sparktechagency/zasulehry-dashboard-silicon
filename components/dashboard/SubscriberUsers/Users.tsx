"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SunscriberDetails from "./SubscriberDetails";
import Image from "next/image";
import google from "../../../public/share/google.png";
import Delete from "@/components/share/Delete";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

const employers = [
  {
    id: "#12560",
    name: "kamran",
    package: "basic 1.99 per day",
    startDate: "04.07.2025",
    endDate: "06.08.2025",
    status: "Active",
    avatar: "/avatar.jpg", // Replace with your actual path
  },
  {
    id: "#12560",
    name: "kamran",
    package: "basic 1.99 per day",
    startDate: "04.07.2025",
    endDate: "06.08.2025",
    status: "Expired",
    avatar: "/avatar.jpg", // Replace with your actual path
  },
  {
    id: "#12560",
    name: "kamran",
    package: "basic 1.99 per day",
    startDate: "04.07.2025",
    endDate: "06.08.2025",
    status: "Active",
    avatar: "/avatar.jpg", // Replace with your actual path
  },
  {
    id: "#12560",
    name: "kamran",
    package: "basic 1.99 per day",
    startDate: "04.07.2025",
    endDate: "06.08.2025",
    status: "Active",
    avatar: "/avatar.jpg", // Replace with your actual path
  },
  {
    id: "#12560",
    name: "kamran",
    package: "basic 1.99 per day",
    startDate: "04.07.2025",
    endDate: "06.08.2025",
    status: "Active",
    avatar: "/avatar.jpg", // Replace with your actual path
  },
  {
    id: "#12560",
    name: "kamran",
    package: "basic 1.99 per day",
    startDate: "04.07.2025",
    endDate: "06.08.2025",
    status: "Active",
    avatar: "/avatar.jpg", // Replace with your actual path
  },
  {
    id: "#12560",
    name: "kamran",
    package: "basic 1.99 per day",
    startDate: "04.07.2025",
    endDate: "06.08.2025",
    status: "Active",
    avatar: "/avatar.jpg", // Replace with your actual path
  },
  {
    id: "#12560",
    name: "kamran",
    package: "basic 1.99 per day",
    startDate: "04.07.2025",
    endDate: "06.08.2025",
    status: "Active",
    avatar: "/avatar.jpg", // Replace with your actual path
  },
  {
    id: "#12560",
    name: "kamran",
    package: "basic 1.99 per day",
    startDate: "04.07.2025",
    endDate: "06.08.2025",
    status: "Active",
    avatar: "/avatar.jpg", // Replace with your actual path
  },
  {
    id: "#12560",
    name: "kamran",
    package: "basic 1.99 per day",
    startDate: "04.07.2025",
    endDate: "06.08.2025",
    status: "Active",
    avatar: "/avatar.jpg", // Replace with your actual path
  },
];

export default function Users() {
  return (
    <>
      <div className="bg-[#f9f9f9] p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl text-gray-700 font-semibold">
            Subscribed Users
          </h2>
          <div>
            <Select>
              <SelectTrigger className="w-28 border-[#0288A6]">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="block">Expried</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-blue-100 text-gray-600 ">
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Start date</TableHead>
              <TableHead>Expire date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pl-8">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employers.map((employer, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">0{employer.id}</TableCell>

                <TableCell className="flex items-center gap-2">
                  <Image src={google} alt="avatar" width={32} height={32} />
                  <SunscriberDetails
                    trigger={
                      <span className="cursor-pointer"> {employer.name}</span>
                    }
                  />
                </TableCell>

                <TableCell>{employer.package}</TableCell>
                <TableCell>{employer.startDate}</TableCell>
                <TableCell>{employer.endDate}</TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      employer.status === "Expired"
                        ? "bg-red-600"
                        : "bg-green-600"
                    } text-white w-20`}
                  >
                    {employer.status}
                  </Badge>
                </TableCell>
                <TableCell className="flex gap-1">
                  <SunscriberDetails
                    trigger={
                      <div className="bg-[#0288A6] m-1 p-1 rounded cursor-pointer">
                        <Eye className=" text-white size-5 2xl:size-7" />
                      </div>
                    }
                  />

                  {/* <span
                    className="bg-[#D21D1D] p-1 rounded cursor-pointer"
                    onClick={handleDelete}
                  >
                    <Trash2 size={22} className=" text-white" />
                  </span> */}
                  <Delete />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* pagination   */}
      {/* <TablePagination /> */}
    </>
  );
}
