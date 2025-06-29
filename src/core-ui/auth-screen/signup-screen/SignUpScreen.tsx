import ButtonComponent from "@/src/component/Button.component";
import InputFieldComponent from "@/src/component/InputField.component";
import OAuthComponent from "@/src/component/OAuth.component";
import { icons } from "@/src/constant/icons.constant";
import { images } from "@/src/constant/image.constant";
import { fetchAPI } from "@/src/lib/fetch.lib";
import { ClerkOAuthVerification } from "@/types/enum.d";
import { useSignUp } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import SuccessSignupModal from "./modal/SuccessSignup.modal";
import VerifySignupModal from "./modal/VerifySignup.modal";

const SignUpScreen = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [verification, setverification] = React.useState({
    status: ClerkOAuthVerification.DEFAULT,
    code: "",
    error: "",
  });

  const { isLoaded, signUp, setActive } = useSignUp();

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
      Alert.alert(
        "Error",
        err?.errors?.[0]?.longMessage ||
          err?.errors?.[0]?.message ||
          "SignUp Failed..."
      );
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
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: signUpAttempt.createdUserId,
          }),
        });
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
        error:
          err?.errors?.[0]?.longMessage ||
          err?.errors?.[0]?.message ||
          "'Verification Failed...",
      });
    }
  };

  const updateVerificationState = ({
    status,
    code,
    error,
  }: {
    status?: ClerkOAuthVerification;
    code?: string;
    error?: string;
  }) => {
    let newValues: {
      status: ClerkOAuthVerification;
      code: string;
      error: string;
    } = verification;
    if (status) newValues.status = status;
    if (code) newValues.code = code;
    if (error) newValues.error = error;

    setverification({ ...verification, ...newValues });
  };

  const showTransparentOverlay =
    verification.status === ClerkOAuthVerification.PENDING ||
    verification.status === ClerkOAuthVerification.SUCCESS;

  return (
    <ScrollView
      className={`flex-1 ${showTransparentOverlay ? "bg-[#000000c7]" : "bg-white"}`}
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
            textContentType="name"
            icon={icons.person}
            value={form.name}
            onChange={(value: string) => setForm({ ...form, name: value })}
            required
          />
          <InputFieldComponent
            label="Email"
            placeHolder="Enter Your Email"
            textContentType="emailAddress"
            icon={icons.email}
            value={form.email.toLowerCase()}
            onChange={(value: string) => setForm({ ...form, email: value })}
            required
          />
          <InputFieldComponent
            label="Password"
            placeHolder="Enter Your Password"
            textContentType="password"
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
        {showTransparentOverlay && (
          <View className="absolute top-0 bottom-0 left-0 right-0 z-10 w-full h-full bg-[#000000c7]" />
        )}

        {/* {Verification Modal} */}
        <VerifySignupModal
          email={form.email}
          error={verification?.error}
          inputCode={verification.code}
          onChangeCode={(code: string) =>
            updateVerificationState({ code, error: "" })
          }
          onConfirm={onVerifyPress}
          show={verification.status === ClerkOAuthVerification.PENDING}
        />

        {/* {Succes Modal} */}
        <SuccessSignupModal
          show={verification.status === ClerkOAuthVerification.SUCCESS}
        />
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;
