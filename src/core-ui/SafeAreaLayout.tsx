import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ISafeAreaLayout {
  className?: string;
  child: ReactNode;
}

const SafeAreaLayout = ({ child, className, ...props }: ISafeAreaLayout) => {
  const { bottom, left, right, top } = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={{
        marginTop: top,
        marginBottom: bottom,
        marginLeft: left,
        marginRight: right,
      }}
      className={className}
      {...props}
    >
      {child}
    </SafeAreaView>
  );
};

export default SafeAreaLayout;
