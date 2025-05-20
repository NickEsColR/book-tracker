import { defineTable, column } from "astro:db";
import { LectureBooks } from "db/models/LectureBooks";

export const Notes = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    content: column.text(),
    lectureBookId: column.text(),
  },
  foreignKeys: [
    {
      columns: ["lectureBookId"],
      references: () => [LectureBooks.columns.lectureBooksId],
    }
  ]
});
