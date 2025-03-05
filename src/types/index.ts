export interface OpenLibraryResponse {
  docs: Book[];
}

export interface Book {
  title:                  string;
  number_of_pages_median: number;
  subject:                string[];
  cover_i:                string;
  first_publish_year:     number;
  isbn:                   string[];
  author_name:            string[];
}

export interface LectureBook extends Book {
  page: number;
}
