import { Link, Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const NotFoundSreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: "!oops" }} />
      <View>
        <Text>404 NOT FOUND!</Text>
        <Link href="/">
          <Text>GO HOME</Text>
        </Link>
      </View>
    </>
  );
};

export default NotFoundSreen;
