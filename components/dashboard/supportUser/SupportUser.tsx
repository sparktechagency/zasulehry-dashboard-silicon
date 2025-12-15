"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Message } from "./Message";
import SearchBar from "@/components/share/SearchBar";
import kamran from "../../../public/share/kamran.png";
import Image from "next/image";

import TablePagination from "@/components/share/Pagination";
import Delete from "@/components/share/Delete";

const employers = [
  {
    id: 2,
    name: "kamran",
    email: "Admin@instantlabour.Com",
    contact: "01333327633",
    location: "Dhaka Bangladesh",
    status: "Solved",
    avatar: "/avatar.jpg", // Replace with your actual path
  },
  {
    id: 3,
    name: "kamran",
    email: "Admin@instantlabour.Com",
    contact: "01333327633",
    location: "Dhaka Bangladesh",
    status: "Pending",
    avatar: "/avatar.jpg", // Replace with your actual path
  },
  {
    id: 4,
    name: "kamran",
    email: "Admin@instantlabour.Com",
    contact: "01333327633",
    location: "Dhaka Bangladesh",
    status: "Solved",
    avatar: "/avatar.jpg", // Replace with your actual path
  },
  {
    id: 5,
    name: "kamran",
    email: "Admin@instantlabour.Com",
    contact: "01333327633",
    location: "Dhaka Bangladesh",
    status: "Solved",
    avatar: "/avatar.jpg", // Replace with your actual path
  },
  {
    id: 6,
    name: "kamran",
    email: "Admin@instantlabour.Com",
    contact: "01333327633",
    location: "Dhaka Bangladesh",
    status: "Solved",
    avatar: "/avatar.jpg", // Replace with your actual path
  },
  {
    id: 7,
    name: "kamran",
    email: "Admin@instantlabour.Com",
    contact: "01333327633",
    location: "Dhaka Bangladesh",
    status: "Solved",
    avatar: "/avatar.jpg", // Replace with your actual path
  },
];

export default function SupportUser() {
  return (
    <>
      <div className="bg-[#f9f9f9] p-6 rounded-lg">
        <SearchBar
          title="Support Request"
          options={["All", "Solved", "Pending"]}
        />

        {/* <div>
            <Select>
              <SelectTrigger className=" border-[#0288A6]">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="block">Solved</SelectItem>
                  <SelectItem value="Solved">Pending</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div> */}

        <Table>
          <TableHeader>
            <TableRow className="bg-blue-100 text-gray-600 ">
              <TableHead>Unique ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pl-8">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employers.map((employer) => (
              <TableRow key={employer.id}>
                <TableCell className="font-medium">#22025</TableCell>

                <TableCell className="flex items-center gap-2">
                  <Image src={kamran} alt="avatar" width={40} height={40} />
                  <Message title={employer.name} />
                </TableCell>

                <TableCell>{employer.email}</TableCell>
                <TableCell>{employer.contact}</TableCell>
                <TableCell>{employer.location}</TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      employer.status === "Solved"
                        ? "bg-green-600"
                        : "bg-[#D21D1D]"
                    } text-white w-20 h-8 text-sm 2xl:h-10`}
                  >
                    {employer.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <Message />
                    <Delete />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* <Table data={employers} /> */}
      <TablePagination />
    </>
  );
}
