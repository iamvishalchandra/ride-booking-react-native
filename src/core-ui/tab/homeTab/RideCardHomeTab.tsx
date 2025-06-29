import { icons } from "@/src/constant/icons.constant";
import { formatDate, formatTime } from "@/src/helper/date.helper";
import { Ride } from "@/types/type";
import React from "react";
import { Image, Text, View } from "react-native";

const RideCardHomeTab = ({ ride }: { ride: Ride }) => {
  const {
    destination_longitude,
    destination_latitude,
    origin_address,
    destination_address,
    created_at,
    ride_time,
    driver,
    payment_status,
  } = ride;

  return (
    <View
      className="flex flex-row items-center justify-center w-full mb-3 bg-white rounded-lg"
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
      }}
    >
      <View className="flex flex-col items-center justify-between p-3">
        <View className="flex flex-row items-center justify-center bg-white">
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
              width: 90,
              height: 90,
            }}
            className="rounded-lg "
          />
          <View className="flex flex-col flex-1 mx-5 gap-y-5">
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.to} className="w-5 h-5" />
              <Text className="text-sm font-JakartaMedium" numberOfLines={1}>
                {origin_address}
              </Text>
            </View>
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.point} className="w-5 h-5" />
              <Text className="text-sm font-JakartaMedium" numberOfLines={1}>
                {destination_address}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex flex-col items-start justify-center w-full p-3 mt-5 rounded-lg bg-general-500">
          <View className="flex flex-row items-center justify-between w-full mb-5">
            <Text className="text-sm text-gray-500 font-JakartaMedium">
              Date & Time
            </Text>
            <Text className="text-sm text-gray-500 font-JakartaMedium">
              {formatDate(created_at)}, {formatTime(ride_time)}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-between w-full mb-5">
            <Text className="text-sm text-gray-500 font-JakartaMedium">
              Driver
            </Text>
            <Text className="text-sm text-gray-500 font-JakartaMedium">
              {driver.first_name} {driver.last_name}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-between w-full mb-5">
            <Text className="text-sm text-gray-500 font-JakartaMedium">
              Seats
            </Text>
            <Text className="text-sm text-gray-500 font-JakartaMedium">
              {driver.car_seats}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-between w-full mb-5">
            <Text className="text-sm text-gray-500 font-JakartaMedium">
              Payment
            </Text>
            <Text
              className={`text-sm capitalize text-gray-500 font-JakartaMedium ${payment_status === "paid" ? "text-green-500" : "text-red-500"}`}
            >
              {payment_status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RideCardHomeTab;
