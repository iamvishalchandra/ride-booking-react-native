import { createUser } from "@/src/database/user/create.user";

export const POST = async (req: Request) => {
  try {
    const { name, email, clerkId } = await req.json();

    if (!name || !email || !clerkId)
      return Response.json(
        { error: "Missing required field" },
        { status: 400 }
      );
    const data = await createUser({ name, email, clerkId });

    return new Response(JSON.stringify({ data }), { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
};
