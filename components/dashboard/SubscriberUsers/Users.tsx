"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import SunscriberDetails from "./SubscriberDetails";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import dayjs from "dayjs";
import SelectBar from "@/app/dashboard/verify-request/SelectBar";
import CustomImage from "@/share/CustomImage";

const statusOption = [
  { label: "All", value: "All" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "Inactive" },
];

export default function Users({ users }: any) {
  return (
    <>
      <div className="bg-[#f9f9f9] p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl text-gray-700 font-semibold">
            Subscribed Users
          </h2>
          <div>
            <SelectBar options={statusOption} />
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
            {users?.map((user: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  #{user?._id.slice(0, 5)}
                </TableCell>

                <TableCell className="flex items-center gap-2 h-16">
                  <CustomImage
                    src={user?.image}
                    title={user.name}
                    width={32}
                    height={32}
                    className="rounded-full h-12 w-12 object-cover"
                  />
                  <SunscriberDetails
                    item={user}
                    trigger={<div className=""> {user.name}</div>}
                  />
                </TableCell>

                <TableCell>{user?.subscription?.price}</TableCell>
                <TableCell>
                  {dayjs(user?.subscription?.currentPeriodStart).format(
                    "YYYY-MM-DD",
                  )}
                </TableCell>
                <TableCell>
                  {dayjs(user?.subscription?.currentPeriodEnd).format(
                    "YYYY-MM-DD",
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      user.status !== "Active" ? "bg-red-600" : "bg-green-600"
                    } text-white w-20`}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="flex pl-7 gap-1">
                  <SunscriberDetails
                    item={user}
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
                  {/* <Delete /> */}
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
