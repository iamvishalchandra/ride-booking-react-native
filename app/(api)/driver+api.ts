import db from "@/src/database/db";

export const GET = async () => {
  try {
    const data = await db`SELECT * FROM drivers`;
    return Response.json({ data });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
};
