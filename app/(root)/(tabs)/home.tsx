import { HomeTab, SafeAreaLayout } from "@/src/core-ui/core-ui-index";
import { useLocationStore } from "@/src/store/index.store";
import { useUser } from "@clerk/clerk-expo";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";

const HomeScreen = () => {
  const { user } = useUser();
  const { setUserLocation, setDestinationLocation } =
    useLocationStore && useLocationStore((state) => state);

  const [hasPermission, setHasPermission] = useState(false);
  useEffect(() => {
    requestLocaion();
  }, []);

  const requestLocaion = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return setHasPermission(false);
      const location = await Location.getCurrentPositionAsync();
      const address = await Location.reverseGeocodeAsync({
        latitude: location?.coords?.latitude,
        longitude: location?.coords?.longitude,
      });

      // latitude: location?.coords?.latitude,
      // longitude: location?.coords?.longitude,
      setUserLocation({
        latitude: 37.78825,
        longitude: -122.4324,
        address: `${address[0]?.name}, ${address[0]?.region}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaLayout
      className={`flex-1 bg-general-500`}
      child={<HomeTab user={user} />}
    />
  );
};

export default HomeScreen;
