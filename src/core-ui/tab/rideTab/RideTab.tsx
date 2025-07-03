import { images } from "@/src/constant/image.constant";
import { UserResource } from "@clerk/types";
import React from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import RideCardHomeTab from "../homeTab/RideCardHomeTab";

interface IRideTab {
  user: UserResource | null | undefined;
  recentRides: any;
  loading: boolean;
}

const RideTab = ({ recentRides, user, loading }: IRideTab) => {
  return (
    <>
      <FlatList
        data={recentRides}
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
            <Text className="my-5 text-2xl font-JakartaBold">All Rides</Text>
          </>
        )}
      />
    </>
  );
};

export default RideTab;
