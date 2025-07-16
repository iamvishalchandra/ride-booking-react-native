import { BookRideScreen, RideLayout } from "@/src/core-ui/core-ui-index";
import { useDriverStore, useLocationStore } from "@/src/store/index.store";
import { useUser } from "@clerk/clerk-expo";
import { Platform } from "react-native";

const BookRide = () => {
  if (Platform.OS === "web") return;
  const { StripeProvider } = require("@stripe/stripe-react-native");
  const { user } = useUser();
  const { userAddress, destinationAddress } = useLocationStore();
  const { drivers, selectedDriver } = useDriverStore();

  const driverDetails = drivers?.filter(
    (driver) => +driver.id === selectedDriver
  )[0];

  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_API_KEY}
      merchantIdentifier="merchat.ride-booking.com"
      urlScheme="ridebooking"
    >
      <RideLayout
        title="Book Ride"
        child={
          <BookRideScreen
            user={user}
            userAddress={userAddress}
            destinationAddress={destinationAddress}
            driverDetails={driverDetails}
          />
        }
      />
    </StripeProvider>
  );
};

export default BookRide;
