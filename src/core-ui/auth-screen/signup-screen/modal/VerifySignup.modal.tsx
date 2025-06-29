import ButtonComponent from "@/src/component/Button.component";
import InputFieldComponent from "@/src/component/InputField.component";
import { icons } from "@/src/constant/icons.constant";
import React from "react";
import { Modal, Text, View } from "react-native";

interface IVerifySignupModal {
  show: boolean;
  onRequestClose?: any;
  email: string;
  inputCode: string;
  onChangeCode: any;
  error: string;
  onConfirm: any;
}

const VerifySignupModal = ({
  show,
  onRequestClose,
  email,
  inputCode,
  onChangeCode,
  error,
  onConfirm,
}: IVerifySignupModal) => {
  return (
    <Modal visible={show} transparent={true} onRequestClose={onRequestClose}>
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
              We've sent a verification code to {email}
            </Text>
            <InputFieldComponent
              label="Code"
              icon={icons.lock}
              placeHolder="eg - 12345"
              value={inputCode}
              keyboardType="numeric"
              onChange={onChangeCode}
            />
            {error && (
              <Text className="mt-1 text-sm text-red-500">{error}</Text>
            )}
          </View>
          <ButtonComponent
            title="Verify Email"
            onPress={onConfirm}
            className="w-11/12 mt-5 bg-success-500"
          />
        </View>
      </View>
    </Modal>
  );
};

export default VerifySignupModal;
