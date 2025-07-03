import { useSSO } from "@clerk/clerk-expo";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { Alert, Image, Text, View } from "react-native";
import { icons } from "../constant/icons.constant";
import { googleOAuth } from "../lib/index.lib";
import ButtonComponent from "./Button.component";

const OAuthComponent = () => {
  const { startSSOFlow } = useSSO();

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await googleOAuth(startSSOFlow);
      console.log(result);

      if (result?.code === "session_exists") {
        Alert.alert("Success", "Session already exist. Redirecting to home.");
        router.push("/(root)/(tabs)/home");
      }
      Alert.alert(result?.success ? "Success" : "Error", result?.message);
      // Start the authentication process by calling `startSSOFlow()`
      // const { createdSessionId, setActive, signIn, signUp } =
      //   await startSSOFlow({
      //     strategy: "oauth_google",
      //     // For web, defaults to current path
      //     // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
      //     // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
      //     // redirectUrl: AuthSession.makeRedirectUri(),
      //   });
      // If sign in was successful, set the active session
      // if (createdSessionId) {
      //   setActive!({ session: createdSessionId });
      // } else {
      //   // If there is no `createdSessionId`,
      //   // there are missing requirements, such as MFA
      //   // Use the `signIn` or `signUp` returned from `startSSOFlow`
      //   // to handle next steps
      // }
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
