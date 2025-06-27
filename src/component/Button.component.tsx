import { ButtonProps } from "@/types/type";
import { getBGVariantStyle, getTextVariantStyle } from "@helper/color.helper";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const ButtonComponent = ({
  onPress,
  IconLeft,
  IconRight,
  title,
  className,
  bgVariant = "primary",
  textVariant = "default",
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full rounded-full flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${getBGVariantStyle(bgVariant)}`}
    >
      <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
