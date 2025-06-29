import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
export default function Layout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (isSignedIn) return <Redirect href="/(root)/(tabs)/home" />;
  return (
    isLoaded && (
      <Stack>
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    )
  );
}
