import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({locals}) => {
  const user = await locals.currentUser();
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const { id } = user;

  return new Response(JSON.stringify({ id }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}