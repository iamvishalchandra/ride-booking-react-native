import { neon } from "@neondatabase/serverless";

export const GET = async () => {
  try {
    const sql = neon(`${process.env.EXPO_PUBLIC_DATABASE_URI}`);

    const data = await sql`SELECT * FROM drivers`;
    return Response.json({ data });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
};
