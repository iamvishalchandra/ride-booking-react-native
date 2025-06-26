import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShadowVisible: false }} />
      <Stack.Screen name="signup" options={{ headerShadowVisible: false }} />
      <Stack.Screen name="login" options={{ headerShadowVisible: false }} />
    </Stack>
  );
}
