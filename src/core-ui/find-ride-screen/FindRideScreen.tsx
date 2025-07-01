import ButtonComponent from "@/src/component/Button.component";
import { icons } from "@/src/constant/icons.constant";
import { LocationStore } from "@/types/type";
import { router } from "expo-router";
import React from "react";
import LocationInputFindRideScreen from "./LocationInputFindRideScreen";

interface IFindScreen {
  locationStore: LocationStore;
  updateSnapPoints?: () => void;
}
const FindRidScreen = ({
  locationStore: {
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
    userAddress,
  },
  updateSnapPoints,
}: IFindScreen) => {
  return (
    <>
      <LocationInputFindRideScreen
        handlePress={(location) => setUserLocation(location)}
        textInputBackgroundColor="#f5f5f5"
        icon={icons.target}
        currentLocation={userAddress}
        title="From"
        updateSnapPoints={updateSnapPoints}
      />
      <LocationInputFindRideScreen
        handlePress={(location) => setDestinationLocation(location)}
        textInputBackgroundColor="transparent"
        icon={icons.map}
        currentLocation={destinationAddress}
        title="To"
        updateSnapPoints={updateSnapPoints}
      />
      <ButtonComponent
        title="Find Now"
        onPress={() => router.push("/(root)/confirm-ride")}
        className="mt-5"
      />
    </>
  );
};

export default FindRidScreen;
