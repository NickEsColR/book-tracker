import type { APIRoute } from "astro";
import { db, eq, LectureLists, LectureListBooks, Books, LectureBooks } from "astro:db";
import type { Book } from "@/types/OpenLibraryTypes";

export const prerender = false;

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
    // TODO: validate if its posible to optimize this query to fetch all books in one go at same time query ListDetails
    const books: Book[] = [];
    
    for (const lectureBookId of lectureBookIds) {
      const lectureBook = await db.select().from(LectureBooks).where(eq(LectureBooks.lectureBooksId, lectureBookId));
      
      if (lectureBook && lectureBook.length > 0) {
        const book = await db.select().from(Books).where(eq(Books.bookId, lectureBook[0].bookId));
        
        if (book && book.length > 0) {
          // Convert to Book format for CardBook component
          const bookData: Book = {
            key: book[0].openLibraryKey,
            title: book[0].title,
            author_name: [book[0].author],
            cover_i: book[0].cover,
            isbn: []
          };
          
          books.push(bookData);
        }
      }
    }
    
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
