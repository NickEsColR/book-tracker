import type { Book } from '@/types';
import { atom } from 'nanostores';

export const isOpen = atom(false);
export const bookDetails = atom<Book | null>(null);