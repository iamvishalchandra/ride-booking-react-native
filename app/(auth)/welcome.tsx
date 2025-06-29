import { SafeAreaLayout, WelcomeScreen } from "@/src/core-ui/core-ui-index";
import React from "react";

const Welcome = () => {
  return (
    <SafeAreaLayout className={`flex-1 bg-white`} child={<WelcomeScreen />} />
  );
};

export default Welcome;
