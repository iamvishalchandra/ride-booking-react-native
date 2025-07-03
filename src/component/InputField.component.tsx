import React, { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Keyboard,
  KeyboardAvoidingView,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  Platform,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { icons } from "../constant/icons.constant";

interface InputFieldComponent {
  label: string;
  labeStyle?: string;
  placeHolder?: string;
  icon?: ImageSourcePropType;
  showEditIcon?: boolean;
  value: string | undefined;
  onChange?: any;
  secureTextEntry?: boolean;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
  required?: boolean;
  keyboardType?: KeyboardTypeOptions | undefined;
  textContentType?:
    | "none"
    | "URL"
    | "addressCity"
    | "addressCityAndState"
    | "addressState"
    | "countryName"
    | "creditCardNumber"
    | "creditCardExpiration"
    | "creditCardExpirationMonth"
    | "creditCardExpirationYear"
    | "creditCardSecurityCode"
    | "creditCardType"
    | "creditCardName"
    | "creditCardGivenName"
    | "creditCardMiddleName"
    | "creditCardFamilyName"
    | "familyName"
    | "emailAddress"
    | "fullStreetAddress"
    | "givenName"
    | "jobTitle"
    | "location"
    | "middleName"
    | "name"
    | "namePrefix"
    | "nameSuffix"
    | "nickname"
    | "organizationName"
    | "postalCode"
    | "streetAddressLine1"
    | "streetAddressLine2"
    | "sublocality"
    | "telephoneNumber"
    | "username"
    | "password"
    | "newPassword"
    | "oneTimeCode"
    | "birthdate"
    | "birthdateDay"
    | "birthdateMonth"
    | "birthdateYear"
    | "cellularEID"
    | "cellularIMEI"
    | "dateTime"
    | "flightNumber"
    | "shipmentTrackingNumber";
  editable?: boolean;
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
  keyboardType,
  textContentType,
  editable,
  showEditIcon,
}: InputFieldComponent) => {
  const [borderColor, setBorderColor] = useState("border-neutral-100");

  const onChangeValue = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    e.persist();
    return onChange(e?.nativeEvent?.text);
  };

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
              keyboardType={keyboardType}
              onChange={onChangeValue}
              textContentType={textContentType}
              value={value}
              editable={editable}
            />

            {showEditIcon && (
              <Image
                source={icons.edit}
                className={`w-6 h-6 mr-6 ${iconStyle}`}
              />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputFieldComponent;
