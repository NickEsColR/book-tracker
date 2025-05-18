import { defineTable, column } from "astro:db";
import { Books } from "db/models/Books";
import { Genres } from "db/models/Genres";

export const BookGenre = defineTable({
  columns: {
    bookId: column.text({ primaryKey: true, references: () => Books.columns.bookId }),
    genreId: column.text({ primaryKey: true, references: () => Genres.columns.id }),
  }
})