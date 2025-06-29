import ButtonComponent from "@/src/component/Button.component";
import InputFieldComponent from "@/src/component/InputField.component";
import OAuthComponent from "@/src/component/OAuth.component";
import { icons } from "@/src/constant/icons.constant";
import { images } from "@/src/constant/image.constant";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const LoginScreen = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const { isLoaded, signIn, setActive } = useSignIn();

  const onLogin = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="absolute text-2xl text-black font-JakartaSemiBold bottom-5 left-5">
            Welcome 👋
          </Text>
        </View>
        <View className="p-5">
          <InputFieldComponent
            label="Email"
            placeHolder="Enter Your Email"
            icon={icons.email}
            value={form.email}
            onChange={(value: string) => setForm({ ...form, email: value })}
            required
          />
          <InputFieldComponent
            label="Password"
            placeHolder="Enter Your Password"
            icon={icons.lock}
            value={form.password}
            onChange={(value: string) => setForm({ ...form, password: value })}
            secureTextEntry
            required
          />
          <ButtonComponent title="Login" onPress={onLogin} className="mt-6" />
          <OAuthComponent />
          <Link
            push
            href="/(auth)/signup"
            className="mt-10 text-lg text-center text-general-200"
          >
            <Text>Don't Have an account? </Text>
            <Text className="text-primary-500">Sign Up</Text>
          </Link>
        </View>
        {/* {Verificationb Modal} */}
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
