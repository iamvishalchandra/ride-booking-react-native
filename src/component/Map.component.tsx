import { Driver, MarkerData } from "@/types/type";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform, Text, View } from "react-native";
import MapView, {
  MapMarker,
  Marker,
  PROVIDER_DEFAULT,
} from "react-native-maps";
import MapViewDirection from "react-native-maps-directions";
import { icons } from "../constant/icons.constant";
import { useFetch } from "../lib/fetch.lib";
import {
  calculateDriverTimes,
  calculateRegion,
  generateMarkersFromData,
} from "../lib/map.lib";
import { useDriverStore, useLocationStore } from "../store/index.store";

const MapComponent = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const { data: drivers, loading, error } = useFetch<Driver[]>("/(api)/driver");
  const {
    destinationLatitude,
    destinationLongitude,
    userLatitude,
    userLongitude,
  } = useLocationStore();

  const { selectedDriver, setDrivers } = useDriverStore();

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  useEffect(() => {
    if (Array.isArray(drivers)) {
      if (!userLatitude || !userLongitude) return;
      const newMarkers = generateMarkersFromData({
        data: drivers,
        userLatitude,
        userLongitude,
      });
      setMarkers(newMarkers);
    }
  }, [drivers, userLatitude, userLongitude]);

  useEffect(() => {
    if (markers.length > 0 && destinationLatitude && destinationLongitude) {
      calculateDriverTimes({
        markers,
        destinationLatitude,
        destinationLongitude,
        userLatitude,
        userLongitude,
      }).then((drivers) => setDrivers(drivers as MarkerData[]));
    }
  }, [markers, destinationLatitude, destinationLongitude]);

  if (loading || !userLatitude || !userLongitude)
    return (
      <View className="flex items-center justify-between w-full">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );

  if (error)
    return (
      <View className="flex items-center justify-between w-full">
        <Text>Error: {error}</Text>
      </View>
    );
  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      style={{ width: "100%", height: "100%", borderRadius: "0.5rem" }}
      tintColor="black"
      mapType={Platform.OS === "android" ? "standard" : "mutedStandard"}
      showsPointsOfInterest={false}
      initialRegion={region}
      showsUserLocation={true}
      userInterfaceStyle="light"
    >
      {markers?.map(({ id, latitude, longitude, title }) => (
        <MapMarker
          key={id}
          coordinate={{
            latitude: latitude!,
            longitude: longitude!,
          }}
          title={title}
          image={selectedDriver === id ? icons.selectedMarker : icons.marker}
        />
      ))}

      {userLatitude && userLongitude && (
        <Marker
          key="userLocation"
          coordinate={{
            latitude: userLatitude,
            longitude: userLongitude,
          }}
          title="User Location"
          image={icons.pin}
        />
      )}
      {destinationLatitude && destinationLongitude && (
        <>
          <Marker
            key="destination"
            coordinate={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            title="Destination"
            image={icons.pin}
          />
          <MapViewDirection
            origin={{ latitude: userLatitude, longitude: userLongitude }}
            destination={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY}
            strokeColor="#0286ff"
            strokeWidth={3}
          />
        </>
      )}
    </MapView>
  );
};

export default MapComponent;
