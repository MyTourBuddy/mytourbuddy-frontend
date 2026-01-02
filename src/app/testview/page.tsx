"use client"

import EditProfileMenu from "@/components/profile/EditProfileMenu";

const TestView = () => {
  // Note: Use useCheckUsername hook from @/hooks/useAuthQueries for username availability checking
  // const { data, isLoading, error } = useCheckUsername("username", true);
  
  return (
    <div>
      <EditProfileMenu />
    </div>
  );
};

export default TestView;
