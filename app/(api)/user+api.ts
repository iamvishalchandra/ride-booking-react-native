import { neon } from "@neondatabase/serverless";

export const POST = async (req: Request) => {
  try {
    const sql = neon(process.env.EXPO_PUBLIC_DATABASE_URI);
    const { name, email, clerkId } = await req.json();

    if (!name || !email || !clerkId)
      return Response.json(
        { error: "Missing required field" },
        { status: 400 }
      );
    const data =
      await sql`INSERT INTO users (name,email,clerk_id) VALUES (${name},${email},${clerkId})`;

    return new Response(JSON.stringify({ data }), { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
};
