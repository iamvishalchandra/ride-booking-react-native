import { Redirect } from "expo-router";
import "react-native-reanimated";

export default function Home() {
  return <Redirect href="/(auth)/welcome" />;
}
