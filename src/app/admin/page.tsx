"use client";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  TbUsers,
  TbCalendar,
  TbPackage,
  TbTicket,
  TbSettings,
  TbChartBar,
} from "react-icons/tb";

const AdminDashboard = () => {
  return (
    <section className="max-w-5xl w-full mx-auto pt-3 px-4">
      <div className="flex flex-col gap-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col gap-2 md:gap-3">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">
            Manage users, bookings, packages, and support tickets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/admin/users"
            className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted transition-colors"
          >
            <TbUsers className="text-lg" />
            <div>
              <p className="font-medium">Users Management</p>
              <p className="text-sm text-muted-foreground">
                View and manage all platform users
              </p>
            </div>
          </Link>

          <Link
            href="/admin/bookings"
            className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted transition-colors"
          >
            <TbCalendar className="text-lg" />
            <div>
              <p className="font-medium">Bookings Management</p>
              <p className="text-sm text-muted-foreground">
                Monitor and update booking statuses
              </p>
            </div>
          </Link>

          <Link
            href="/admin/packages"
            className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted transition-colors"
          >
            <TbPackage className="text-lg" />
            <div>
              <p className="font-medium">Packages Management</p>
              <p className="text-sm text-muted-foreground">
                Manage tour packages and offerings
              </p>
            </div>
          </Link>

          <Link
            href="/admin/tickets"
            className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted transition-colors"
          >
            <TbTicket className="text-lg" />
            <div>
              <p className="font-medium">Support Tickets</p>
              <p className="text-sm text-muted-foreground">
                Handle user support requests
              </p>
            </div>
          </Link>

          <Link
            href="/admin/settings"
            className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted transition-colors"
          >
            <TbSettings className="text-lg" />
            <div>
              <p className="font-medium">Settings</p>
              <p className="text-sm text-muted-foreground">
                Configure admin preferences
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
