import type { LectureBook } from "@/types/OpenLibraryTypes";
import { atom } from "nanostores";

export const isOpen = atom(false);
export const bookData = atom<LectureBook | null>(null);

/**
 * Opens the dialog with the provided book data.
 * @param book The book data to display in the dialog.
 */
export const openDialog = (book: LectureBook) => {
  bookData.set(book);
  isOpen.set(true);
};
