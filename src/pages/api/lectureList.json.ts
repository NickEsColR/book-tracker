import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ locals, request}) => {
  const user = await locals.currentUser();
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const { id } = user;
  //TODO: Define the correct request body type
  console.log(id);
  const LectureBook = await request.json();
  LectureBook["currentPage"] = 0;
  LectureBook["liked"] = false;
  LectureBook["mainNote"] = "";
  LectureBook["readingStatus"] = "pending";
  console.log(LectureBook);

  return new Response(JSON.stringify({ LectureBook }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}