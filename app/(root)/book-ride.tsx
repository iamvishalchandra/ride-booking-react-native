import { BookRideScreen, RideLayout } from "@/src/core-ui/core-ui-index";
import { useDriverStore, useLocationStore } from "@/src/store/index.store";
import { useUser } from "@clerk/clerk-expo";

const BookRide = () => {
  const { user } = useUser();
  const { userAddress, destinationAddress } = useLocationStore();
  const { drivers, selectedDriver } = useDriverStore();

  const driverDetails = drivers?.filter(
    (driver) => +driver.id === selectedDriver
  )[0];

  return (
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
  );
};

export default BookRide;
