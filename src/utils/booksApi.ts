import type { OpenLibraryResponse } from "@/types/OpenLibraryTypes";

const BASE_URL = "http://openlibrary.org/search.json?fields=title,author_name,first_publish_year,subject,cover_i,number_of_pages_median";

export const getBooks = async (title?: string | null, authors?: string | null, genres?: string | null): Promise<OpenLibraryResponse> => {
  if (!title && !authors && !genres) {
    title = "all";
  }
  const url = `${BASE_URL}${title ? `&title=${title}` : ''}${authors ? `&author=${authors}` : ''}${genres ? `&genre=${genres}` : ''}&sort=rating`;
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
