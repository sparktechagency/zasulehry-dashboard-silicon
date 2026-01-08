import SupportUser from "@/components/dashboard/supportUser/SupportUser";
import { myFetch } from "@/utils/myFetch";
import React from "react";

type Props = {
  searchParams: { status?: string; name: string; page: string };
};

export default async function Support({ searchParams }: Props) {
  const status = (await searchParams)?.status || "";
  const name = (await searchParams)?.name || "";
  const page = (await searchParams)?.page || "";

  // Build query params
  const params = new URLSearchParams();
  if (status) params.append("status", status);
  if (name) params.append("searchTerm", name);
  if (page) params.append("page", page);

  // let data: any[] = [];

  // try {
  //   const res = await myFetch(`/supports?${params.toString()}`, {
  //     tags: ["support"],
  //   });

  //   if (res?.success) {
  //     data = res.data || [];
  //   } else {
  //     console.error("Failed to fetch supports:", res?.message);
  //   }
  // } catch (err) {
  //   console.error("Error fetching supports:", err);
  // }

  const res = await myFetch(`/supports?${params.toString()}`, {
    tags: ["support"],
  });

  return (
    <div className="w-full">
      {res?.data.length > 0 ? (
        <SupportUser data={res} />
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No support requests found.
        </p>
      )}
    </div>
  );
}
