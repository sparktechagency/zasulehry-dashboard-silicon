import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import TablePagination from "@/components/share/Pagination";
import Delete from "@/components/share/Delete";
import Block from "./Block";

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
    status: "Active",
    avatar: "/avatar.jpg", // Replace with your actual path
  },
];

export default function AllEmployeeList() {
  return (
    <>
      <div className="bg-[#f9f9f9] p-6 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-100 text-gray-600 ">
              <TableHead>Name</TableHead>
              <TableHead className="pl-16">Email</TableHead>
              {/* <TableHead>Password</TableHead> */}
              <TableHead>Status</TableHead>
              <TableHead className="pl-8">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employers.map((employer) => (
              <TableRow key={employer.id}>
                <TableCell className="">{employer.name}</TableCell>

                <TableCell>{employer.email}</TableCell>
                {/* <TableCell>13445454</TableCell> */}

                <TableCell>
                  <Badge className="bg-green-500 text-white h-7">
                    {employer.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <Block />
                    <Delete />
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
