import { ProfileTab, SafeAreaLayout } from "@/src/core-ui/core-ui-index";
import { useUser } from "@clerk/clerk-expo";
import React from "react";

const Profile = () => {
  const { user } = useUser();

  return (
    <SafeAreaLayout
      className={`flex-1 bg-general-500`}
      child={<ProfileTab user={user} />}
    />
  );
};

export default Profile;
