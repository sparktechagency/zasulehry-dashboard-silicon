import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import TablePagination from "@/components/share/Pagination";
import Delete from "@/components/share/Delete";
import { myFetch } from "@/utils/myFetch";
import Block from "@/components/share/Block";

export default async function AllEmployeeList() {
  const res = await myFetch("/users?role=Admin", {
    tags: ["admin-list"],
  });
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
            {res?.data?.map((admin: any) => (
              <TableRow key={admin._id}>
                <TableCell className="">{admin.name}</TableCell>

                <TableCell>{admin.email}</TableCell>
                {/* <TableCell>13445454</TableCell> */}

                <TableCell>
                  <p className="bg-green-500 text-white h-7 w-20 rounded flex items-center justify-center">
                    {admin.status}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <Block item={admin} />
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
