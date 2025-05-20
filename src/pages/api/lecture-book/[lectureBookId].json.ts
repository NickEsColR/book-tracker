import type { LectureBook } from "@/types/OpenLibraryTypes";
import type { APIRoute } from "astro";
import { db, LectureBooks, eq, LectureListBooks, LectureLists, and } from "astro:db";

export const PUT:APIRoute = async ({ locals, params, request }) => {
  try {
    const { userId } = locals.auth();
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const { lectureBookId } = params;
    if (!lectureBookId || lectureBookId.length === 0) {
      return new Response(JSON.stringify({ error: "LectureBook ID is required" }), {
        status: 400,
      });
    }
    // validate lectureBook belongs to user
    const lectureBook = await db
      .select()
      .from(LectureBooks)
      .innerJoin(LectureListBooks, eq(LectureBooks.lectureBooksId, LectureListBooks.lectureBookId))
      .innerJoin(LectureLists, eq(LectureListBooks.listId, LectureLists.listId))
      .where(and(eq(LectureBooks.lectureBooksId, lectureBookId), eq(LectureLists.userId, userId)));

    if (!lectureBook) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    // Update the lecture book details
    const requestBody = await request.json();
    if (!requestBody) {
      return new Response(JSON.stringify({ error: "Request body is required" }), {
        status: 400,
      });
    }
    
    // Assuming requestBody contains the fields to update
    const { currentPage, liked, mainNote, readingStatus } = requestBody as LectureBook;
    
    await db
      .update(LectureBooks)
      .set({ currentPage, readingStatus, liked, mainNote })
      .where(eq(LectureBooks.lectureBooksId, lectureBookId));

    return new Response(JSON.stringify({message: "succesfully updated book"}), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating lecture book:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}