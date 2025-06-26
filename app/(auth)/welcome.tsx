import { welcomeScreens } from "@/src/constant/screen.constant";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <SafeAreaView className="flex items-center justify-between h-full bg-white">
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/signup")}
        className="flex items-end justify-end w-full p-5"
      >
        <Text className="text-base text-black font-JakartaBold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        }
        onIndexChanged={(i) => setActiveIndex(i)}
      >
        {welcomeScreens.map(({ description, id, image, title }) => (
          <View key={id}>
            <Text>{title}</Text>
          </View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
};

export default Welcome;
