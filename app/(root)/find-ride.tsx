import { FindRideScreen, RideLayout } from "@/src/core-ui/core-ui-index";
import { useLocationStore } from "@/src/store/useLocation.store";
import { useState } from "react";

const FindRide = () => {
  const locationStore = useLocationStore();
  const [snapPoints, setSnapPoints] = useState<string[]>(["40%"]);

  const updateSnapPoints = () => setSnapPoints(["85%"]);

  return (
    <RideLayout
      child={
        <FindRideScreen
          locationStore={locationStore}
          updateSnapPoints={updateSnapPoints}
        />
      }
      title="Find Ride"
      snapPoints={snapPoints}
      updateSnapPoints={updateSnapPoints}
    />
  );
};

export default FindRide;
