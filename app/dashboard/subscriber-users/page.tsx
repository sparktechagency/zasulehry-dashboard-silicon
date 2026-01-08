import Users from "@/components/dashboard/SubscriberUsers/Users";
import { myFetch } from "@/utils/myFetch";

export default async function SubscriberUsers({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const status = (await searchParams)?.status;

  const params = new URLSearchParams();
  if (status) params.append("status", status);

  let data: any[] = [];

  try {
    const res = await myFetch(
      `/subscriptions/subscribers?${params.toString()}`
    );

    if (res?.success) {
      data = res.data || [];
    } else {
      console.error("Failed to fetch subscribers:", res?.message);
    }
  } catch (err) {
    console.error("Failed to fetch subscribers", err);
  }

  return <Users users={data} />;
}
