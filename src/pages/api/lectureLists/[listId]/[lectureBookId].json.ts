import type { APIRoute } from "astro";
import { db, eq, LectureLists, LectureListBooks, and } from "astro:db";

/**
 * API route to delete a book from a specific lecture list.
 * @param {Object} locals - The local context containing authentication information.
 * @param {Object} params - The route parameters.
 * @returns {Response} The API response.
 * @throws {Error} If an error occurs during the process.
 * @description This route allows the user to delete a book from a specific lecture list.
 *             It checks if the user is authenticated and if the lecture list belongs to the user.
 *            If the book is not found or if the user is not authorized, it returns an error response.
 * *            If the deletion is successful, it returns a success message.
 * @example
 * // Example request to delete a book from a lecture list
 * DELETE /api/lectureLists/[listId]/[lectureBookId]
 * {
 *  "listId": "12345",
 * "lectureBookId": "67890"
 * }
 */
export const DELETE: APIRoute = async ({ locals, params }) => {
  try {
    // Validate user authentication
    const { userId } = locals.auth();
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Extract params
    const { listId, lectureBookId } = params;
    
    if (!listId || !lectureBookId) {
      return new Response(JSON.stringify({ error: "List ID and Lecture Book ID are required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Verify the lecture list exists and belongs to the user
    const lectureList = await db
      .select()
      .from(LectureLists)
      .where(and(
        eq(LectureLists.listId, listId),
        eq(LectureLists.userId, userId)
      ));

    if (!lectureList || lectureList.length === 0) {
      return new Response(JSON.stringify({ error: "Unauthorized or list not found" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Delete the relationship between the LectureBook and the list
    await db
      .delete(LectureListBooks)
      .where(and(
        eq(LectureListBooks.listId, listId),
        eq(LectureListBooks.lectureBookId, lectureBookId)
      ));

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Book successfully removed from the list" 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error removing book from list:", error);
    return new Response(JSON.stringify({ 
      error: "Failed to remove book from list",
      details: error instanceof Error ? error.message : String(error)
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};