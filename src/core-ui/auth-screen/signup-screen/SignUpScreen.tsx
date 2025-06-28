import ButtonComponent from "@/src/component/Button.component";
import InputFieldComponent from "@/src/component/InputField.component";
import OAuthComponent from "@/src/component/OAuth.component";
import { icons } from "@/src/constant/icons.constant";
import { images } from "@/src/constant/image.constant";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignUpScreen = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const onSignUp = () => {};
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="absolute text-2xl text-black font-JakartaSemiBold bottom-5 left-5">
            Create Your Account
          </Text>
        </View>
        <View className="p-5">
          <InputFieldComponent
            label="Name"
            placeHolder="Enter Your Name"
            icon={icons.person}
            value={form.name}
            onChange={(value: string) => setForm({ ...form, name: value })}
            required
          />
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
          <ButtonComponent
            title="Sign Up"
            onPress={onSignUp}
            className="mt-6"
          />
          <OAuthComponent />
          <Link
            push
            href="/(auth)/login"
            className="mt-10 text-lg text-center text-general-200"
          >
            <Text>Already Have an Account? </Text>
            <Text className="text-primary-500">Login</Text>
          </Link>
        </View>
        {/* {Verificationb Modal} */}
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;
