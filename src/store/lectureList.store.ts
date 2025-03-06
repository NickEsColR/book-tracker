import { atom } from 'nanostores';
import type { LectureBook } from '@/types';

export const books = atom<LectureBook[]>([]);

export const selectedBook = atom<LectureBook | null>(null);

export const addBook = (book: LectureBook) => {
  books.set([...books.get(), book]);
}

export const removeBook = (book: LectureBook) => {
  books.set(books.get().filter(b => b !== book));
}