import { column, defineTable } from "astro:db";
import { Books } from "db/models/Books";

export const LectureBooks = defineTable({
  columns: {
    lectureBooksId: column.text({ primaryKey: true }),
    currentPage: column.number({ default: 0 }),
    readingStatus: column.text({default: "pending"}),
    bookId: column.text(),
    liked: column.boolean({ default: false }),
    mainNote: column.text({ optional: true }),
  },
  foreignKeys: [
    {
      columns: ["bookId"],
      references: () => [Books.columns.bookId],
    }
  ]
});
