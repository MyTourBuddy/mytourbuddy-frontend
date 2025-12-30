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
import { userAPI } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const { user: currentUser } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data: User = await userAPI.getByUsername(username);
        setUserData(data);
      } catch (err: any) {
        setError(err.message || "Failed to load user");
      }
    };
    fetchUsers();
  }, [username]);

  if (error) return <UserNotFound username={username} />;
  if (!userData) return <div>Loading...</div>;

  const role = userData.role.toLowerCase();

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

        {/* display only the current user */}
        {currentUser?.username === username && (
          <ProfileCompletion user={userData as Guide | Tourist} />
        )}
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
            <p>packages</p>
            {/* <PackagesSection user={userData as Guide} /> */}
          </TabsContent>
          <TabsContent value="experience">
            <p>exp</p>
            {/* <ExperiencesSection user={userData as Guide} /> */}
          </TabsContent>
          <TabsContent value="reviews">
            <p>reviews</p>
            {/* <ReviewsSection user={userData} /> */}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default UserProfile;
