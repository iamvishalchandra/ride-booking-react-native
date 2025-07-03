import { useSSO } from "@clerk/clerk-expo";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { Image, Text, View } from "react-native";
import { icons } from "../constant/icons.constant";
import { googleOAuth } from "../lib/index.lib";
import ButtonComponent from "./Button.component";

const OAuthComponent = () => {
  const { startSSOFlow } = useSSO();

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await googleOAuth(startSSOFlow);

      if (result?.code === "session_exists" || result?.code === "success")
        router.push("/(root)/(tabs)/home");
    } catch (err) {
      console.error("OAuth Error: ", err);
    }
  }, []);

  return (
    <View>
      <View className="flex flex-row items-center justify-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>
      <ButtonComponent
        title="Login With Google"
        className="w-full mt-5 shadow-none"
        hideButtonShadow
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuthComponent;
