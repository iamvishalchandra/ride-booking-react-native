import { images } from "@/src/constant/image.constant";
import { UserResource } from "@clerk/types";
import React from "react";
import { Image, Text, View } from "react-native";

interface IChatTab {
  user: UserResource | null | undefined;
}

const ChatTab = ({ user }: IChatTab) => {
  return (
    <View className="w-full h-screen">
      <View>
        <Text className="w-full my-5 ml-4 text-2xl text-left font-JakartaBold">
          Your Chats
        </Text>
      </View>
      <View className="absolute flex items-center justify-center w-full top-1/3">
        <Image source={images.message} className="w-[350px] h-[150px]" />
        <Text className="h-8 mt-6 text-3xl font-JakartaExtraBold">
          No Messages, yet.
        </Text>
        <Text className="mt-2 text-xl text-gray-400 font-JakartaSemiBold">
          No messages in your inbox, yet!
        </Text>
      </View>
    </View>
  );
};

export default ChatTab;
