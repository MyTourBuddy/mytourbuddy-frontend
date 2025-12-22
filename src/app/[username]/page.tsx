"use client";

import ExperiencesSection from "@/components/profile/ExperiencesSection";
import GuideProfileInfo from "@/components/profile/GuideProfileInfo";
import PackagesSection from "@/components/profile/PackagesSection";
import ProfileCompletion from "@/components/profile/ProfileCompletion";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ReviewsSection from "@/components/profile/ReviewsSection";
import TouristProfileInfo from "@/components/profile/TouristProfileInfo";
import UserNotFound from "@/components/profile/UserNotFound";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Guide, Tourist, User } from "@/schemas/user.schema";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/users?username=${username}`);
        if (!response.ok) {
          throw new Error("Failed to load user");
        }
        const data: User = await response.json();
        setUserData(data);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchUsers();
  }, [username]);

  if (error) return <UserNotFound username="" />;
  if (!userData) return <div>Loading...</div>;

  const role = userData.role;

  return (
    <section className="max-w-4xl w-full mx-auto">
      <div className="flex flex-col gap-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{username}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>

        <ProfileHeader user={userData} />
        <ProfileCompletion user={userData as Guide | Tourist} />

        <Tabs defaultValue="account" className="w-full">
          {role === "tourist" && (
            <TabsList className="grid w-full h-full grid-cols-2 gap-1 sm:gap-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
          )}

          {role === "guide" && (
            <TabsList className="grid w-full h-full grid-cols-2 md:grid-cols-4 gap-1 sm:gap-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="packages">Packages</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
          )}

          <TabsContent value="account">
            {role === "tourist" ? (
              <TouristProfileInfo user={userData as Tourist} />
            ) : (
              <GuideProfileInfo user={userData as Guide} />
            )}
          </TabsContent>
          <TabsContent value="packages">
            <PackagesSection user={userData as Guide} />
          </TabsContent>
          <TabsContent value="experience">
            <ExperiencesSection user={userData as Guide} />
          </TabsContent>
          <TabsContent value="reviews">
            <ReviewsSection user={userData} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default UserProfile;
