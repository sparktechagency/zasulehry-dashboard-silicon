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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RequestModal from "./RequestModal";
import Image from "next/image";
import kamran from "../../../public/share/kamran.png";
import TablePagination from "@/components/share/Pagination";
import Delete from "@/components/share/Delete";

const employers = [
  {
    id: "#22025",
    name: "kamran",
    email: "Admin@instantlabour.Com",
    contact: "01333327633",
    location: "Dhaka Bangladesh",
    status: "Pending",
    avatar: "/avatar.jpg", // Replace with your actual path
  },
  {
    id: "#22025",
    name: "kamran",
    email: "Admin@instantlabour.Com",
    contact: "01333327633",
    location: "Dhaka Bangladesh",
    status: "Verified",
    avatar: "/avatar.jpg", // Replace with your actual path
  },
  {
    id: "#22025",
    name: "kamran",
    email: "Admin@instantlabour.Com",
    contact: "01333327633",
    location: "Dhaka Bangladesh",
    status: "Pending",
    avatar: "/avatar.jpg", // Replace with your actual path
  },
  {
    id: "#22025",
    name: "kamran",
    email: "Admin@instantlabour.Com",
    contact: "01333327633",
    location: "Dhaka Bangladesh",
    status: "Pending",
    avatar: "/avatar.jpg", // Replace with your actual path
  },
  {
    id: "#22025",
    name: "kamran",
    email: "Admin@instantlabour.Com",
    contact: "01333327633",
    location: "Dhaka Bangladesh",
    status: "Pending",
    avatar: "/avatar.jpg", // Replace with your actual path
  },
  {
    id: "#22025",
    name: "kamran",
    email: "Admin@instantlabour.Com",
    contact: "01333327633",
    location: "Dhaka Bangladesh",
    status: "Pending",
    avatar: "/avatar.jpg", // Replace with your actual path
  },
];

export default function VerifyRequest() {
  return (
    <>
      <div className="bg-[#f9f9f9] p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Verify Request</h2>
          <div>
            <Select>
              <SelectTrigger className="w-28 border-[#0288A6]">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="block">Verified</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
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
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pl-8">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employers.map((employer, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{employer.id}</TableCell>

                <TableCell className="flex items-center gap-2">
                  <Image src={kamran} alt="avatar" width={40} height={40} />
                  <RequestModal name="kamran" />
                  {/* {employer.name} */}
                </TableCell>

                <TableCell>{employer.email}</TableCell>
                <TableCell>{employer.contact}</TableCell>
                <TableCell>{employer.location}</TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      employer.status === "Pending"
                        ? "bg-red-500"
                        : "bg-green-500"
                    } text-white h-7 text-sm h-8 2xl:h-10`}
                  >
                    {employer.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <RequestModal />
                    <Delete />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* <TablePagination /> */}
      <TablePagination />
    </>
  );
}
