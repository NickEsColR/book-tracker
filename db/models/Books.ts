import { column, defineTable } from "astro:db";

export const Books = defineTable({
  columns: {
    bookId: column.text({ primaryKey: true }),
    openLibraryKey: column.text({ unique: true }),
    title: column.text(),
    author: column.text(),
    cover: column.text(),
  },
});
