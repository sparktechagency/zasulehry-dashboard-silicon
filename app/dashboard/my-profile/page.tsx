import MyProfile from "@/components/dashboard/myProfile/MyProfile";
import getProfile from "@/utils/getProfile";

export default async function page() {
  const profile = await getProfile();

  return (
    <>
      <MyProfile getProfile={profile} />
    </>
  );
}
