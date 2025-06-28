import React, { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface InputFieldComponent {
  label: string;
  labeStyle?: string;
  placeHolder?: string;
  icon?: ImageSourcePropType;
  value: string | number | undefined;
  onChange: any;
  secureTextEntry?: boolean;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
  required?: boolean;
}

const InputFieldComponent = ({
  label,
  labeStyle,
  onChange,
  value,
  icon,
  placeHolder,
  className,
  containerStyle,
  iconStyle,
  inputStyle,
  secureTextEntry,
  required,
  ...props
}: InputFieldComponent) => {
  const [borderColor, setBorderColor] = useState("border-neutral-100");
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="w-full my-2">
          <Text className={`text-lg font-JakartaSemiBold mb-3 ${labeStyle}`}>
            {label}
            {required && <Text className="text-red-500">*</Text>}
          </Text>
          <View
            className={`flex flex-row justify-center items-center relative bg-neutral-100 rounded-full border ${borderColor}
             focus:border-primary-500 ${containerStyle}`}
          >
            {icon && (
              <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
            )}
            <TextInput
              className={`rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 placeholder:text-gray-300 ${inputStyle} text-left`}
              placeholder={placeHolder}
              secureTextEntry={secureTextEntry}
              onFocus={() => setBorderColor("border-primary-500")}
              onBlur={() => setBorderColor("border-neutral-100")}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputFieldComponent;
