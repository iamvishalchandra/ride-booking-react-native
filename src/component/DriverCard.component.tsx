import { DriverCardProps } from "@/types/type";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../constant/icons.constant";
import { formatTime } from "../helper/date.helper";

const DriverCardComponent = ({
  item,
  selected,
  setSelected,
}: DriverCardProps) => {
  return (
    <TouchableOpacity
      onPress={setSelected}
      className={`${selected && selected.toString() === item.id.toString() ? "bg-general-600" : "bg-white"} flex flex-row items-center justify-between py-5 px-3 rounded-xl`}
    >
      <Image
        source={{ uri: item.profile_image_url }}
        className="rounded-full w-14 h-14"
      />
      <View className="flex-col items-start justify-center flex-1 mx-3">
        <View className="flex flex-row items-center justify-start mb-1">
          <Text className="text-lg font-Jakarta">{item.title}</Text>
          <View className="flex flex-row items-center ml-2 space-x-1">
            <Image source={icons.star} className="w-3.5 h-3.5" />
            <Text className="text-sm font-Jakarta">{item.rating}</Text>
          </View>
        </View>

        <View className="flex flex-row items-center justify-start">
          <View className="flex flex-row items-center ml-4">
            <Image source={icons.dollar} className="w-4 h-4" />
            <Text className="ml-1 text-sm font-Jakarta">${item.price}</Text>
          </View>
          <Text className="mx-1 text-sm font-JakartaRegular text-general-800">
            |
          </Text>
          <Text className="text-sm font-JakartaRegular text-general-800">
            {formatTime(item.time!)}
          </Text>
          <Text className="mx-1 text-sm font-JakartaRegular text-general-800">
            |
          </Text>
          <Text className="text-sm font-JakartaRegular text-general-800">
            {item.car_seats} seats
          </Text>
        </View>
      </View>
      <Image
        source={{ uri: item.car_image_url }}
        className="h-14 w-14"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default DriverCardComponent;
