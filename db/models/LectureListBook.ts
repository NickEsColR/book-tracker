import { defineTable, column } from "astro:db";
import { LectureBooks } from "db/models/LectureBooks";
import { LectureLists } from "db/models/lectureLists";

export const LectureListBooks = defineTable({
  columns: {
    listId: column.text(),
    lectureBookId: column.text(),
  },
  foreignKeys: [
    {
      columns: ["listId", "lectureBookId"],
      references: () => [LectureLists.columns.listId, LectureBooks.columns.lectureBooksId],
    },
  ],
})