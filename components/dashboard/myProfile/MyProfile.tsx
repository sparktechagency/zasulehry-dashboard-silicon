"use client";

import { useEffect, useState } from "react";
import ChangePassword from "@/components/settings/ChangePassword";
import EditProfile from "@/components/settings/EditProfile";
import Profile from "@/components/settings/Profile";
import { Skeleton } from "@/components/ui/skeleton";
import { myFetch } from "@/utils/myFetch";

/* =======================
   Types
======================= */

type ProfileView = "profile" | "change" | "edit";

type MyProfileProps = {
  getProfile?: {
    role?: string;
  };
};

type UserProfile = Record<string, any>;

/* =======================
   Component
======================= */

export default function MyProfile({ getProfile }: MyProfileProps) {
  const [profile, setProfile] = useState<ProfileView>("profile");
  const [data, setData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /* =======================
     Fetch profile data
  ======================= */

  useEffect(() => {
    if (!getProfile?.role) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await myFetch(`/users?role=${getProfile.role}`, {
          tags: ["profile"],
        });

        setData(res?.data?.[0] ?? null);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getProfile?.role]);

  /* =======================
     UI
  ======================= */

  return (
    <div className="px-5 mt-4 flex gap-4">
      {/* =======================
          Sidebar
      ======================= */}
      <div>
        <h1 className="text-2xl font-medium mt-4">My Profile</h1>

        <div className="grid gap-2 w-48 xl:w-full mt-4">
          {[
            { key: "profile", label: "Personal Information" },
            { key: "change", label: "Change Password" },
          ].map((item) => (
            <div key={item.key} className="p-[1px] rounded-md w-full">
              <button
                onClick={() => setProfile(item.key as ProfileView)}
                className={`py-1 px-4 rounded-md font-medium w-full 2xl:text-lg ${
                  profile === item.key
                    ? "btn-design text-white"
                    : "bg-white text-[#083E4B]"
                }`}
              >
                {item.label}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* =======================
          Content
      ======================= */}
      <div className="flex-1">
        {/* Change Password */}
        {profile === "change" && <ChangePassword />}

        {/* Profile View */}
        {profile === "profile" && (
          <>
            {loading ? (
              <div className="flex items-center justify-center">
                <Skeleton className="w-[40%] h-100 bg-gray-200 rounded-md" />
              </div>
            ) : data ? (
              <Profile
                setProfile={(value) => setProfile(value as ProfileView)}
                data={data}
              />
            ) : (
              <p className="text-gray-500">No profile data found.</p>
            )}
          </>
        )}

        {/* Edit Profile */}
        {profile === "edit" && data && (
          <EditProfile
            setProfile={(value) => setProfile(value as ProfileView)}
            data={data}
          />
        )}
      </div>
    </div>
  );
}
