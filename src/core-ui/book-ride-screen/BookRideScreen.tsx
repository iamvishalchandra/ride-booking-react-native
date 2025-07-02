import { PaymentComponent } from "@/src/component/index.component";
import { icons } from "@/src/constant/icons.constant";
import { formatTime } from "@/src/helper/date.helper";
import { MarkerData } from "@/types/type";
import { UserResource } from "@clerk/types";
import React from "react";
import { Image, Text, View } from "react-native";
import RideInfoBookRideScreen from "./RideInfoBookRideScreen";

interface IBookRideScreen {
  user: UserResource | null | undefined;
  userAddress: string | null;
  destinationAddress: string | null;
  driverDetails: MarkerData;
}

const BookRideScreen = ({
  user,
  userAddress,
  destinationAddress,
  driverDetails,
}: IBookRideScreen) => {
  return (
    <>
      <Text className="mb-3 text-xl font-JakartaSemiBold">
        Ride Information
      </Text>

      <View className="flex flex-col items-center justify-center w-full mt-10">
        <Image
          source={{ uri: driverDetails?.profile_image_url }}
          className="rounded-full w-28 h-28"
        />

        <View className="flex flex-row items-center justify-center mt-5 space-x-2">
          <Text className="text-lg font-JakartaSemiBold">
            {driverDetails?.title}
          </Text>

          <View className="flex flex-row items-center space-x-0.5">
            <Image
              source={icons.star}
              className="w-5 h-5"
              resizeMode="contain"
            />
            <Text className="text-lg font-JakartaRegular">
              {driverDetails?.rating}
            </Text>
          </View>
        </View>
      </View>

      <RideInfoBookRideScreen
        price={driverDetails?.price!}
        time={formatTime(parseInt(driverDetails?.time?.toString()!))}
        seats={driverDetails?.car_seats}
      />

      <View className="flex flex-col items-start justify-center w-full mt-5">
        <View className="flex flex-row items-center justify-start w-full py-3 mt-3 border-t border-b border-general-700">
          <Image source={icons.to} className="w-6 h-6" />
          <Text className="ml-2 text-lg font-JakartaRegular">
            {userAddress}
          </Text>
        </View>

        <View className="flex flex-row items-center justify-start w-full py-3 border-b border-general-700">
          <Image source={icons.point} className="w-6 h-6" />
          <Text className="ml-2 text-lg font-JakartaRegular">
            {destinationAddress}
          </Text>
        </View>
      </View>
      <PaymentComponent
        fullName={user?.fullName!}
        email={user?.emailAddresses[0].emailAddress!}
        amount={driverDetails?.price!}
        driverId={driverDetails?.id!}
        rideTime={driverDetails?.time!}
      />
    </>
  );
};

export default BookRideScreen;
