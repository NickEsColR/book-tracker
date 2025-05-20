import type { OpenLibraryResponse } from "@/types/OpenLibraryTypes";

const BASE_URL = "http://openlibrary.org/search.json?fields=key,title,cover_i,author_name";

/**
 * Fetches books from the OpenLibrary API based on title, authors, genres, offset, and limit.
 * @param title The title of the book to search for.
 * @param authors The authors of the book to search for.
 * @param genres The genres of the book to search for.
 * @param offset The offset for pagination.
 * @param limit The limit for the number of results per page.
 * @returns A promise that resolves to an OpenLibraryResponse object.
 */
export const getBooks = async (title?: string | null, authors?: string | null, genres?: string | null, offset?: number, limit?: number): Promise<OpenLibraryResponse> => {
  if (!title && !authors && !genres) {
    title = "all";
  }
  const url = `${BASE_URL}${title ? `&title=${title}` : ''}${authors ? `&author=${authors}` : ''}${genres ? `&genre=${genres}` : ''}${offset !== undefined ? `&offset=${offset}` : ''}${limit !== undefined ? `&limit=${limit}` : ''}&sort=rating`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  const data = await response.json();
  if (!data.docs) {
    throw new Error('No books found');
  }
  return data as OpenLibraryResponse;
}
