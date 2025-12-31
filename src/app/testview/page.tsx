"use client"

import EditProfileMenu from "@/components/profile/EditProfileMenu";
import { authAPI } from "@/lib/api";

const TestView = () => {
  const getData = async () => {
    const response = await authAPI.checkUsername("sasmitha");
    console.log(response);
  };
  return (
    <div>
      <button onClick={getData}>Get</button>
      <EditProfileMenu />
    </div>
  );
};

export default TestView;
