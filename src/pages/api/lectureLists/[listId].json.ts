import type { APIRoute } from "astro";
import { db, eq, LectureLists, LectureListBooks } from "astro:db";
import { fetchLectureListBooks } from "@/utils/lectureListUtils";

/**
 * API route to get a specific lecture list and its associated books.
 * @param {Object} params - The route parameters.
 * @param {string} params.listId - The ID of the lecture list to retrieve.
 * @returns {Response} The API response.
 */
export const GET: APIRoute = async ({ params }) => {
  try {
    const { listId } = params;
    
    if (!listId) {
      return new Response(JSON.stringify({ error: "List ID is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Get the lecture list
    const lectureList = await db.select().from(LectureLists).where(eq(LectureLists.listId, listId));
    
    if (!lectureList || lectureList.length === 0) {
      return new Response(JSON.stringify({ error: "Lecture list not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Get all LectureBooks IDs associated with this list
    // TODO: Optimize this query to fetch all books in one go at same time query ListDetails
    const lectureListBooks = await db.select().from(LectureListBooks).where(eq(LectureListBooks.listId, listId));
    
    // If no books in the list, return empty books array
    if (!lectureListBooks || lectureListBooks.length === 0) {
      return new Response(
        JSON.stringify({ 
          listInfo: lectureList[0],
          books: []
        }), 
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    
    const lectureBookIds = lectureListBooks.map(item => item.lectureBookId);
    
    // Get all LectureBooks with their associated Books
    const books = await fetchLectureListBooks(lectureBookIds);
    
    return new Response(
      JSON.stringify({ 
        listInfo: lectureList[0],
        books
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching lecture list:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch lecture list" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
