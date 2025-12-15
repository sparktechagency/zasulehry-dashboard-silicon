import type { Metadata } from "next";
export const dynamic = "force-dynamic";

import "../globals.css";

import Header from "@/components/share/Header";
import Sidebar from "@/sidebar/Sidebar";

export const metadata: Metadata = {
  title: "Zasulehry Dashboard Application",
  description: "dashboard ",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex ">
      <aside className="bg-white">
        <Sidebar />
      </aside>
      <main className=" flex-1 overflow-hidden  bg-[#F6F6F6]">
        <div className="sticky top-0 z-50">
          <Header />
        </div>
        <div>
          <div
            className="overflow-y-auto scroll-smooth p-4 hide-scrollbar"
            style={{ height: "calc(100vh - 56px)" }}
          >
            {children}
          </div>
        </div>
      </main>
    </section>
  );
}
