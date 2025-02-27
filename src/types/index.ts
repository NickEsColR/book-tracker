export interface Library {
  books: Books[];
}

export interface Books {
  book: Book;
}

export interface Book {
  title:    string;
  pages:    number;
  genre:    string;
  cover:    string;
  synopsis: string;
  year:     number;
  ISBN:     string;
  author:   Author;
}

export interface Author {
  name:       string;
  otherBooks: string[];
}
