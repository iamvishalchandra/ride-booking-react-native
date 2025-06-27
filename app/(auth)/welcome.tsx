import { SafeAreaLayout, WelcomeScreen } from "@/src/core-ui/core-ui-index";
import React, { useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { bottom, left, right, top } = useSafeAreaInsets();
  return (
    <SafeAreaLayout
      className={`flex items-center justify-between flex-1 h-full bg-white`}
      child={<WelcomeScreen />}
    />
  );
};

export default Welcome;
