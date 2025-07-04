import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

export default function Home() {
  const { isSignedIn } = useAuth();
  return (
    <Redirect href={isSignedIn ? "/(root)/(tabs)/home" : "/(auth)/welcome"} />
  );
}
