import Sidebar from "@/components/Sidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-red-300 navbar-offset flex">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </section>
  );
}
