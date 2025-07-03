import { RideTab, SafeAreaLayout } from "@/src/core-ui/core-ui-index";
import { useFetch } from "@/src/lib/fetch.lib";
import { Ride } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";
import React from "react";

const Rides = () => {
  const { user } = useUser();
  const { data: recentRides, loading } = useFetch<Ride[]>(
    `/(api)/ride/${user?.id}`
  );

  return (
    <SafeAreaLayout
      className={`flex-1 bg-general-500`}
      child={
        <RideTab recentRides={recentRides} user={user} loading={loading} />
      }
    />
  );
};

export default Rides;
