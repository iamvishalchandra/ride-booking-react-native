import {
  ButtonComponent,
  DriverCardComponent,
} from "@/src/component/index.component";
import { MarkerData } from "@/types/type";
import { router } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";

interface IConfirmRideScreen {
  drivers: MarkerData[];
  setSelectedDriver: (driverId: number) => void;
  selectedDriver: number | null;
}
const ConfirmRideScreen = ({
  drivers,
  selectedDriver,
  setSelectedDriver,
}: IConfirmRideScreen) => {
  return (
    <FlatList
      data={drivers}
      renderItem={({ item }) => (
        <DriverCardComponent
          item={item}
          selected={selectedDriver!}
          setSelected={() => setSelectedDriver(Number(item.id))}
        />
      )}
      ListFooterComponent={() => (
        <View className="mx-5 mt-10">
          <ButtonComponent
            title="Select Ride"
            onPress={() => router.push("/(root)/book-ride")}
          />
        </View>
      )}
    />
  );
};

export default ConfirmRideScreen;
