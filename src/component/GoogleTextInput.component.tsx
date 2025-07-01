import { GoogleInputProps } from "@/types/type";
import React from "react";
import { Image, View } from "react-native";
import "react-native-get-random-values";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { icons } from "../constant/icons.constant";

const GoogleTextInputComponent = ({
  icon,
  containerClassName,
  handlePress,
  initialLocation,
  textInputBackgroundColor,
  containerStyle,
}: GoogleInputProps) => {
  return (
    <View
      style={containerStyle}
      className={`flex flex-row justify-center items-center relative z-50 rounded-lg ${containerClassName} mb-5`}
    >
      <GooglePlacesAutocomplete
        keyboardShouldPersistTaps="always"
        fetchDetails={true}
        placeholder="Where to?"
        debounce={200}
        styles={{
          textInputContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            marginHorizontal: 20,
            position: "relative",
            shadowColor: "#d4d4d4",
          },
          textInput: {
            backgroundColor: textInputBackgroundColor || "white",
            fontSize: 14,
            fontWeight: 600,
            marginTop: 5,
            width: "100%",
            borderRadius: 200,
          },
          listView: {
            backgroundColor: textInputBackgroundColor || "white",
            position: "relative",
            top: 0,
            width: "100%",
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            zIndex: 99,
          },
        }}
        onPress={(data, details = null) => {
          handlePress({
            latitude: details?.geometry?.location?.lat!,
            longitude: details?.geometry?.location?.lng!,
            address: data?.description,
          });
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          language: "en",
        }}
        renderLeftButton={() => (
          <View className="items-center justify-center w-6 h-6">
            <Image
              source={icon ? icon : icons.search}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
        )}
        textInputProps={{
          placeholderTextColor: "gray",
          placeholder: initialLocation ?? "Where Do you want to go?",
        }}
        predefinedPlaces={[]}
        timeout={20000}
        minLength={3}
      />
    </View>
  );
};

export default GoogleTextInputComponent;
