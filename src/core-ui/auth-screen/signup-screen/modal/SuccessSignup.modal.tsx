import ButtonComponent from "@/src/component/Button.component";
import { images } from "@/src/constant/image.constant";
import { router } from "expo-router";
import React from "react";
import { Image, Modal, Text, View } from "react-native";

interface ISuccessSignupModal {
  show: boolean;
}

const SuccessSignupModal = ({ show }: ISuccessSignupModal) => {
  return (
    <Modal visible={show} transparent={true}>
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
  );
};

export default SuccessSignupModal;
