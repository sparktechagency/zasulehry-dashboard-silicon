import React from "react";

export default function PersonalInformation({ user }: { user: any }) {
  return (
    <div className="flex-1 space-y-2 text-gray-800 ">
      <h1 className="text-[#0288A6] text- font-medium capitalize underline underline-offset-4">
        personal information
      </h1>
      <p>
        <span className="font-medium text-sm">Name</span> : {user.name}
      </p>
      <p>
        <span className="font-medium text-sm">Email</span> : {user.email}
      </p>
      <p>
        <span className="font-medium text-sm">Contact</span> : {user.contact}
      </p>
      <p>
        <span className="font-medium text-sm">Location</span> : {user.location}
      </p>
      <p>
        <span className="font-medium text-sm">Role.</span> : {user.role}
      </p>
    </div>
  );
}
