import { MarkerData } from "@/types/type";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import MapView, { MapMarker, PROVIDER_DEFAULT } from "react-native-maps";
import { icons } from "../constant/icons.constant";
import { mockDrivers } from "../data/mock.data";
import { calculateRegion, generateMarkersFromData } from "../lib/map.lib";
import { useDriverStore, useLocationStore } from "../store/index.store";

const MapComponent = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const drivers: MarkerData[] = mockDrivers;
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
    setDrivers(drivers);
    if (Array.isArray(mockDrivers)) {
      if (!userLatitude || !userLongitude) return;
      const newMarkers = generateMarkersFromData({
        data: drivers,
        userLatitude,
        userLongitude,
      });
      setMarkers(newMarkers);
    }
  }, [mockDrivers]);

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
    </MapView>
  );
};

export default MapComponent;
