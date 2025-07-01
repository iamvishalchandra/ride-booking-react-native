import {
  GoogleTextInputComponent,
  MapComponent,
} from "@/src/component/index.component";
import { icons } from "@/src/constant/icons.constant";
import { images } from "@/src/constant/image.constant";
import { recentRides } from "@/src/data/mock.data";
import { UserResource } from "@clerk/types";
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

interface IHomeTab {
  user: UserResource | null | undefined;
  handleDestinationPress: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

const HomeTab = ({ user, handleDestinationPress }: IHomeTab) => {
  const loading = true;

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
                // onPress={handleLogout}
                className="items-center justify-center w-10 h-10 bg-white rounded-full"
              >
                <Image className="w-4 h-4 ml-5" source={icons.out} />
              </TouchableOpacity>
            </View>
            <GoogleTextInputComponent
              icon={icons.search}
              containerClassName="bg-white shadow-md shadow-neutral-300"
              containerStyle={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                elevation: 6,
              }}
              handlePress={handleDestinationPress}
            />

            <>
              <Text>Your Current Location</Text>
              <View className="flex flex-row items-center  h-[300px] bg-transparent">
                <MapComponent />
              </View>
            </>
            <Text className="mt-5 mb-3 text-xl font-JakartaBold">
              Recent Rides
            </Text>
          </>
        )}
      />
    </>
  );
};

export default HomeTab;
