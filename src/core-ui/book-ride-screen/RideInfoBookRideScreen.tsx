import React from "react";
import { Text, View } from "react-native";

interface IRideInfoBookRideScreen {
  price: string;
  time: string;
  seats: number;
}

const RideInfoBookRideScreen = ({
  price,
  seats,
  time,
}: IRideInfoBookRideScreen) => {
  return (
    <View className="flex flex-col items-start justify-center w-full px-5 py-3 mt-5 rounded-3xl bg-general-600">
      <View className="flex flex-row items-center justify-between w-full py-3 border-b border-white">
        <Text className="text-lg font-JakartaRegular">Ride Price</Text>
        <Text className="text-lg font-JakartaRegular text-[#0CC25F]">
          ${price}
        </Text>
      </View>

      <View className="flex flex-row items-center justify-between w-full py-3 border-b border-white">
        <Text className="text-lg font-JakartaRegular">Pickup Time</Text>
        <Text className="text-lg font-JakartaRegular">{time}</Text>
      </View>

      <View className="flex flex-row items-center justify-between w-full py-3">
        <Text className="text-lg font-JakartaRegular">Car Seats</Text>
        <Text className="text-lg font-JakartaRegular">{seats}</Text>
      </View>
    </View>
  );
};

export default RideInfoBookRideScreen;
