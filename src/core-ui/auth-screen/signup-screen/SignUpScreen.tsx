import ButtonComponent from "@/src/component/Button.component";
import InputFieldComponent from "@/src/component/InputField.component";
import OAuthComponent from "@/src/component/OAuth.component";
import { icons } from "@/src/constant/icons.constant";
import { images } from "@/src/constant/image.constant";
import { ClerkOAuthVerification } from "@/types/enum.d";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Modal, ScrollView, Text, View } from "react-native";

const SignUpScreen = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [verification, setverification] = React.useState({
    status: ClerkOAuthVerification.DEFAULT,
    code: "",
    error: "",
  });

  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const onSignUp = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      updateVerificationState({
        status: ClerkOAuthVerification.PENDING,
      });
    } catch (err: any) {
      Alert.alert("Error", err?.errors?.[0]?.longMessage || "SignUp Failed...");
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === ClerkOAuthVerification.COMPLETE) {
        await setActive({ session: signUpAttempt.createdSessionId });
        updateVerificationState({
          status: ClerkOAuthVerification.SUCCESS,
        });
      } else {
        updateVerificationState({
          status: ClerkOAuthVerification.FAILED,
          error: "'Verification Failed...",
        });
      }
    } catch (err: any) {
      Alert.alert(
        "Error",
        err?.errors?.[0]?.longMessage || "'Verification Failed..."
      );
      updateVerificationState({
        status: ClerkOAuthVerification.FAILED,
        error: err?.errors?.[0]?.longMessage || "'Verification Failed...",
      });
    }
  };

  const isVerificationSuccess =
    verification.status === ClerkOAuthVerification.SUCCESS;
  const isVerificationPending =
    verification.status === ClerkOAuthVerification.PENDING;

  const updateVerificationState = ({
    status,
    code,
    error,
  }: {
    status?: ClerkOAuthVerification;
    code?: string;
    error?: string;
  }) => {
    let newValues = verification;
    if (status) newValues.status = status;
    if (code) newValues.code = code;
    if (error) newValues.error = error;

    setverification(newValues);
  };

  return (
    <ScrollView
      className={`flex-1 ${isVerificationSuccess || isVerificationPending ? "bg-[#000000c7]" : "bg-white"}`}
    >
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
        {isVerificationSuccess ||
          (isVerificationPending && (
            <View className="absolute top-0 bottom-0 left-0 right-0 z-10 w-full h-full bg-[#000000c7]" />
          ))}
        <Modal
          visible={isVerificationPending}
          transparent={true}
          onRequestClose={() =>
            updateVerificationState({
              status: ClerkOAuthVerification.SUCCESS,
            })
          }
        >
          <View className="flex items-center justify-center h-full px-7">
            <View className="bg-white rounded-2xl w-full min-h-[300px] mb-10 flex flex-col justify-center items-center">
              {/* <Image
                source={images.check}
                className="w-[110px] h-[110px] mx-auto my-5"
              /> */}
              <View className="w-full px-8">
                <Text className="w-full mb-2 text-2xl font-JakartaExtraBold">
                  Verification
                </Text>
                <Text className="mb-5 font-Jakarta">
                  We've sent a verification code to {form.email}
                </Text>
                <InputFieldComponent
                  label="Code"
                  icon={icons.lock}
                  placeHolder="eg - 12345"
                  value={verification.code}
                  keyboardType="numeric"
                  onChange={(code: string) => updateVerificationState({ code })}
                />
                {verification?.error && (
                  <Text className="mt-1 text-sm text-red-500">
                    {verification?.error}
                  </Text>
                )}
              </View>
              <ButtonComponent
                title="Verify Email"
                onPress={onVerifyPress}
                className="w-11/12 mt-5 bg-success-500"
              />
            </View>
          </View>
        </Modal>
        <Modal visible={isVerificationSuccess} transparent={true}>
          <View className="flex items-center justify-center h-full px-7">
            <View className="bg-white py-9 rounded-2xl w-full min-h-[300px] mb-10 flex flex-col justify-center items-center">
              <Image
                source={images.check}
                className="w-[110px] h-[110px] mx-auto my-5"
              />
              <Text className="text-3xl text-center font-JakartaBold">
                Verified
              </Text>
              <Text className="text-base text-center text-gray-400 font-Jakarta">
                Your account has been verified successfully.
              </Text>
              <ButtonComponent
                title="Browse Home"
                onPress={() => router.replace("/(root)/(tabs)/home")}
                className="w-11/12 mt-5"
              />
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;
