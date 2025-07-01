import React, { ReactNode } from "react";
import { Platform, SafeAreaView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ISafeAreaLayout {
  className?: string;
  child: ReactNode;
}

const SafeAreaLayout = ({ child, className, ...props }: ISafeAreaLayout) => {
  const { bottom, left, right, top } = useSafeAreaInsets();
  return (
    <SafeAreaView className={className} {...props}>
      <View
        className="flex items-center justify-between flex-1 w-full h-full bg-white"
        style={
          //only for android as Safeareaview is only supported in ios
          Platform.OS === "android"
            ? {
                marginTop: top,
                marginBottom: bottom || 10,
                marginLeft: left,
                marginRight: right,
              }
            : {}
        }
      >
        {child}
      </View>
    </SafeAreaView>
  );
};

export default SafeAreaLayout;
