import { SafeAreaLayout, WelcomeScreen } from "@/src/core-ui/core-ui-index";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import React from "react";

const Welcome = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (isSignedIn) return <Redirect href="/(root)/(tabs)/home" />;
  return (
    isLoaded && (
      <SafeAreaLayout className={`flex-1 bg-white`} child={<WelcomeScreen />} />
    )
  );
};

export default Welcome;
