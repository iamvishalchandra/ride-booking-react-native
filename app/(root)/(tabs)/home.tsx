import { HomeTab, SafeAreaLayout } from "@/src/core-ui/core-ui-index";
import React from "react";

const Home = () => {
  return <SafeAreaLayout className={`flex-1 bg-white`} child={<HomeTab />} />;
};

export default Home;
