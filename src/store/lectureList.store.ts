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

export const updateBook = (book: LectureBook) => {
  const updatedBooks = books.get().map(b => b.isbn.join(", ") === book.isbn.join(", ") ? book : b);
  books.set(updatedBooks);
  return updatedBooks;
}

export const getBookByISBN = (isbn: string) => {
  return books.get().find(b => b.isbn.join(", ") === isbn);
}