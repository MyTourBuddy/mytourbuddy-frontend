import ExperiencesSection from "@/components/profile/ExperiencesSection";
import GuideProfileInfo from "@/components/profile/GuideProfileInfo";
import PackagesSection from "@/components/profile/PackagesSection";
import ProfileCompletion from "@/components/profile/ProfileCompletion";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ReviewsSection from "@/components/profile/ReviewsSection";
import TouristProfileInfo from "@/components/profile/TouristProfileInfo";
import UserNotFound from "@/components/profile/UserNotFound";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUsers } from "@/lib/api";
import { Guide, Tourist } from "@/models/User";

const UserProfile = async ({
  params,
}: {
  params: Promise<{ profile: string }>;
}) => {
  const { profile } = await params;

  const users = await getUsers();
  const user = users.find((u) => u.username === profile);

  console.log(profile);

  if (!user) {
    return <UserNotFound username={profile} />;
  }

  const role = user.role;

  return (
    <section className="max-w-5xl w-full mx-auto flex flex-col gap-6 md:gap-8">
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
          My Profile
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">
          Manage your account and profile information
        </p>
      </div>

      <ProfileHeader user={user} />
      <ProfileCompletion />

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
            <TouristProfileInfo user={user as Tourist} />
          ) : (
            <GuideProfileInfo user={user as Guide} />
          )}
        </TabsContent>
        <TabsContent value="packages">
          <PackagesSection user={user as Guide} />
        </TabsContent>
        <TabsContent value="experience">
          <ExperiencesSection user={user as Guide} />
        </TabsContent>
        <TabsContent value="reviews">
          <ReviewsSection user={user} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default UserProfile;
