import { db, eq, Books, LectureBooks } from "astro:db";
import type { Book } from "@/types/OpenLibraryTypes";

/**
 * Fetches books associated with a lecture list by their lecture book IDs
 * @param lectureBookIds Array of lecture book IDs to fetch
 * @returns Array of books in the OpenLibrary Book format
 */
export async function fetchLectureListBooks(lectureBookIds: string[]): Promise<Book[]> {
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
  
  return books;
}
