import type { Book, LectureBook } from "@/types";
import { atom } from "nanostores";

export const isOpen = atom(false);
export const bookDetails = atom<LectureBook | null>(null);

// Function to open the dialog
export const openDialog = (book: LectureBook) => {
  bookDetails.set(book);
  isOpen.set(true);
};
