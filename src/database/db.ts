import { neon } from "@neondatabase/serverless";

export default neon(`${process.env.EXPO_PUBLIC_DATABASE_URI}`);
