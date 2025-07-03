import * as Linking from "expo-linking";
import { fetchAPI } from "./fetch.lib";
export const googleOAuth = async (startSSOFlow: any) => {
  try {
    const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
      strategy: "oauth_google",
      redirectUrl: Linking.createURL("/(root)/(tabs)/home"),
    });

    if (createdSessionId) {
      if (setActive) await setActive!({ session: createdSessionId });
      await fetchAPI("/(api)/user", {
        method: "POST",
        body: JSON.stringify({
          name: `${signUp.firstName} ${signUp.lastName}`,
          enum: signUp.emailAddress,
          clerkId: signUp.createdUserId,
        }),
      });

      return {
        success: true,
        code: "Success",
        message: "You have successfully authenticated.",
      };
    }
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      code: error?.code,
      message: error?.errors[0]?.longMessage,
    };
  }
};
