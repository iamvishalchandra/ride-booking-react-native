import { GoogleInputProps } from "@/types/type";
import React from "react";
import { Text, View } from "react-native";

const GoogleTextInputComponent = ({
  icon,
  containerStyle,
  handlePress,
  initialLocation,
  textInputBackgroundColor,
}: GoogleInputProps) => {
  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-full ${containerStyle} mb-5`}
    >
      <Text>GoogleTextInputComponent</Text>
    </View>
  );
};

export default GoogleTextInputComponent;
