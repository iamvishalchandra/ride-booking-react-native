import db from "../db";

export const createUser = async ({
  name,
  email,
  clerkId,
}: {
  name: string;
  email: string;
  clerkId: string;
}) =>
  await db`INSERT INTO users (name,email,clerk_id) VALUES (${name},${email},${clerkId})`;
