import { HomeTab, SafeAreaLayout } from "@/src/core-ui/core-ui-index";
import React from "react";

const HomeScreen = () => {
  return (
    <SafeAreaLayout className={`flex-1 bg-general-500`} child={<HomeTab />} />
  );
};

export default HomeScreen;
