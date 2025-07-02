import { MapComponent } from "@/src/component/index.component";
import { icons } from "@/src/constant/icons.constant";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { ReactNode, useRef } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface IRideLayout {
  title?: string;
  className?: string;
  child: ReactNode;
  snapPoints?: string[];
  updateSnapPoints?: () => void;
}

const RideLayout = ({
  child,
  className,
  title,
  snapPoints,
  updateSnapPoints,
}: IRideLayout) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white">
        <View className="flex flex-col h-screen bg-blue-500">
          <View className="absolute z-10 flex flex-row items-center justify-start px-5 top-16">
            <TouchableOpacity onPress={() => router.back()}>
              <View className="items-center justify-center w-10 h-10 bg-white rounded-full">
                <Image
                  source={icons.backArrow}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </View>
            </TouchableOpacity>
            <Text className="ml-5 text-xl font-JakartaBold">
              {title ?? "Go Back"}
            </Text>
          </View>
          <MapComponent />
        </View>
        <BottomSheet
          keyboardBehavior="extend"
          android_keyboardInputMode="adjustPan"
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          index={0}
        >
          <BottomSheetView style={{ flex: 1, padding: 20 }}>
            {child}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
