"use client";

import ExperiencesSection from "@/components/profile/ExperiencesSection";
import GuideProfileInfo from "@/components/profile/GuideProfileInfo";
import PackagesSection from "@/components/profile/PackagesSection";
import ProfileCompletion from "@/components/profile/ProfileCompletion";
import ProfileHeader from "@/components/profile/ProfileHeader";
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
import { Admin, Guide, Tourist, User } from "@/schemas/user.schema";
import { useCurrentUser } from "@/hooks/useAuthQueries";
import { useUserByUsername } from "@/hooks/useUserQueries";
import { useParams } from "next/navigation";
import LoadingUser from "@/components/profile/LoadingUser";
import GuidesReviewsSection from "@/components/reviews/GuidesReviewsSection";
import TouristReviewSection from "@/components/reviews/TouristReviewSection";
import { useAuth } from "@/context/AuthContext";
import AdminProfileInfo from "@/components/profile/AdminProfileInfo";

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const { data: currentUser } = useCurrentUser();
  const { isGuide, isTourist, isAdmin } = useAuth();
  const { data: userData, isLoading } = useUserByUsername(username);

  if (!username || isLoading) return <LoadingUser username={username} />;
  if (!userData) return <UserNotFound username={username} />;

  return (
    <section className="max-w-5xl w-full mx-auto pt-3 px-4">
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
        {currentUser?.username === username &&
          !currentUser?.isProfileComplete && (
            <ProfileCompletion user={userData as Guide | Tourist} />
          )}
        <Tabs defaultValue="account" className="w-full">
          {userData?.role === "TOURIST" && (
            <TabsList className="grid w-full h-full grid-cols-2 gap-1 sm:gap-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
          )}

          {userData?.role === "GUIDE" && (
            <TabsList className="grid w-full h-full grid-cols-2 md:grid-cols-4 gap-1 sm:gap-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="packages">Packages</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
          )}

          <TabsContent value="account">
            {userData?.role === "TOURIST" ? (
              <TouristProfileInfo user={userData as Tourist} />
            ) : userData?.role === "GUIDE" ? (
              <GuideProfileInfo user={userData as Guide} />
            ) : userData?.role === "ADMIN" ? (
              <AdminProfileInfo user={userData as Admin} />
            ) : null}
          </TabsContent>
          <TabsContent value="packages">
            <PackagesSection user={userData as Guide} />
          </TabsContent>
          <TabsContent value="experience">
            <ExperiencesSection user={userData as Guide} />
          </TabsContent>
          <TabsContent value="reviews">
            {userData.role === "TOURIST" ? (
              <TouristReviewSection user={userData as Tourist} />
            ) : (
              <GuidesReviewsSection user={userData as Guide} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default UserProfile;
