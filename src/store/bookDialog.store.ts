import type { Book, LectureBook } from "@/types/OpenLibraryTypes";
import { atom } from "nanostores";

export const isOpen = atom(false);
export const bookISBN = atom<string>("");

// Function to open the dialog
export const openDialog = (isbn: string) => {
  bookISBN.set(isbn);
  isOpen.set(true);
};
