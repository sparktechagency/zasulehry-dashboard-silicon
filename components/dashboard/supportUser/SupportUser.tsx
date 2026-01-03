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
import TablePagination from "@/components/share/Pagination";
import CustomImage from "@/share/CustomImage";
import SupportStatusChange from "./SupportStatusChange";
import { Lock, Unlock } from "lucide-react";

const statusOption = [
  { label: "All", value: "All" },
  { label: "Resolved", value: "Resolved" },
  { label: "Pending", value: "Pending" },
];

export default function SupportUser({ data }: { data: any }) {
  return (
    <>
      <div className="bg-[#f9f9f9] p-6 rounded-lg">
        <SearchBar title="Support Request" options={statusOption} />

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
            {data?.data?.map((employer: any) => (
              <TableRow key={employer._id}>
                <TableCell className="font-medium">#22025</TableCell>

                <TableCell className="flex items-center gap-2">
                  <CustomImage
                    src={employer?.attachment}
                    title={employer.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <Message title={employer.name} />
                </TableCell>

                <TableCell>{employer.email}</TableCell>
                <TableCell>{employer.phone}</TableCell>
                <TableCell>{employer.address || "No Location"}</TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      employer.status === "Resolved"
                        ? "bg-green-600"
                        : "bg-[#D21D1D]"
                    } text-white w-20 h-8 text-sm 2xl:h-10`}
                  >
                    {employer.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Message />
                    {/* <Delete id={employer?._id} /> */}
                    <SupportStatusChange
                      item={employer}
                      trigger={
                        employer?.status === "Resolved" ? (
                          <Unlock className="cursor-pointer" />
                        ) : (
                          <Lock className="text-red-600 size-5 2xl:size-7 cursor-pointer" />
                        )
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* <Table data={employers} /> */}
      <TablePagination totalPages={data?.pagination?.totalPage} />
    </>
  );
}
