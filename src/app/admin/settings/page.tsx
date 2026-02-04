"use client";

import PersonalInfoForm from "@/components/profile/edit/PersonalInfoForm";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const ProfileSettingsPage = () => {
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
              <BreadcrumbLink asChild>
                <Link href="/admin">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col gap-2 md:gap-3">
          <h1 className="text-3xl font-bold tracking-tight">Edit Profile</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">
            Update your information to complete your profile
          </p>
        </div>

        {/* common */}
        <Card className="py-2">
          <CardContent>
            <PersonalInfoForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProfileSettingsPage;
