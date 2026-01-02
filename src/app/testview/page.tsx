"use client"

import EditProfileMenu from "@/components/profile/EditProfileMenu";
import LoadingUser from "@/components/profile/LoadingUser";

const TestView = () => {
  // Note: Use useCheckUsername hook from @/hooks/useAuthQueries for username availability checking
  // const { data, isLoading, error } = useCheckUsername("username", true);
  
  return (
    <div>
      <LoadingUser username="dfssf"/>
    </div>
  );
};

export default TestView;
