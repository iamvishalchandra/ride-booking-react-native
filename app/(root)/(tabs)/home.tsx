import { HomeTab, SafeAreaLayout } from "@/src/core-ui/core-ui-index";
import { useFetch } from "@/src/lib/fetch.lib";
import { useLocationStore } from "@/src/store/index.store";
import { useAuth, useUser } from "@clerk/clerk-expo";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";

const HomeScreen = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const { setUserLocation, setDestinationLocation } =
    useLocationStore && useLocationStore((state) => state);

  const { data: recentRides, loading } = useFetch(`/(api)/ride/${user?.id}`);

  const [hasPermission, setHasPermission] = useState(false);

  const handleLogout = () => {
    signOut();
    router.replace("/(auth)/login");
  };

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);
    router.push("/(root)/find-ride");
  };

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
      child={
        <HomeTab
          user={user}
          handleDestinationPress={handleDestinationPress}
          recentRides={recentRides}
          loading={loading}
          handleLogout={handleLogout}
        />
      }
    />
  );
};

export default HomeScreen;
