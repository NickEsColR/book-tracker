import type { LectureBook } from "@/types/OpenLibraryTypes";
import { fetchLectureListBooks } from "@/utils/lectureListUtils";
import type { APIRoute } from "astro";
import {
  db,
  LectureLists,
  eq,
  and,
  LectureListBooks,
  Books,
  LectureBooks,
} from "astro:db";
import { randomUUID } from "crypto";

const TYPE = "main";

export const GET: APIRoute = async ({ locals }) => {
  try {
    // Get the current user
    const user = await locals.currentUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    const { id } = user;

    // Get the lecture list
    const lectureList = await db
      .select()
      .from(LectureLists)
      .where(and(eq(LectureLists.type, TYPE), eq(LectureLists.userId, id)));

    // Get all LectureBooks IDs associated with this list
    const lectureListBooks = await db
      .select()
      .from(LectureListBooks)
      .where(eq(LectureListBooks.listId, lectureList[0].listId));

    // If no books in the list, return empty books array
    if (!lectureListBooks || lectureListBooks.length === 0) {
      return new Response(
        JSON.stringify({
          listInfo: lectureList[0],
          books: [],
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    const lectureBookIds = lectureListBooks.map((item) => item.lectureBookId);

    // Get all LectureBooks with their associated Books
    const books = await fetchLectureListBooks(lectureBookIds);

    return new Response(
      JSON.stringify({
        listInfo: lectureList[0],
        books,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Error fetching lecture list:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch lecture list" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};

export const POST: APIRoute = async ({ locals, request }) => {
  try {
    // Get the current user
    const user = await locals.currentUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    const { id } = user;

    // Parse the request body
    const lectureBook: LectureBook = await request.json();
    lectureBook.currentPage = 0;
    lectureBook.liked = false;
    lectureBook.readingStatus = "pending";
    lectureBook.mainNote = "";
    const authors = lectureBook.author_name
      ? lectureBook.author_name.join(",")
      : "";

    // get the lecture list
    let lectureList = await db
      .select()
      .from(LectureLists)
      .where(and(eq(LectureLists.type, TYPE), eq(LectureLists.userId, id)));

    // Check if the lecture list does not exists, create it
    if (!lectureList || lectureList.length === 0) {
      const newLectureList = {
        listId: randomUUID(),
        type: TYPE,
        userId: id,
        name: "Main",
        description: "Main lecture list",
      };
      await db.insert(LectureLists).values(newLectureList);
      lectureList = await db
        .select()
        .from(LectureLists)
        .where(and(eq(LectureLists.type, TYPE), eq(LectureLists.userId, id)));
    }

    // check if the book already exists and if not add it
    let Book = await db
      .select()
      .from(Books)
      .where(eq(Books.openLibraryKey, lectureBook.key));
    if (!Book || Book.length === 0) {
      // If the book already exists, just add it to the lecture list
      const newBook = {
        bookId: randomUUID(),
        openLibraryKey: lectureBook.key,
        title: lectureBook.title ?? "",
        author: authors,
        cover: lectureBook.cover_i ?? "",
      };
      await db.insert(Books).values(newBook);
      Book = await db
        .select()
        .from(Books)
        .where(eq(Books.openLibraryKey, lectureBook.key));
    }

    // check if there is already a lecture book for this book
    const bookId = Book[0].bookId;

    // Use a single query with joins to check if the user already has this book in any list
    let lectureBookFound = await db
      .select({
        lectureBooksId: LectureBooks.lectureBooksId,
        lectureListId: LectureListBooks.listId,
      })
      .from(LectureBooks)
      .innerJoin(
        LectureListBooks,
        eq(LectureBooks.lectureBooksId, LectureListBooks.lectureBookId),
      )
      .innerJoin(LectureLists, eq(LectureListBooks.listId, LectureLists.listId))
      .where(and(eq(LectureBooks.bookId, bookId), eq(LectureLists.userId, id)));

    console.log("lectureBookFound", lectureBookFound);

    let lectureBookSaved;
    // If the user doesnt have this book in any list, create a new lecture book
    if (!lectureBookFound || lectureBookFound.length === 0) {
      const newLectureBook = {
        lectureBooksId: randomUUID(),
        currentPage: lectureBook.currentPage,
        readingStatus: lectureBook.readingStatus,
        bookId: Book[0].bookId,
        liked: lectureBook.liked || false,
        mainNote: lectureBook.mainNote || null,
      };
      await db.insert(LectureBooks).values(newLectureBook);
      lectureBookSaved = await db
        .select({
          lectureBooksId: LectureBooks.lectureBooksId,
        })
        .from(LectureBooks)
        .where(eq(LectureBooks.bookId, bookId));
    }

    // If lecture book is not part of the list we are going to save.
    if (
      lectureBookFound &&
      lectureBookFound.length > 0
    ) {
      const isSavedInList = lectureBookFound.some(
        (item) => item.lectureListId === lectureList[0].listId,
      );
      if (isSavedInList) {
        return new Response(
          JSON.stringify({
            message: "Lecture book already exists in the list",
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      }
    }

    //Add the lecture book to the lecture list
    if (!lectureBookSaved || lectureBookSaved.length === 0) {
      lectureBookSaved = await db
        .select({
          lectureBooksId: LectureBooks.lectureBooksId,
        })
        .from(LectureBooks)
        .where(eq(LectureBooks.bookId, bookId));
    }
    await db.insert(LectureListBooks).values({
      listId: lectureList[0].listId,
      lectureBookId: lectureBookSaved[0].lectureBooksId,
    });

    return new Response(
      JSON.stringify({
        message: "Lecture book added successfully",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Error adding lecture book:", error);
    return new Response(
      JSON.stringify({ error: "Failed to add lecture book" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};
