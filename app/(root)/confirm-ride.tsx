import { ConfirmRideScreen, RideLayout } from "@/src/core-ui/core-ui-index";
import { useDriverStore } from "@/src/store/useDriver.store";
import React from "react";

const ConfirmRide = () => {
  const { drivers, setSelectedDriver, selectedDriver } = useDriverStore();
  return (
    <RideLayout
      title="Choos a Driver"
      snapPoints={["65%", "85%"]}
      child={
        <ConfirmRideScreen
          drivers={drivers}
          setSelectedDriver={setSelectedDriver}
          selectedDriver={selectedDriver}
        />
      }
    />
  );
};

export default ConfirmRide;
