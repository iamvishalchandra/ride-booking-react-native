import { useUser } from "@clerk/clerk-expo";
import React from "react";
import { Text, View } from "react-native";

const HomeTab = () => {
  const { user } = useUser();

  return (
    <View>
      <Text>{user?.emailAddresses[0]?.emailAddress}</Text>
    </View>
  );
};

export default HomeTab;
