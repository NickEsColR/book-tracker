import { db, eq, and, Books, LectureBooks, Notes } from "astro:db";
import type { Book, LectureBook } from "@/types/OpenLibraryTypes";

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

/**
 * Fetches books associated with a lecture list by their lecture book IDs
 * including additional information from LectureBooks table and notes
 * @param lectureBookIds Array of lecture book IDs to fetch
 * @returns Array of books in the extended LectureBook format
 */
export async function fetchLectureListBooksWithDetails(lectureBookIds: string[]): Promise<LectureBook[]> {
  const books: LectureBook[] = [];
  
  for (const lectureBookId of lectureBookIds) {
    const lectureBook = await db.select().from(LectureBooks).where(eq(LectureBooks.lectureBooksId, lectureBookId));
    
    if (lectureBook && lectureBook.length > 0) {
      const book = await db.select().from(Books).where(eq(Books.bookId, lectureBook[0].bookId));
      
      if (book && book.length > 0) {
        // Convert to LectureBook format with extended data
        const bookData: LectureBook = {
          key: book[0].openLibraryKey,
          title: book[0].title,
          author_name: [book[0].author],
          cover_i: book[0].cover,
          isbn: [],
          // Add lecture book data
          lectureBookId: lectureBook[0].lectureBooksId,
          currentPage: lectureBook[0].currentPage,
          readingStatus: lectureBook[0].readingStatus as 'pending' | 'reading' | 'completed',
          liked: lectureBook[0].liked || false, // Use value from database
          mainNote: lectureBook[0].mainNote || ""
        };
        
        books.push(bookData);
      }
    }
  }
  
  return books;
}
