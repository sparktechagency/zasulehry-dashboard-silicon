import AllEmployeeList from "@/components/dashboard/allEmployeeList/AllEmployeeList";
import { myFetch } from "@/utils/myFetch";

type Props = {
  searchParams?: {
    name?: string;
    status?: string;
    page: string;
  };
};

export default async function AllEmployee({ searchParams }: Props) {
  const name = (await searchParams)?.name || "";
  const status = (await searchParams)?.status || "";
  const page = (await searchParams)?.page || "";

  const params = new URLSearchParams();
  params.append("role", "Employer");

  if (name) params.append("searchTerm", name);
  if (status) params.append("status", status);
  if (page) params.append("page", page);

  // let data: any[] = [];

  // try {
  //   const res = await myFetch(`/users?${params.toString()}`, {
  //     tags: ["employee-list"],
  //   });

  //   if (res?.success) {
  //     data = res.data ?? [];
  //   } else {
  //     console.error("Employee fetch failed:", res?.message);
  //   }
  // } catch (error) {
  //   console.error("Error fetching employees:", error);
  // }

  const res = await myFetch(`/users?${params.toString()}`, {
    tags: ["employee-list"],
  });

  return (
    <div className="w-full">
      <AllEmployeeList res={res} />
    </div>
  );
}
