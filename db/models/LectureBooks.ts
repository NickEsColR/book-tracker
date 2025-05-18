import { column, defineTable } from "astro:db";
import { Books } from "db/models/Books";

export const LectureBooks = defineTable({
  columns: {
    lectureBooksId: column.text({ primaryKey: true }),
    currentPage: column.number(),
    readingStatus: column.text(),
    bookId: column.text(),
  },
  foreignKeys: [
    {
      columns: ["bookId"],
      references: () => [Books.columns.bookId],
    }
  ]
});
