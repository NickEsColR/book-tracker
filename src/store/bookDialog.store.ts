import type { Book, LectureBook } from "@/types/OpenLibraryTypes";
import { atom } from "nanostores";

export const isOpen = atom(false);
export const bookData = atom<LectureBook | null>(null);

// Function to open the dialog with a LectureBook
export const openDialog = (book: LectureBook) => {
  bookData.set(book);
  isOpen.set(true);
};
