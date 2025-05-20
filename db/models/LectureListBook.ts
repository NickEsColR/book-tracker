import { defineTable, column } from "astro:db";
import { LectureBooks } from "db/models/LectureBooks";
import { LectureLists } from "db/models/lectureLists";

export const LectureListBooks = defineTable({
  columns: {
    listId: column.text({references: () => LectureLists.columns.listId}),
    lectureBookId: column.text({references: () => LectureBooks.columns.lectureBooksId}),
  },
})