import {
  GoogleTextInputComponent,
  MapComponent,
} from "@/src/component/index.component";
import { icons } from "@/src/constant/icons.constant";
import { images } from "@/src/constant/image.constant";
import { recentRides } from "@/src/data/mock.data";
import { useUser } from "@clerk/clerk-expo";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RideCardHomeTab from "./RideCardHomeTab";

const HomeTab = () => {
  const { user } = useUser();
  const loading = true;

  const handleLogout = async () => {};
  const handleDestinationPress = async () => {};

  return (
    <>
      <FlatList
        data={recentRides?.slice(0, 5)}
        renderItem={({ item }) => (
          <RideCardHomeTab ride={item} key={item.ride_id} />
        )}
        className="w-full px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  resizeMode="contain"
                  alt="No Recent Rides Found"
                />
                <Text>No Recent Rides Found</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex flex-row items-center justify-between my-5">
              <Text className="text-2xl capitalize font-JakartaExtraBold">
                Welcome{", "}
                {user?.firstName ||
                  user?.emailAddresses[0]?.emailAddress?.split("@")[0]}
                👋
              </Text>
              <TouchableOpacity
                onPress={handleLogout}
                className="items-center justify-center w-10 h-10 bg-white rounded-full"
              >
                <Image className="w-4 h-4 ml-5" source={icons.out} />
              </TouchableOpacity>
            </View>
            <GoogleTextInputComponent
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            />

            <>
              <Text>Your Current Location</Text>
              <View className="flex flex-row items-center bg-transparent h-[300px]">
                <MapComponent />
              </View>
            </>
          </>
        )}
      />
    </>
  );
};

export default HomeTab;
