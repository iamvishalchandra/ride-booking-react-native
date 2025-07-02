declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
      EXPO_PUBLIC_DATABASE_URI: string;
      EXPO_PUBLIC_GEOAPIFY_API_KEY: string;
      EXPO_PUBLIC_GOOGLE_API_KEY: string;
      EXPO_PUBLIC_STRIPE_API_KEY: string;
      STRIPE_SECRET_KEY: string;
    }
  }
}

export {};
