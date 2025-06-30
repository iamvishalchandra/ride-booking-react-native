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
      className={`flex items-center justify-center flex-row relative z-50 rounded-lg ${containerClassName} mb-5`}
    >
      <GooglePlacesAutocomplete
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
            fontSize: 16,
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
            zIndex: 1000,
          },
        }}
        onPress={(data, details = null) => {
          handlePress({
            latitude: details?.geometry?.location?.lat!,
            longitude: details?.geometry?.location?.lng!,
            address: data?.description,
          });
        }}
        query={{ key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY, language: "en" }}
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
        predefinedPlaces={[
          {
            description: "Home",
            geometry: {
              location: {
                lat: 37.78825,
                lng: -122.4324,
                latitude: 37.78825,
                longitude: -122.4324,
              },
            },
          },
          {
            description: "Office",
            geometry: {
              location: {
                lat: 37.78825,
                lng: -122.4324,
                latitude: 37.78825,
                longitude: -122.4324,
              },
            },
          },
          {
            description: "School",
            geometry: {
              location: {
                lat: 37.78825,
                lng: -122.4324,
                latitude: 37.78825,
                longitude: -122.4324,
              },
            },
          },
          {
            description: "Park",
            geometry: {
              location: {
                lat: 37.78825,
                lng: -122.4324,
                latitude: 37.78825,
                longitude: -122.4324,
              },
            },
          },
        ]}
        onFail={() => {
          console.log(`Error`);
        }}
      />
    </View>
  );
};

export default GoogleTextInputComponent;
