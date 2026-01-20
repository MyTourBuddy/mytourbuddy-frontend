import Sidebar from "@/components/Sidebar";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="navbar-offset max-w-7xl mx-auto w-full flex">
      <Sidebar />
      <div className="flex-1 w-full px-4 md:px-8 min-w-0">{children}</div>
    </section>
  );
}
