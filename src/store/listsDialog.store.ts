import { atom } from 'nanostores';
import type { LectureBook } from '@/types/OpenLibraryTypes';

export const listsDialogOpen = atom(false);
export const bookData = atom<LectureBook | null>(null);

export const openDialog = (book:LectureBook) => {
  bookData.set(book);
  listsDialogOpen.set(true);
};

