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
  hideButtonShadow,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`p-3 rounded-full flex flex-row justify-center items-center ${getBGVariantStyle(bgVariant)} ${className}`}
      style={
        !hideButtonShadow && {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
        }
      }
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default ButtonComponent;
