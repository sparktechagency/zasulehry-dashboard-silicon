"use client";
import ChangePassword from "@/components/settings/ChangePassword";
import EditProfile from "@/components/settings/EditProfile";
import Profile from "@/components/settings/Profile";
import { myFetch } from "@/utils/myFetch";
import React, { useEffect, useState } from "react";

export default function MyProfile() {
  const [profile, setProfile] = useState("profile");
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await myFetch("/users/profile");
      setData(res?.data);
    };
    fetchData();
  }, []);
  return (
    <div className="px-5 mt-4 flex gap-4">
      {/* profile and change password */}
      <div className="">
        <h1 className="text-2xl font-medium mt-4">My Profile</h1>
        <div className="grid gap-2 w-48 xl:w-full mt-4">
          {[
            { key: "profile", label: "Personal Information" },
            { key: "change", label: "Change Password" },
          ].map((item) => (
            <div key={item.key} className="p-[1px] rounded-md w-full">
              <button
                className={`py-1 px-4 rounded-md font-medium cursor-pointer w-full 2xl:text-lg ${
                  profile === item.key
                    ? "btn-design text-white"
                    : "bg-white text-[#083E4B]"
                }`}
                onClick={() => setProfile(item.key)}
              >
                {item.label}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* components */}

      <div className="flex-1">
        {profile === "change" && <ChangePassword />}
        {profile === "profile" && (
          <Profile setProfile={setProfile} data={data} />
        )}
        {profile === "edit" && (
          <EditProfile setProfile={setProfile} data={data} />
        )}
      </div>
    </div>
  );
}
