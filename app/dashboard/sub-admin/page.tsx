import SubAdmin from "@/components/dashboard/sub-admin/SubAdmin";
import Button from "@/components/settings/Button";

import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function Admin() {
  return (
    <>
      <Link href={"/dashboard/sub-admin/add-sub-admin"}>
        <Button className="btn-design rounded-full px-5 flex items-center gap-2">
          <PlusCircle className="w-4 h-4" />
          <span> Add New</span>
        </Button>
      </Link>
      <SubAdmin />
      {/* <TablePagination /> */}
    </>
  );
}
