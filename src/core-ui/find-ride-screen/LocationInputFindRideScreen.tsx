import GoogleTextInputComponent from "@/src/component/GoogleTextInput.component";
import { GoogleInputPropsHandlePress } from "@/types/type";
import React from "react";
import { Text, View } from "react-native";

interface ILocationInputFindRideScreen {
  icon: string;
  handlePress: GoogleInputPropsHandlePress;
  title: string;
  textInputBackgroundColor: string;
  currentLocation?: string | null;
  updateSnapPoints?: () => void;
}

const LocationInputFindRideScreen = ({
  icon,
  handlePress,
  title,
  textInputBackgroundColor,
  currentLocation,
  updateSnapPoints,
}: ILocationInputFindRideScreen) => {
  return (
    <View
      className="my-3"
      onTouchStart={() => updateSnapPoints && updateSnapPoints()}
    >
      <Text className="mb-3 text-lg font-JakartaSemiBold">{title}</Text>
      <GoogleTextInputComponent
        icon={icon}
        initialLocation={currentLocation}
        containerClassName="bg-neutral-100"
        textInputBackgroundColor={textInputBackgroundColor}
        handlePress={handlePress}
      />
    </View>
  );
};

export default LocationInputFindRideScreen;
