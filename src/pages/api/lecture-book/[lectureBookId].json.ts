import type { LectureBook } from "@/types/OpenLibraryTypes";
import type { APIRoute } from "astro";
import { db, LectureBooks, eq, LectureListBooks, LectureLists, and } from "astro:db";
import { randomUUID } from "crypto";

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
    
    // First get the previous liked status
    const previousBookState = await db
      .select()
      .from(LectureBooks)
      .where(eq(LectureBooks.lectureBooksId, lectureBookId));
    
    const previousLikedStatus = previousBookState[0]?.liked || false;
    
    // Update the lecture book details
    await db
      .update(LectureBooks)
      .set({ currentPage, readingStatus, liked, mainNote })
      .where(eq(LectureBooks.lectureBooksId, lectureBookId));
    
    // If liked status changed, update the liked list
    if (previousLikedStatus !== liked) {
      // Find the user's liked list
      const likedList = await db
        .select()
        .from(LectureLists)
        .where(and(eq(LectureLists.userId, userId), eq(LectureLists.type, "liked")));
      
      // If liked list doesn't exist, create it
      let likedListId = likedList?.[0]?.listId;
      if (!likedList || likedList.length === 0) {
        const newLikedList = {
          listId: randomUUID(),
          userId,
          name: "Liked",
          description: "Libros que me han gustado",
          type: "liked"
        };
        await db.insert(LectureLists).values(newLikedList);
        likedListId = newLikedList.listId;
      }
      
      if (liked) {
        // Add to liked list
        // First check if it's already in the liked list
        const existingEntry = await db
          .select()
          .from(LectureListBooks)
          .where(and(
            eq(LectureListBooks.listId, likedListId),
            eq(LectureListBooks.lectureBookId, lectureBookId)
          ));
          
        if (!existingEntry || existingEntry.length === 0) {
          // Add the book to the liked list
          await db.insert(LectureListBooks).values({
            listId: likedListId,
            lectureBookId: lectureBookId
          });
        }
      } else {
        // Remove from liked list
        await db
          .delete(LectureListBooks)
          .where(and(
            eq(LectureListBooks.listId, likedListId),
            eq(LectureListBooks.lectureBookId, lectureBookId)
          ));
      }
    }

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