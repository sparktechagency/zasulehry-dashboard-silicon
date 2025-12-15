import NewPassword from "@/components/authPages/NewPassword";

export default function Page() {
  return (
    <div className=" min-h-screen flex items-center justify-center bg-linear-to-r from-[#083E4B] to-[#0288A6]">
      {/* Background shapes */}

      {/* Login card */}
      <div className="bg-[#1D7A8F] p-8 rounded-lg shadow-md w-full max-w-lg  border border-[#E6E6E6] text-white">
        <h3 className="text-center font-medium text-3xl mb-6">New Password</h3>

        <NewPassword />
      </div>
    </div>
  );
}
