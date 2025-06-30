import { ButtonComponent } from "@/src/component/index.component";
import welcomeScreenData from "@/src/data/welcomeScreen.data";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";

const WelcomeScreen = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === welcomeScreenData.length - 1;

  return (
    <>
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/login")}
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
        onIndexChanged={(idx) => setActiveIndex(idx)}
      >
        {welcomeScreenData.map(({ description, id, image, title }) => (
          <View key={id} className="flex items-center justify-center p-5">
            <Image
              source={image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="flex flex-row items-center justify-center w-[300px] mt-10">
              <Text className="mx-10 text-3xl font-bold text-center text-black">
                {title}
              </Text>
            </View>
            <Text className="text-lg font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
              {description}
            </Text>
          </View>
        ))}
      </Swiper>
      <ButtonComponent
        title={isLastSlide ? "Get Started" : "Next"}
        className="w-11/12 mt-10"
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/login")
            : swiperRef?.current?.scrollBy(1)
        }
      />
    </>
  );
};

export default WelcomeScreen;
