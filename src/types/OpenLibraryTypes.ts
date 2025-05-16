export interface OpenLibraryResponse {
  num_found: number;
  start:    number;
  numFoundExact: boolean;
  q: string;
  offset: number;
  docs: Book[];
}

export interface Book {
  key:                   string;
  title?:                  string;
  number_of_pages_median?: number;
  subject?:                string[];
  cover_i?:                string;
  first_publish_year?:     number;
  author_name?:            string[];
  isbn?:                 string[];
}

export interface LectureBook extends Book {
  currentPage: number;
  liked: boolean;
  mainNote: string;
  readingStatus: 'pending' | 'reading' | 'read';
}
